#!/usr/bin/env python3
"""轻聊 · 热铁盒增量部署（绕过 CLI 的单请求全量文本上传）
- GET  /api-key-v2/verification?key=TOKEN      → 校验 key，取 username
- GET  /host/site/content?domain=...           → 线上现有文本文件 path→content
- POST /host/site/changes                      → {"changes":[{content,operation:"write",path}],domain}
  （每次请求只带总内容 ≤2MB 的一批文件，规避 Payload Too Large）
"""
import json, os, sys, urllib.request, urllib.error

TOKEN = '79109a13-5a6e-48bc-8aa0-55d03aafee64'
SITE = 'qingliao-ai'
BASES = [
    'https://api-overseas.retiehe.com/backend',
    'https://api-eo.retiehe.com/backend',
    'https://api.retiehe.com/backend',
]
BASE = BASES[2]
DIST = '/home/z/my-project/chatbox-src/release/app/dist/renderer'
TEXT_EXT = {'.js', '.css', '.html', '.svg', '.json', '.txt', '.xml', '.webmanifest', '.map', '.mjs', '.ts', '.md'}
BATCH_BYTES = 2 * 1024 * 1024

def req(url, data=None, headers=None, method=None):
    h = {'Authorization': 'Bearer ' + TOKEN, 'Accept-Language': 'en-US', 'Accept': '*/*',
         'User-Agent': 'Mozilla/5.0 (linux) RTHHostHelper/0.0.1'}
    if headers: h.update(headers)
    r = urllib.request.Request(url, data=data, headers=h, method=method)
    try:
        with urllib.request.urlopen(r, timeout=180) as resp:
            return resp.status, resp.read()
    except urllib.error.HTTPError as e:
        return e.code, e.read()

USERNAME = None

def api(path, payload=None, method=None):
    """模拟 CLI Bo()：GET 拼 username 查询串，POST 塞 username 进 body；海外优先，国内兑底"""
    global USERNAME
    for base in BASES:
        try:
            if payload is not None:
                body_payload = dict(payload)
                if USERNAME: body_payload.setdefault('username', USERNAME)
                st, out = req(base + path, data=json.dumps(body_payload).encode(),
                              headers={'Content-Type': 'application/json'}, method=method or 'POST')
            else:
                sep = '&' if '?' in path else '?'
                q = path + (sep + 'username=' + USERNAME if USERNAME else '')
                st, out = req(base + q, method=method or 'GET')
            if st in (403, 501, 502, 503):
                print(f'  [{base.split("//")[1].split(".")[0]} {st}] 换下一个端点')
                continue
            return st, out
        except Exception as e:
            print('  请求异常:', e)
    return st, out

def main():
    global USERNAME
    # 1) 校验 key（国内后端）
    st, out = req(BASES[2] + '/api-key-v2/verification?key=' + TOKEN)
    d = json.loads(out)
    print('verify:', st, d if st == 200 else out[:200])
    if st != 200: sys.exit('key 校验失败')
    USERNAME = d.get('username')

    # 2) 取线上现有内容
    st, out = api(f'/host/site/content?domain={SITE}')
    print('site content:', st, len(out), 'bytes')
    if st != 200: sys.exit('获取线上内容失败: ' + out[:300].decode('utf-8', 'ignore'))
    remote = json.loads(out)
    if isinstance(remote, dict) and 'result' in remote:
        remote = remote['result']
    print('线上文本文件数:', len(remote))

    # 3) 本地文件清单
    changes = []
    local_paths = []
    for root, dirs, files in os.walk(DIST):
        for fn in files:
            p = os.path.join(root, fn)
            rel = os.path.relpath(p, DIST).replace(os.sep, '/')
            ext = os.path.splitext(fn)[1].lower()
            local_paths.append((rel, p, ext))
    print('本地文件数:', len(local_paths))

    changed, skipped, binary_or_new = [], [], []
    for rel, p, ext in local_paths:
        if rel in remote and ext in TEXT_EXT:
            with open(p, encoding='utf-8') as f:
                local = f.read()
            if remote[rel] == local:
                skipped.append(rel)
                continue
            changed.append(rel)
        elif rel in remote:
            skipped.append(rel)  # 线上已有且非文本比对（假定一致）
        else:
            binary_or_new.append(rel)
    print(f'未变化 {len(skipped)}，文本有变化 {len(changed)}，新增/二进制 {len(binary_or_new)}')
    for r in changed: print('  变更:', r)
    for r in binary_or_new: print('  新增:', r)

    if not changed and not binary_or_new:
        print('线上已是最新，无需上传'); return

    # 4) 分批上传文本变更
    batch, batch_size = [], 0
    def flush():
        nonlocal batch, batch_size
        if not batch: return
        st, out = api('/host/site/changes', {'changes': batch, 'domain': SITE})
        ok = st == 200
        print(f'上传 {len(batch)} 个文件({batch_size//1024}KB) → {st}', '' if ok else out[:300])
        if not ok: sys.exit('上传失败')
        batch, batch_size = [], 0

    for rel in changed + [r for r in binary_or_new if os.path.splitext(r)[1].lower() in TEXT_EXT]:
        p = os.path.join(DIST, rel)
        content = open(p, encoding='utf-8').read()
        batch.append({'content': content, 'operation': 'write', 'path': rel})
        batch_size += len(content.encode())
        if batch_size >= BATCH_BYTES: flush()
    flush()

    # 5) 新增二进制文件 → /host/site/binary multipart
    import mimetypes, uuid
    username = d.get('username') if isinstance(d, dict) else None
    for rel in [r for r in binary_or_new if os.path.splitext(r)[1].lower() not in TEXT_EXT]:
        p = os.path.join(DIST, rel)
        mime = mimetypes.guess_type(rel)[0] or 'application/octet-stream'
        data = open(p, 'rb').read()
        b = uuid.uuid4().hex
        body = (f'--{b}\r\nContent-Disposition: form-data; name="content"; filename="{os.path.basename(rel)}"\r\n'
                f'Content-Type: {mime}\r\n\r\n').encode() + data + \
               (f'\r\n--{b}\r\nContent-Disposition: form-data; name="domain"\r\n\r\n{SITE}\r\n'
                f'--{b}\r\nContent-Disposition: form-data; name="key"\r\n\r\n{rel}\r\n'
                f'--{b}\r\nContent-Disposition: form-data; name="username"\r\n\r\n{username or ""}\r\n'
                f'--{b}--\r\n').encode()
        st, out = req(BASES[0] + '/host/site/binary', data=body,
                      headers={'Content-Type': f'multipart/form-data; boundary={b}'})
        print(f'二进制上传 {rel}({len(data)//1024}KB) → {st}', '' if st == 200 else out[:300])

    print('部署完成')

if __name__ == '__main__':
    main()

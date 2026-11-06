#!/usr/bin/env python3
"""清扫 zh-Hans translation.json 值中的品牌词（键不动，URL 域名优先处理）。"""
import json, re

P = 'packages/chatbox-i18n/src/locales/zh-Hans/translation.json'
REPO = 'github.com/LXgssy/qingliao'

rules = [
    ('hi@chatboxai.com', f'轻聊的 GitHub 仓库（{REPO}）'),
    ('chatboxai.app', REPO),
    ('chatboxai.com', REPO),
    ('Chatbox AI', '轻聊'),
    ('ChatboxAI', '轻聊'),
    ('Chatbox', '轻聊'),
    ('ChatBox', '轻聊'),
    ('CHATBOX', '轻聊'),
    ('Boxy', '轻聊助手'),
]

changed = 0
def walk(o):
    global changed
    if isinstance(o, dict):
        return {k: walk(v) for k, v in o.items()}
    if isinstance(o, list):
        return [walk(v) for v in o]
    if isinstance(o, str):
        s = o
        for a, b in rules:
            if a in s:
                s = s.replace(a, b)
        if s != o:
            changed += 1
        return s
    return o

d = json.load(open(P, encoding='utf-8'))
d = walk(d)
json.dump(d, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
print(f'{changed} 个值被清扫')
# 复查残留（排除已替换的 github 链接）
rest = []
def scan(o, path=''):
    if isinstance(o, dict):
        for k, v in o.items(): scan(v, path + '/' + str(k))
    elif isinstance(o, str) and re.search(r'[Cc]hatbox', o) and 'LXgssy' not in o:
        rest.append((path, o[:80]))
scan(d)
print('残留:', len(rest))
for p, v in rest[:10]: print('-', p, '=>', v)

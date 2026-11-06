#!/usr/bin/env python3
"""热修：把 dist/renderer/index.html 的全量预载脚本替换为轻量启动脚本。
- 进度条只跟踪应用自身启动（缓动到 88%，挂载后立即 100% 并撤除）
- 不再首次强拉全部 406 个资源（旧方案在慢 CDN 上会卡死）
- SW 立即注册，运行时缓存已用资源 → 第二次访问秒开
- 15 秒兜底撤除，绝不永久遮挡
"""
import re, sys

P = '/home/z/my-project/chatbox-src/release/app/dist/renderer/index.html'
s = open(P, encoding='utf-8').read()

NEW_SCRIPT = """<script>
      // 轻聊启动：进度条仅跟踪应用自身启动；SW 运行时缓存，二次访问秒开
      ;(function () {
        var bar = document.getElementById('splashBar')
        var status = document.getElementById('splashStatus')
        var screen = document.getElementById('splashScreen')
        var done = false
        var t0 = Date.now()
        var pct = 6
        function setPct(p) {
          if (bar) bar.style.width = Math.max(0, Math.min(100, p)) + '%'
        }
        function say(t) {
          if (status) status.textContent = t
        }
        function finish() {
          if (done) return
          done = true
          setPct(100)
          say('')
          setTimeout(function () {
            if (screen) {
              screen.style.transition = 'opacity .25s'
              screen.style.opacity = '0'
              setTimeout(function () {
                if (screen && screen.parentNode) screen.parentNode.removeChild(screen)
              }, 260)
            }
          }, 120)
        }
        // 进度缓动：数秒内推进到 88%，应用挂载后立即完成
        var anim = setInterval(function () {
          if (done) { clearInterval(anim); return }
          pct += (88 - pct) * 0.045
          setPct(pct)
        }, 80)
        // 轮询应用是否已挂载（#root 出现真实子元素即就绪）
        var poll = setInterval(function () {
          var root = document.getElementById('root')
          if (root) {
            var kids = root.children
            for (var i = 0; i < kids.length; i++) {
              var tag = kids[i].tagName
              if (tag !== 'STYLE' && tag !== 'SCRIPT' && tag !== 'LINK') {
                clearInterval(poll)
                finish()
                return
              }
            }
          }
          if (Date.now() - t0 > 15000) { clearInterval(poll); finish() }
        }, 150)
        // Service Worker：缓存优先，二次访问秒开
        if (location.protocol === 'https:' && 'serviceWorker' in navigator) {
          navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(function () {})
        }
        try { localStorage.removeItem('qingliao-preloaded') } catch (e) {}
      })()
    </script>"""

# 1) 替换旧的预载 <script>…</script>（含“轻聊启动预加载”注释的块）
pat_old = re.compile(
    r"<script>\s*// 轻聊启动预加载.*?</script>", re.S
)
if not pat_old.search(s):
    print('未找到旧预载脚本块'); sys.exit(1)
s = pat_old.sub(lambda m: NEW_SCRIPT, s, count=1)

# 2) 移除 manifest 注入块（不再被引用）
s = re.sub(r'<script>window\.QINGLIAO_MANIFEST=.*?</script>\s*', '', s, count=1, flags=re.S)

open(P, 'w', encoding='utf-8').write(s)
print('热修完成，新 index.html 大小:', len(s.encode('utf-8')), 'B')
print('manifest 残留:', s.count('QINGLIAO_MANIFEST'))

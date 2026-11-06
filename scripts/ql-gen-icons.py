#!/usr/bin/env python3
"""生成轻聊品牌图标：渐变圆盘 + 白色对话气泡（与 splash 一致）"""
import io

import cairosvg
from PIL import Image

SVG = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="{size}" height="{size}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#3b82f6"/>
      <stop offset="1" stop-color="#06b6d4"/>
    </linearGradient>
  </defs>
  <circle cx="24" cy="24" r="22" fill="url(#g)"/>
  <path d="M14.4 16.4h19.2a3.4 3.4 0 0 1 3.4 3.4v10a3.4 3.4 0 0 1-3.4 3.4H22.2L16 38.8v-5.6h-1.6a3.4 3.4 0 0 1-3.4-3.4v-10a3.4 3.4 0 0 1 3.4-3.4z" fill="#ffffff"/>
  <circle cx="18.8" cy="24.8" r="2.1" fill="url(#g)"/>
  <circle cx="25.2" cy="24.8" r="2.1" fill="url(#g)"/>
</svg>'''


def png(size: int) -> Image.Image:
    data = cairosvg.svg2png(bytestring=SVG.format(size=size).encode())
    return Image.open(io.BytesIO(data)).convert('RGBA')


OUT = 'src/renderer'

# favicon.ico（多尺寸）
imgs = [png(s) for s in (16, 32, 48)]
imgs[0].save(f'{OUT}/favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48)], append_images=imgs[1:])
png(48).save(f'{OUT}/favicon.png')
png(192).save(f'{OUT}/logo192.png')
png(256).save('src/renderer/static/icon.png')
print('生成完成: favicon.ico / favicon.png / logo192.png / static/icon.png')

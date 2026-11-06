#!/usr/bin/env python3
"""用 rollup 真实模块图（/tmp/ql-real-graph.json）重新做 SCC 分桶 → app-chunks.json
两遍构建法：第一遍（任意桶）构建并 dump 真实图 → 本脚本重分桶 → 第二遍构建无环。"""
import json
import sys

sys.setrecursionlimit(100000)

g = json.load(open('/tmp/ql-real-graph.json'))
real = {}
for k, deps in g.items():
    me = k.split('|', 1)[1]
    real[me] = sorted(set(d for d in deps if d in {kk.split('|', 1)[1] for kk in g}))

nodes = list(real.keys())
idx, low, on, st, sccs = {}, {}, set(), [], []
cnt = 0
for v in nodes:
    if v in idx:
        continue
    work = [[v, 0]]
    while work:
        top = work[-1]
        node, pi = top[0], top[1]
        if pi == 0:
            idx[node] = low[node] = cnt
            cnt += 1
            st.append(node)
            on.add(node)
        deps = real.get(node, [])
        advanced = False
        while pi < len(deps):
            d = deps[pi]
            pi += 1
            top[1] = pi
            if d not in real:
                continue
            if d not in idx:
                work.append([d, 0])
                advanced = True
                break
            elif d in on:
                low[node] = min(low[node], idx[d])
        if advanced:
            continue
        if low[node] == idx[node]:
            comp = []
            while True:
                w = st.pop()
                on.discard(w)
                comp.append(w)
                if w == node:
                    break
            sccs.append(comp)
        work.pop()
        if work:
            p = work[-1][0]
            low[p] = min(low[p], low[node])

m2c = {}
big = 0
for comp in sccs:
    if len(comp) >= 8:
        name = f'app-scc{big}'
        big += 1
        for m in comp:
            m2c[m] = name
    else:
        rep = sorted(comp)[0]
        h = 0
        for i, ch in enumerate(rep):
            h = (h * 31 + ord(ch)) & 0xFFFFFFFF
        name = f'app-g{h % 6}'
        for m in comp:
            m2c[m] = name

json.dump(m2c, open('src/renderer/shims/gen/app-chunks.json', 'w'))
from collections import Counter

print('分桶:', dict(Counter(m2c.values()).most_common()))

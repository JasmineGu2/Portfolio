# Writes the ten road-map pages (37 to 46) from one template. Run: python gen_k7_pages.py
pages = [
 ('37-roads-converging', 'converging', 'blue'),
 ('38-roads-kilometre-markers', 'kilometre', 'grey'),
 ('39-roads-underground', 'underground', 'blue'),
 ('40-roads-city-growth', 'growth', 'blue'),
 ('41-roads-dense-district', 'dense', 'grey'),
 ('42-roads-partial-ring', 'ring', 'blue'),
 ('43-roads-river-bridges', 'river', 'grey'),
 ('44-roads-rail-line', 'rail', 'blue'),
 ('45-roads-section-cut', 'section', 'grey'),
 ('46-roads-tracing-paper', 'tracing', 'blue'),
]
T = '''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Mock %(n)s · Roads · %(scene)s</title><link rel="stylesheet" href="k7.css">
<style>html,body{margin:0;background:%(bg)s}body{min-height:100vh}</style></head><body>
<div id="app"></div>
<script src="k7-data.js"></script><script src="k7.js"></script><script src="k7-scenes.js"></script><script src="k7-scenes2.js"></script><script src="k7-scenes3.js"></script>
<script>K7.mount(document.getElementById('app'), K7.scenes.%(scene)s, { palette: '%(pal)s' })</script></body></html>
'''
for i, (file, scene, pal) in enumerate(pages):
    open(file + '.html', 'w', encoding='utf8', newline='').write(T % {'n': 37 + i, 'scene': scene, 'pal': pal, 'bg': '#0e3b8f' if pal == 'blue' else '#e4e2de'})
print('wrote', len(pages))

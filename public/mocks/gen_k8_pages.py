# Round 8 pages: five landing stories built off the City Growth map.
PAGES = [
  ('48-story-press-to-build', 'press', 'slabs', '48 · Press to build', 'Landing story. Nothing plays by itself: you press to build the next year. The isometric stack on the right is the legend; hover a layer and the places it covers light up.'),
  ('49-story-slow-film', 'film', 'tower', '49 · The slow film', 'Landing story. It plays slowly (about 5 seconds a year) and zooms to each new place; hover a place or press Pause to stop and read. The tower on the right is the legend and grows with the city.'),
  ('50-story-scroll-ledger', 'scroll', 'books', '50 · Scroll ledger', 'Landing story. The page is pinned: scroll and the city gets one year older, while a ledger writes itself. The bookshelf is the legend, one book per place per layer.'),
  ('51-story-drive-the-avenue', 'drive', 'strata', '51 · Drive the avenue', 'Landing story. An orange car drives Engineering Blvd, one stop a year. Under the map is the section through the layers, so one experience reads as one column across them.'),
  ('52-story-fill-the-jar', 'counter', 'jar', '52 · Fill the jar', 'Landing story. A big PLAY button, then it runs slowly with counters ticking while a jar fills, layer by layer: engineering fills first and most.'),
]
for slug, mode, leg, title, line in PAGES:
    html = f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title>
<link rel="stylesheet" href="k8.css"></head><body>
<div id="app" class="k8"></div>
<script src="k7-data.js"></script><script src="k8.js"></script>
<script>K8.mount(document.getElementById("app"), {{ mode: "{mode}", legend: "{leg}", title: {title!r}, line: {line!r} }})</script>
</body></html>
'''
    open(slug + '.html', 'w', encoding='utf8', newline='\n').write(html)
    print(slug)

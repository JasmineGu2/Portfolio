// Round 9: City-growth map matching the creative brief
// Real street map aesthetic: blueprint blue, irregular blocks, two roads (eng + product), one orange block
// Minimal labels, clean grid, growth over time

;(() => {
  const K = window.K10 = {};

  // Generate irregular city blocks in a rectangular area
  K.generateBlocks = (bounds, cellSize = 80, seed = 42) => {
    const { x0, y0, x1, y1 } = bounds;
    const blocks = [];
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

    for (let x = x0; x < x1; x += cellSize) {
      for (let y = y0; y < y1; y += cellSize) {
        // Random jitter to make blocks irregular
        const jx = (rnd() - 0.5) * cellSize * 0.3;
        const jy = (rnd() - 0.5) * cellSize * 0.3;
        const w = cellSize * (0.7 + rnd() * 0.3);
        const h = cellSize * (0.7 + rnd() * 0.3);

        blocks.push({
          x: x + jx,
          y: y + jy,
          w,
          h,
          type: 'street', // or 'landmark', 'me'
        });
      }
    }
    return blocks;
  };

  // Draw a block as SVG polygon
  K.blockSvg = (block, cls = '') => {
    const { x, y, w, h } = block;
    const pts = [
      [x, y],
      [x + w, y],
      [x + w, y + h],
      [x, y + h],
    ];
    // Add slight jitter to corners
    const jitterPts = pts.map(([px, py]) => [
      px + (Math.random() - 0.5) * 8,
      py + (Math.random() - 0.5) * 8,
    ]);
    return `<polygon class="blk ${cls}" points="${jitterPts.map((p) => p.join(',')).join(' ')}"/>`;
  };

  // Draw the two main roads
  K.drawRoads = () => {
    // Engineering road: main, thick, horizontal bias
    const engRoad = `<path class="road eng" d="M 100 380 Q 300 360, 500 370 T 900 380 L 1100 380" stroke-width="24"/>`;

    // Product road: thinner, curves through engineering
    const prodRoad = `<path class="road prod" d="M 100 480 Q 250 420, 400 360 T 700 380 L 900 390" stroke-width="12"/>`;

    return engRoad + prodRoad;
  };

  // Draw experience pins on the roads
  K.drawPins = (experiences) => {
    return experiences
      .map((exp) => {
        const isEng = exp.eng > exp.prod;
        const y = isEng ? 380 : 480;
        const progress = (experiences.indexOf(exp) + 1) / (experiences.length + 1);
        const x = 100 + progress * 1000;

        return `<g class="pin" data-id="${exp.id}" transform="translate(${x} ${y})">
          <circle r="8" class="pin-outer"/>
          <circle r="5" class="pin-inner"/>
          <text class="pin-label" x="0" y="-14">${exp.short}</text>
        </g>`;
      })
      .join('');
  };

  // The orange "YOU" block
  K.meBlock = () => {
    return `<g class="me-block">
      <polygon class="blk me" points="820,350 920,340 940,420 820,430"/>
      <text class="me-label" x="870" y="390">YOU</text>
    </g>`;
  };

  // Stack visualization (legend on the right)
  K.stackLegend = () => {
    return `<g class="stack-legend" transform="translate(1050 100)">
      <rect class="legend-bg" width="130" height="240" rx="3"/>
      <text class="legend-title" x="8" y="20">STACK</text>

      <text class="stack-label eng" x="8" y="50">▪ ENGINEERING</text>
      <text class="stack-item" x="12" y="65">Frontend: TS/React/CSS</text>
      <text class="stack-item" x="12" y="78">Fullstack: Node/Java/C++</text>

      <text class="stack-label prod" x="8" y="110">▪ PRODUCT</text>
      <text class="stack-item" x="12" y="125">Roadmap, Stakeholder Mgmt</text>

      <text class="stack-label comm" x="8" y="160">▪ COMMUNITY</text>
      <text class="stack-item" x="12" y="175">Hack Western, IPS Fellowship</text>
    </g>`;
  };
})();

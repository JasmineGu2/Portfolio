// Round 8: Simplified two-road visualizations with clarity
// Multiple rendering styles to show engineering & product roads converging

const K9 = {
  // Style: Two parallel horizontal roads
  twoParallelRoads(canvas, data) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    const padding = 60;
    const roadY1 = h / 3; // Engineering
    const roadY2 = (h * 2) / 3; // Product
    const convergX = w - padding - 100; // Where they meet

    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, w, h);

    // Draw grid
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;
    for (let x = padding; x < w - padding; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, h - padding);
      ctx.stroke();
    }

    // Year markers
    ctx.fillStyle = '#666';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    data.years.forEach((year, i) => {
      const x = padding + (i * (w - 2*padding) / (data.years.length - 1));
      ctx.fillText(year, x, h - 30);
    });

    // Engineering road (top)
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(padding, roadY1);
    ctx.lineTo(convergX, roadY1);
    ctx.stroke();

    // Product road (bottom)
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(padding, roadY2);
    ctx.lineTo(convergX, roadY2);
    ctx.stroke();

    // Convergence point
    ctx.fillStyle = '#ec4899';
    ctx.beginPath();
    ctx.arc(convergX + 30, (roadY1 + roadY2) / 2, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('YOU', convergX + 30, (roadY1 + roadY2) / 2);

    // Plot experiences
    data.exp.forEach((exp, i) => {
      const yearDiff = exp.year - data.years[0];
      const monthFraction = exp.month / 12;
      const x = padding + ((yearDiff + monthFraction) * (w - 2*padding) / (data.years[data.years.length - 1] - data.years[0]));

      // Draw on engineering or product road based on split
      const roadY = exp.eng > exp.prod ? roadY1 - 30 : roadY2 + 30;

      // Dot
      ctx.fillStyle = exp.eng > exp.prod ? '#3b82f6' : '#f97316';
      ctx.beginPath();
      ctx.arc(x, roadY, 12, 0, Math.PI * 2);
      ctx.fill();

      // Company label
      ctx.fillStyle = '#000';
      ctx.font = '11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(exp.co.substring(0, 6), x, roadY - 25);
    });

    // Legend
    K9.drawSkillLegend(ctx, data, w - 200, padding);
  },

  // Style: Compass rose showing skills
  compassRose(canvas, data) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    const centerX = w / 2;
    const centerY = h / 2;
    const radius = 120;

    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, w, h);

    // Draw compass ring
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Draw 4 rings for timeline
    for (let i = 1; i < 5; i++) {
      ctx.strokeStyle = '#e0e0e0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, (radius * i) / 5, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Quadrants: Engineering (top-right), Product (bottom-right), Fullstack (left)
    ctx.fillStyle = '#3b82f6';
    ctx.globalAlpha = 0.05;
    ctx.fillRect(centerX, centerY - radius, radius, radius); // Eng
    ctx.globalAlpha = 1;

    ctx.fillStyle = '#f97316';
    ctx.globalAlpha = 0.05;
    ctx.fillRect(centerX, centerY, radius, radius); // Prod
    ctx.globalAlpha = 1;

    // Plot experiences as points on compass
    data.exp.forEach((exp) => {
      const angle = ((exp.year - 2022) / 4) * Math.PI * 2 + (exp.month / 12) * (Math.PI * 2 / 4);
      const dist = radius * 0.7;
      const x = centerX + Math.cos(angle) * dist;
      const y = centerY + Math.sin(angle) * dist;

      // Color by domain
      if (exp.eng > exp.prod) {
        ctx.fillStyle = '#3b82f6';
      } else if (exp.prod > exp.eng) {
        ctx.fillStyle = '#f97316';
      } else {
        ctx.fillStyle = '#8b5cf6';
      }

      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();

      // Label
      ctx.fillStyle = '#000';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(exp.short, x, y - 18);
    });

    // Center: YOU
    ctx.fillStyle = '#ec4899';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('NOW', centerX, centerY);

    // Legend
    K9.drawSkillLegend(ctx, data, w - 250, 40);
  },

  // Style: Timeline dual-track
  dualTrackTimeline(canvas, data) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    const padding = 80;
    const trackY1 = h / 3; // Engineering
    const trackY2 = (h * 2) / 3; // Product

    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, w, h);

    // Track labels
    ctx.fillStyle = '#3b82f6';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'right';
    ctx.fillText('ENGINEERING', w - 20, trackY1);

    ctx.fillStyle = '#f97316';
    ctx.fillText('PRODUCT', w - 20, trackY2);

    // Draw tracks
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(padding, trackY1);
    ctx.lineTo(w - padding, trackY1);
    ctx.stroke();

    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(padding, trackY2);
    ctx.lineTo(w - padding, trackY2);
    ctx.stroke();

    // Year markers
    ctx.fillStyle = '#666';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    data.years.forEach((year, i) => {
      const x = padding + (i * (w - 2*padding) / (data.years.length - 1));
      ctx.fillText(year, x, h - 20);
      ctx.strokeStyle = '#ddd';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, h - padding);
      ctx.stroke();
    });

    // Plot experiences
    data.exp.forEach((exp) => {
      const yearDiff = exp.year - data.years[0];
      const monthFraction = exp.month / 12;
      const x = padding + ((yearDiff + monthFraction) * (w - 2*padding) / (data.years[data.years.length - 1] - data.years[0]));

      if (exp.eng >= 50) {
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(x, trackY1, 14, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(exp.short, x, trackY1);
      }

      if (exp.prod >= 30) {
        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.arc(x, trackY2, 14, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(exp.short, x, trackY2);
      }
    });

    // Legend
    K9.drawSkillLegend(ctx, data, 40, 40);
  },

  // Helper: Draw skill legend as a sidebar
  drawSkillLegend(ctx, data, x, y) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(x - 5, y - 5, 180, 140);
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    ctx.strokeRect(x - 5, y - 5, 180, 140);

    ctx.fillStyle = '#000';
    ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('SKILLS', x + 5, y + 15);

    let offset = 35;
    Object.entries(data.skillGroups).forEach(([key, group]) => {
      ctx.fillStyle = group.color;
      ctx.fillRect(x + 5, y + offset - 8, 8, 8);
      ctx.fillStyle = '#000';
      ctx.font = '10px monospace';
      ctx.fillText(group.name, x + 18, y + offset);
      offset += 18;
    });
  },
}

// K7 Scenes - Scene definitions for animated mocks
window.K7 = window.K7 || {};
K7.scenes = {
  growth: { id: 'growth', name: 'Growth' },
  growthAnimated: { id: 'growthAnimated', name: 'Growth Animated' },
  growthTwoRoads: { id: 'growthTwoRoads', name: 'Growth Two Roads' },
  growthDepthShade: { id: 'growthDepthShade', name: 'Growth Depth Shade' },
  growthHighlight: { id: 'growthHighlight', name: 'Growth Highlight' }
};

// Fallback mount function if k7.js doesn't provide it
if (!K7.mount) {
  K7.mount = function(el, scene, opts) {
    if (el) {
      el.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;color:white;font-size:24px;background:#0e3b8f;">' + (scene.name || 'Scene') + '</div>';
    }
  };
}

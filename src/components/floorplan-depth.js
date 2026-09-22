/**
 * ScaleNova EliteOS — Demo 03: Aurelia Estates
 * Architectural Axonometric Depth Canvas (src/components/floorplan-depth.js)
 */

(function () {
  'use strict';

  function initArchitecturalCanvas() {
    const canvas = document.getElementById('architectural-canvas') || document.getElementById('floorplan-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    const mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };
    let time = 0;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', (e) => {
      mouse.targetX = e.clientX / window.innerWidth;
      mouse.targetY = e.clientY / window.innerHeight;
    }, { passive: true });

    function drawAxonometricPlanes() {
      const cx = width * 0.75;
      const cy = height * 0.48;
      const tiltX = (mouse.x - 0.5) * 36;
      const tiltY = (mouse.y - 0.5) * 24;

      ctx.clearRect(0, 0, width, height);

      // Subtle Champagne Gold architectural grid lines
      ctx.strokeStyle = 'rgba(197, 168, 128, 0.07)';
      ctx.lineWidth = 1;
      const step = 48;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Volumetric architectural penthouse blocks
      const layers = [
        { z: -50, size: 260, color: 'rgba(197, 168, 128, 0.02)', border: 'rgba(197, 168, 128, 0.2)' },
        { z: -10, size: 200, color: 'rgba(197, 168, 128, 0.04)', border: 'rgba(197, 168, 128, 0.35)' },
        { z: 40, size: 140, color: 'rgba(197, 168, 128, 0.08)', border: 'rgba(197, 168, 128, 0.65)' }
      ];

      layers.forEach((layer) => {
        const offsetX = tiltX * (1 + layer.z * 0.01) + Math.sin(time * 0.001 + layer.z) * 5;
        const offsetY = tiltY * (1 + layer.z * 0.01) + Math.cos(time * 0.001 + layer.z) * 3;

        const px = cx + offsetX - layer.size / 2;
        const py = cy + offsetY - layer.size / 2;

        ctx.fillStyle = layer.color;
        ctx.strokeStyle = layer.border;
        ctx.lineWidth = 1.2;

        ctx.strokeRect(px, py, layer.size, layer.size);
        ctx.fillRect(px, py, layer.size, layer.size);

        // Axonometric elevation lines
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px + 20, py - 16);
        ctx.lineTo(px + layer.size + 20, py - 16);
        ctx.lineTo(px + layer.size, py);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(px + layer.size + 20, py - 16);
        ctx.lineTo(px + layer.size + 20, py + layer.size - 16);
        ctx.lineTo(px + layer.size, py + layer.size);
        ctx.stroke();
      });
    }

    function animate() {
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      time += 1;

      drawAxonometricPlanes();
      requestAnimationFrame(animate);
    }

    resize();
    animate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initArchitecturalCanvas);
  } else {
    initArchitecturalCanvas();
  }
})();

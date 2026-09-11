/**
 * ScaleNova EliteOS — Demo 03: Aurelia Estates
 * Architectural Axonometric Depth Canvas
 */

export class ArchitecturalCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };
    this.time = 0;
    
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = e.clientX / window.innerWidth;
      this.mouse.targetY = e.clientY / window.innerHeight;
    });

    this.animate();
  }

  resize() {
    this.width = this.canvas.parentElement.clientWidth || window.innerWidth;
    this.height = this.canvas.parentElement.clientHeight || 540;
    this.canvas.width = this.width * window.devicePixelRatio;
    this.canvas.height = this.height * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  drawAxonometricPlanes() {
    const cx = this.width / 2;
    const cy = this.height / 2;
    const tiltX = (this.mouse.x - 0.5) * 40;
    const tiltY = (this.mouse.y - 0.5) * 30;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Subtle architectural grid
    this.ctx.strokeStyle = 'rgba(197, 160, 89, 0.08)';
    this.ctx.lineWidth = 1;
    const step = 40;
    for (let x = 0; x < this.width; x += step) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();
    }
    for (let y = 0; y < this.height; y += step) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }

    // Layered architectural volumetric blocks
    const layers = [
      { z: -60, size: 280, color: 'rgba(24, 24, 26, 0.03)', border: 'rgba(197, 160, 89, 0.25)' },
      { z: -20, size: 220, color: 'rgba(197, 160, 89, 0.04)', border: 'rgba(197, 160, 89, 0.4)' },
      { z: 30, size: 160, color: 'rgba(197, 160, 89, 0.08)', border: 'rgba(197, 160, 89, 0.75)' }
    ];

    layers.forEach((layer) => {
      const offsetX = tiltX * (1 + layer.z * 0.01) + Math.sin(this.time * 0.001 + layer.z) * 6;
      const offsetY = tiltY * (1 + layer.z * 0.01) + Math.cos(this.time * 0.001 + layer.z) * 4;

      const px = cx + offsetX - layer.size / 2;
      const py = cy + offsetY - layer.size / 2;

      this.ctx.fillStyle = layer.color;
      this.ctx.strokeStyle = layer.border;
      this.ctx.lineWidth = 1.2;

      // Isometric angled box projection
      this.ctx.strokeRect(px, py, layer.size, layer.size);
      this.ctx.fillRect(px, py, layer.size, layer.size);

      // Dimensioning markers
      this.ctx.beginPath();
      this.ctx.moveTo(px - 10, py);
      this.ctx.lineTo(px, py);
      this.ctx.moveTo(px, py - 10);
      this.ctx.lineTo(px, py);
      this.ctx.stroke();
    });
  }

  animate() {
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;
    this.time += 1;

    this.drawAxonometricPlanes();
    requestAnimationFrame(() => this.animate());
  }
}

import { useEffect } from 'react';

type CursorEffectConfig = {
  friction?: number;
  trails?: number;
  size?: number;
  dampening?: number;
  tension?: number;
  amplitude?: number;
  frequency?: number;
  offset?: number;
};

const DEFAULT_CONFIG = {
  friction: 0.5,
  trails: 20,
  size: 50,
  dampening: 0.25,
  tension: 0.98,
  amplitude: 85,
  frequency: 0.0015,
  offset: 285,
};

class Node {
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;
}

class Line {
  spring: number;
  friction: number;
  nodes: Node[] = [];
  private config: typeof DEFAULT_CONFIG;
  private pos: { x: number; y: number };

  constructor(
    spring: number,
    config: typeof DEFAULT_CONFIG,
    pos: { x: number; y: number },
  ) {
    this.config = config;
    this.spring = spring + 0.1 * Math.random() - 0.02;
    this.friction = config.friction + 0.01 * Math.random() - 0.002;
    this.pos = pos;
    for (let i = 0; i < config.size; i++) {
      const node = new Node();
      node.x = pos.x;
      node.y = pos.y;
      this.nodes.push(node);
    }
  }

  update() {
    let e = this.spring;
    let t = this.nodes[0];
    if (
      !t ||
      typeof t.x !== 'number' ||
      typeof t.y !== 'number' ||
      typeof t.vx !== 'number' ||
      typeof t.vy !== 'number'
    ) {
      return;
    }
    t.vx += (this.pos.x - t.x) * e;
    t.vy += (this.pos.y - t.y) * e;
    for (let i = 0, a = this.nodes.length; i < a; i++) {
      t = this.nodes[i];
      if (
        !t ||
        typeof t.x !== 'number' ||
        typeof t.y !== 'number' ||
        typeof t.vx !== 'number' ||
        typeof t.vy !== 'number'
      ) {
        continue;
      }
      if (i > 0) {
        const n = this.nodes[i - 1];
        if (
          !n ||
          typeof n.x !== 'number' ||
          typeof n.y !== 'number' ||
          typeof n.vx !== 'number' ||
          typeof n.vy !== 'number'
        ) {
          continue;
        }
        t.vx += (n.x - t.x) * e;
        t.vy += (n.y - t.y) * e;
        t.vx += n.vx * this.config.dampening;
        t.vy += n.vy * this.config.dampening;
      }
      t.vx *= this.friction;
      t.vy *= this.friction;
      t.x += t.vx;
      t.y += t.vy;
      e *= this.config.tension;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const nodes = this.nodes;
    if (!nodes[0] || !nodes[1]) return;
    ctx.beginPath();
    if (!nodes[0] || !nodes[1]) return;
    ctx.beginPath();
    if (!nodes[0] || !nodes[1]) return;
    ctx.beginPath();
    if (!nodes[0] || !nodes[1]) return;
    ctx.beginPath();
    if (
      !nodes[0] ||
      typeof nodes[0].x !== 'number' ||
      typeof nodes[0].y !== 'number'
    )
      return;
    ctx.moveTo(nodes[0].x, nodes[0].y);

    for (let a = 1; a < nodes.length - 2; a++) {
      const e = nodes[a];
      const t = nodes[a + 1];
      if (!e || !t) continue;
      const ex = typeof e.x === 'number' ? e.x : 0;
      const ey = typeof e.y === 'number' ? e.y : 0;
      const tx = typeof t.x === 'number' ? t.x : 0;
      const ty = typeof t.y === 'number' ? t.y : 0;
      const mx = 0.5 * (ex + tx);
      const my = 0.5 * (ey + ty);
      ctx.quadraticCurveTo(ex, ey, mx, my);
    }

    const a = nodes.length - 2;
    const lastNode = nodes[a];
    const nextNode = nodes[a + 1];
    const lx = lastNode && typeof lastNode.x === 'number' ? lastNode.x : 0;
    const ly = lastNode && typeof lastNode.y === 'number' ? lastNode.y : 0;
    const nx = nextNode && typeof nextNode.x === 'number' ? nextNode.x : 0;
    const ny = nextNode && typeof nextNode.y === 'number' ? nextNode.y : 0;
    if (lastNode && nextNode) {
      ctx.quadraticCurveTo(lx, ly, nx, ny);
    }
    ctx.stroke();
    ctx.closePath();
  }
}

function useCanvasCursor(canvasId = 'canvas', config: CursorEffectConfig = {}) {
  useEffect(() => {
    const mergedConfig = { ...DEFAULT_CONFIG, ...config };
    const canvas = document.getElementById(
      canvasId,
    ) as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let running = true;
    let lines: Line[] = [];
    function initLines() {
      lines = [];
      for (let i = 0; i < mergedConfig.trails; i++) {
        lines.push(
          new Line(0.4 + (i / mergedConfig.trails) * 0.025, mergedConfig, pos),
        );
      }
    }

    function handlePointerMove(e: MouseEvent | TouchEvent) {
      if ('touches' in e && e.touches.length) {
        pos.x = e.touches[0]!.pageX;
        pos.y = e.touches[0]!.pageY;
      } else if ('clientX' in e) {
        pos.x = e.clientX;
        pos.y = e.clientY;
      }
    }

    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function render() {
      if (!running || !ctx || !canvas) return;
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      const cssVarColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary')
        .trim();
      ctx.strokeStyle = cssVarColor;
      ctx.lineWidth = 1;
      for (const line of lines) {
        line.update();
        line.draw(ctx);
      }
      requestAnimationFrame(render);
    }

    resizeCanvas();
    initLines();
    render();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: false });

    return () => {
      running = false;
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, [canvasId, JSON.stringify(config)]);
}

export { useCanvasCursor };

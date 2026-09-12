import { useEffect, useRef } from 'react';

type CursorEffectConfig = {
  friction: number;
  trails: number;
  size: number;
  dampening: number;
  tension: number;
};

type Point = { x: number; y: number };

const DEFAULT_CONFIG: CursorEffectConfig = {
  friction: 0.5,
  trails: 20,
  size: 50,
  dampening: 0.25,
  tension: 0.98,
};

type TrailNode = Point & { vx: number; vy: number };

class Trail {
  private readonly spring: number;
  private readonly friction: number;
  private readonly nodes: TrailNode[];
  private readonly config: CursorEffectConfig;
  private readonly target: Point;

  constructor(spring: number, config: CursorEffectConfig, target: Point) {
    this.config = config;
    this.target = target;
    this.spring = spring + 0.1 * Math.random() - 0.02;
    this.friction = config.friction + 0.01 * Math.random() - 0.002;
    this.nodes = Array.from({ length: config.size }, () => ({
      x: target.x,
      y: target.y,
      vx: 0,
      vy: 0,
    }));
  }

  update() {
    let { spring } = this;
    const head = this.nodes[0];
    if (!head) {
      return;
    }
    head.vx += (this.target.x - head.x) * spring;
    head.vy += (this.target.y - head.y) * spring;

    for (const [index, node] of this.nodes.entries()) {
      const previous = this.nodes[index - 1];
      if (previous) {
        node.vx += (previous.x - node.x) * spring;
        node.vy += (previous.y - node.y) * spring;
        node.vx += previous.vx * this.config.dampening;
        node.vy += previous.vy * this.config.dampening;
      }
      node.vx *= this.friction;
      node.vy *= this.friction;
      node.x += node.vx;
      node.y += node.vy;
      spring *= this.config.tension;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const [first] = this.nodes;
    if (!first || this.nodes.length < 3) {
      return;
    }
    ctx.beginPath();
    ctx.moveTo(first.x, first.y);
    for (let index = 1; index < this.nodes.length - 2; index++) {
      const current = this.nodes[index],
        next = this.nodes[index + 1];
      if (!current || !next) {
        continue;
      }
      ctx.quadraticCurveTo(
        current.x,
        current.y,
        (current.x + next.x) / 2,
        (current.y + next.y) / 2,
      );
    }
    const penultimate = this.nodes.at(-2),
      last = this.nodes.at(-1);
    if (penultimate && last) {
      ctx.quadraticCurveTo(penultimate.x, penultimate.y, last.x, last.y);
    }
    ctx.stroke();
    ctx.closePath();
  }
}

function useCanvasCursor(config: Partial<CursorEffectConfig> = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null),
    { friction, trails, size, dampening, tension } = { ...DEFAULT_CONFIG, ...config };

  useEffect(() => {
    const canvas = canvasRef.current,
      ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) {
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const mergedConfig: CursorEffectConfig = { friction, trails, size, dampening, tension },
      target: Point = { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      lines = Array.from(
        { length: mergedConfig.trails },
        (_, index) => new Trail(0.4 + (index / mergedConfig.trails) * 0.025, mergedConfig, target),
      );
    let frame = 0;

    const handlePointerMove = (event: PointerEvent) => {
        target.x = event.clientX;
        target.y = event.clientY;
      },
      resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      },
      render = () => {
        ctx.globalCompositeOperation = 'source-over';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'lighter';
        ctx.strokeStyle = getComputedStyle(document.documentElement)
          .getPropertyValue('--color-primary')
          .trim();
        ctx.lineWidth = 1;
        for (const line of lines) {
          line.update();
          line.draw(ctx);
        }
        frame = requestAnimationFrame(render);
      };

    resize();
    render();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [friction, trails, size, dampening, tension]);

  return canvasRef;
}

export { useCanvasCursor };

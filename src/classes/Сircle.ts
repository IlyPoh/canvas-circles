import { TCircle, TCoords } from "@/types";

export class Circle {
  position: { x: number; y: number };
  radius: number;
  dx: number;
  dy: number;
  fillColor?: string;
  strokeColor?: string;

  private maxDistance: number = 500;
  private minDistance: number = 100;

  constructor(circle: TCircle) {
    this.position = { x: circle.position.x, y: circle.position.y };
    this.radius = circle.radius;
    this.dx = circle.dx;
    this.dy = circle.dy;
    this.fillColor = circle.fillColor;
    this.strokeColor = circle.strokeColor;
  }

  private checkBoundaryCollision() {
    const {
      position: { x, y },
      dx,
      dy,
      radius,
    } = this;

    if (x + radius > window.innerWidth || x - radius < 0) {
      this.dx = -dx;
    }

    if (y + radius > window.innerHeight || y - radius < 0) {
      this.dy = -dy;
    }
  }

  private drawCircle(canvas: CanvasRenderingContext2D) {
    const {
      position: { x, y },
      radius,
      fillColor,
      strokeColor,
    } = this;
    canvas.beginPath();
    canvas.arc(x, y, radius, 0, Math.PI * 2, false);

    if (fillColor) {
      canvas.fillStyle = fillColor;
      canvas.fill();
    }

    if (strokeColor) {
      canvas.strokeStyle = strokeColor;
      canvas.stroke();
    }

    canvas.closePath();
  }

  private move() {
    const { dx, dy } = this;
    this.position.x += dx;
    this.position.y += dy;
  }

  public distanceTo(coords: TCoords) {
    if (!coords) return 0;
    const {
      position: { x, y },
    } = this;
    const { x: otherX, y: otherY } = coords;

    const dx = x - otherX;
    const dy = y - otherY;
    return Number(Math.sqrt(dx * dx + dy * dy).toFixed(2));
  }

  public drawLineToCoords(
    canvas: CanvasRenderingContext2D,
    coords: TCoords,
    width: number = 1
  ) {
    if (!coords) return;
    const distance = this.distanceTo(coords);
    const {
      position: { x, y },
      maxDistance,
      minDistance,
    } = this;
    const { x: otherX, y: otherY } = coords;
    let opacity;

    if (distance > maxDistance) {
      opacity = 0;
    } else if (distance < minDistance) {
      opacity = 1;
    } else {
      opacity = (
        1 -
        (distance - minDistance) / (maxDistance - minDistance)
      ).toFixed(2);
    }

    const newColor = `rgba(255, 255, 255, ${opacity})`;

    canvas.beginPath();
    canvas.moveTo(x, y);
    canvas.lineTo(otherX, otherY);
    canvas.strokeStyle = newColor;
    canvas.lineWidth = width;
    canvas.stroke();
  }

  public draw(canvas: CanvasRenderingContext2D) {
    this.drawCircle(canvas);
    return this;
  }

  public update(canvas: CanvasRenderingContext2D) {
    this.checkBoundaryCollision();
    this.move();
    this.drawCircle(canvas);
  }
}

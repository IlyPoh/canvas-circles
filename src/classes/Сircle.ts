import { randomNumberInRange } from "@/helpers/randomNumberInRange";
import { TCircle, TCircleConstructor, TCoords } from "@/types";

export const Circle: TCircleConstructor = function ({
  position: { x, y },
  radius,
  velocity,
  fillColor,
  strokeColor,
  options,
}) {
  const circle: TCircle = {
    position: { x, y },
    lastMouse: { x: x, y: y },
    radius,
    velocity,
    fillColor,
    strokeColor,
    options,
    trail: [],
    trailLength: 20,
    minDistance: 100,
    maxDistance: 500,
    distanceFromCenter: randomNumberInRange(70, 200),
    radians: Number((Math.random() * Math.PI * 2).toFixed(3)),

    checkBoundaryCollision() {
      if (!this.velocity || typeof this.velocity === "number") return;

      const { radius } = this;
      const { x, y } = this.position;
      const { x: vx, y: vy } = this.velocity;

      if (x + radius > window.innerWidth || x - radius < 0) {
        this.velocity.x = -vx;
      }

      if (y + radius > window.innerHeight || y - radius < 0) {
        this.velocity.y = -vy;
      }
    },

    drawCircle(canvas: CanvasRenderingContext2D) {
      const { x, y } = this.position;
      const { radius, fillColor, strokeColor } = this;

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
    },

    move(mouse?: TCoords) {
      const { velocity, distanceFromCenter, radians, lastMouse } = this;

      if (mouse) {
        this.lastMouse.x += Number(((mouse.x - lastMouse.x) * 0.05).toFixed(3));
        this.lastMouse.y += Number(((mouse.y - lastMouse.y) * 0.05).toFixed(3));
      }

      if (typeof velocity === "number") {
        this.radians = Number((this.radians + velocity).toFixed(3));
        this.position.x = Number(
          ((lastMouse.x ?? x) + Math.cos(radians) * distanceFromCenter).toFixed(
            3
          )
        );
        this.position.y = Number(
          ((lastMouse.y ?? y) + Math.sin(radians) * distanceFromCenter).toFixed(
            3
          )
        );
      } else {
        this.position.x += velocity.x;
        this.position.y += velocity.y;
      }
    },

    distanceTo(coords: TCoords) {
      if (!coords) return 0;
      const { x, y } = this.position;
      const { x: otherX, y: otherY } = coords;

      const vx = x - otherX;
      const vy = y - otherY;
      return Number(Math.sqrt(vx * vx + vy * vy).toFixed(2));
    },

    drawLineToCoords(
      canvas: CanvasRenderingContext2D,
      coords: TCoords,
      width: number = 1,
      maxDistance?: number
    ) {
      if (!coords) return;
      const { minDistance } = this;
      const { x, y } = this.position;
      const { x: otherX, y: otherY } = coords;
      const distanceBetweenElements = this.distanceTo(coords);
      let opacity;
      this.maxDistance = maxDistance ?? this.maxDistance;

      if (distanceBetweenElements > this.maxDistance) {
        opacity = 0;
      } else if (distanceBetweenElements < minDistance) {
        opacity = 1;
      } else {
        opacity = (
          1 -
          (distanceBetweenElements - minDistance) /
            (this.maxDistance - minDistance)
        ).toFixed(2);
      }

      const newColor = `rgba(255, 255, 255, ${opacity})`;

      canvas.beginPath();
      canvas.moveTo(x, y);
      canvas.lineTo(otherX, otherY);
      canvas.strokeStyle = newColor;
      canvas.lineWidth = width;
      canvas.stroke();
    },

    drawTrail(canvas: CanvasRenderingContext2D) {
      const { trail, fillColor, radius } = this;

      for (let i = 1; i < trail.length; i++) {
        const prev = trail[i - 1];
        const current = trail[i];

        canvas.beginPath();
        canvas.moveTo(prev.x, prev.y);
        canvas.lineTo(current.x, current.y);
        canvas.strokeStyle = fillColor ?? "#fff";
        canvas.lineWidth = radius;
        canvas.stroke();
      }
    },

    draw(canvas: CanvasRenderingContext2D) {
      this.drawCircle(canvas);
      if (this.options?.trail) this.drawTrail(canvas);
      return this;
    },

    update(canvas: CanvasRenderingContext2D, mouse?: TCoords) {
      const { position, trail, trailLength, velocity, options } = this;

      if (options?.trail && trail.length > trailLength) {
        trail.shift();
      }

      if (typeof velocity !== "number") this.checkBoundaryCollision();
      this.move(mouse);

      if (options?.trail) {
        this.trail.push({ x: position.x, y: position.y });
      }

      this.draw(canvas);
    },
  };

  return circle;
};

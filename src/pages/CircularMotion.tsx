// IMPORTS
import { useEffect, useRef, useState } from "react";

import createNewCircle from "@/helpers/createNewCircle";
import { CIRCLE_COLORS as colors } from "@/helpers/constants";
import { randomNumberInRange } from "@/helpers/randomNumberInRange";

import { TCircle, TCoords } from "@/types";

const numberOfCircles = 30;
const minRadius = 2;
const maxRadius = 6;

// COMPONENT
export const CircularMotion: React.FC = () => {
  const animationRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePositionRef = useRef<TCoords | null>(null);
  const [canvas, setCanvas] = useState<CanvasRenderingContext2D | null>(null);

  const [circles, setCircles] = useState<TCircle[]>([]);

  useEffect(() => {
    setCanvas(canvasRef.current!.getContext("2d"));
    if (!canvas) return;

    const initializeCircles = () => {
      const newCircles = Array.from({ length: numberOfCircles }, () => {
        const color = randomNumberInRange(0, colors.length - 1);
        const coords = mousePositionRef.current ?? {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        };

        return createNewCircle({
          circleRadius: randomNumberInRange(minRadius, maxRadius),
          coords: coords,
          color: colors[color],
          windowPaddingForCircle: 0,
          velocity: 0.05,
          options: {
            trail: true,
          },
        });
      });
      setCircles(newCircles);
    };

    const animateLoop = () => {
      if (!canvasRef.current || !canvas) return;

      const coords = mousePositionRef.current ?? {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };

      canvas.fillStyle = "rgba(255, 255, 255, 0.1)";
      canvas.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      circles.forEach(circle => {
        circle.update(canvas, coords);
      });

      animationRef.current = requestAnimationFrame(animateLoop);
    };

    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    };

    if (circles.length === 0) initializeCircles();

    animationRef.current = requestAnimationFrame(animateLoop);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);

      window.removeEventListener("resize", handleResize);
    };
  }, [canvas, circles]);

  const handleMouseMove = (event: React.MouseEvent) => {
    mousePositionRef.current = { x: event.clientX, y: event.clientY };
  };

  return (
    <canvas
      key={numberOfCircles}
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseMove={handleMouseMove}
    ></canvas>
  );
};

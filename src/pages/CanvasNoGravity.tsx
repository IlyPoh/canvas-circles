// IMPORTS
import { useEffect, useRef, useState } from "react";

import createNewCircle from "@/helpers/createNewCircle";

import { TCircle, TCoords } from "@/types";

// CONSTANTS
const lineWidth = 2;
const circleRadius = 4;
const numberOfCirclesByDefault = 5;

// COMPONENT
export const CanvasNoGravity: React.FC = () => {
  const intervalRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePositionRef = useRef<TCoords | null>(null);
  const [canvas, setCanvas] = useState<CanvasRenderingContext2D | null>(null);

  const [circles, setCircles] = useState<TCircle[]>([]);
  const [numberOfCircles, setNumberOfCircles] = useState(
    numberOfCirclesByDefault
  );

  useEffect(() => {
    setCanvas(canvasRef.current!.getContext("2d"));
    if (!canvas) return;

    const initializeCircles = () => {
      const newCircles = Array.from({ length: numberOfCircles }, () => {
        return createNewCircle({ circleRadius });
      });
      setCircles(newCircles);
    };

    const animateLoop = () => {
      if (!canvasRef.current) return;
      canvas.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const updatedCircles = circles.filter(circle => {
        const { x, y } = circle.position;

        const isWithinBounds =
          x > 0 && x < window.innerWidth && y > 0 && y < window.innerHeight;

        return isWithinBounds;
      });

      if (updatedCircles.length < circles.length) {
        setCircles(updatedCircles);
      }

      circles.forEach(circle => {
        circle.update(canvas);
      });

      for (let i = 0; i < circles.length; i++) {
        const maxDistanceToMouse = 300;

        // Draw line to mouse
        circles[i].drawLineToCoords(
          canvas,
          mousePositionRef.current!,
          lineWidth,
          maxDistanceToMouse
        );

        for (let j = i + 1; j < circles.length; j++) {
          // Draw lines between circles
          circles[i].drawLineToCoords(canvas, circles[j].position, lineWidth);
        }
      }

      animationRef.current = requestAnimationFrame(animateLoop);
    };

    if (circles.length === 0) initializeCircles();

    animationRef.current = requestAnimationFrame(animateLoop);

    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);

      window.removeEventListener("resize", handleResize);
    };
  }, [canvas, circles, numberOfCircles]);

  const addCircle = (coords: TCoords) => {
    setNumberOfCircles(prev => prev + 1);
    const newCircle = createNewCircle({ circleRadius, coords });
    setCircles(prevCircles => [...prevCircles, newCircle]);
  };

  const handleMouseDown = () => {
    const intervalId = setInterval(
      () => addCircle(mousePositionRef.current!),
      100
    );
    intervalRef.current = intervalId;
  };

  const handleMouseUp = () => {
    clearInterval(intervalRef.current!);
    intervalRef.current = null;
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    mousePositionRef.current = { x: event.clientX, y: event.clientY };

    if (!canvas) return;
  };

  return (
    <canvas
      key={numberOfCircles}
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={event => addCircle({ x: event.clientX, y: event.clientY })}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    ></canvas>
  );
};

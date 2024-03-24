import { Circle } from "@/classes/Сircle";

import { TCoords } from "@/types";

const createNewCircle = (
  circleRadius: number,
  windowPaddingForCircle: number,
  coords?: TCoords
) => {
  const randomX = Math.floor(
    Math.random() * (window.innerWidth - windowPaddingForCircle) + circleRadius
  );
  const randomY = Math.floor(
    Math.random() * (window.innerHeight - windowPaddingForCircle) + circleRadius
  );
  const randomDX =
    Math.floor(Math.random() * (3 - 2) + 2) * // Speed between 2 and 3
    (Math.random() < 0.5 ? -1 : 1); // Random direction
  const randomDY =
    Math.floor(Math.random() * (3 - 2) + 2) * // Speed between 2 and 3
    (Math.random() < 0.5 ? -1 : 1); // Random direction

  const x = coords?.x ?? randomX;
  const y = coords?.y ?? randomY;

  return new Circle({
    position: { x, y },
    radius: circleRadius,
    dx: randomDX,
    dy: randomDY,
    fillColor: "#fff",
  });
};

export default createNewCircle;

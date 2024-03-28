import { Circle } from "@/classes/Сircle";

import { TCircle, TCircleParams, TCoords } from "@/types";

type TCreateNewCircle = {
  circleRadius: number;
  coords?: TCoords;
  color?: string;
  velocity?: number;
  windowPaddingForCircle?: number;
  options?: {
    trail?: boolean;
  };
};

const createNewCircle = ({
  circleRadius,
  coords,
  color,
  velocity,
  windowPaddingForCircle = circleRadius * 2,
  options,
}: TCreateNewCircle): TCircle => {
  const randomX = Math.floor(
    Math.random() * (window.innerWidth - windowPaddingForCircle) + circleRadius
  );
  const randomY = Math.floor(
    Math.random() * (window.innerHeight - windowPaddingForCircle) + circleRadius
  );
  const randomVelocityX =
    Math.floor(Math.random() * (3 - 2) + 2) * // Speed between 2 and 3
    (Math.random() < 0.5 ? -1 : 1); // Random direction
  const randomVelocityY =
    Math.floor(Math.random() * (3 - 2) + 2) * // Speed between 2 and 3
    (Math.random() < 0.5 ? -1 : 1); // Random direction

  const x = coords?.x ?? randomX;
  const y = coords?.y ?? randomY;

  const circleParams: TCircleParams = {
    position: { x, y },
    radius: circleRadius,
    velocity: velocity ?? { x: randomVelocityX, y: randomVelocityY },
    fillColor: color ?? "#fff",
    options,
  };

  return Circle(circleParams);
};

export default createNewCircle;

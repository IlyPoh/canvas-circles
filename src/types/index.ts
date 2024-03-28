export type TCoords = {
  x: number;
  y: number;
};

export interface TCircle {
  position: TCoords;
  lastMouse: TCoords;
  radius: number;
  radians: number;
  distanceFromCenter: number;
  maxDistance: number;
  minDistance: number;
  velocity: number | TCoords;
  fillColor?: string;
  strokeColor?: string;
  trailLength: number;
  trail: TCoords[];
  options?: {
    trail?: boolean;
  };
  checkBoundaryCollision: () => void;
  drawCircle: (canvas: CanvasRenderingContext2D) => void;
  drawTrail: (canvas: CanvasRenderingContext2D) => void;
  move: (mouse?: TCoords) => void;
  distanceTo: (coords: TCoords) => number;
  drawLineToCoords: (
    canvas: CanvasRenderingContext2D,
    coords: TCoords,
    width?: number,
    maxDistance?: number
  ) => void;
  draw: (canvas: CanvasRenderingContext2D) => TCircle;
  update: (canvas: CanvasRenderingContext2D, mouse?: TCoords) => void;
}

export type TCircleParams = {
  position: TCoords;
  radius: number;
  velocity: number | TCoords;
  radians?: number;
  distance?: number;
  fillColor?: string;
  strokeColor?: string;
  options?: {
    trail?: boolean;
  };
};

export type TCircleConstructor = (circle: TCircleParams) => TCircle;

export type TLink = {
  label: string;
  path: string;
};

export type TCoords = {
  x: number;
  y: number;
};

export type TCircle = {
  position: TCoords;
  radius: number;
  dx: number;
  dy: number;
  fillColor?: string;
  strokeColor?: string;
};

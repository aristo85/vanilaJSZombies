export type Record = {
  matrixX: number;
  matrixY: number;
};

export type Grid = {
  x: number;
  y: number;
  matrixX: number;
  matrixY: number;
  id: number;
  isInfected: boolean;
  records: any[];
  rightEdge: boolean;
  leftEdge: boolean;
  topEdge: boolean;
  bottomEdge: boolean;
  isStop: boolean;
};

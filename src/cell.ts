import {
  gridNumber,
  moovementSequence,
  worldHeight,
  worldWidth,
} from "./index";
import { Grid, Record } from "./types";
let counter = 0;

export const calculateGrid = () => {
  const w = worldWidth;
  const h = worldHeight;
  const n = gridNumber;
  let currentRow = 0;
  return Array.from(Array(n * n).keys()).map((el, indx) => {
    currentRow = n - Math.floor((n * n - (indx + 1)) / n);
    return {
      x: ((el - (currentRow - 1) * n) * w) / n,
      y: ((currentRow - 1) * h) / n,
      matrixX: el - (currentRow - 1) * n,
      matrixY: currentRow - 1,
      id: indx,
      isInfected: false,
      records: [],
      rightEdge: false,
      leftEdge: false,
      topEdge: false,
      bottomEdge: false,
      isStop: false,
    };
  });
};

export const stepRight = async (
  cell: HTMLDivElement,
  n: number,
  w: number,
  h: number,
  grid: any[]
) => {
  return new Promise((resolve) => {
    let interval: any = null;
    let elId: any;
    let elData: any;

    // get the grid element
    elId = cell.getAttribute("id");
    elData = grid[elId];
    // if already bumped to edge then stop
    if (elData.rightEdge) {
      elData.isStop = true;
    }
    if (elData.records < 1) {
      elData.records = [
        ...elData.records,
        {
          matrixX: elData.matrixX,
          matrixY: elData.matrixY,
        },
      ];
    }
    // check when starting against the edge, if so, record and set  bumped(edge)
    const isFromEdge = ifEdge(elData.matrixX, elData.matrixY, n, "r");
    if (isFromEdge) {
      elData.rightEdge = true;
      // record first moove if its first step

      resolve("resolved");
    } else {
      // set start point
      let pos = elData.x;
      let startFrom = pos;

      clearInterval(interval);

      // set interval moovement sycle
      interval = setInterval(frame, 5);
      function frame() {
        let isArrived = pos >= startFrom + w / n;
        // if the element arrived or on edge
        if (isArrived) {
          cell.style.zIndex = "1";
          // set position in datagrid object
          elData.x = pos;

          // if already on edge
          elData.matrixX = elData.matrixX + 1;
          let newRecord = {
            matrixX: elData.matrixX,
            matrixY: elData.matrixY,
          };
          if (repeatChecker(newRecord, elData.records, elData)) {
            elData.isStop = true;
            resolve("stop");
          } else {
            elData.records = [...elData.records, newRecord];
            infectNext(
              elData.matrixX + n * elData.matrixY,
              moovementSequence,
              grid,
              elData.id
            );
          }

          clearInterval(interval);
          resolve("resolved");
        } else {
          pos++;
          if (cell) {
            cell.style.left = pos + "px";
          }
        }
      }
    }
  });
};

export const stepLeft = async (
  cell: HTMLDivElement,
  n: number,
  w: number,
  h: number,
  grid: any[]
) => {
  return new Promise((resolve) => {
    let interval: any = null;
    let elId: any;
    let elData: any;

    // get the grid element
    elId = cell.getAttribute("id");
    elData = grid[elId];
    // if already bumped to edge then stop
    if (elData.leftEdge) {
      elData.isStop = true;
    }
    if (elData.records < 1) {
      elData.records = [
        ...elData.records,
        {
          matrixX: elData.matrixX,
          matrixY: elData.matrixY,
        },
      ];
    }
    // check when starting against the edge, if so, record and set  bumped(edge)
    const isFromEdge = ifEdge(elData.matrixX, elData.matrixY, n, "l");
    if (isFromEdge) {
      elData.leftEdge = true;

      resolve("resolved");
    } else {
      // set start point
      let pos = elData.x;
      let startFrom = pos;

      // clear interval
      clearInterval(interval);

      // set interval moovement sycle
      interval = setInterval(frame, 5);
      function frame() {
        let isArrived = pos <= startFrom - w / n;
        // if the element arrived or on edge
        if (isArrived) {
          cell.style.zIndex = "1";
          // set position in datagrid object
          elData.x = pos;

          // if already on edge
          elData.matrixX = elData.matrixX - 1;
          let newRecord = {
            matrixX: elData.matrixX,
            matrixY: elData.matrixY,
          };
          if (repeatChecker(newRecord, elData.records, elData)) {
            elData.isStop = true;
            resolve("stop");
          } else {
            elData.records = [...elData.records, newRecord];
            infectNext(
              elData.matrixX + n * elData.matrixY,
              moovementSequence,
              grid,
              elData.id
            );
          }

          clearInterval(interval);
          resolve("resolved");
        } else {
          pos--;
          if (cell) {
            cell.style.left = pos + "px";
          }
        }
      }
    }
  });
};

export const stepDown = async (
  cell: HTMLDivElement,
  n: number,
  w: number,
  h: number,
  grid: any[]
) => {
  return new Promise((resolve) => {
    let interval: any = null;
    let elId: any;
    let elData: any;

    // get the grid element
    elId = cell.getAttribute("id");
    elData = grid[elId];
    // if already bumped to edge then stop
    if (elData.bottomEdge) {
      elData.isStop = true;
    }
    if (elData.records < 1) {
      elData.records = [
        ...elData.records,
        {
          matrixX: elData.matrixX,
          matrixY: elData.matrixY,
        },
      ];
    }
    // check when starting against the edge, if so, record and set  bumped(edge)
    const isFromEdge = ifEdge(elData.matrixX, elData.matrixY, n, "d");
    if (isFromEdge) {
      elData.bottomEdge = true;

      resolve("resolved");
    } else {
      // set start point
      let pos = elData.y;
      let startFrom = pos;

      // clear interval
      clearInterval(interval);
      // set interval moovement sycle
      interval = setInterval(frame, 5);
      function frame() {
        let isArrived = pos >= startFrom + h / n;
        // if the element arrived or on edge
        if (isArrived) {
          cell.style.zIndex = "1";
          // set position in datagrid object
          elData.y = pos;

          // if already on edge
          elData.matrixY = elData.matrixY + 1;
          let newRecord = {
            matrixX: elData.matrixX,
            matrixY: elData.matrixY,
          };
          if (repeatChecker(newRecord, elData.records, elData)) {
            elData.isStop = true;
            resolve("stop");
          } else {
            elData.records = [...elData.records, newRecord];
            infectNext(
              elData.matrixX + n * elData.matrixY,
              moovementSequence,
              grid,
              elData.id
            );
          }

          clearInterval(interval);
          resolve("resolved");
        } else {
          pos++;
          if (cell) {
            cell.style.top = pos + "px";
          }
        }
      }
    }
  });
};

export const stepUp = async (
  cell: HTMLDivElement,
  n: number,
  w: number,
  h: number,
  grid: any[]
) => {
  return new Promise((resolve) => {
    let interval: any = null;
    let elId: any;
    let elData: any;

    // get the grid element
    elId = cell.getAttribute("id");
    elData = grid[elId];
    // if already bumped to edge then stop
    if (elData.topEdge) {
      elData.isStop = true;
    }
    if (elData.records < 1) {
      elData.records = [
        ...elData.records,
        {
          matrixX: elData.matrixX,
          matrixY: elData.matrixY,
        },
      ];
    }
    // check when starting against the edge, if so, record and set  bumped(edge)
    const isFromEdge = ifEdge(elData.matrixX, elData.matrixY, n, "u");
    if (isFromEdge) {
      elData.topEdge = true;

      resolve("resolved");
    } else {
      // set start point
      let pos = elData.y;
      let startFrom = pos;

      // clear interval
      clearInterval(interval);
      // set interval moovement sycle
      interval = setInterval(frame, 5);
      function frame() {
        let isArrived = pos <= startFrom - h / n;
        // if the element arrived or on edge
        if (isArrived) {
          cell.style.zIndex = "1";
          // set position in datagrid object
          elData.y = pos;

          // if already on edge
          elData.matrixY = elData.matrixY - 1;
          let newRecord = {
            matrixX: elData.matrixX,
            matrixY: elData.matrixY,
          };
          if (repeatChecker(newRecord, elData.records, elData)) {
            elData.isStop = true;
            resolve("stop");
          } else {
            elData.records = [...elData.records, newRecord];
            infectNext(
              elData.matrixX + n * elData.matrixY,
              moovementSequence,
              grid,
              elData.id
            );
          }
          clearInterval(interval);
          resolve("resolved");
        } else {
          pos--;
          if (cell) {
            cell.style.top = pos + "px";
          }
        }
      }
    }
  });
};

export const moovePatern = async (patern: string, z: Element, grid: any[]) => {
  const w = worldWidth;
  const h = worldHeight;
  const n = gridNumber;
  counter++;
  const cell = z.parentElement as HTMLDivElement;
  const elId = cell.getAttribute("id");
  const elData = elId ? grid[+elId] : 0;
  const mooves = patern.split("");
  const findStep = async (i: string) => {
    if (cell) {
      return i === "r"
        ? await stepRight(cell, n, w, h, grid)
        : i === "l"
        ? await stepLeft(cell, n, w, h, grid)
        : i === "d"
        ? await stepDown(cell, n, w, h, grid)
        : await stepUp(cell, n, w, h, grid);
    }
  };

  const startup = () => {
    mooves.forEach((str) => {});
    //   const counter =
    mooves.length > 0 &&
      findStep(mooves[0]).then((res) => {
        elData.isStop && checkCounter(grid);
        if (!elData.isStop && mooves.length === 1) {
          startup();
        }
        !elData.isStop &&
          mooves.length > 1 &&
          findStep(mooves[1]).then((res2) => {
            //   res2 !== "stop" &&
            elData.isStop && checkCounter(grid);
            if (!elData.isStop && mooves.length === 2) {
              startup();
            }
            !elData.isStop &&
              mooves.length > 2 &&
              findStep(mooves[2]).then((res3) => {
                //   res3 !== "stop" &&
                elData.isStop && checkCounter(grid);
                if (!elData.isStop && mooves.length === 3) {
                  startup();
                }
                !elData.isStop &&
                  mooves.length > 3 &&
                  findStep(mooves[3]).then((res4) => {
                    elData.isStop && checkCounter(grid);
                    //   counter++;
                    if (!elData.isStop) {
                      startup();
                    }
                  });
              });
          });
      });
  };
  startup();
};

const repeatChecker = (obj: Record, list: Record[], elData: Grid) => {
  console.log(
    `zombie ${elData.id} moved to (${elData.matrixX},${elData.matrixY})`
  );
  let isExist = false;
  list.forEach((element) => {
    if (element.matrixX === obj.matrixX && element.matrixY === obj.matrixY) {
      isExist = true;
    }
  });
  return isExist;
};

export const infectNext = (
  nextId: number,
  moovements: string,
  grid: any[],
  elId: number
) => {
  if (!grid[nextId].isInfected) {
    const zombie = document.getElementById(`${nextId}`)?.children[0];
    if (zombie) {
      grid[nextId].isInfected = true;
      console.log(
        `zombie ${elId} infected creature at (${grid[elId].matrixX},${grid[elId].matrixY})`
      );
      zombie.className = "itemEntry zombie";
      moovePatern(moovements, zombie, grid);
    }
  }
};

const ifEdge = (
  x: number,
  y: number,
  n: number,
  type: "l" | "r" | "u" | "d"
) => {
  if (type === "l") {
    return x === 0;
  }
  if (type === "r") {
    return x + 1 === n;
  }
  if (type === "u") {
    return y === 0;
  }
  if (type === "d") {
    return y + 1 === n;
  }
};

const checkCounter = (grid: Grid[]) => {
  let zombies: string[] = [];
  let creatures: string[] = [];
  counter--;
  if (counter === 0) {
    grid.forEach((el) => {
      el.isInfected
        ? zombies.push(`(${el.matrixX},${el.matrixY})`)
        : creatures.push(`(${el.matrixX},${el.matrixY})`);
    });
    console.log(
      `zombies' positions: `,
      zombies,
      `creatures' positions: `,
      creatures
    );
  }
};

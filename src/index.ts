import { calculateGrid, moovePatern } from "./cell";
import "./main.scss";
import { Grid } from "./types";

export let moovementSequence = "rdld";
export let zeroAspect = 0;
export let gridNumber = 10;
export const worldWidth = window.innerWidth * 0.9;
export const worldHeight = window.innerHeight * 0.9;
const container = document.getElementById("container");

const dimention = document.getElementById("numberOne") as HTMLInputElement;
const zombieZ = document.getElementById("numberTwo") as HTMLInputElement;
const mooves = document.getElementById("numberThree") as HTMLInputElement;
const addValuesButton = document.getElementById("addValues");

if (addValuesButton) {
  addValuesButton.addEventListener("click", () => {
    const inputs = [dimention.value, zombieZ.value, mooves.value];
    const [N, zombie0, moves] = inputs;
    zeroAspect = zombie0 ? +zombie0 : zeroAspect;
    gridNumber = N ? +N : gridNumber;
    moovementSequence = moves ? moves : moovementSequence;

    if (container) {
      container.innerHTML = "";
    }

    zombieWorld();
  });
}

const zombieWorld = () => {
  if (container) {
    const grid: Grid[] = calculateGrid();
    grid.forEach((el, indx) => {
      const newEl = document.createElement("div");
      const childsnewEl = document.createElement("div");
      newEl.className = `item`;
      newEl.style.top = `${el.y}px`;
      newEl.style.left = `${el.x}px`;
      childsnewEl.className = `itemEntry`;
      newEl.id = `${el.id}`;
      newEl.appendChild(childsnewEl);
      container.appendChild(newEl);
    });
    const zombie = document.getElementById(`${zeroAspect}`)?.children[0];
    if (zombie) {
      grid[zeroAspect].isInfected = true;
      zombie.className = "itemEntry zombie";
      moovePatern(moovementSequence, zombie, grid);
    }
  }
};

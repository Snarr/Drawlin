import { Canvas, Group, Sprite, Input } from "https://cdn.jsdelivr.net/gh/Snarr/Engine/engine.js";

let colorPicker = document.getElementById('colorPicker')

let canvas = new Canvas(800, 800);

canvas.init = () => {
  canvas.drawSprite(new Sprite(0, 0, 800, 800, 'white'));
  setupControls();
}

function setupControls() {
  Input.init();
  // Input.onMouseEvent('mousemove', (event) => {
  //   canvas.drawSprite(new Sprite(event.clientX-50, event.clientY-50, 100, 100, 'red'));
  // })
}

let sizeX = 7;
let sizeY = 7;

let cellSize = canvas.width/sizeX;

let grid = new Group();

for (let row = 0; row < sizeY; row++) {
  let newRow = new Group();

  for (let col = 0; col < sizeX; col++) {
    newRow.push(new Sprite(col*cellSize, row*cellSize, cellSize, cellSize, 'rgba(0, 0, 0, 0)'));
  }

  grid.push(newRow);
}

let clicked = false;

document.addEventListener('mousedown', (event) => {
  clicked = true;
  drawPixel(event)
});

document.addEventListener('mouseup', (event) => { 
  clicked = false;
  console.log(grid);
})

document.addEventListener('mousemove', (event) => {
  if (clicked) {
    drawPixel(event)
  }

  // canvas.drawSprite(new Sprite(event.clientX-2, event.clientY-28, 5, 5, 'blue'));
})

function drawPixel(event) {
  let correctedX = event.clientX-2;
  let correctedY = event.clientY-28

  let x = (correctedX - (correctedX%cellSize));
  let y = (correctedY - (correctedY%cellSize));

  grid[y/cellSize][x/cellSize].color = 'red'
  canvas.drawSprite(grid[y/cellSize][x/cellSize]);
}

canvas.start();
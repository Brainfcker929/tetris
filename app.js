import { TETROMINOS } from "./tetrisShapes.js";
const canvasEl = document.getElementById("gameCanvas")
const canvasContext = canvasEl.getContext('2d');
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = Math.min(canvasEl.width / COLS, canvasEl.height / ROWS);

function getRandomTetromino() {
  const keys = Object.keys(TETROMINOS);
  const randomIndex = Math.floor(Math.random() * keys.length)
  return TETROMINOS[keys[randomIndex]];
}

function drawGrid() {
    canvasContext.strokeStyle = 'gray';
    for (let x = 0; x < COLS; x++) {
        for (let y = 0; y < ROWS; y++) {
            canvasContext.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        }
    }
}

function drawTetromino () {
  const currentTetromino = getRandomTetromino()
  canvasContext.fillStyle = currentTetromino.color;
  currentTetromino.form.forEach((row, rowIndex) => {
    row.forEach((col, collIndex) => {
      if(col){
        canvasContext.fillRect(collIndex * BLOCK_SIZE, rowIndex * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1)
      }
    })
  })
}

function draw(){
  drawGrid()
  drawTetromino()
}

draw()
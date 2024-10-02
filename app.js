import { TETROMINOS } from "./tetrisShapes.js";

const canvasEl = document.getElementById("gameCanvas")
const canvasContext = canvasEl.getContext('2d');

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = Math.min(canvasEl.width / COLS, canvasEl.height / ROWS);
const playField = Array.from({ length: ROWS}, () => Array(COLS).fill(0));

let currentTetromino = getRandomTetromino()
let tetrominoPosition = { x:3, y:0 }
/*
TODO:
score,
delete blocks,
block roation,
move blocks,
roation display,
fast drop,
shift blocks after scoring
*/
function getRandomTetromino() {
  const keys = Object.keys(TETROMINOS);
  const randomIndex = Math.floor(Math.random() * keys.length)
  return TETROMINOS[keys[randomIndex]];
}

function drawTetromino() {
  currentTetromino.form.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if(col){
        canvasContext.fillStyle = currentTetromino.color;
        canvasContext.fillRect(
          (tetrominoPosition.x + colIndex) * BLOCK_SIZE,
          (tetrominoPosition.y + rowIndex) * BLOCK_SIZE,
          BLOCK_SIZE - 1,
          BLOCK_SIZE - 1)
      }
    })
  })
}

function drawPlayField() {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (playField[row][col]) {
        canvasContext.fillStyle = 'gray';
        canvasContext.strokeRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        canvasContext.fillRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }
    }
  }
}

function isCollision() {
  for (let row = 0; row < currentTetromino.form.length; row++) {
    for (let col = 0; col < currentTetromino.form[row].length; col++) {
      if (currentTetromino.form[row][col]) {
        let newX = tetrominoPosition.x + col;
        let newY = tetrominoPosition.y + row;
        
        if (
          newX < 0 || newX >= COLS || newY >= ROWS ||
          (newY >= 0 && playField[newY][newX])
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

function resetTetromino() {
  currentTetromino = getRandomTetromino();
  tetrominoPosition = { x: 3, y: 0 };
}

function placeTetromino() {
  currentTetromino.form.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (col) {
        let playFieldX = tetrominoPosition.x + colIndex;
        let playFieldY = tetrominoPosition.y + rowIndex;
        playField[playFieldY][playFieldX] = col;
      }
    });
  });
}


function fallTetromino() {
  tetrominoPosition.y++;
  if (isCollision()) {
    tetrominoPosition.y--;
    placeTetromino();
    resetTetromino();
  }
}

function draw() {
  canvasContext.clearRect(0, 0, canvasEl.width, canvasEl.height);
  drawPlayField();
  drawTetromino();
}

function gameLoop() {
  fallTetromino();
  draw();
}

setInterval(gameLoop, 500)
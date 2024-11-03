import { TETROMINOS } from "./tetrisShapes.js";

const canvasEl = document.getElementById("gameCanvas");
const canvasContext = canvasEl.getContext("2d");

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = Math.min(canvasEl.width / COLS, canvasEl.height / ROWS);
const playField = resetPlayField();

let currentTetromino = getRandomTetromino();
let tetrominoPosition = { x: 3, y: 0 };
/*
TODO:
score,
delete blocks,
block roation,
move blocks,
roation display,
shift blocks after scoring
*/

function resetPlayField() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

function getRandomTetromino() {
  const keys = Object.keys(TETROMINOS);
  const randomIndex = Math.floor(Math.random() * keys.length);
  return TETROMINOS[keys[randomIndex]];
}

function drawTetromino() {
  currentTetromino.form.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (col) {
        canvasContext.fillStyle = currentTetromino.color;
        canvasContext.fillRect(
          (tetrominoPosition.x + colIndex) * BLOCK_SIZE,
          (tetrominoPosition.y + rowIndex) * BLOCK_SIZE,
          BLOCK_SIZE - 1,
          BLOCK_SIZE - 1
        );
      }
    });
  });
}

function drawPlayField() {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (playField[row][col]) {
        canvasContext.fillStyle = "gray";
        canvasContext.strokeRect(
          col * BLOCK_SIZE,
          row * BLOCK_SIZE,
          BLOCK_SIZE,
          BLOCK_SIZE
        );
        canvasContext.fillRect(
          col * BLOCK_SIZE,
          row * BLOCK_SIZE,
          BLOCK_SIZE,
          BLOCK_SIZE
        );
      }
    }
  }
}

function isCollision() {
  return currentTetromino.form.some((row, rowIndex) =>
    row.some((col, colIndex) => {
      if (col) {
        const newX = tetrominoPosition.x + colIndex;
        const newY = tetrominoPosition.y + rowIndex;
        return (
          newX < 0 ||
          newX >= COLS ||
          newY >= ROWS ||
          (newY >= 0 && playField[newY]?.[newX])
        );
      }
      return false;
    })
  );
}

function resetTetromino() {
  currentTetromino = getRandomTetromino();
  tetrominoPosition = { x: 3, y: 0 };
}

function placeTetromino() {
  currentTetromino.form.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (col) {
        const playFieldX = tetrominoPosition.x + colIndex;
        const playFieldY = tetrominoPosition.y + rowIndex;
        if (playField[playFieldY]?.[playFieldX] === undefined) {
          alert("Game Over");
          playField = resetPlayField();
        }
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

function hardDrop() {
  while (!isCollision()) {
    tetrominoPosition.y++;
  }
  tetrominoPosition.y--;
  placeTetromino();
  resetTetromino();
  draw();
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

function moveTetromino(direction) {
  tetrominoPosition.x += direction;

  if (isCollision()) {
    tetrominoPosition.x -= direction;
  }
  draw();
}

function moveTetrominoDown() {
  tetrominoPosition.y++;

  if (isCollision()) {
    tetrominoPosition.y--;
  }
  draw();
}

document.addEventListener("keydown", ({ code }) => {
  switch (code) {
    case "ArrowLeft":
      moveTetromino(-1);
      break;
    case "ArrowRight":
      moveTetromino(1);
      break;
    case "ArrowUp":
      rotateTetromino();
      break;
    case "ArrowDown":
      moveTetrominoDown();
      break;
    case "Space":
      hardDrop();
      break;
    default:
      break;
  }
});

setInterval(gameLoop, 500);

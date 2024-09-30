const canvasEl = document.getElementById("gameCanvas")
const canvasContext = canvasEl.getContext('2d');
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = Math.min(canvasEl.width / COLS, canvasEl.height / ROWS);

const TETROMINOS = {
  I: [[1, 1, 1, 1]],
  O: [[1, 1], [1, 1]],
  T: [[0, 1, 0], [1, 1, 1]],
  S: [[0, 1, 1], [1, 1, 0]],
  Z: [[1, 1, 0], [0, 1, 1]],
  J: [[1, 0, 0], [1, 1, 1]],
  L: [[0, 0, 1], [1, 1, 1]]
};


function drawGrid() {
    canvasContext.strokeStyle = 'gray';
    for (let x = 0; x < COLS; x++) {
        for (let y = 0; y < ROWS; y++) {
            canvasContext.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        }
    }
}

drawGrid();
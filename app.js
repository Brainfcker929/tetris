const canvasEl = document.getElementById("gameCanvas")
const canvasContext = canvasEl.getContext('2d');
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = Math.min(canvasEl.width / COLS, canvasEl.height / ROWS);

function drawGrid() {
    canvasContext.strokeStyle = 'gray';
    for (let x = 0; x < COLS; x++) {
        for (let y = 0; y < ROWS; y++) {
            canvasContext.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        }
    }
}

drawGrid();
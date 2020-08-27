const GAME_COLS = 20;
const GAME_ROWS = 20;
const CELL_SIZE = 40;
const DEFAULT_VALUE = -1;
const X_VALUE = 1;
const O_VALUE = 2;

let Cell = function (x, y) {
    this.x = x;
    this.y = y;
    this.value = DEFAULT_VALUE;
    this.getHTML = function () {
        let top = x * CELL_SIZE;
        let left = y * CELL_SIZE;
        return '<div id="cell-' + x + '-' + y + '" onclick="play(' + x + ',' + y + ')" class="cell" style="left:' +left + 'px; top:' +top + 'px; line-height: ' +CELL_SIZE + 'px;"></div>';
    }

    this.draw = function () {
        let cellDiv = document.getElementById("cell-" + x + "-" + y);
        switch (this.value) {
            case X_VALUE:
                cellDiv.innerHTML = "X";
                break;
            case O_VALUE:
                cellDiv.innerHTML = "O";
                break;
            default:
                cellDiv.innerHTML = "";
                break;
        }
    }
}

let Game = function (rows, cols, elementId) {
    this.rows = rows;
    this.cols = cols;
    this.cells = [];
    this.turn = O_VALUE;
    this.isOver = false;
    this.elementId = elementId;

    this.drawBoard = function () {
        let gameBoard = document.getElementById(this.elementId);
        gameBoard.innerHTML = "";
        for (let i = 0; i < this.rows; i++) {
            let row = [];
            this.cells.push(row);
            for (let j = 0; j < this.cols; j++) {
                let cell = new Cell(i, j);
                row.push(cell);
                gameBoard.innerHTML += cell.getHTML();
            }
        }
    }

    this.play = function (x, y) {
        if (this.isOver)
            return 0;
        let cell = this.cells[x][y];
        if (cell.value === DEFAULT_VALUE) {
            cell.value = this.turn;
            cell.draw();
            this.check(x, y);
            if (this.turn === X_VALUE) {
                this.turn = O_VALUE;
            } else {
                this.turn = X_VALUE;
            }
        } else {
            alert("Error");
        }

    }

    this.check = function (x, y) {
        let cell = this.cells[x][y];
        let count = 1;
        let i = 1;
        while ((y + i < this.cols) && (this.cells[x][y + i].value === cell.value)) {
            count++;
            i++;
        }
        i = 1;
        while ((y - i >= 0) && this.cells[x][y - i].value === cell.value) {
            count++;
            i++;
        }
        this.endGame(count);

        count = 1;
        i = 1;
        while ((x + i < this.rows) && this.cells[x + i][y].value === cell.value) {
            count++;
            i++;
        }
        i = 1;
        while ((x - i >= 0) && this.cells[x - i][y].value === cell.value) {
            count++;
            i++;
        }
        this.endGame(count);

        count = 1;
        i = 1;
        let j = 1;
        while ((y + i < this.cols) && (x + i < this.rows) && this.cells[x + i][y + j].value === cell.value) {
            count++;
            i++;
            j++;
        }
        i = 1;
        j = 1;
        while ((x - i >= 0) && (y - j >= 0) && this.cells[x - i][y - j].value === cell.value) {
            count++;
            i++;
            j++;
        }
        this.endGame(count);

        count = 1;
        i = 1;
        j = 1;
        while ((y + j < this.cols) && (x - i >= 0) && this.cells[x - i][y + j].value === cell.value) {
            count++;
            i++;
            j++;
        }
        i = 1;
        j = 1;
        while ((y - j >= 0) && (x + i < this.rows) && this.cells[x + i][y - j].value === cell.value) {
            count++;
            i++;
            j++;
        }
        this.endGame(count);
    }
    this.endGame = function (count) {
        if (count >= 5) {
            this.isOver = true;
            alert("Game Over!!!");
        }
    }
}

function play(x, y) {
    game.play(x, y);
}

function start() {
    game = new Game(GAME_ROWS, GAME_COLS, "gameBoard");
    game.drawBoard();
}

let game;
start();
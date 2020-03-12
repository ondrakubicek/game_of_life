class Game {

    constructor(size) {
        this.size = size;
        this.grid = [...Array(size)].map(item => Array(size).fill(0));
        this.newBorn = 0;
        this.died = 0;
        this.survived = 0;
    }

    output() {
        sleep(100);
        console.clear();
        this.grid.map((row, x) => {
            let output = '';
            row.map((item, y) => {
                output += (this.grid[x][y] > 0) ? "0" : " ";
            });
            console.log(output);
        });
        console.log("newborn:" + game.newBorn);
        console.log("died:" + game.died);
    }

    getAliveNeighborCount(x, y) {
        var alive_count = 0;
        for (let y2 = y - 1; y2 <= y + 1; y2++) {
            if (y2 < 0 || y2 >= this.size) {
                continue;
            }
            for (let x2 = x - 1; x2 <= x + 1; x2++) {
                if (x2 == x && y2 == y) {
                    continue;
                }
                if (x2 < 0 || x2 >= this.size) {
                    continue;
                }
                if (this.grid[y2][x2]) {
                    alive_count += 1;
                }
            }
        }

        return alive_count;
    }

    newGeneration() {
        let killQueue = [];
        let bornQueue = [];

        this.grid.map((row, x) => {
            row.map((item, y) => {
                let neighbor_count = this.getAliveNeighborCount(x, y);
                if (this.grid[y][x] && (neighbor_count < 2 || neighbor_count > 3)) {
                    killQueue.push([y, x]);
                }
                if (!this.grid[y][x] && neighbor_count === 3) {
                    bornQueue.push([y, x]);
                }
            });
        });

        this.died = killQueue.length;
        this.newBorn = bornQueue.length;

        killQueue.map((killItem) => {
            this.grid[killItem[0]][killItem[1]] = 0;
        });

        bornQueue.map((bornItem) => {
            this.grid[bornItem[0]][bornItem[1]] = 1;
        });
    }

    randomFill() {
        this.grid.map((row, x) => {
            row.map((cell, y) => {
                this.grid[x][y] = Math.floor(Math.random() * (2 - 0)) + 0;
            });
        });
    }
}


function sleep(milliseconds) {
    let timeStart = new Date().getTime();
    while (true) {
        let elapsedTime = new Date().getTime() - timeStart;
        if (elapsedTime > milliseconds) {
            break;
        }
    }
}

const game = new Game(20);

game.randomFill();
game.newGeneration();
game.output();
let i = 0;
while (game.newBorn > 0) {
    game.newGeneration();
    game.output();
    console.log("iterations:" + i++);
}

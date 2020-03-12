class Game {
    constructor(size) {
        this.size = size;
        this.grid = [...Array(size)].map(item => Array(size).fill(0));
        this.newBorn = 0;
        this.died = 0;
        this.survived = 0;
    }

    output() {
        sleep(10);
        console.clear();
        this.grid.map((row, x) => {
            let output = '';
            row.map((item, y) => {
                output += (this.grid[x][y] > 0) ? "•" : "  ";
            });
            console.log(output);
        });
        console.log("newborn:" + game.newBorn);
        console.log(game.died);
        console.log(game.survived);
    }

    checkPosition(x, y) {
        if (x < 0 || y < 0 || x > this.size - 1 || y > this.size - 1) {
            return false;
        }
        return this.grid[x][y] !== undefined && this.grid[x][y] === 1;
    }

    doNewBorn(count) {
        for (let i = 0; i < count; i++) {
            let x = Math.floor(Math.random() * Math.floor(this.size));
            let y = Math.floor(Math.random() * Math.floor(this.size));
            this.grid[x][y] = 1;
        }
    }

    setGrid(x, y, value, grid) {
        if (x < 0 || y < 0 || x > this.size - 1 || y > this.size - 1) {
            return false;
        }
        grid[x][y] = value;
        return grid;
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


function isAlive(x, y, game) {
    let othersAlive = 0

    if (game.checkPosition(x, y + 1)) {
        othersAlive++;
    }
    if (game.checkPosition(x, y - 1)) {
        othersAlive++;
    }
    if (game.checkPosition(x - 1, y)) {
        othersAlive++;
    }

    if (game.checkPosition(x + 1, y)) {
        othersAlive++;
    }
    if (game.checkPosition(x - 1, y - 1)) {
        othersAlive++;
    }
    if (game.checkPosition(x - 1, y + 1)) {
        othersAlive++;
    }
    if (game.checkPosition(x + 1, y - 1)) {
        othersAlive++;
    }
    if (game.checkPosition(x + 1, y + 1)) {
        othersAlive++;
    }
    if (othersAlive < 2) {
        return 0;
        // return game.setGrid(x, y, 0, grid);
    }
    if (othersAlive === 2 || othersAlive === 3) {
        if (othersAlive === 3) {
            return 2;
            // return game.setGrid(x, y, 1, grid);
        }
        return 1;
        // return grid;
    }

    if (othersAlive > 3) {
        return 0;
        // return game.setGrid(x, y, 0, grid);
    }


}


function test(game) {
    let newGrid = [...game.grid];
    let newBorn = 0;
    let died = 0;
    let survived = 0;
    game.grid.map((row, x) => {
        row.map((item, y) => {
            let alive = isAlive(x, y, game);
            switch (alive) {
                case 0:
                    if(game.checkPosition(x,y)){
                        died++;
                    }
                    game.setGrid(x, y, 0, newGrid);
                    break;
                case 1:
                    game.setGrid(x, y, 1, newGrid);
                    if(game.checkPosition(x,y)){
                        survived++;
                    }
                    break;
                case 2:
                    if(!game.checkPosition(x,y)){
                        newBorn++;
                    }
                    game.setGrid(x, y, 1, newGrid);
                    break;
            }
        })
    });
    game.grid = newGrid;
    game.newBorn = newBorn;
    game.died = died;
    game.survived = survived;
}



const game = new Game(12);

function go() {
    test(game);
    game.output();
}

game.doNewBorn(4);
game.newBorn = 1;
let i = 0;
while (game.newBorn > 0) {
    go(game);
    console.log("iterations:"+ i++);
}

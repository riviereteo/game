let thegrid;

window.onload = () => {
    thegrid = new Grid();
    document.addEventListener("keydown", handleKeyDown);
}

function handleKeyDown(event) {
    thegrid.input(event.keyCode);
}

class Grid {
    constructor() {
        this.grid = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        this.spawnCase();
        this.spawnCase();
    }

    spawnCase() {
        if (this.grid.some(row => row.includes(0))) {
            let row, col;
            do {
                row = Math.floor(Math.random() * 4);
                col = Math.floor(Math.random() * 4);
            } while (this.grid[row][col] !== 0);
            new Case(row, col, Math.random() < 0.9 ? 2 : 4, this.grid);
            const parentImg = document.getElementById(`case-${row}-${col}`);
            parentImg.querySelector('img').classList += "spawn";
        }
    }

    input(keyCode) {
        switch (keyCode) {
            case 37:
                let moveormerge1 = false;
                for (let y = 0; y < 4; y++) {
                    let maxX = -1;
                    for (let x = 1; x < 4; x++) {
                        if (this.grid[y][x] != 0) {
                            let newx = x;
                            while ((newx - 1) > maxX) {
                                if (this.grid[y][newx - 1] === 0) {
                                    newx--;
                                } else if (this.grid[y][newx - 1] === this.grid[y][x]) {
                                    this.grid[y][newx - 1] *= 2;
                                    this.grid[y][x] = 0;
                                    this.remove(y, newx - 1);
                                    this.remove(y, x);
                                    new Case(y, newx - 1, this.grid[y][newx - 1], this.grid);
                                    maxX = newx - 1;
                                    newx = x;
                                    moveormerge1 = true;
                                    break;
                                } else {
                                    break;
                                }
                            }
                            if (newx != x) {
                                this.grid[y][newx] = this.grid[y][x];
                                this.grid[y][x] = 0;
                                this.remove(y, x);
                                new Case(y, newx, this.grid[y][newx], this.grid);
                                moveormerge1 = true;
                            }
                        }
                    }
                }
                if (moveormerge1) this.spawnCase();
                break;
            case 38:
                let moveormerge3 = false;
                for (let x = 0; x < 4; x++) {
                    let maxY = -1;
                    for (let y = 1; y < 4; y++) {
                        if (this.grid[y][x] != 0) {
                            let newy = y;
                            while ((newy - 1) > maxY) {
                                if (this.grid[newy - 1][x] === 0) {
                                    newy--;
                                } else if (this.grid[newy - 1][x] === this.grid[y][x]) {
                                    this.grid[newy - 1][x] *= 2;
                                    this.grid[y][x] = 0;
                                    this.remove(newy - 1, x);
                                    this.remove(y, x);
                                    new Case(newy - 1, x, this.grid[newy - 1][x], this.grid);
                                    maxY = newy - 1;
                                    newy = y;
                                    moveormerge3 = true;
                                    break;
                                } else {
                                    break;
                                }
                            }
                            if (newy != y) {
                                this.grid[newy][x] = this.grid[y][x];
                                this.grid[y][x] = 0;
                                this.remove(y, x);
                                new Case(newy, x, this.grid[newy][x], this.grid);
                                moveormerge3 = true;
                            }
                        }
                    }
                }
                if (moveormerge3) this.spawnCase();
                break;
            case 39:
                let moveormerge2 = false;
                for (let y = 0; y < 4; y++) {
                    let maxX = 4;
                    for (let x = 3; x >= 0; x--) {
                        if (this.grid[y][x] != 0) {
                            let newx = x;
                            while ((newx + 1) < maxX) {
                                if (this.grid[y][newx + 1] === 0) {
                                    newx++;
                                } else if (this.grid[y][newx + 1] === this.grid[y][x]) {
                                    this.grid[y][newx + 1] *= 2;
                                    this.grid[y][x] = 0;
                                    this.remove(y, newx + 1);
                                    this.remove(y, x);
                                    new Case(y, newx + 1, this.grid[y][newx + 1], this.grid);
                                    maxX = newx + 1;
                                    newx = x;
                                    moveormerge2 = true;
                                    break;
                                } else {
                                    break;
                                }
                            }
                            if (newx != x) {
                                this.grid[y][newx] = this.grid[y][x];
                                this.grid[y][x] = 0;
                                this.remove(y, x);
                                new Case(y, newx, this.grid[y][newx], this.grid);
                                moveormerge2 = true;
                            }
                        }
                    }
                }
                if (moveormerge2) this.spawnCase();
                break;
            case 40:
                let moveormerge4 = false;
                for (let x = 0; x < 4; x++) {
                    let maxY = 4;
                    for (let y = 3; y >= 0; y--) {
                        if (this.grid[y][x] != 0) {
                            let newy = y;
                            while ((newy + 1) < maxY) {
                                if (this.grid[newy + 1][x] === 0) {
                                    newy++;
                                } else if (this.grid[newy + 1][x] === this.grid[y][x]) {
                                    this.grid[newy + 1][x] *= 2;
                                    this.grid[y][x] = 0;
                                    this.remove(newy + 1, x);
                                    this.remove(y, x);
                                    new Case(newy + 1, x, this.grid[newy + 1][x], this.grid);
                                    maxY = newy + 1;
                                    newy = y;
                                    moveormerge4 = true;
                                    break;
                                } else {
                                    break;
                                }
                            }
                            if (newy !== y) {
                                this.grid[newy][x] = this.grid[y][x];
                                this.grid[y][x] = 0;
                                this.remove(y, x);
                                new Case(newy, x, this.grid[newy][x], this.grid);
                                moveormerge4 = true;
                            }
                        }
                    }
                }
                if (moveormerge4) this.spawnCase();
                break;
        }
    }

    remove(x, y) {
        const parentImg = document.getElementById(`case-${x}-${y}`);
        parentImg.innerHTML = '';
    }
}

class Case {
    constructor(x, y, value, grid) {
        this.case = document.createElement('img');
        this.case.src = 'cases/' + value + '.png';
        const parentImg = document.getElementById(`case-${x}-${y}`);
        parentImg.appendChild(this.case);
        grid[x][y] = value;
    }
}

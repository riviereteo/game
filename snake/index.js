/*
0 : empty
1 : snake
2 : apple
3 : head
*/
//faire avancé en déplacent le dernier élément du snake vers le premier

const oldOnload = window.onload;
let nbOfApple = 0;
let grid;
let theTour = -1;
let canvas;
let size = 21;
let world = new Array(size);
for (let i = 0; i < size; i++) {
    world[i] = new Array(size);
    for (let j = 0; j < size; j++) {
        world[i][j] = 0;
    }
}
let apple = [Math.floor(size / 2), Math.floor((size / 3) * 2)];
let snake = [[Math.floor(size / 2), 2, 'right'], [Math.floor(size / 2), 3, 'right'], [Math.floor(size / 2), 4, 'right']];
let direction = 'right';
let speed = 100;
let start = true;
let nbTour = 0;
let toursuivant = null;

window.onload = setup();

function setup() {
    if (oldOnload) {
        oldOnload();
    }

    makeGrid();
    makeCase();
    makeWorld();
    document.addEventListener('keydown', event => {
        if (event.code == 'Space' && start) {
            start = false;
            document.addEventListener('keydown', event => {
                directionSuivante(event);
            });
            setInterval(function () {
                raffraichir();
            }, speed);
        }
    });
}

function directionSuivante(event) {
    if (nbTour != theTour) {
        theTour = nbTour;
        toursuivant = null;
        if (event.code == 'ArrowUp' && direction != 'down') direction = 'up';
        else if (event.code == 'ArrowDown' && direction != 'up') direction = 'down';
        else if (event.code == 'ArrowLeft' && direction != 'right') direction = 'left';
        else if (event.code == 'ArrowRight' && direction != 'left') direction = 'right';
    } else {
        toursuivant = event;
    }
}

function makeGrid() {
    grid = document.createElement('div');
    grid.id = 'grid';
    document.body.appendChild(grid);
}

function makeCase() {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let c = document.createElement('div');
            c.className = 'case';
            c.id = i + '-' + j;
            if ((i + j) % 2 == 0) c.style.backgroundColor = 'rgb(241 250 255)';
            else c.style.backgroundColor = 'rgb(211 240 255)';
            grid.appendChild(c);
        }
    }
}

function makeWorld() {
    for (let i = 0; i < size; i++) {
        world[i] = [];
        for (let j = 0; j < size; j++) {
            world[i][j] = 0;
        }
    }
    let tmp = false;
    for (let i = 0; i < snake.length; i++) {
        if (snake[i][0] < 0 || snake[i][0] >= size || snake[i][1] < 0 || snake[i][1] >= size) {
            document.location.reload();
        }
        let bug = true;
        if (world[snake[i][0]][snake[i][1]] == 1) {
            if (snake[i - 1][0] == snake[i][0] && snake[i - 1][1] == snake[i][1]) {
                bug = false;
            } else {
                document.location.reload();
            }
        }
        if (snake[i][0] == apple[0] && snake[i][1] == apple[1]) {
            tmp = true;
            nbOfApple++;
            if (nbOfApple % 3 == 1) {
                speed--;
            }
        }
        if (bug) world[snake[i][0]][snake[i][1]] = 1;
    }
    if (tmp) {
        switch (snake[0][2]) {
            case 'right':
                snake.unshift([snake[0][0], snake[0][1] - 1, 'right']);
                break;
            case 'left':
                snake.unshift([snake[0][0], snake[0][1] + 1, 'left']);
                break;
            case 'up':
                snake.unshift([snake[0][0] + 1, snake[0][1], 'up']);
                break;
            case 'down':
                snake.unshift([snake[0][0] - 1, snake[0][1], 'down']);
                break;
        }
        makeApple();
        makeWorld();
    }
    world[apple[0]][apple[1]] = 2;
}

function makeApple() {
    let x = Math.floor(Math.random() * size);
    let y = Math.floor(Math.random() * size);
    if (world[x][y] == 0) {
        world[x][y] = 2;
        world[apple[0]][apple[1]] = 0;
        apple = [x, y];
    }
    else makeApple();
}

function raffraichir() {
    if (toursuivant) {
        directionSuivante(toursuivant);
    }
    mettreAJourSnake();
    makeWorld();
    afficherWorld();
    nbTour++;
    if (nbTour == 4) {
        nbTour = 0;
    }
}

function mettreAJourSnake() {
    for (let i = 0; i < snake.length; i++) {
        if (i == snake.length - 1) {
            if (direction == 'right') {
                snake[i][1]++;
                snake[i][2] = 'right';
            } else if (direction == 'left') {
                snake[i][1]--;
                snake[i][2] = 'left';
            } else if (direction == 'up') {
                snake[i][0]--;
                snake[i][2] = 'up';
            } else if (direction == 'down') {
                snake[i][0]++;
                snake[i][2] = 'down';
            }
        } else {
            snake[i][0] = snake[i + 1][0];
            snake[i][1] = snake[i + 1][1];
            snake[i][2] = snake[i + 1][2];
        }
    }
}


function afficherWorld() {
    for (let i = 0; i < world.length; i++) {
        for (let j = 0; j < world[i].length; j++) {
            let c = document.getElementById(i + '-' + j);
            if (world[i][j] == 0 && (i + j) % 2 == 0) c.style.backgroundColor = 'rgb(241 250 255)';
            else if (world[i][j] == 0 && (i + j) % 2 == 1) c.style.backgroundColor = 'rgb(211 240 255)';
            else if (world[i][j] == 1) c.style.backgroundColor = 'rgb(0 0 0)';
            else if (world[i][j] == 2) c.style.backgroundColor = 'rgb(255 0 0)';
        }
    }
    switch (snake[snake.length - 1][2]) {
        case 'right':
            document.getElementById(snake[snake.length - 1][0] + '-' + snake[snake.length - 1][1]).style.borderRadius = '0 50% 50% 0';
            document.getElementById(snake[snake.length - 1][0] + '-' + (snake[snake.length - 1][1] - 1)).style.borderRadius = '0';
            break;
        case 'left':
            document.getElementById(snake[snake.length - 1][0] + '-' + snake[snake.length - 1][1]).style.borderRadius = '50% 0 0 50%';
            document.getElementById(snake[snake.length - 1][0] + '-' + (snake[snake.length - 1][1] + 1)).style.borderRadius = '0';
            break;
        case 'up':
            document.getElementById(snake[snake.length - 1][0] + '-' + snake[snake.length - 1][1]).style.borderRadius = '50% 50% 0 0';
            document.getElementById((snake[snake.length - 1][0] + 1) + '-' + snake[snake.length - 1][1]).style.borderRadius = '0';
            break;
        case 'down':
            document.getElementById(snake[snake.length - 1][0] + '-' + snake[snake.length - 1][1]).style.borderRadius = '0 0 50% 50%';
            document.getElementById((snake[snake.length - 1][0] - 1) + '-' + snake[snake.length - 1][1]).style.borderRadius = '0';
            break;
    }
}
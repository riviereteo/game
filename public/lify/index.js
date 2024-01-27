/************/
/*   VARS   */
/************/

let games = [
    [startMake, 'test', 1],
    [startThermalGradient, 'thermique fase colors', 1],
    [startSmooth, 'smooth color reduce', 0],
    [startBlob, 'game of blob', 0],
    [startLife, 'game of life', 1],
    [startSquare, 'squaaaaaaaaare', 1],
    [startCerebralActivity, 'cerebral activity', 1],
    [startGlitchTV, 'glitch tv', 1],
    [startBounceEcho, 'bounce echo', 1],
    [startPurpleWater, 'purple water', 1],
    [startMegaBounceFisureUnivers, 'mega bounce qui fissure l\'univers', 1]
];
let theGame = [games[0][0], games[0][2]];
let body = document.body;
let grid = createElement('div', null, null, body, null, 'grid');
const cellSize = 10;
let cells = makeCells();
let interval = 20;
const cellCountWidth = (grid.offsetWidth - 2) / cellSize;
const cellCountHeight = (grid.offsetHeight - 2) / cellSize;
let paused = true;
makeBanner();
start();

/*************/
/* FUNCTIONS */
/*************/

function createElement(tag, className, text, parent, style, id, src, before, after) {
    let element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.innerHTML = text;
    if (parent) {
        if (before) parent.insertBefore(element, before);
        else if (after) parent.insertAfter(element, after);
        else parent.appendChild(element);
    }
    if (style) element.style = style;
    if (id) element.id = id;
    if (src) element.src = src;
    return element;
}

function makeCells() {
    let cells = [];
    let cellCountWidth = 0;
    let cellCountHeight = 0;
    while (((cellCountWidth + 1) * cellSize) + 10 < window.innerWidth) cellCountWidth++;
    while (((cellCountHeight + 1) * cellSize) + 10 < window.innerHeight) cellCountHeight++;
    const cellCount = cellCountWidth * cellCountHeight;
    for (let i = 0; i < cellCount; i++) {
        let cell = createElement('div', 'cell', null, grid, `width: ${cellSize}px; height: ${cellSize}px; background-color: #000;`);
        cell.value = 0.000001;
        cell.addEventListener('mouseover', () => {
            if (event.buttons == 1) {
                cell.value = 1;
                setColor(cell);
            }
        });
        cell.addEventListener('click', () => {
            cell.value = 1.00000;
            setColor(cell);
        });
        cells.push(cell);
    }
    grid.style.width = `${cellCountWidth * (cellSize)}px`;
    grid.style.height = `${cellCountHeight * (cellSize)}px`;
    return cells;
}

function start() {
    setInterval(() => {
        if (paused) return;
        switch (theGame[1]) {
            case 0:
                cells.forEach(cell => {
                    theGame[0](cell);
                });
                break;
            case 1:
                let values = [];
                cells.forEach(cell => {
                    values.push(theGame[0](cell));
                });
                cells.forEach((cell, index) => {
                    cell.value = values[index];
                    setColor(cell);
                });
                break;
        }
    }, interval);
}

function setColor(cell) {
    const index = Math.floor(cell.value * (colors.length - 1));
    cell.style.backgroundColor = colors[index];
}

function makeBanner() {
    let banner = createElement('div', 'banner', null, body);
    let opencloseButton = createElement('div', 'button', '<span class="material-symbols-outlined">chevron_right</span>', banner);
    let playButton = createElement('div', 'button', '<span class="material-symbols-outlined">play_arrow</span>', banner);
    let pauseButton = createElement('div', 'button', '<span class="material-symbols-outlined">pause</span>', banner, 'color: royalBlue;');
    let resetButton = createElement('div', 'button', '<span class="material-symbols-outlined">stop</span>', banner);
    let params = createElement('div', 'button', '<span class="material-symbols-outlined">settings</span>', banner);
    let open = true;
    opencloseButton.addEventListener('click', () => {
        open = !open;
        if (open) {
            banner.appendChild(playButton);
            banner.appendChild(pauseButton);
            banner.appendChild(resetButton);
            banner.appendChild(params);
        } else {
            banner.removeChild(playButton);
            banner.removeChild(pauseButton);
            banner.removeChild(resetButton);
            banner.removeChild(params);
        }
        opencloseButton.style.transform = `rotate(${open ? 0 : 180}deg) translateY(${open ? 0 : 4}px)`;
    });
    playButton.addEventListener('click', () => {
        paused = false;
        playButton.style.color = 'royalBlue';
        pauseButton.style.color = 'white';
    });
    pauseButton.addEventListener('click', () => {
        paused = true;
        playButton.style.color = 'white';
        pauseButton.style.color = 'royalBlue';
    });
    resetButton.addEventListener('click', () => {
        cells.forEach(cell => {
            cell.value = 0.000001;
            setColor(cell);
        });
        resetButton.style.color = 'red';
        setTimeout(() => {
            resetButton.style.color = 'white';
        }, 200);
    });
    params.addEventListener('click', () => {
        let paramsDiv = createElement('div', 'params', null, body);
        for (let i = 0; i < games.length; i++) {
            let game = games[i];
            let gameButton = createElement('div', 'gameButton', game[1], paramsDiv);
            gameButton.addEventListener('click', () => {
                theGame[0] = games[i][0];
                theGame[1] = games[i][2];
                resetButton.click();
                body.removeChild(paramsDiv);
            });
        }
        createElement('div', 'close', '<span class="material-symbols-outlined">close</span>', paramsDiv).addEventListener('click', () => {
            body.removeChild(paramsDiv);
        });
        createElement('div', 'random', 'rand <span class="material-symbols-outlined">shuffle</span>', paramsDiv).addEventListener('click', () => {
            cells.forEach(cell => {
                cell.value = Math.random(0.000000, 1.000000);
                setColor(cell);
            });
        });
    });
}
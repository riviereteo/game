let play = false;
let Theboard;
document.getElementById('difficulty').addEventListener('change', function () {
    if (document.getElementById('difficulty').value == 'custom') {
        if (!document.getElementById('width')) {
            const widthLabel = document.createElement('label');
            widthLabel.setAttribute('for', 'width');
            widthLabel.innerHTML = 'Largeur';
            const widthInput = document.createElement('input');
            widthInput.setAttribute('type', 'number');
            widthInput.setAttribute('id', 'width');
            widthInput.setAttribute('name', 'width');
            widthInput.setAttribute('min', '4');
            widthInput.setAttribute('max', '60');
            widthInput.setAttribute('value', '18');
            widthInput.setAttribute('onchange', 'document.getElementById("mines").setAttribute("max", (document.getElementById("width").value * document.getElementById("height").value) - 9)');
            const heightLabel = document.createElement('label');
            heightLabel.setAttribute('for', 'height');
            heightLabel.innerHTML = 'Hauteur';
            const heightInput = document.createElement('input');
            heightInput.setAttribute('type', 'number');
            heightInput.setAttribute('id', 'height');
            heightInput.setAttribute('name', 'height');
            heightInput.setAttribute('min', '4');
            heightInput.setAttribute('max', '60');
            heightInput.setAttribute('value', '14');
            heightInput.setAttribute('onchange', 'document.getElementById("mines").setAttribute("max", (document.getElementById("width").value * document.getElementById("height").value) - 9)');
            const minesLabel = document.createElement('label');
            minesLabel.setAttribute('for', 'mines');
            minesLabel.innerHTML = 'Mines';
            const minesInput = document.createElement('input');
            minesInput.setAttribute('type', 'number');
            minesInput.setAttribute('id', 'mines');
            minesInput.setAttribute('name', 'mines');
            minesInput.setAttribute('min', '1');
            minesInput.setAttribute('max', '240');
            minesInput.setAttribute('value', '40');
            document.getElementById('form').insertBefore(widthLabel, document.querySelector('#form > button'));
            document.getElementById('form').insertBefore(widthInput, document.querySelector('#form > button'));
            document.getElementById('form').insertBefore(heightLabel, document.querySelector('#form > button'));
            document.getElementById('form').insertBefore(heightInput, document.querySelector('#form > button'));
            document.getElementById('form').insertBefore(minesLabel, document.querySelector('#form > button'));
            document.getElementById('form').insertBefore(minesInput, document.querySelector('#form > button'));
        }
    }
    else {
        if (document.getElementById('width')) {
            document.getElementById('width').remove();
            document.getElementById('height').remove();
            document.getElementById('mines').remove();
            document.getElementById('form').querySelectorAll('label').forEach(label => label.remove());
        }
    }
});
function startGame() {
    if (document.getElementById('difficulty').value == 'custom') {
        if ((document.getElementById('width').value * document.getElementById('height').value) < (document.getElementById('mines').value - 9) || document.getElementById('width').value < 4 || document.getElementById('width').value > 60 || document.getElementById('height').value < 4 || document.getElementById('height').value > 60 || document.getElementById('mines').value < 1) {
            return;
        }
    }
    var game = new Game();
    game.start();
}

function reveal(y, x) {
    if (document.getElementById('cell' + y + '-' + x).classList.contains('revealed')) {
        return;
    }
    var cell = document.getElementById('cell' + y + '-' + x);
    if (cell.classList.contains('mine')) {
        play = false;
        const colors = [
            ['#48e6f1', '#2f969d'],
            ['#f1860e', '#9f5608'],
            ['#008744', '#00582c'],
            ['#db3236', '#8e2123'],
            ['#f4c20d', '#9f7e08'],
            ['#ed44b5', '#9a2c76'],
            ['#4885ed', '#2f569a'],
            ['#b648f2', '#762f9d']
        ];
        const nbAleatoire = Math.floor(Math.random() * colors.length);
        cell.style.backgroundColor = colors[nbAleatoire][0];
        const center = document.createElement('div');
        center.setAttribute('class', 'center');
        center.style.backgroundColor = colors[nbAleatoire][1];
        cell.appendChild(center);
        cell.classList.add('revealed');

        let mineCells = document.querySelectorAll('.mine:not(.revealed)');
        mineCells = Array.from(mineCells).filter(mineCell => !mineCell.classList.contains('flagCell'));
        mineCells = shuffleArray(mineCells);

        mineCells.forEach((mineCell, index) => {
            setTimeout(() => {
                const scdnbAleatoire = Math.floor(Math.random() * colors.length);
                mineCell.style.backgroundColor = colors[scdnbAleatoire][0];
                const scdcenter = document.createElement('div');
                scdcenter.setAttribute('class', 'center');
                scdcenter.style.backgroundColor = colors[scdnbAleatoire][1];
                mineCell.appendChild(scdcenter);
                const overlay = document.createElement('div');
                overlay.setAttribute('class', 'overlay');
                mineCell.appendChild(overlay);
                mineCell.classList.add('revealed');
            }, (index + 1) * 300);
        });

        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.style.pointerEvents = 'none';
        });
    } else {
        var mines = 0;
        for (let i = y - 1; i <= y + 1; i++) {
            for (let j = x - 1; j <= x + 1; j++) {
                if (i >= 0 && i < Theboard.height && j >= 0 && j < Theboard.width) {
                    if (document.getElementById('cell' + i + '-' + j).classList.contains('mine')) {
                        mines++;
                    }
                }
            }
        }
        const i = cell.id.split('cell')[1].split('-')[0];
        const j = cell.id.split('cell')[1].split('-')[1];
        cell.classList.add('revealed');
        if (mines == 0) {
            cell.style.backgroundColor = j % 2 == 0 ? i % 2 == 0 ? '#e5c29f' : '#d7b899' : i % 2 == 0 ? '#d7b899' : '#e5c29f';
            for (let i = y - 1; i <= y + 1; i++) {
                for (let j = x - 1; j <= x + 1; j++) {
                    if (i >= 0 && i < Theboard.height && j >= 0 && j < Theboard.width) {
                        reveal(i, j);
                    }
                }
            }
        } else {
            cell.innerHTML = mines;
            cell.style.backgroundColor = j % 2 == 0 ? i % 2 == 0 ? '#e5c29f' : '#d7b899' : i % 2 == 0 ? '#d7b899' : '#e5c29f';
            cell.style.color = mines == 1 ? 'rgba(0, 0, 255, 0.7)' : mines == 2 ? 'rgba(0, 128, 0, 0.7)' : mines == 3 ? 'rgba(255, 0, 0, 0.7)' : mines == 4 ? 'rgba(128, 0, 128, 0.7)' : mines == 5 ? 'rgba(128, 0, 0, 0.7)' : mines == 6 ? 'rgba(64, 224, 208, 0.7)' : mines == 7 ? 'rgba(0, 0, 0, 0.7)' : mines == 8 ? 'rgba(128, 128, 128, 0.7)' : 'black';
        }
    }
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function makeBorder(cells) {
    for (i = 0; i < cells.length; i++) {
        const cell = cells[i];
        if (cell.classList.contains('revealed') && !cell.classList.contains('mine')) {
            let x = parseInt(cell.id.split('-')[1]);
            let y = parseInt(cell.id.split('-')[0].split('cell')[1]);
            var enfantsASupprimer = cell.querySelectorAll('.borderTop, .borderBottom, .borderLeft, .borderRight');
            enfantsASupprimer.forEach(function (enfant) {
                enfant.remove();
            });
            if (document.getElementById('cell' + (y - 1) + '-' + x)) {
                if (!document.getElementById('cell' + (y - 1) + '-' + x).classList.contains('revealed')) {
                    const borderTop = document.createElement('div');
                    borderTop.classList.add('borderTop');
                    borderTop.style.top = cell.offsetTop + 'px';
                    cell.appendChild(borderTop);
                }
            }
            if (document.getElementById('cell' + (y + 1) + '-' + x)) {
                if (!document.getElementById('cell' + (y + 1) + '-' + x).classList.contains('revealed')) {
                    const borderBottom = document.createElement('div');
                    borderBottom.classList.add('borderBottom');
                    borderBottom.style.top = (cell.offsetTop + 28) + 'px';
                    cell.appendChild(borderBottom);
                }
            }
            if (document.getElementById('cell' + y + '-' + (x - 1))) {
                if (!document.getElementById('cell' + y + '-' + (x - 1)).classList.contains('revealed')) {
                    const borderLeft = document.createElement('div');
                    borderLeft.classList.add('borderLeft');
                    borderLeft.style.left = cell.offsetLeft + 'px';
                    cell.appendChild(borderLeft);
                }
            }
            if (document.getElementById('cell' + y + '-' + (x + 1))) {
                if (!document.getElementById('cell' + y + '-' + (x + 1)).classList.contains('revealed')) {
                    const borderRight = document.createElement('div');
                    borderRight.classList.add('borderRight');
                    borderRight.style.left = (cell.offsetLeft + 28) + 'px';
                    cell.appendChild(borderRight);
                }
            }
        }
    }
}




class Game {
    constructor() {
        if (document.getElementById('timingsPlusFlags')) {
            document.getElementById('timingsPlusFlags').remove();
        }
        this.timingsPlusFlags = document.createElement('div');
        this.timingsPlusFlags.setAttribute('id', 'timingsPlusFlags');
        this.timing = document.createElement('p');
        this.timing.setAttribute('id', 'timing');
        this.flagsCounter = document.createElement('p');
        this.flagsCounter.setAttribute('id', 'flagsCounter');
        this.board = new Board();
        Theboard = this.board;
    }

    start() {
        this.timingsPlusFlags.appendChild(this.timing);
        this.timingsPlusFlags.appendChild(this.flagsCounter);
        document.body.appendChild(this.timingsPlusFlags);
        if (document.getElementById('board')) {
            document.getElementById('board').remove();
        }
        this.board.create();
        this.timing.innerHTML = '0s';
        this.flagsCounter.innerHTML = this.board.mines + ' 🚩';
        this.timingInterval = setInterval(() => {
            if (play) this.timing.innerHTML = parseInt(this.timing.innerHTML.split('s')[0]) + 1 + 's';
        }, 1000);
    }
}

class Board {
    create() {
        switch (document.getElementById('difficulty').value) {
            case 'easy':
                this.width = 10;
                this.height = 8;
                this.mines = 10;
                break;
            case 'medium':
                this.width = 18;
                this.height = 14;
                this.mines = 40;
                break;
            case 'hard':
                this.width = 24;
                this.height = 20;
                this.mines = 99;
                break;
            case 'impossible':
                this.width = 50;
                this.height = 30;
                this.mines = 400;
                break;
            case 'custom':
                this.width = document.getElementById('width').value;
                this.height = document.getElementById('height').value;
                this.mines = document.getElementById('mines').value;
                break;
        }
        this.theBoard = document.createElement('div');
        this.theBoard.setAttribute('id', 'board');
        document.body.appendChild(this.theBoard);
        this.theBoard.style.width = this.width * 30 + 'px';
        this.createCells();
    }

    createCells() {
        let firstClick = true;
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                let cell = document.createElement('div');
                cell.setAttribute('id', 'cell' + i + '-' + j);
                cell.setAttribute('class', 'cell');
                cell.style.backgroundColor = j % 2 == 0 ? i % 2 == 0 ? '#aad751' : '#a2d149' : i % 2 == 0 ? '#a2d149' : '#aad751';
                cell.addEventListener('mouseover', function () {
                    if (!cell.classList.contains('revealed')) cell.style.backgroundColor = '#b9dd77';
                });
                cell.addEventListener('mouseout', function () {
                    if (!cell.classList.contains('revealed')) cell.style.backgroundColor = j % 2 == 0 ? i % 2 == 0 ? '#aad751' : '#a2d149' : i % 2 == 0 ? '#a2d149' : '#aad751';
                });
                cell.addEventListener('click', function () {
                    if (firstClick) {
                        play = true;
                        firstClick = false;
                        const flagCells = document.querySelectorAll('.flagCell');
                        flagCells.forEach(flagCell => {
                            flagCell.classList.remove('flagCell');
                            flagCell.innerHTML = '';
                        });
                        document.getElementById('flagsCounter').innerHTML = Theboard.mines + ' 🚩';
                        Theboard.createMines(cell);
                    }
                    if (!cell.classList.contains('flagCell')) reveal(i, j);
                    const cells = document.getElementsByClassName('cell');
                    makeBorder(cells);
                    let win = true;
                    for (let i = 0; i < cells.length; i++) {
                        if (!cells[i].classList.contains('revealed') && !cells[i].classList.contains('mine')) {
                            win = false;
                        }
                    }
                    if (win) {
                        alert('You win!');
                        play = false;
                        for (let i = 0; i < cells.length; i++) {
                            cells[i].style.pointerEvents = 'none';
                        }
                    }
                });
                cell.addEventListener('contextmenu', function (e) {
                    e.preventDefault();
                    if (!cell.classList.contains('revealed')) {
                        if (cell.classList.contains('flagCell')) {
                            cell.classList.remove('flagCell');
                            cell.innerHTML = '';
                            document.getElementById('flagsCounter').innerHTML = parseInt(document.getElementById('flagsCounter').innerHTML.split(' ')[0]) + 1 + ' 🚩';
                        } else if (document.getElementById('flagsCounter').innerHTML.split(' ')[0] > 0) {
                            cell.classList.add('flagCell');
                            const flag = document.createElement('img');
                            flag.src = 'flag.png';
                            flag.setAttribute('class', 'flag');
                            cell.appendChild(flag);
                            document.getElementById('flagsCounter').innerHTML = document.getElementById('flagsCounter').innerHTML.split(' ')[0] - 1 + ' 🚩';
                        }
                    }
                });
                this.theBoard.appendChild(cell);
            }
        }
    }

    createMines(theCell) {
        for (let i = 0; i < this.mines; i++) {
            let x = Math.floor(Math.random() * this.width);
            let y = Math.floor(Math.random() * this.height);
            let cell = document.getElementById('cell' + y + '-' + x);
            if (cell.classList.contains('mine') || this.verifyProximity(theCell, cell)) {
                i--;
            } else {
                cell.classList.add('mine');
            }
        }
    }

    verifyProximity(theCell, cell) {
        let x = theCell.id.split('cell')[1].split('-')[1];
        let y = theCell.id.split('cell')[1].split('-')[0];
        let cellX = cell.id.split('cell')[1].split('-')[1];
        let cellY = cell.id.split('cell')[1].split('-')[0];
        if (Math.abs(x - cellX) <= 1 && Math.abs(y - cellY) <= 1) {
            return true;
        }
        return false;
    }
}
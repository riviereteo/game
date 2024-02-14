/******/
/*VARS*/
/******/
let walls;
const nbWalls = 10;
const wallHeight = 275;
const centerSize = 10;
let walker;

/********/
/*EVENTS*/
/********/
window.onload = () => {
    walls = makeWalls();
    walls.forEach(wall => wall.show());
    let here;
    walls.forEach(wall => {
        if (wall.walkerPosition === 'here') {
            here = wall;
        }
    });
    initPonts(here);
    walker = new Walker(here);
};

/***********/
/*FUNCTIONS*/
/***********/
function makeWalls() {
    let walls = [];
    walls.push(new Wall(window.innerWidth / 2, document.body.clientHeight - wallHeight, Math.random() * 60 + 25, wallHeight, 'here'));
    for (let i = 0; i < nbWalls; i++) {
        const gap = Math.random() * 200 + 25;
        const width = Math.random() * 60 + 25;
        const x = walls[i].x + walls[i].w + gap;
        const y = document.body.clientHeight - wallHeight;
        walls.push(new Wall(x, y, width, wallHeight, 'notHere'));
    }
    return walls;
}

function initPonts(wall) {
    let pont = new Pont(wall);
    let interval;
    let onclick = true;
    document.body.addEventListener('mousedown', (e) => {
        if (onclick) {
            interval = setInterval(() => {
                pont.aggrandir();
            }, 1);
        }
    });
    document.body.addEventListener('mouseup', (e) => {
        if (onclick) {
            clearInterval(interval);
            onclick = false;
            pont.tomber();
            setTimeout(() => {
                walker.walk(pont.pont.height + parseInt(pont.pont.style.left) - 25);
            }, 350);
        }
    });
}

/*********/
/*CLASSES*/
/*********/
class Wall {
    constructor(x, y, w, h, walkerPosition) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.walkerPosition = walkerPosition;
    }
    show() {
        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.left = this.x + 'px';
        div.style.top = this.y + 'px';
        div.style.width = this.w + 'px';
        div.style.height = this.h + 'px';
        div.style.backgroundColor = 'black';
        div.dataset.walkerPosition = this.walkerPosition;
        document.body.appendChild(div);
        this.makeCenter(div);
    }

    makeCenter(div) {
        this.center = document.createElement('div');
        this.center.style.position = 'absolute';
        this.center.style.width = centerSize + 'px';
        this.center.style.height = centerSize + 'px';
        this.center.style.backgroundColor = 'red';
        this.center.style.left = this.x + this.w / 2 - centerSize / 2 + 'px';
        this.center.style.top = this.y + 'px';
        document.body.appendChild(this.center);
    }
}

class Pont {
    constructor(Wall) {
        this.x = Wall.x + Wall.w - 2;
        this.y = document.body.clientHeight - wallHeight;
        this.pont = document.createElement('div');
        this.pont.style.position = 'absolute';
        this.pont.style.left = this.x + 'px';
        this.pont.style.top = this.y + 'px';
        this.pont.style.width = '2px';
        this.pont.style.height = '0px';
        this.pont.style.backgroundColor = 'black';
        document.body.appendChild(this.pont);
    }

    aggrandir() {
        this.pont.style.height = parseInt(this.pont.style.height) + 1 + 'px';
        this.pont.style.top = parseInt(this.pont.style.top) - 1 + 'px';
        this.pont.height = parseInt(this.pont.style.height);
    }

    tomber() {
        this.pont.style.transformOrigin = '100% 100%';
        this.pont.animate([
            {
                rotate: '0deg',
            },
            {
                rotate: '90deg',
            }
        ], {
            duration: 350,
            easing: 'linear',
            fill: 'forwards'
        });
    }
}

class Walker {
    constructor(wall){
        this.skin = document.createElement('img');
        this.skin.src = 'ninjaSkin.png';
        this.skin.style.position = 'absolute';
        this.skin.style.height = '30px';
        this.skin.style.width = '30px';
        this.skin.style.left = wall.x + wall.w / 2 - 20 + 'px';
        this.skin.style.top = wall.y - 30 + 'px';
        document.body.appendChild(this.skin);
    }

    walk(x){
        this.skin.animate([
            {
                left: this.skin.style.left,
            },
            {
                left: x + 'px',
            }
        ], {
            duration: 350,
            easing: 'linear',
            fill: 'forwards'
        });
    }
}
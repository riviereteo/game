  /******/
 /*VARS*/
/******/
let walls;
const nbWalls = 100;
const wallHeight = 275;

  /********/
 /*EVENTS*/
/********/
window.onload = () => {
    walls = makeWalls();
    walls.forEach(wall => wall.show());
};

  /***********/
 /*FUNCTIONS*/
/***********/
function makeWalls() {
    let walls = [];
    walls.push(new Wall(window.innerWidth/2, document.body.clientHeight - wallHeight, Math.random() * 50 + 40, wallHeight));
    for (let i = 0; i < nbWalls; i++) {
        const gap = Math.random() * 150 + 75;
        const width = Math.random() * 50 + 40;
        const x = walls[i].x + walls[i].w + gap;
        const y = document.body.clientHeight - wallHeight;
        walls.push(new Wall(x, y, width, wallHeight));
    }
    return walls;
}

  /*********/
 /*CLASSES*/
/*********/
class Wall {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    show() {
        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.left = this.x + 'px';
        div.style.top = this.y + 'px';
        div.style.width = this.w + 'px';
        div.style.height = this.h + 'px';
        div.style.backgroundColor = 'black';
        document.body.appendChild(div);
    }
}

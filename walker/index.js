/******/
/*VARS*/
/******/
let walls;
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
    initPonts(here, walls);
    walker = new Walker(here);
    scrollReset();
    initScore();
};

/***********/
/*FUNCTIONS*/
/***********/
function makeWalls() {
    let walls = [];
    walls.push(new Wall(window.innerWidth / 2, document.body.clientHeight - wallHeight, Math.random() * 60 + 25, wallHeight, 'here'));
    for (let i = 0; i < 3; i++) {
        const gap = Math.random() * 200 + 25;
        const width = Math.random() * 60 + 25;
        const x = walls[i].x + walls[i].w + gap;
        const y = document.body.clientHeight - wallHeight;
        walls.push(new Wall(x, y, width, wallHeight, 'notHere'));
    }
    return walls;
}

function initPonts(wall, walls) {
    let pont = new Pont(wall);
    let interval;
    let onclick = true;
    document.addEventListener('mousedown', (e) => {
        if (onclick && e.which === 1) {
            interval = setInterval(() => {
                pont.aggrandir();
            }, 1);
        }
    });
    document.addEventListener('mouseup', (e) => {
        if (onclick && parseInt(pont.pont.style.height) > 0) {
            clearInterval(interval);
            onclick = false;
            pont.tomber();
            setTimeout(() => {
                const firstTiming = ((pont.pont.height + parseInt(pont.pont.style.left) - 25) - parseInt(walker.skin.style.left)) * 2;
                let avancement = pont.pont.height + parseInt(pont.pont.style.left) - 25;
                let continuer = false;
                let doublePoint = false;
                walls.forEach(theWall => {
                    if (pont.pont.height + parseInt(pont.pont.style.left) >= theWall.x - 2 && pont.pont.height + parseInt(pont.pont.style.left) <= theWall.x + theWall.w - 2) {
                        theWall.wall.dataset.walkerPosition = 'here';
                        wall.wall.dataset.walkerPosition = 'notHere';
                        wall = theWall;
                        continuer = true
                        if (pont.pont.height + parseInt(pont.pont.style.left) >= parseInt(wall.center.style.left) - 2 && pont.pont.height + parseInt(pont.pont.style.left) <= parseInt(wall.center.style.left) + centerSize - 2) {
                            wall.allumer();
                            doublePointAnimation();
                            doublePoint = true;
                        }
                        if (avancement > wall.x + wall.w - 31) {
                            avancement = wall.x + wall.w - 31;
                        }
                    }
                });
                walker.walk(avancement, firstTiming);
                setTimeout(() => {
                    if (continuer) {
                        let timing = 0;
                        if (wall.w <= 40) {
                            if (parseInt(walker.skin.style.left) < (parseInt(wall.wall.style.left) + wall.w - 31)) {
                                timing = ((parseInt(wall.wall.style.left) + wall.w - 31) - parseInt(walker.skin.style.left)) * 2;
                                walker.walk(parseInt(wall.wall.style.left) + wall.w - 31, timing);
                            }
                        } else {
                            if (parseInt(walker.skin.style.left) < (parseInt(wall.wall.style.left) + wall.w - 40)) {
                                timing = ((parseInt(wall.wall.style.left) + wall.w - 40) - parseInt(walker.skin.style.left)) * 2;
                                walker.walk(parseInt(wall.wall.style.left) + wall.w - 40, timing);
                            }
                        }
                        setTimeout(() => {
                            déplacerCaméra(wall);
                            document.getElementById('score').innerHTML = parseInt(document.getElementById('score').innerHTML) + (doublePoint ? 2 : 1);
                            let nbWalls = 0;
                            walls.forEach(wall => {
                                if (parseInt(wall.wall.style.left) > parseInt(walker.skin.style.left)) {
                                    nbWalls++;
                                }
                            });
                            if (nbWalls < 3) {
                                for (let i = 0; i < 3 - nbWalls; i++) {
                                    const gap = Math.random() * 200 + 25;
                                    const width = Math.random() * 60 + 25;
                                    const x = walls[walls.length - 1].x + walls[walls.length - 1].w + gap;
                                    const y = document.body.clientHeight - wallHeight;
                                    walls.push(new Wall(x, y, width, wallHeight, 'notHere'));
                                    walls[walls.length - 1].show();
                                }
                            }
                            initPonts(wall, walls);
                            return;
                        }, timing);
                    } else {
                        walker.tomber();
                        pont.breakDown();
                        restart();
                    }
                }, firstTiming);
            }, 350);
        }
    });
}

function déplacerCaméra(wall) {
    const screenWidth = window.innerWidth;
    const wallPositionX = parseInt(wall.wall.style.left);
    const wallWidth = wall.w;

    const newX = wallPositionX - (screenWidth / 2) + (wallWidth / 2);

    window.scrollTo({
        left: newX,
        behavior: 'smooth'
    });
}

function scrollReset() {
    window.scrollTo({
        left: 0,
        behavior: 'smooth'
    });
}

function initScore() {
    let score = document.createElement('p');
    score.style.position = 'fixed';
    score.style.top = '15px';
    score.style.right = '70px';
    score.style.color = 'white';
    score.style.fontSize = '28px';
    score.style.textShadow = '1px 1px 1px black';
    score.style.margin = '0';
    score.innerHTML = '0';
    score.id = 'score';
    document.body.appendChild(score);
    let backToHome = document.createElement('div');
    backToHome.style.position = 'fixed';
    backToHome.style.top = '14px';
    backToHome.style.right = '10px';
    backToHome.style.color = 'white';
    backToHome.style.fontSize = '28px';
    backToHome.innerHTML = '<span class="material-symbols-outlined">home</span>';
    backToHome.style.cursor = 'pointer';
    backToHome.style.display = 'flex';
    backToHome.style.padding = '5px 10px';
    backToHome.style.borderRadius = '10px';
    backToHome.style.backgroundColor = '#2c4695';
    backToHome.onclick = () => {
        location.href = '../index.php';
    }
    document.body.appendChild(backToHome);
}

function doublePointAnimation() {
    let doublePoint = document.createElement('p');
    doublePoint.innerHTML = 'Double score!';
    doublePoint.classList.add('doublePoint');
    document.body.appendChild(doublePoint);
    setTimeout(() => {
        doublePoint.animate([
            {
                opacity: 1,
            },
            {
                opacity: 0,
            }
        ], {
            duration: 400,
            easing: 'linear',
            fill: 'forwards'
        });
        setTimeout(() => {
            document.body.removeChild(doublePoint);
        }, 400);
    }, 800);
}

function restart() {
    setTimeout(() => {
        const restart = document.createElement('div');
        restart.style.position = 'fixed';
        restart.innerHTML = '<span class="material-symbols-outlined">replay</span>';
        restart.style.color = 'white';
        restart.style.backgroundColor = '#2c4695';
        restart.style.borderRadius = '50%';
        restart.style.top = '40%';
        restart.style.left = '50%';
        restart.style.transform = 'translate(-50%, -50%)';
        restart.style.cursor = 'pointer';
        restart.style.display = 'flex';
        restart.style.padding = '10px';
        restart.style.opacity = '0';
        restart.querySelector('span').style.fontSize = '30px';
        restart.id = 'restart';
        restart.onclick = () => {
            document.body.style.display = 'none';
            location.reload();
        };
        document.body.appendChild(restart);
        document.getElementById('score').style.top = '32%';
        document.getElementById('score').style.right = '50%';
        document.getElementById('score').style.transform = 'translate(50%, -50%)';
        document.getElementById('score').style.fontSize = '40px';
        document.getElementById('score').innerHTML = 'Score: ' + document.getElementById('score').innerHTML;
        document.getElementById('score').style.color = '#2c4695';
        document.getElementById('score').style.textShadow = '2px 2px 2px white';
        document.getElementById('score').style.fontWeight = 'bold';
        document.getElementById('score').style.opacity = '0';
        setTimeout(() => {
            restart.animate([
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                }
            ], {
                duration: 500,
                easing: 'linear',
                fill: 'forwards'
            });
            document.getElementById('score').animate([
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                }
            ], {
                duration: 500,
                easing: 'linear',
                fill: 'forwards'
            });
        }, 50);
    }, 300);
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
        this.wall = document.createElement('div');
        this.wall.style.position = 'absolute';
        this.wall.style.left = this.x + 'px';
        this.wall.style.top = this.y + 'px';
        this.wall.style.width = this.w + 'px';
        this.wall.style.height = this.h + 'px';
        this.wall.style.backgroundColor = 'black';
        this.wall.dataset.walkerPosition = this.walkerPosition;
        document.body.appendChild(this.wall);
        this.makeCenter();
    }

    makeCenter() {
        this.center = document.createElement('div');
        this.center.style.position = 'absolute';
        this.center.style.width = centerSize + 'px';
        this.center.style.height = centerSize + 'px';
        this.center.style.backgroundColor = 'red';
        this.center.style.left = this.x + this.w / 2 - centerSize / 2 + 'px';
        this.center.style.top = this.y + 'px';
        document.body.appendChild(this.center);
    }

    allumer() {
        this.center.animate([
            {
                width: centerSize + 'px',
                height: centerSize + 'px',
                left: this.x + this.w / 2 - centerSize / 2 + 'px',
                top: this.y + 'px',
            },
            {
                width: this.w + 'px',
                height: this.h + 'px',
                left: this.x + 'px',
                top: this.y + 'px',
            }
        ], {
            duration: 150,
            easing: 'linear',
            fill: 'forwards'
        });
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

    breakDown() {
        this.pont.animate([
            {
                rotate: '90deg',
            },
            {
                rotate: '180deg',
            }
        ], {
            duration: 350,
            easing: 'linear',
            fill: 'forwards'
        });
    }
}

class Walker {
    constructor(wall) {
        this.skin = document.createElement('img');
        this.skin.src = 'ninjaSkin.png';
        this.skin.style.position = 'absolute';
        this.skin.style.height = '30px';
        this.skin.style.width = '30px';
        this.skin.style.left = wall.x + wall.w / 2 - 20 + 'px';
        this.skin.style.top = wall.y - 30 + 'px';
        document.body.appendChild(this.skin);
    }

    walk(x, duration) {
        if (duration > 0) {
            this.skin.animate([
                {
                    left: this.skin.style.left,
                },
                {
                    left: x + 'px',
                }
            ], {
                duration: duration,
                easing: 'linear',
                fill: 'forwards'
            });
            this.skin.style.left = x + 'px';
        }
    }

    tomber() {
        this.skin.animate([
            {
                top: this.skin.style.top,
            },
            {
                top: document.body.clientHeight + 'px',
            }
        ], {
            duration: 350,
            easing: 'linear',
            fill: 'forwards'
        });
    }
}
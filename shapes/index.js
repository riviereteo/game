const size = 10;
const drawnPositions = [];

function dessinerTriangle(ctx, x, y, rotation) {

    const height = (size * Math.sqrt(3)) / 2;
    const x2 = x + size;
    const y2 = y;
    const x3 = x + size / 2;
    let y3 = y;
    rotation ? y3 += height : y3 -= height;

    const positionString = `${x},${y},${rotation},{true},{true},{true}`;
    drawnPositions.push(positionString);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.stroke();

    trouverPositionSuivant(ctx);
}

window.onload = () => {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;
    const rotation = true;
    dessinerTriangle(ctx, x, y, rotation);
}

function trouverPositionSuivant(ctx) {
    const randomTriangle = Math.floor(Math.random() * drawnPositions.length);
    const [x, y, rotation] = drawnPositions[randomTriangle].split(',');
    const face = Math.floor(Math.random() * 3);
    switch (face) {
        case 0:
            dessinerTriangle(ctx, x, y, !rotation);
            break;
        case 1:
            rotation ? dessinerTriangle(ctx, x - size / 2, y + height, !rotation) : dessinerTriangle(ctx, x - size / 2, y - height, !rotation);
            break;
        case 2:
            rotation ? dessinerTriangle(ctx, x + size / 2, y + height, !rotation) : dessinerTriangle(ctx, x + size / 2, y - height, !rotation);
            break;
        default:
            break;
    }
}
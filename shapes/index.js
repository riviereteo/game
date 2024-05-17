let size = 10;
const shapes = {};
let speed = "0";
let colors = { "c1": "#9cb7ff", "c2": "#7887f8", "c3": "#575af1", "c4": "#9c3bdf", "c5": "#db1ece", "c6": "#c51d92", "c7": "#b11c5b", "c8": "#940e2a", "c9": "#7d0303", "c10": "#4e0000" };
let space = 4;
let theShape = "triangle";

function dessinerTriangle(ctx, x, y, rotation) {
    const height = (size * Math.sqrt(3)) / 2;
    const x2 = x + size;
    const y2 = y;
    const x3 = x + size / 2;
    let y3 = y;
    rotation ? (y3 += height) : (y3 -= height);

    const positionKey = `${x}-${y}`;
    if (shapes[positionKey]) {
        const existingColor = shapes[positionKey].color;
        switch (existingColor) {
            case "c1":
                ctx.strokeStyle = colors["c2"];
                shapes[positionKey].color = "c2";
                break;
            case "c2":
                ctx.strokeStyle = colors["c3"];
                shapes[positionKey].color = "c3";
                break;
            case "c3":
                ctx.strokeStyle = colors["c4"];
                shapes[positionKey].color = "c4";
                break;
            case "c4":
                ctx.strokeStyle = colors["c5"];
                shapes[positionKey].color = "c5";
                break;
            case "c5":
                ctx.strokeStyle = colors["c6"];
                shapes[positionKey].color = "c6";
                break;
            case "c6":
                ctx.strokeStyle = colors["c7"];
                shapes[positionKey].color = "c7";
                break;
            case "c7":
                ctx.strokeStyle = colors["c8"];
                shapes[positionKey].color = "c8";
                break;
            case "c8":
                ctx.strokeStyle = colors["c9"];
                shapes[positionKey].color = "c9";
                break;
            case "c9":
                ctx.strokeStyle = colors["c10"];
                shapes[positionKey].color = "c10";
                break;
            default:
                ctx.strokeStyle = existingColor;
                break;
        }
    } else {
        ctx.strokeStyle = colors["c1"];
        shapes[positionKey] = { color: "c1" };
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.stroke();

    setTimeout(() => {
        trouverPositionSuivantTriangle(ctx, x, y, rotation, height);
    }, speed);
}

window.onload = () => {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const x = Math.round(window.innerWidth / 2);
    const y = Math.round(window.innerHeight / 2);
    const rotation = true;
    const settingsForm = document.getElementById("settingsForm");
    settingsForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const sizeInput = document.getElementById("size");
        const speedInput = document.getElementById("speed");
        const spaceInput = document.getElementById("space");
        const shapeSelect = document.getElementById("shape");
        const colorsInput = document.querySelectorAll("#settingsForm>div>div>input");

        const size = parseInt(sizeInput.value);
        const speed = parseInt(speedInput.value);
        const spaceV = parseInt(spaceInput.value);
        const shape = shapeSelect.value;
        const minSize = parseInt(sizeInput.getAttribute("aria-valuemin"));
        const maxSize = parseInt(sizeInput.getAttribute("aria-valuemax"));
        const minSpeed = parseInt(speedInput.getAttribute("aria-valuemin"));
        const maxSpeed = parseInt(speedInput.getAttribute("aria-valuemax"));
        const minSpace = parseInt(spaceInput.getAttribute("aria-valuemin"));
        const maxSpace = parseInt(spaceInput.getAttribute("aria-valuemax"));

        if (size < minSize || size > maxSize) {
            alert(`Size must be between ${minSize} and ${maxSize}.`);
            return;
        }
        else if (speed < minSpeed || speed > maxSpeed) {
            alert(`Speed must be between ${minSpeed} and ${maxSpeed}.`);
            return;
        }
        else if (spaceV < minSpace || spaceV > maxSpace) {
            alert(`Space must be between ${minSpace} and ${maxSpace}.`);
            return;
        } else {
            settingsForm.style.display = "none";
            applySettings(size, speed, spaceV, shape, colorsInput);
        }
    });
    settingsForm.style.display = 'none';
    document.getElementById("tools").addEventListener("click", function (event) {
        if (settingsForm.style.display === 'none') {
            settingsForm.style.display = 'flex';
            settingsForm.style.top = (window.innerHeight - settingsForm.clientHeight) / 2 + 'px';
            settingsForm.style.left = (window.innerWidth - settingsForm.clientWidth) / 2 + 'px';
        } else {
            settingsForm.style.display = 'none';
        }
        document.getElementById("tools").querySelector('span').animate([
            { transform: "rotate(0)" },
            { transform: "rotate(180deg)" }
        ], {
            duration: 800,
            iterations: 1,
            easing: "linear(0 0%, 0.22 2.1%, 0.86 6.5%, 1.11 8.6%, 1.3 10.7%, 1.35 11.8%, 1.37 12.9%, 1.37 13.7%, 1.36 14.5%, 1.32 16.2%, 1.03 21.8%, 0.94 24%, 0.89 25.9%, 0.88 26.85%, 0.87 27.8%, 0.87 29.25%, 0.88 30.7%, 0.91 32.4%, 0.98 36.4%, 1.01 38.3%, 1.04 40.5%, 1.05 42.7%, 1.05 44.1%, 1.04 45.7%, 1 53.3%, 0.99 55.4%, 0.98 57.5%, 0.99 60.7%, 1 68.1%, 1.01 72.2%, 1 86.7%, 1 100%)"
        });
    });
    dessinerTriangle(ctx, x, y, rotation);
};

function applySettings(newSize, newSpeed, spaceV, shape, colorsInput) {
    size = newSize;
    speed = newSpeed;
    space = spaceV;
    theShape = shape;

    for (const key in colors) {
        if (colors.hasOwnProperty(key)) {
            colors[key] = colorsInput[parseInt(key.slice(1)) - 1].value;
        }
    }

    let canvas = document.getElementById("myCanvas");
    canvas.parentNode.removeChild(canvas);

    canvas = document.createElement('canvas');
    canvas.id = "myCanvas";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const x = Math.round(window.innerWidth / 2);
    const y = Math.round(window.innerHeight / 2);
    if (shape === "triangle") {
        const rotation = true;
        dessinerTriangle(ctx, x, y, rotation);
    } else {
        dessinerSquare(ctx, x, y);
    }
}

function trouverPositionSuivantTriangle(ctx, x, y, rotation, height) {
    const randomFace = Math.floor(Math.random() * 3);
    switch (randomFace) {
        case 0:
            dessinerTriangle(ctx, x, rotation ? y - (space + 1) : y + (space + 1), !rotation);
            break;
        case 1:
            dessinerTriangle(ctx, x - size / 2 - (space + 1), rotation ? y + height : y - height, !rotation);
            break;
        case 2:
            dessinerTriangle(ctx, x + size / 2 + (space + 1), rotation ? y + height : y - height, !rotation);
            break;
        default:
            break;
    }
}

function dessinerSquare(ctx, x, y) {
    const positionKey = `${x}-${y}`;
    if (shapes[positionKey]) {
        const existingColor = shapes[positionKey].color;
        switch (existingColor) {
            case "c1":
                ctx.strokeStyle = colors["c2"];
                shapes[positionKey].color = "c2";
                break;
            case "c2":
                ctx.strokeStyle = colors["c3"];
                shapes[positionKey].color = "c3";
                break;
            case "c3":
                ctx.strokeStyle = colors["c4"];
                shapes[positionKey].color = "c4";
                break;
            case "c4":
                ctx.strokeStyle = colors["c5"];
                shapes[positionKey].color = "c5";
                break;
            case "c5":
                ctx.strokeStyle = colors["c6"];
                shapes[positionKey].color = "c6";
                break;
            case "c6":
                ctx.strokeStyle = colors["c7"];
                shapes[positionKey].color = "c7";
                break;
            case "c7":
                ctx.strokeStyle = colors["c8"];
                shapes[positionKey].color = "c8";
                break;
            case "c8":
                ctx.strokeStyle = colors["c9"];
                shapes[positionKey].color = "c9";
                break;
            case "c9":
                ctx.strokeStyle = colors["c10"];
                shapes[positionKey].color = "c10";
                break;
            default:
                ctx.strokeStyle = existingColor;
                break;
        }
    } else {
        ctx.strokeStyle = colors["c1"];
        shapes[positionKey] = { color: "c1" };
    }
    ctx.strokeRect(x, y, size, size);
    setTimeout(() => {
        trouverPositionSuivantSquare(ctx, x, y);
    }, speed);
}

function trouverPositionSuivantSquare(ctx, x, y) {
    const randomFace = Math.floor(Math.random() * 4);
    switch (randomFace) {
        case 0:
            dessinerSquare(ctx, x, y - size - (space + 1));
            break;
        case 1:
            dessinerSquare(ctx, x + size + (space + 1), y);
            break;
        case 2:
            dessinerSquare(ctx, x, y + size + (space + 1));
            break;
        case 3:
            dessinerSquare(ctx, x - size - (space + 1), y);
            break;
        default:
            break;
    }
}

document.getElementById("refresh").addEventListener("click", function (event) {
    let canvas = document.getElementById("myCanvas");
    canvas.parentNode.removeChild(canvas);

    canvas = document.createElement('canvas');
    canvas.id = "myCanvas";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const x = Math.round(window.innerWidth / 2);
    const y = Math.round(window.innerHeight / 2);
    if (theShape === "triangle") {
        const rotation = true;
        dessinerTriangle(ctx, x, y, rotation);
    } else {
        dessinerSquare(ctx, x, y);
    }
});

document.getElementById("download").addEventListener("click", function (event) {
    const canvas = document.body.querySelector('canvas');
    var url = canvas.toDataURL('image/gif', 1.0);

    var link = document.createElement('a');
    link.download = 'shapes.gif';
    link.href = url;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

document.getElementById("home").addEventListener("click", function (event) {
    document.location.href = '../index.php';
});
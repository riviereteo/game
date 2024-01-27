window.onload = function () {
    creatTools();
    main();
};

var times = [0, 0, 0, 0, 0]
function main() {
    var balls = spawn();
    // moyenne des 5 derniers temps
    setInterval(function () {
        var start = Date.now();
        balls.forEach(function (ball) {
            move(ball);
        });
        balls = collision(balls);
        var end = Date.now();
        times.push(end - start);
        startJauge();
    }, 1);
}

function spawn() {
    if (autorandom) {
        var nbOfBalls = Math.floor(Math.random() * 100 + 50);
    } else {
        var nbOfBalls = newnbOfBalls;
    }
    var balls = [];
    for (var i = 0; i < nbOfBalls; i++) {
        balls.push(Ball(0));
    }
    return balls;
}

function Ball(type) {
    var ball = document.createElement("div");
    ball.className = "ball";
    var color = getColor(type);
    var size = getSize(type);
    var positionDir = randomPositionAndDirection();

    ball.style.backgroundColor = color;
    ball.dataset.type = type;
    ball.style.width = size + "px";
    ball.style.height = size + "px";
    ball.style.left = positionDir[0] + "px";
    ball.style.top = positionDir[1] + "px";
    ball.dataset.direction = positionDir[2];
    document.body.appendChild(ball);
    return ball;
}

function collision(balls) {
    var newBalls = balls.slice(); // Create a copy of the balls array
    for (var i = 0; i < balls.length; i++) {
        for (var j = i + 1; j < balls.length; j++) {
            var ball1 = balls[i];
            var ball2 = balls[j];
            if (isColliding(ball1, ball2) && ball1.dataset.type != 7 && ball2.dataset.type != 7) {
                // Handle collision
                var type1 = parseInt(ball1.dataset.type);
                var type2 = parseInt(ball2.dataset.type);

                // Determine the type of the new ball
                var newType = Math.max(type1, type2);
                if (newType < 7) {
                    newType++;
                }

                // Remove the collided balls from the DOM
                ball1.parentNode.removeChild(ball1);
                ball2.parentNode.removeChild(ball2);

                // Create and append new balls
                var newBall1 = Ball(newType);
                var newBall2 = Ball(newType);
                newBalls.push(newBall1);
                newBalls.push(newBall2);
            }
        }
    }
    return newBalls;
}

function isColliding(ball1, ball2) {
    var rect1 = ball1.getBoundingClientRect();
    var rect2 = ball2.getBoundingClientRect();
    return (
        rect1.right > rect2.left &&
        rect1.left < rect2.right &&
        rect1.bottom > rect2.top &&
        rect1.top < rect2.bottom
    );
}

function getColor(type) {
    switch (type) {
        case 0:
            return "white";
        case 1:
            return "blue";
        case 2:
            return "green";
        case 3:
            return "yellow";
        case 4:
            return "purple";
        case 5:
            return "orange";
        case 6:
            return "pink";
        case 7:
            return "red";
    }
}

function randomPositionAndDirection() {
    var x = Math.floor(Math.random() * window.innerWidth - 26 * coeffSize);
    var y = Math.floor(Math.random() * window.innerHeight - 26 * coeffSize);
    var direction = Math.floor(Math.random() * 8);
    return [x, y, direction];
}

function getSize(type) {
    switch (type) {
        case 0:
            return 5 * coeffSize;
        case 1:
            return 8 * coeffSize;
        case 2:
            return 11 * coeffSize;
        case 3:
            return 14 * coeffSize;
        case 4:
            return 17 * coeffSize;
        case 5:
            return 20 * coeffSize;
        case 6:
            return 23 * coeffSize;
        case 7:
            return 26 * coeffSize;
    }
}

function move(ball) {
    var x = parseInt(ball.style.left);
    var y = parseInt(ball.style.top);
    var direction = parseInt(ball.dataset.direction);
    var type = parseInt(ball.dataset.type);
    var ballSize = getSize(type);
    switch (direction) {
        case 0:
            //bas droite
            x += 1;
            y += 1;
            break;
        case 1:
            //bas 3
            y += 1;
            break;
        case 2:
            //bas gauche
            x -= 1;
            y += 1;
            break;
        case 3:
            //gauche 0
            x -= 1;
            break;
        case 4:
            //haut gauche
            x -= 1;
            y -= 1;
            break;
        case 5:
            //haut 1
            y -= 1;
            break;
        case 6:
            //haut droite
            x += 1;
            y -= 1;
            break;
        case 7:
            //droite 2
            x += 1;
            break;
    }

    if (x <= 0) {
        invertDirection(ball, direction, 0);
    }
    if (y <= 0) {
        invertDirection(ball, direction, 1);
    }
    if (x >= window.innerWidth - ballSize) {
        invertDirection(ball, direction, 2);
    }
    if (y >= window.innerHeight - ballSize) {
        invertDirection(ball, direction, 3);
    }

    // Mettre à jour la position et la direction de la balle
    ball.style.left = x + "px";
    ball.style.top = y + "px";
}

function invertDirection(ball, direction, wall) {
    switch (wall) {
        case 0:
            switch (direction) {
                case 2:
                    direction = 0;
                    break;
                case 3:
                    direction = 7;
                    break;
                case 4:
                    direction = 6;
                    break;
            }
            break;
        case 1:
            switch (direction) {
                case 4:
                    direction = 2;
                    break;
                case 5:
                    direction = 1;
                    break;
                case 6:
                    direction = 0;
                    break;
            }
            break;
        case 2:
            switch (direction) {
                case 0:
                    direction = 2;
                    break;
                case 7:
                    direction = 3;
                    break;
                case 6:
                    direction = 4;
                    break;
            }
            break;
        case 3:
            switch (direction) {
                case 0:
                    direction = 6;
                    break;
                case 1:
                    direction = 5;
                    break;
                case 2:
                    direction = 4;
                    break;
            }
            break;
    }
    ball.dataset.direction = direction;
}

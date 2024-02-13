const spaceBeetwen = 100;
let play = true;
let ballBlue;
let ballRed;
let ballGreen;
let ballYellow;
const ballSave = document.createElement('p');
ballSave.style.position = 'absolute';
ballSave.style.top = '10px';
ballSave.style.right = '10px';
ballSave.style.color = 'white';
ballSave.style.fontSize = '20px';
ballSave.style.fontWeight = 'bold';
ballSave.style.textShadow = '1px 1px 1px black';
ballSave.innerHTML = 'Balls saved: 0';
ballSave.style.margin = '0';
document.body.appendChild(ballSave);
const backtohome = document.getElementById('backtohome');
backtohome.addEventListener('click', () => {
    document.location.href = '../index.php';
});
window.onload = function () {
    const difficulty = document.createElement('select');
    const option1 = document.createElement('option');
    option1.value = 'easy';
    option1.innerHTML = 'Easy';
    const option2 = document.createElement('option');
    option2.value = 'hard';
    option2.innerHTML = 'Hard';
    const playButton = document.createElement('button');
    playButton.innerHTML = 'Play';
    const form = document.createElement('form');
    form.style.position = 'absolute';
    form.style.top = '10px';
    form.style.left = '65px';
    form.action = 'javascript:void(0)';
    form.style.display = 'flex';
    form.style.gap = '10px';
    difficulty.appendChild(option1);
    difficulty.appendChild(option2);
    form.appendChild(difficulty);
    form.appendChild(playButton);
    document.body.appendChild(form);
    playButton.addEventListener('click', function () {
        if (play) {
            form.remove();
            if (difficulty.value === 'easy') {
                ballBlue = document.createElement('div');
                ballBlue.id = 'ballBlue';
                ballBlue.className = 'ball';
                ballRed = document.createElement('div');
                ballRed.id = 'ballRed';
                ballRed.className = 'ball';
                document.body.appendChild(ballBlue);
                document.body.appendChild(ballRed);
                ballBlue.style.top = document.body.clientHeight / 2 - spaceBeetwen / 2 - ballBlue.clientHeight + 'px';
                ballRed.style.top = document.body.clientHeight / 2 + spaceBeetwen / 2 + 'px';
                ballBlue.dataset.position = 'top';
                ballRed.dataset.position = 'bottom';
                setInterval(function () {
                    if (play) {
                        const position = Math.floor(Math.random() * 2) === 0 ? 'top' : 'bottom';
                        const color = Math.floor(Math.random() * 2) === 0 ? 'Blue' : 'Red';
                        spawnBall(position, color);
                    }
                }, ((Math.random() * 1000) + 1000));
                document.body.addEventListener('click', function () {
                    if (play) {
                        ballBlue.style.top = ballBlue.style.top === document.body.clientHeight / 2 - spaceBeetwen / 2 - ballBlue.clientHeight + 'px' ? document.body.clientHeight / 2 + spaceBeetwen / 2 + 'px' : document.body.clientHeight / 2 - spaceBeetwen / 2 - ballBlue.clientHeight + 'px';
                        ballRed.style.top = ballRed.style.top === document.body.clientHeight / 2 + spaceBeetwen / 2 + 'px' ? document.body.clientHeight / 2 - spaceBeetwen / 2 - ballRed.clientHeight + 'px' : document.body.clientHeight / 2 + spaceBeetwen / 2 + 'px';
                        ballBlue.dataset.position = ballBlue.dataset.position === 'top' ? 'bottom' : 'top';
                        ballRed.dataset.position = ballRed.dataset.position === 'top' ? 'bottom' : 'top';
                    }
                });
            } else {
                ballBlue = document.createElement('div');
                ballBlue.id = 'ballBlue';
                ballBlue.className = 'ball';
                ballRed = document.createElement('div');
                ballRed.id = 'ballRed';
                ballRed.className = 'ball';
                ballGreen = document.createElement('div');
                ballGreen.id = 'ballGreen';
                ballGreen.className = 'ball';
                ballYellow = document.createElement('div');
                ballYellow.id = 'ballYellow';
                ballYellow.className = 'ball';
                document.body.appendChild(ballBlue);
                document.body.appendChild(ballRed);
                document.body.appendChild(ballGreen);
                document.body.appendChild(ballYellow);
                ballBlue.style.top = document.body.clientHeight / 2 - spaceBeetwen / 2 - ballBlue.clientHeight + 'px';
                ballRed.style.top = document.body.clientHeight / 2 + spaceBeetwen / 2 + 'px';
                ballGreen.style.top = document.body.clientHeight / 2 - ballGreen.clientHeight / 2 + 'px';
                ballGreen.style.left = document.body.clientWidth / 2 - spaceBeetwen / 2 - ballGreen.clientWidth + 'px';
                ballYellow.style.top = document.body.clientHeight / 2 - ballYellow.clientHeight / 2 + 'px';
                ballYellow.style.left = document.body.clientWidth / 2 + spaceBeetwen / 2 + 'px';
                ballBlue.dataset.position = 'top';
                ballRed.dataset.position = 'bottom';
                ballGreen.dataset.position = 'left';
                ballYellow.dataset.position = 'right';
                setInterval(function () {
                    if (play) {
                        const position = Math.floor(Math.random() * 2) === 0 ? 'top' : 'bottom';
                        const color = Math.floor(Math.random() * 4) === 0 ? 'Blue' : Math.floor(Math.random() * 4) === 1 ? 'Red' : Math.floor(Math.random() * 4) === 2 ? 'Green' : 'Yellow';
                        spawnBallHard(position, color);
                    }
                }, ((Math.random() * 1000) + 1000));
                document.body.addEventListener('click', function () {
                    if (play) {
                        ballBlue.style.top = ballBlue.dataset.position === 'top' ? document.body.clientHeight / 2 - ballBlue.clientHeight / 2 + 'px' : ballBlue.dataset.position === 'right' ? document.body.clientHeight / 2 + spaceBeetwen / 2 + 'px' : ballBlue.dataset.position === 'bottom' ? document.body.clientHeight / 2 - ballBlue.clientHeight / 2 + 'px' : document.body.clientHeight / 2 - spaceBeetwen / 2 - ballBlue.clientHeight + 'px';
                        ballBlue.style.left = ballBlue.dataset.position === 'top' ? document.body.clientWidth / 2 + spaceBeetwen / 2 + 'px' : ballBlue.dataset.position === 'right' ? document.body.clientWidth / 2 - ballBlue.clientWidth / 2 + 'px' : ballBlue.dataset.position === 'bottom' ? document.body.clientWidth / 2 - spaceBeetwen / 2 - ballBlue.clientWidth + 'px' : document.body.clientWidth / 2 - ballBlue.clientWidth / 2 + 'px';
                        ballBlue.dataset.position = ballBlue.dataset.position === 'top' ? 'right' : ballBlue.dataset.position === 'right' ? 'bottom' : ballBlue.dataset.position === 'bottom' ? 'left' : 'top';
                        ballRed.style.top = ballRed.dataset.position === 'top' ? document.body.clientHeight / 2 - ballRed.clientHeight / 2 + 'px' : ballRed.dataset.position === 'right' ? document.body.clientHeight / 2 + spaceBeetwen / 2 + 'px' : ballRed.dataset.position === 'bottom' ? document.body.clientHeight / 2 - ballRed.clientHeight / 2 + 'px' : document.body.clientHeight / 2 - spaceBeetwen / 2 - ballRed.clientHeight + 'px';
                        ballRed.style.left = ballRed.dataset.position === 'top' ? document.body.clientWidth / 2 + spaceBeetwen / 2 + 'px' : ballRed.dataset.position === 'right' ? document.body.clientWidth / 2 - ballRed.clientWidth / 2 + 'px' : ballRed.dataset.position === 'bottom' ? document.body.clientWidth / 2 - spaceBeetwen / 2 - ballRed.clientWidth + 'px' : document.body.clientWidth / 2 - ballRed.clientWidth / 2 + 'px';
                        ballRed.dataset.position = ballRed.dataset.position === 'top' ? 'right' : ballRed.dataset.position === 'right' ? 'bottom' : ballRed.dataset.position === 'bottom' ? 'left' : 'top';
                        ballGreen.style.top = ballGreen.dataset.position === 'top' ? document.body.clientHeight / 2 - ballGreen.clientHeight / 2 + 'px' : ballGreen.dataset.position === 'right' ? document.body.clientHeight / 2 + spaceBeetwen / 2 + 'px' : ballGreen.dataset.position === 'bottom' ? document.body.clientHeight / 2 - ballGreen.clientHeight / 2 + 'px' : document.body.clientHeight / 2 - spaceBeetwen / 2 - ballGreen.clientHeight + 'px';
                        ballGreen.style.left = ballGreen.dataset.position === 'top' ? document.body.clientWidth / 2 + spaceBeetwen / 2 + 'px' : ballGreen.dataset.position === 'right' ? document.body.clientWidth / 2 - ballGreen.clientWidth / 2 + 'px' : ballGreen.dataset.position === 'bottom' ? document.body.clientWidth / 2 - spaceBeetwen / 2 - ballGreen.clientWidth + 'px' : document.body.clientWidth / 2 - ballGreen.clientWidth / 2 + 'px';
                        ballGreen.dataset.position = ballGreen.dataset.position === 'top' ? 'right' : ballGreen.dataset.position === 'right' ? 'bottom' : ballGreen.dataset.position === 'bottom' ? 'left' : 'top';
                        ballYellow.style.top = ballYellow.dataset.position === 'top' ? document.body.clientHeight / 2 - ballYellow.clientHeight / 2 + 'px' : ballYellow.dataset.position === 'right' ? document.body.clientHeight / 2 + spaceBeetwen / 2 + 'px' : ballYellow.dataset.position === 'bottom' ? document.body.clientHeight / 2 - ballYellow.clientHeight / 2 + 'px' : document.body.clientHeight / 2 - spaceBeetwen / 2 - ballYellow.clientHeight + 'px';
                        ballYellow.style.left = ballYellow.dataset.position === 'top' ? document.body.clientWidth / 2 + spaceBeetwen / 2 + 'px' : ballYellow.dataset.position === 'right' ? document.body.clientWidth / 2 - ballYellow.clientWidth / 2 + 'px' : ballYellow.dataset.position === 'bottom' ? document.body.clientWidth / 2 - spaceBeetwen / 2 - ballYellow.clientWidth + 'px' : document.body.clientWidth / 2 - ballYellow.clientWidth / 2 + 'px';
                        ballYellow.dataset.position = ballYellow.dataset.position === 'top' ? 'right' : ballYellow.dataset.position === 'right' ? 'bottom' : ballYellow.dataset.position === 'bottom' ? 'left' : 'top';
                    }
                });
            }
        }
    });
}

function spawnBall(position, color) {
    const ball = document.createElement('div');
    ball.style.position = 'absolute';
    ball.style.width = '30px';
    ball.style.height = '30px';
    ball.style.borderRadius = '50%';
    ball.style.backgroundColor = color === 'Blue' ? '#2196F3' : '#F44336';
    ball.style.top = position === 'top' ? -30 + 'px' : document.body.clientHeight + 'px';
    ball.style.transition = 'all ' + (document.body.clientHeight / 1500) + 's';
    document.body.appendChild(ball);
    setTimeout(function () {
        ball.style.top = position === 'top' ? document.body.clientHeight / 2 - spaceBeetwen / 2 - (ball.clientHeight * 2) + 'px' : document.body.clientHeight / 2 + spaceBeetwen / 2 + ball.clientHeight + 'px';
        setTimeout(function () {
            let theball;
            if (position === 'top') {
                theball = document.getElementById('ballBlue').dataset.position === 'top' ? document.getElementById('ballBlue') : document.getElementById('ballRed');
            } else {
                theball = document.getElementById('ballBlue').dataset.position === 'bottom' ? document.getElementById('ballBlue') : document.getElementById('ballRed');
            }
            if (color === 'Blue') {
                if (theball.id === 'ballBlue') {
                    ball.remove();
                    ballSave.innerHTML = 'Balls saved: ' + (parseInt(ballSave.innerHTML.split(' ')[2]) + 1);
                } else {
                    confirm('Game Over\nBalls saved: ' + ballSave.innerHTML.split(' ')[2] + '\nDo you want to play again?') ? location.reload() : alert('Thanks for playing!\nRefresh the page to play again');
                    play = false;
                }
            } else {
                if (theball.id === 'ballRed') {
                    ball.remove();
                    ballSave.innerHTML = 'Balls saved: ' + (parseInt(ballSave.innerHTML.split(' ')[2]) + 1);
                } else {
                    confirm('Game Over\nBalls saved: ' + ballSave.innerHTML.split(' ')[2] + '\nDo you want to play again?') ? location.reload() : alert('Thanks for playing!\nRefresh the page to play again');
                    play = false;
                }
            }
        }, (document.body.clientHeight / 1500) * 1000) + 5;
    }, 10);
}

function spawnBallHard(position, color) {
    const ball = document.createElement('div');
    ball.style.position = 'absolute';
    ball.style.width = '30px';
    ball.style.height = '30px';
    ball.style.borderRadius = '50%';
    ball.style.backgroundColor = color === 'Blue' ? '#2196F3' : color === 'Red' ? '#F44336' : color === 'Green' ? '#4CAF50' : '#FFEB3B';
    ball.style.top = position === 'top' ? -30 + 'px' : document.body.clientHeight + 'px';
    ball.style.transition = 'all ' + (document.body.clientHeight / 1000) + 's';
    document.body.appendChild(ball);
    setTimeout(function () {
        ball.style.top = position === 'top' ? document.body.clientHeight / 2 - spaceBeetwen / 2 - (ball.clientHeight * 2) + 'px' : document.body.clientHeight / 2 + spaceBeetwen / 2 + ball.clientHeight + 'px';
        setTimeout(function () {
            let theball;
            if (position === 'top') {
                theball = document.getElementById('ballBlue').dataset.position === 'top' ? document.getElementById('ballBlue') : document.getElementById('ballRed').dataset.position === 'top' ? document.getElementById('ballRed') : document.getElementById('ballGreen').dataset.position === 'top' ? document.getElementById('ballGreen') : document.getElementById('ballYellow');
            } else {
                theball = document.getElementById('ballBlue').dataset.position === 'bottom' ? document.getElementById('ballBlue') : document.getElementById('ballRed').dataset.position === 'bottom' ? document.getElementById('ballRed') : document.getElementById('ballGreen').dataset.position === 'bottom' ? document.getElementById('ballGreen') : document.getElementById('ballYellow');
            }
            if (color === 'Blue') {
                if (theball.id === 'ballBlue') {
                    ball.remove();
                    ballSave.innerHTML = 'Balls saved: ' + (parseInt(ballSave.innerHTML.split(' ')[2]) + 1);
                } else {
                    confirm('Game Over\nBalls saved: ' + ballSave.innerHTML.split(' ')[2] + '\nDo you want to play again?') ? location.reload() : alert('Thanks for playing!\nRefresh the page to play again');
                    play = false;
                }
            } else if (color === 'Red') {
                if (theball.id === 'ballRed') {
                    ball.remove();
                    ballSave.innerHTML = 'Balls saved: ' + (parseInt(ballSave.innerHTML.split(' ')[2]) + 1);
                } else {
                    confirm('Game Over\nBalls saved: ' + ballSave.innerHTML.split(' ')[2] + '\nDo you want to play again?') ? location.reload() : alert('Thanks for playing!\nRefresh the page to play again');
                    play = false;
                }
            } else if (color === 'Green') {
                if (theball.id === 'ballGreen') {
                    ball.remove();
                    ballSave.innerHTML = 'Balls saved: ' + (parseInt(ballSave.innerHTML.split(' ')[2]) + 1);
                } else {
                    confirm('Game Over\nBalls saved: ' + ballSave.innerHTML.split(' ')[2] + '\nDo you want to play again?') ? location.reload() : alert('Thanks for playing!\nRefresh the page to play again');
                    play = false;
                }
            } else {
                if (theball.id === 'ballYellow') {
                    ball.remove();
                    ballSave.innerHTML = 'Balls saved: ' + (parseInt(ballSave.innerHTML.split(' ')[2]) + 1);
                } else {
                    confirm('Game Over\nBalls saved: ' + ballSave.innerHTML.split(' ')[2] + '\nDo you want to play again?') ? location.reload() : alert('Thanks for playing!\nRefresh the page to play again');
                    play = false;
                }
            }
        }, (document.body.clientHeight / 1000) * 1000) + 5;
    }, 10);
}
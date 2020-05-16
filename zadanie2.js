const gameDiv = document.querySelector('#game');
const canvas = gameDiv.querySelector('canvas');
const c = canvas.getContext('2d');

const col = 10, row = 5;

let leftKey = false, rightKey = false;

let racket;
let ball;
let blocks = [];

init();
document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);
game();
var interval = setInterval(game, 5);

function game() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    ball.x += ball.dx;
    ball.y += ball.dy;
    setRacket();
    checkColisions();
    drawBall();
    drawBlocks();
    
}

function gameOver() {
    c.fillText("Game over!", 250, 400);
}

function winGame() {
    c.fillText(" You win!!!", 250, 400);
}

function gameEnd() {
    clearInterval(interval);
    c.font = "100px Arial";
}

function checkColisions() {
    checkWallColisions();
    checkBlocksColisions();
    checkracketColisions();
}

function checkracketColisions() {
    if ((ball.x + ball.dx + ball.ray >= racket.x) &&
        (ball.x + ball.dx - ball.ray <= racket.x + racket.width) &&
        (ball.y + ball.dy + ball.ray >= racket.y) &&
        (ball.y + ball.dy - ball.ray <= racket.y + racket.height)) {
            if (ball.y + ball.ray < racket.y && ball.y + ball.dy + ball.ray >= racket.y) {
                ball.dy = -ball.dy;
            }
            else if (ball.x - ball.ray < racket.x && ball.x + ball.dx + ball.ray >= racket.x) {
                ball.dx = -ball.dx;
                ball.dy = -ball.dy;
            }
            else if (ball.x - ball.ray > racket.x + racket.width && ball.x + ball.dx - ball.ray <= racket.x + racket.width) {
                ball.dx = -ball.dx;
                ball.dy = -ball.dy;
            }
            
    }
}

function checkBlocksColisions() {
    blocks.forEach(b => {
        if (b.active) {
            if ((ball.x + ball.dx + ball.ray >= b.x) &&
                (ball.x + ball.dx - ball.ray <= b.x + b.width) &&
                (ball.y + ball.dy + ball.ray >= b.y) &&
                (ball.y + ball.dy - ball.ray <= b.y + b.height)) {
                b.active = false;
                if (ball.x - ball.ray < b.x && ball.x + ball.dx + ball.ray >= b.x) {
                    ball.dx = -ball.dx;
                }
                if (ball.x - ball.ray > b.x + b.width && ball.x + ball.dx - ball.ray <= b.x + b.width) {
                    ball.dx = -ball.dx;
                }
                if (ball.y + ball.ray < b.y && ball.y + bal.dy + ball.ray >= b.y) {
                    ball.dy = -ball.dy;
                }
                if (ball.y - ball.ray > b.y + b.height && ball.y + ball.dy - ball.ray <= b.y + b.height) {
                    ball.dy = -ball.dy;
                }
            }
        }
    }
    );
}

function checkWallColisions() {
    if (ball.x < ball.ray) {
        ball.x = ball.ray;
        ball.dx = -ball.dx;
    }
    else if (ball.x > canvas.width - ball.ray) {
        ball.x = canvas.width - ball.ray;
        ball.dx = -ball.dx;
    }
    else if (ball.y < 0) {
        ball.y = 0;
        ball.dy = -ball.dy;
    }
    else if (ball.y > canvas.height - ball.ray) {
        gameEnd();
        setTimeout(gameOver,500);
    }
}

function setRacket() {
    if (leftKey) {
        racket.x -= racket.dx;
        racket.currentSpeed = -racket.dx;
        if (racket.x < 0) {
            racket.x = 0;
        }
    } else if (rightKey) {
        racket.x += racket.dx;
        racket.currentSpeed = racket.dx;
        if (racket.x > canvas.width - racket.width) {
            racket.x = canvas.width - racket.width;
        }
    }
    drawRacket();
}

function keyDown(e) {
    if (e.keyCode == 39) {
        rightKey = true;
        leftKey = false;
    }
    else if (e.keyCode == 37) {
        leftKey = true;
        rightKey = false;
    }
}

function keyUp(e) {
    rightKey = false;
    leftKey = false;
}

function init() {
    initBlocks();
    initracket();
    initBall();
}

function initBall() {
    ball = {
        x: 500,
        y: 400,
        ray: 10,
        dx: 1,
        dy: -1
    };
    drawBall();
}

function initracket() {
    racket = {
        x: 400,
        y: 450,
        height: 20,
        width: 200,
        dx: 1,
        currentSpeed: 0
    }
}

function initBlocks() {
    let x = 0, y = 0;
    while (x < col && y < row) {
        blocks.push({
            x: (10 + x * 99),
            y: (10 + y * 50),
            height: 40,
            width: 89,
            active: true
        });
        x++;
        if (x === col) {
            x = 0;
            y++;
        }
    }

    drawBlocks();
}

function drawBall() {
    drawDisc(ball.x, ball.y, ball.ray, '#F2811D');
}

function drawBlocks() {
    let win = true;
    blocks.forEach(b => {
        b.active && drawRect(b.x, b.y, b.width, b.height, '#03588C');
        //b.active = false;
        if (b.active) win = false;
    });
    win && gameEnd();
    win && setTimeout(winGame,1000);
}

function drawRacket() {
    drawRect(racket.x, racket.y, racket.width, racket.height, '#D95204');
}

function drawRect(x, y, width, height, style) {
    c.fillStyle = style;
    c.strokeStyle = style;
    c.fillRect(x, y, width, height);
}

function drawDisc(x, y, ray, style) {
    c.fillStyle = style;
    c.strokeStyle = style;
    c.beginPath();
    c.arc(x, y, ray, 0, 2 * Math.PI);
    c.stroke();
    c.fill();
}
const canvasDiv = document.querySelector('#canvas-div')
const canvas = canvasDiv.querySelector('canvas');
const c = canvas.getContext('2d');
const colors = document.querySelector('#colors');
const shapes = document.querySelector('#shapes');
const editor = document.querySelector('#editor');
const setSizeButton = document.querySelector('#setSize');

let shape = 'rect'
let divHeight = '700';
let canvasHeight = String(Number(divHeight) - 150);

editor.style.height = divHeight + 'px'
canvas.height = canvasHeight;
canvas.width = canvasDiv.clientWidth;
c.fillStyle = '#03588C';
c.strokeStyle = '#03588C';

setSizeButton.addEventListener('click', function (event) {
    event.preventDefault();
    setHeght(document.getElementById("newHeight").value);
})

colors.addEventListener('click' , function (event) {
    event.preventDefault();
    c.fillStyle = '#' + event.target.id;
    c.strokeStyle = '#' + event.target.id;
})

canvas.addEventListener('click', function (event) {
    draw(event.offsetX, event.offsetY);
});

shapes.addEventListener('click', function (event) {
    shape = event.target.id;
    console.log(shape);
})

function setHeght(height) {
    canvasHeight = String(Number(height) - 140);
    editor.style.height = height + 'px'
    canvas.height = canvasHeight;
    canvas.width = canvasDiv.clientWidth;
}

function draw(x, y) {
    if (shape == "rect") {
        drawRectangle(x, y);
    } else if (shape == "fillRect") {
        drawFillRecnagle(x, y);
    } else if (shape == "circle") {
        drawCircle(x, y);
    } else if (shape == "disc") {
        drawDisc(x, y);
    }
}

function drawCircle(x, y) {
    c.beginPath();
    c.arc(x, y, 10, 0, 2 * Math.PI);
    c.stroke();
}

function drawDisc(x, y) {
    c.beginPath();
    c.arc(x, y, 10, 0, 2 * Math.PI);
    c.stroke();
    c.fill();
}

function drawRectangle(x, y) {
    c.strokeRect(x, y, 20, 20);
}

function drawFillRecnagle(x, y) {
    c.fillRect(x, y, 20, 20);
}

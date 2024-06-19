let canvas;
let ctx;
const wh = 60;
let x = 60;
let y = 60;
let showWinScreen = false;

const personImage = new Image();
personImage.src = '../images/person.png';

const obstacles = [
  [0, 60], [60, 120], [0, 180], [0, 240], [0, 300], [0, 360], [60, 420], [0, 480],
  [600, 60], [600, 120], [540, 180], [600, 240], [600, 300], [600, 360], [540, 420], [600, 480],
  [60, 0], [120, 0], [180, 60], [240, 60], [300, 0], [360, 0], [420, 0], [480, 60], [540, 0],
  [60, 540], [120, 540], [180, 480], [240, 480], [300, 540], [360, 540], [420, 540], [480, 540], [540, 540],
  [360, 120], [420, 120], [180, 180], [300, 180], [360, 180], [120, 240], [180, 240], [480, 240], [300, 300], [360, 300], [480, 300], [120, 360], [240, 360], [420, 360], [360, 420], [420, 420]
];

window.onload = () => {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 660;
  canvas.height = 600;

  draw();
};

const draw = () => {
  drawRect(0, 0, canvas.width, canvas.height, 'silver');

  drawRect(0, 0, canvas.width, wh, 'purple');
  drawRect(0, 0, wh, canvas.height, 'purple');
  drawRect(0, canvas.height - wh, canvas.width, wh, 'purple');
  drawRect(canvas.width - wh, 0, wh, canvas.height, 'purple');

  drawRect(180, wh, 120, wh, 'purple');
  drawRect(480, wh, wh, wh, 'purple');

  drawRect(wh, 120, wh, wh, 'purple');
  drawRect(360, 120, 120, wh, 'purple');
  drawRect(420, 120, wh, wh, 'purple');

  drawRect(180, 180, wh, wh, 'purple');
  drawRect(300, 180, 120, wh, 'purple');
  drawRect(540, 180, wh, wh, 'purple');

  drawRect(120, 240, 120, wh, 'purple');
  drawRect(480, 240, wh, wh, 'purple');

  drawRect(300, 300, 120, wh, 'purple');
  drawRect(480, 300, wh, wh, 'purple');

  drawRect(120, 360, wh, wh, 'purple');
  drawRect(240, 360, wh, wh, 'purple');
  drawRect(420, 360, wh, wh, 'purple');

  drawRect(wh, 420, wh, wh, 'purple');
  drawRect(360, 420, 120, wh, 'purple');
  drawRect(540, 420, wh, wh, 'purple');

  drawRect(180, 480, 120, wh, 'purple');

  // Draw the moving person image
  drawPerson(x, y);

  drawRect(540, 480, wh, wh, 'white');
};

const drawRect = (x, y, width, height, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

const drawPerson = (x, y) => {
  ctx.drawImage(personImage, x + wh / 8, y + wh / 8, wh - wh / 4, wh - wh / 4);
};

const checkWin = () => {
  if (x === 540 && y === 480) {
    ctx.font = '55px Verdana';
    ctx.fillStyle = 'gold';
    ctx.fillText('You won', canvas.width / 2 - 100, canvas.height / 2 - 40);
    showWinScreen = true;
  }
};

const move = (dx, dy) => {
  if (showWinScreen) return;

  drawRect(x, y, wh, wh, "silver");
  x += dx;
  y += dy;

  for (let i = 0; i < obstacles.length; i++) {
    if (x === obstacles[i][0] && y === obstacles[i][1]) {
      x = 60;
      y = 60;
      break;
    }
  }

  drawPerson(x, y);
  checkWin();
};

const left = () => move(-60, 0);
const right = () => move(60, 0);
const up = () => move(0, -60);
const down = () => move(0, 60);

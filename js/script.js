const canvas = document.getElementById('maze-canvas');
const ctx = canvas.getContext('2d');
const mazeWidth = 10;
const mazeHeight = 10;
const cellSize = canvas.width / mazeWidth;
const player = { x: 1, y: 1 }; // Starting position
const exit = { x: mazeWidth - 2, y: mazeHeight - 2 }; // Ending position
let gameOver = false;

// Predefined simple maze layout (0 represents walls, 1 represents paths)
const maze = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 1, 1, 0, 1, 0, 0],
  [0, 1, 0, 0, 0, 1, 0, 1, 0, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
  [0, 1, 0, 1, 1, 1, 0, 1, 0, 0],
  [0, 1, 0, 1, 0, 0, 0, 1, 1, 0],
  [0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const drawMaze = () => {
  ctx.fillStyle = '#eee';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#333';
  for (let y = 0; y < mazeHeight; y++) {
    for (let x = 0; x < mazeWidth; x++) {
      if (maze[y][x] === 0) {
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
};

const drawPlayer = () => {
  ctx.fillStyle = '#00f';
  ctx.fillRect(player.x * cellSize, player.y * cellSize, cellSize, cellSize);
};

const updateMessage = () => {
  const messageElement = document.getElementById('message');
  if (gameOver) {
    messageElement.textContent = 'You Win!';
  } else {
    messageElement.textContent = '';
  }
};

const handleKeyDown = (event) => {
  if (gameOver) return;
  const key = event.key;
  const newX = player.x;
  const newY = player.y;
  switch (key) {
    case 'ArrowUp':
      newY--;
      break;
    case 'ArrowDown':
      newY++;
      break;
    case 'ArrowLeft':
      newX--;
      break;
    case 'ArrowRight':
      newX++;
      break;
  }

  // Check for collisions and update player position
  if (newX >= 0 && newX < mazeWidth && newY >= 0 && newY < mazeHeight && maze[newY][newX] === 1) {
    player.x = newX;
    player.y = newY;
    if (player.x === exit.x && player.y === exit.y) {
      gameOver = true;
    }
  }

  drawMaze();
  drawPlayer();
  updateMessage();
};

document.addEventListener('keydown', handleKeyDown);

drawMaze();
drawPlayer();

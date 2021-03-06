var canvas = document.getElementById('mysnakegame');
var context = canvas.getContext('2d');
var grid = 16;
var count = 0;
var score = 0;
  
var snake = {
  x: 160,
  y: 160,

  dx: grid,
  dy: 0,
  
  cells: [],
  
  maxCells: 4
};
var elm = {
  x: 320,
  y: 320
};

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
  requestAnimationFrame(loop);

  if (++count < 4) {
    return;
  }
  count = 0;
  context.clearRect(0,0,canvas.width,canvas.height);
  snake.x += snake.dx;
  snake.y += snake.dy;
  
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  }
  else if (snake.x >= canvas.width) {
    snake.x = 0;
  }
 
  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  }
  else if (snake.y >= canvas.height) {
    snake.y = 0;
  }
  snake.cells.unshift({x: snake.x, y: snake.y});
 
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }
  
  context.fillStyle = 'red';
  context.fillRect(elm.x, elm.y, grid-1, grid-1);
  
  context.fillStyle = 'white';
  snake.cells.forEach(function(cell, index) {
    
  context.fillRect(cell.x, cell.y, grid-1, grid-1); 
	
  if (cell.x === elm.x && cell.y === elm.y) {
	  score+=10;
      snake.maxCells++;
	  document.getElementById('score').innerHTML = 'PUNKTY: ' +score;
	  
      elm.x = getRandom(0, 25) * grid;
      elm.y = getRandom(0, 25) * grid;
    }
  for (var i = index + 1; i < snake.cells.length; i++) {
      
    if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
		document.getElementById('score').innerHTML = 'PUNKTY: 0';
		score = 0;
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;
        elm.x = getRandom(0, 25) * grid;
        elm.y = getRandom(0, 25) * grid;
      }
    }
  });
}

function leftFunction(){
	snake.dx=-grid,
	snake.dy=0,
	document.getElementById('btn-right').disabled = true;
	document.getElementById('btn-top').disabled = false;
	document.getElementById('btn-down').disabled = false;
	}
function topFunction(){
	snake.dy=-grid,
	snake.dx=0,
	document.getElementById('btn-down').disabled = true;
	document.getElementById('btn-right').disabled = false;
	document.getElementById('btn-left').disabled = false;
	}
function rightFunction(){
	snake.dx=grid,
	snake.dy=0,
	document.getElementById('btn-left').disabled = true;
	document.getElementById('btn-top').disabled = false;
	document.getElementById('btn-down').disabled = false;
}
function downFunction(){
	snake.dy=grid,
	snake.dx=0,
	document.getElementById('btn-top').disabled = true;
	document.getElementById('btn-left').disabled = false;
	document.getElementById('btn-right').disabled = false;
	}

document.addEventListener('keydown', function(e) {
  
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});
requestAnimationFrame(loop);

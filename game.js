window.onload = function()
{
	var cvs = document.getElementById("canvas");
	var cxt = cvs.getContext("2d");
	
	var cvsW = cvs.width;
	var cvsH = cvs.height;
	
	var snakeW = 10; 
	var snakeH = 10;
	
	var direction = "right"; //default direction 
	var score = 4;
	
	document.addEventListener("keydown", getDirection);
	
	function getDirection(e)
	{
		if(e.keyCode == 37 && direction != "right" )
		{
			direction = "left";
		}
		else if(e.keyCode == 38 && direction != "down")
		{
			direction = "up";
		}
		else if(e.keyCode == 39 && direction != "left")
		{
			direction = "right";
		}
		else if(e.keyCode == 40 && direction != "up")
		{
			direction = "down";
		}
	}
	
	function drawSnake(x,y)
	{
	cxt.fillStyle = "white";
	cxt.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);
	
	cxt.fillStyle = "#000"; //black color
	cxt.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);
	
	}
	
	//Snake will be 4 cells long by default
	
	var len = 4;
	var snake = [];
	
	for(var i = len-1; i>=0; i--)
	{
		snake.push(
			{x:i,
			 y:0
			}
		);	
	}
	
	//create food and generate randomly
	food = {
		x : Math.round(Math.random()*(cvsW/snakeW-1)+2),
		y : Math.round(Math.random()*(cvsH/snakeH-1)+2)
	}
	
	function drawFood(x,y)
	{
		
		cxt.fillStyle = "#66ff33";
		cxt.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);
	
		cxt.fillStyle = "#000"; //black color
		cxt.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);
	}
	
	function checkCollision(x,y,array)
	{
		for(var i = 1; i<array.length; i++)
		{
			if(x == array[i].x && y == array[i].y)
			{
				return true;
			}	
		}
		
		return false;
	}
	
	function drawScore(x)
	{
		cxt.fillStyle = "#ff0000";
		cxt.font = "15px Verdana";
		cxt.fillText("Score : " +x, 5, cvsH-5);
	}
	
	function draw()
	{
		cxt.clearRect(0,0,cvsW,cvsH);
		for(var i=0; i<snake.length;i++)
		{
			var x = snake[i].x;
			var y = snake[i].y;
			drawSnake(x,y);
		}
		
	drawFood(food.x,food.y);
	
	//Snake Head
	var snakeX = snake[0].x;
	var snakeY = snake[0].y;
	
	//if snake hits any wall or itself, game over and reset
	if(snakeX < 0 || snakeY < 0 || snakeX >=cvsW/snakeW || snakeY >= cvsH/snakeH || checkCollision(snakeX,snakeY,snake))
	{
		window.location.reload();
	}
	
	//create new head based on previous head and direction
	
	if(direction == "left") snakeX--;
		
	else if(direction == "up") snakeY--;
		
	else if(direction == "right") snakeX++;
		
	else if(direction == "down") snakeY++;
	
	//if snake eats food
	if(snakeX == food.x && snakeY == food.y)
	{
		food = {
		x : Math.round(Math.random()*(cvsW/snakeW-1)+2),
		y : Math.round(Math.random()*(cvsH/snakeH-1)+2)
		}
		
		var newHead = {
		x : snakeX,
		y : snakeY
		
		};
		
		score++;
	}
	else
	{
		snake.pop();
		var newHead = {
		x : snakeX,
		y : snakeY
		
		};
	}
		
		snake.unshift(newHead);
		drawScore(score);
	
	}
	
	setInterval(draw,60);
}
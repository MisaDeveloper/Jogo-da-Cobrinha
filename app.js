
//Construção do Algoritmo
var play = false;
var buttonStart = document.getElementById('buttonStart');
var buttonReturn = document.getElementById('buttonReturn')
var stage = document.getElementById('stage');
var ctx = stage.getContext('2d');
var direction = 'right';
var box = 25;

//Definir corpo e posição da cobrinha
var snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

snake[1] = {
    x: 7 * box,
    y: 8 * box
}

//Definir corpo e posição da maçãzinha
var food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 17 + 1) * box
}

//Funções de criação
function createBG() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 20 * box, 20 * box);
    ctx.fillStyle = 'white';
    ctx.fillRect(box, box, 18 * box, 18 * box);
}

function createSnake() {
    for(var i=0; i<snake.length; i++) {
        ctx.fillStyle = 'green';
        ctx.fillRect(snake[i].x, snake[i].y, box - 1, box - 1);
    }
}

function createFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box)
}

createBG();
createFood();
createSnake();

document.addEventListener('keypress', function(event){
    if(event.code == "Enter" && !play || event.code == "NumpadEnter" && !play) {playGame()};
});

//Define a função de start game
function playGame() {
    play = true;
    buttonStart.style = 'display: none;';

    //Adicionar evento de prescionar botao
    document.addEventListener('keydown', update);
    function update(event) {
        if(event.keyCode == 37 && direction != 'right') {direction = 'left'};
        if(event.keyCode == 38 && direction != 'down') {direction = 'up'};
        if(event.keyCode == 39 && direction != 'left') {direction = 'right'};
        if(event.keyCode == 40 && direction != 'up') {direction = 'down'};
    }

    function game() {
        if(snake[0].x > 18 * box) {
            clearInterval(gameFrame);
            buttonReturn.style = 'display: block;';
        }
        else if(snake[0].x < box) {
            clearInterval(gameFrame);
            buttonReturn.style = 'display: block;';
        }
        else if(snake[0].y > 18 * box) {
            clearInterval(gameFrame);
            buttonReturn.style = 'display: block;';
        }
        else if(snake[0].y < box) {
            clearInterval(gameFrame);
            buttonReturn.style = 'display: block;';
        }

        for(i=1; i < snake.length; i++) {
            if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
                clearInterval(gameFrame);
                buttonReturn.style = 'display: block;';
            }
        }

        createBG();
        createFood();
        createSnake();

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if(direction == 'right') {snakeX += box};
        if(direction == 'left') {snakeX -= box};
        if(direction == 'up') {snakeY -= box};
        if(direction == 'down') {snakeY += box};

        if(snakeX != food.x || snakeY != food.y) {
            snake.pop();
        } else {
            food.x = Math.floor(Math.random() * 17 + 1) * box;
            food.y = Math.floor(Math.random() * 17 + 1) * box;
        }

        let newhead = {
            x: snakeX,
            y: snakeY
        }

        snake.unshift(newhead);
    }
    let gameFrame = setInterval(game, 110);
}


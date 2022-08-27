const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');

const timeList = document.querySelector('#time-list');
const timeEL = document.querySelector('#time');
const board = document.querySelector('#board');
let time = 0;
let score = 0;
startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up'); 
});

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        creatrRandomCircle();
    }
});

function startGame() {
    setInterval(decreaseTime, 1000);
    creatrRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
}

function setTime (value) {
    timeEL.innerHTML = `00:${value}`;
}

function finishGame() {
    timeEL.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`
};

function creatrRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    const color1 = '#' + getRandomNumber(1048576, 16777215).toString(16);
    const color2 = '#' + getRandomNumber(1048576, 16777215).toString(16);
    
    circle.style.background = `linear-gradient(45deg, ${color1} 47%, ${color2} 100%)`;
    circle.style.boxShadow = `0 0 2px 1px ${color2}, 0 0 15px 5px ${color1}`;

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;


    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16)
}
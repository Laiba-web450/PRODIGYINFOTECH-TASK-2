let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

const display = document.getElementById('display');
const laps = document.getElementById('laps');

document.getElementById('start').addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 100);
    }
});

document.getElementById('pause').addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
    }
});

document.getElementById('reset').addEventListener('click', () => {
    isRunning = false;
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    display.textContent = "00:00:00";
    laps.innerHTML = '';
});

document.getElementById('lap').addEventListener('click', () => {
    if (isRunning) {
        const lapTime = formatTime(Date.now() - startTime);
        const lapElement = document.createElement('div');
        lapElement.textContent = lapTime;
        laps.appendChild(lapElement);
    }
});

function updateTime() {
    const time = Date.now() - startTime;
    display.textContent = formatTime(time);
}

function formatTime(ms) {
    const date = new Date(ms);
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0').slice(0, 2);
    return `${minutes}:${seconds}:${milliseconds}`;
}

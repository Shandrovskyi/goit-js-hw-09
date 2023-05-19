// Отримуємо доступ до кнопок
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let delay = null;

// Функція генерування випадкового кольору
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }


// Пишемо функцію яка буде змінювати колір на випадкове значення
function changeForRandomColor(){
document.body.style.backgroundColor = getRandomHexColor();
};

// Функція яка запускає зміну кольору раз на секунду
function startChangingColor(){
    changeForRandomColor()     // щоб не було затримки при 1-му натисканні
    delay = setInterval(changeForRandomColor, 1000);
}


// Пишемо обробник подій Який викликає функцію staetChangingColor(зміна кольору)
startButton.addEventListener("click", () => {
    startChangingColor();
    startButton.disabled = true;
});


// зупиняю зміну кольору, коли кнопка «Stop» натиснута
stopButton.addEventListener("click", () => {
clearInterval(delay);
startButton.disabled = false;
});

    




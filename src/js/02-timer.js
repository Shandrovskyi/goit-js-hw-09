import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// Отримуємо refs 
const refs = {
  inputData: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  valueDays: document.querySelector('[data-days]'),
  valueHours: document.querySelector('[data-hours]'),
  valueMinutes: document.querySelector('[data-minutes]'),
  valueSeconds: document.querySelector('[data-seconds]'),
};


// Встановлюємо атрибут "disabled" для кнопки "Старт"
refs.startBtn.setAttribute('disabled', true);

let selectedDates;
let timeWork;


// ===================================================
// Налаштування для Flatpickr
const options = {
  enableTime: true,  // Дозволяє вибрати час
  time_24hr: true,  // Використовує 24-годинний формат часу
  defaultDate: new Date(), // Встановлює поточну дату та час як значення за замовчуванням
  minuteIncrement: 1, // Крок збільшення для вибору хвилин рівний 1
  onClose(selectedDatesArr) {
    selectedDates = selectedDatesArr[0];
// ======================================================



    // Перевіряємо, чи обрана дата є в майбутньому
    if (selectedDates < Date.now()) {
      refs.startBtn.setAttribute('disabled', true);
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    refs.startBtn.removeAttribute('disabled');
  },
};


// Функція, яка виконується при натисканні кнопки "Старт"
function onClickStartBtn() {
  refs.startBtn.setAttribute('disabled', true);
  refs.inputData.setAttribute('disabled', true);


  // Запускаємо таймер, який оновлює відображення часу
  timeWork = setInterval(() => {
    const differenceTime = selectedDates - Date.now();
    const timeComp = convertMs(differenceTime);
    showTime(timeComp);
    if (differenceTime < 1000) {
      Notiflix.Notify.success('час закінчився');
      clearInterval(timeWork);
      refs.inputData.removeAttribute('disabled');
    }
  }, 1000);
}

flatpickr(refs.inputData, options);


// ==========================================================
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
// =============================================================================



// Функція для відображення часу
function showTime({ days, hours, minutes, seconds }) {
  refs.valueDays.textContent = `${days}`;
  refs.valueHours.textContent = `${hours}`;
  refs.valueMinutes.textContent = `${minutes}`;
  refs.valueSeconds.textContent = `${seconds}`;
}


// Функція для додавання ведучого нуля до числа (якщо воно менше 10)
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}


// Додаємо обробник події на кнопку "Старт"
refs.startBtn.addEventListener('click', onClickStartBtn);
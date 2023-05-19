import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const dateTimePicker = document.getElementById("datetime-picker");
const dataStartButton = document.querySelector("[data-start]");

const daysSpan = document.querySelector("[data-days]");
const hoursSpan = document.querySelector("[data-hours]");
const minutesSpan = document.querySelector("[data-minutes]");
const secondsSpan = document.querySelector("[data-seconds]");
  
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onChange(selectedDates){
        const selectedDate = selectedDates[0];
        const now = new Date();
        const startButton = dataStartButton;
        if (selectedDate >= now) {
            startButton.disabled = false;
          } else {
            startButton.disabled = true;
          }
        },
    


    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      const now = new Date();

      if(selectedDate < now){
        window.alert("Please choose a date in the future");

      }else{
        console.log(selectedDate)
      }
    },
  };



// Додаємо слухач на імпут 
dateTimePicker.addEventListener("focus", (event) => {
    flatpickr(dateTimePicker, options);

});




// Додаємо обробник події до кнопки "Start"

dataStartButton.addEventListener("click", (event) => {
const selectedDate = flatpickr.parseDate(dateTimePicker.value, "Y-m-d H:i");
const now = new Date();

if(selectedDate >= now){
    const timeRemaining = selectedDate - now;
    const intervalId = setInterval(()=>{
        const remainingTime = selectedDate - new Date();
        if(remainingTime <= 0){
            console.log("Time's up!");
            clearInterval(intervalId);
            return;
        }
        function convertMs(ms) {
            // Number of milliseconds per unit of time
            const second = 1000;
            const minute = second * 60;
            const hour = minute * 60;
            const day = hour * 24;
          
            // Remaining days
            const days = Math.floor(ms / day);
            // Remaining hours
            const hours = Math.floor((ms % day) / hour);
            // Remaining minutes
            const minutes = Math.floor(((ms % day) % hour) / minute);
            // Remaining seconds
            const seconds = Math.floor((((ms % day) % hour) % minute) / second);
          
            return { days, hours, minutes, seconds };
          }
         

    });

}
});









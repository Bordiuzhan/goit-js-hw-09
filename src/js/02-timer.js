import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const ref = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  timerDays: document.querySelector('[data-days]'),
  timerHours: document.querySelector('[data-hours]'),
  timerMinutes: document.querySelector('[data-minutes]'),
  timerSeconds: document.querySelector('[data-seconds]'),
};
let startTime = 0;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startTime = selectedDates[0].getTime();
      ref.btnStart.removeAttribute('disabled');
    }
  },
};

flatpickr(ref.input, options);
ref.btnStart.setAttribute('disabled', true);

ref.btnStart.addEventListener('click', onStartClick);

function onStartClick() {
  ref.input.setAttribute('disabled', true);
  let timerId = setInterval(() => {
    const timerData = startTime - new Date();
    const timer = convertMs(timerData);
    if (timerData < 0) {
      ref.input.removeAttribute('disabled');
      return clearInterval(timerId);
    }
    ref.timerDays.textContent = addLeadingZero(timer.days);
    ref.timerHours.textContent = addLeadingZero(timer.hours);
    ref.timerMinutes.textContent = addLeadingZero(timer.minutes);
    ref.timerSeconds.textContent = addLeadingZero(timer.seconds);
  }, 1000);
  ref.btnStart.setAttribute('disabled', true);
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
function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}

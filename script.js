const inputContainer = document.getElementById('input-container');
const countDownForm = document.getElementById('countdownform');
const dateEl = document.getElementById('date-picker');

const countDownEl = document.getElementById('countdown');
const countDownElTitle = document.getElementById('countdown-title');
const countDownBtn = document.getElementById('countdown-button');
const timeElemets = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countDownTitle = '';
let countDownDate = '';
let countDownValue = Date;
let countDownActive;
let savedCountDown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

function updateDOM() {
  countDownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    inputContainer.hidden = true;

    if (distance < 0) {
      countDownEl.hidden = true;
      clearInterval(countDownActive);
      completeElInfo.textContent = `${countDownTitle} finished on ${countDownDate}`;
      completeEl.hidden = false;
    } else {
      countDownElTitle.textContent = `${countDownTitle}`;
      timeElemets[0].textContent = `${days}`;
      timeElemets[1].textContent = `${hours}`;
      timeElemets[2].textContent = `${minutes}`;
      timeElemets[3].textContent = `${seconds}`;

      completeEl.hidden = true;
      countDownEl.hidden = false;
    }

  }, second);
}

function updateCountDown(e) {
  e.preventDefault();

  countDownTitle = e.srcElement[0].value;
  countDownDate = e.srcElement[1].value;

  savedCountDown = {
    title: countDownTitle,
    date: countDownDate
  };

  localStorage.setItem('countdown', JSON.stringify(savedCountDown));

  if (countDownDate === '') {
    alert('Please select a date');
  } else if (countDownTitle === '') {
    alert('Please type a Name');
  } else {
    countDownValue = new Date(countDownDate).getTime();
    updateDOM();
  }
}

function reset() {
  countDownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;
  clearInterval(countDownActive);
  countDownTitle = '';
  countDownDate = '';

  localStorage.clear('countdown');
}

function restorePreviousCountDown() {
  if (localStorage.getItem('countdown')) {
    inputContainer.hidden = true;
    savedCountDown = JSON.parse(localStorage.getItem('countdown'));
    countDownTitle = savedCountDown.title;
    countDownDate = savedCountDown.date;
    countDownValue = new Date(countDownDate).getTime();
    updateDOM();
  }
}

countDownForm.addEventListener('submit', updateCountDown);
countDownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

restorePreviousCountDown();
let countdown;
const timeDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');


const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  //clear any existing timers
  clearInterval(countdown);

  //gives the current time stamp in milliseconds
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  // console.log({ now, then });
  //display the amount of time left, set an interval
  countdown = setInterval(() => {
    //figure out how much time is left on the clock
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    //create a stop feature
    if (secondsLeft <= 0) {
      clearInterval(countdown);
      return;
    }
    //displays time
    displayTimeLeft(secondsLeft);
  }, 1000);

}

function displayTimeLeft(seconds) {
  //convert to seconds and minutes
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  //update title tag on browser
  document.title = display;
  timeDisplay.textContent = display;
  console.log({ minutes });
  console.log(seconds);
}

//Show ending time "be back at x time"

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  endTime.textContent = `Be back at ${adjustedHour}:${minutes < 10 ? '00' : ''}${minutes}`;

}

//button functions
function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
  console.log(this);
}


buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const mins = this.minutes.value
  console.log(mins);
  timer(mins * 60);
  this.reset();
})

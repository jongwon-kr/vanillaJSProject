const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("#clock");

function getTime() {
  const today = new Date();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  clockTitle.innerText = `${Math.floor(hours) < 10 ? `0${Math.floor(hours)}` : Math.floor(hours)}:${
    Math.floor(minutes) < 10 ? `0${Math.floor(minutes)}` : Math.floor(minutes)
  }`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();

const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};
let changeColorId = null;

refs.stop.setAttribute('disabled', true);

refs.start.addEventListener('click', onStart);
refs.stop.addEventListener('click', onStop);

function onStart(e) {
  changeColorId = setInterval(
    () => (refs.body.style.backgroundColor = getRandomHexColor()),
    1000
  );
  refs.start.setAttribute('disabled', true);
  refs.stop.removeAttribute('disabled');
}
function onStop(e) {
  clearInterval(changeColorId);
  refs.start.removeAttribute('disabled');
  refs.stop.setAttribute('disabled', true);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

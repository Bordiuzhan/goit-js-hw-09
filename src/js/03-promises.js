import Notiflix, { Notify } from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const { delay, step, amount } = e.currentTarget;
  const position = Number(amount.value);
  let firstDelay = Number(delay.value);
  const stepDelay = Number(step.value);

  for (let i = 1; i <= position; i += 1) {
    createPromise(i, firstDelay);
    firstDelay += stepDelay;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  promise
    .then(() => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(() => {
      Notiflix, Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    })
    .finally(() => formEl.reset());
}

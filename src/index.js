import './style.scss';

let num = 0;

// Increase counter every second and update DOM element
setInterval(() => {
  document.querySelector('#main').innerHTML = /* html */`<p>You've been on this page for ${num} seconds.</p>`;
  num += 1;
}, 1000);

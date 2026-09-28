// script.js - Evil Reaction Test
const game = document.getElementById('game');
const title = document.getElementById('title');
const subtitle = document.getElementById('subtitle');
const videoDiv = document.getElementById('video');
const yt = document.getElementById('yt');

let state = 'waiting';

game.addEventListener('click', () => {
  if (state !== 'waiting') return;
  state = 'counting';
  startCountdown();
});

function startCountdown() {
  let count = 3;
  game.className = 'countdown';
  title.textContent = count;
  subtitle.textContent = 'Get ready...';

  const interval = setInterval(() => {
    count--;
    if (count > 0) {
      title.textContent = count;
      if (navigator.vibrate) navigator.vibrate(100);
    } else if (count === 0) {
      title.textContent = 'GO!';
      game.className = 'go';
      subtitle.textContent = '';
    } else {
      clearInterval(interval);
      rickroll();
    }
  }, 1000);
}

function rickroll() {
  videoDiv.style.display = 'block';
  yt.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0&loop=1&playlist=dQw4w9WgXcQ';
  game.style.display = 'none';
}

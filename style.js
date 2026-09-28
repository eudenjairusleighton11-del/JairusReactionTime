const game = document.getElementById('game');
const title = document.getElementById('title');
const subtitle = document.getElementById('subtitle');
const result = document.getElementById('result');
const bestEl = document.getElementById('best');
const retry = document.getElementById('retry');

let state = 'waiting';
let startTime, timeout;
let best = localStorage.getItem('best') || 9999;

function startReady() {
  state = 'ready';
  game.className = 'ready';
  title.textContent = 'Wait for GREEN...';
  subtitle.textContent = '';
  result.style.display = 'none';
  retry.style.display = 'none';

  // random wait 1 to 4 seconds
  let delay = Math.random() * 3000 + 1000;
  timeout = setTimeout(() => {
    state = 'go';
    game.className = 'go';
    title.textContent = 'TAP NOW!';
    startTime = Date.now(); // start timer
  }, delay);
}

game.addEventListener('click', () => {
  if (state === 'waiting') {
    startReady();
  } 
  else if (state === 'ready') {
    // clicked too early
    clearTimeout(timeout);
    title.textContent = 'Too Early! 😭';
    subtitle.textContent = 'Wait for green!';
    game.className = 'waiting';
    state = 'waiting';
  } 
  else if (state === 'go') {
    let reactionTime = Date.now() - startTime;
    result.style.display = 'block';
    result.textContent = reactionTime + ' ms';
    
    if (reactionTime < best) {
      best = reactionTime;
      localStorage.setItem('best', best);
    }
    
    title.textContent = reactionTime < 250 ? 'INSANE! ⚡' : 'Nice!';
    subtitle.textContent = `Best: ${best} ms`;
    game.className = 'waiting';
    state = 'waiting';
    retry.style.display = 'block';
  }
});

retry.addEventListener('click', (e) => {
  e.stopPropagation();
  title.textContent = '⚡ REACTION TEST';
  subtitle.textContent = 'Tap to start - wait for GREEN!';
  result.style.display = 'none';
  retry.style.display = 'none';
});

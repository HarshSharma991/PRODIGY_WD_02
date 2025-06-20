// Theme Toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Mode Switching
function switchMode(mode) {
  ['stopwatch', 'timer', 'clock'].forEach(id => {
    document.getElementById(id).classList.add('hidden');
  });
  document.getElementById(mode).classList.remove('hidden');
}

// Stopwatch
let swSeconds = 0, swRunning = false, swInterval, lapCount = 0;

function formatTime(s) {
  const hrs = String(Math.floor(s / 3600)).padStart(2, '0');
  const mins = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
  const secs = String(s % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

function startPauseStopwatch() {
  const btn = document.getElementById('sw-start');
  if (!swRunning) {
    swInterval = setInterval(() => {
      swSeconds++;
      document.getElementById('sw-display').textContent = formatTime(swSeconds);
    }, 1000);
    btn.textContent = 'Pause';
    swRunning = true;
  } else {
    clearInterval(swInterval);
    btn.textContent = 'Start';
    swRunning = false;
  }
}

function resetStopwatch() {
  clearInterval(swInterval);
  swSeconds = 0;
  swRunning = false;
  lapCount = 0;
  document.getElementById('sw-display').textContent = '00:00:00';
  document.getElementById('sw-laps').innerHTML = '';
  document.getElementById('sw-start').textContent = 'Start';
}

function lapStopwatch() {
  if (swRunning) {
    lapCount++;
    const lap = document.createElement('div');
    lap.textContent = `Lap ${lapCount}: ${formatTime(swSeconds)}`;
    document.getElementById('sw-laps').prepend(lap);
  }
}

// Timer
let timerInterval, timerRunning = false, timerSeconds = 0;

function startPauseTimer() {
  const min = +document.getElementById('min').value;
  const sec = +document.getElementById('sec').value;
  const btn = document.getElementById('timer-btn');

  if (!timerRunning) {
    if (timerSeconds === 0) {
      timerSeconds = min * 60 + sec;
    }
    if (timerSeconds <= 0) return;

    timerInterval = setInterval(() => {
      if (timerSeconds <= 0) {
        clearInterval(timerInterval);
        document.getElementById('timer-display').textContent = 'Done!';
        timerRunning = false;
        btn.textContent = 'Start';
        return;
      }
      timerSeconds--;
      const mins = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
      const secs = String(timerSeconds % 60).padStart(2, '0');
      document.getElementById('timer-display').textContent = `${mins}:${secs}`;
    }, 1000);
    btn.textContent = 'Pause';
    timerRunning = true;
  } else {
    clearInterval(timerInterval);
    btn.textContent = 'Start';
    timerRunning = false;
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerSeconds = 0;
  timerRunning = false;
  document.getElementById('timer-display').textContent = '00:00';
  document.getElementById('min').value = '';
  document.getElementById('sec').value = '';
  document.getElementById('timer-btn').textContent = 'Start';
}

// Clock
function updateClock() {
  const now = new Date();
  document.getElementById('clock-display').textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

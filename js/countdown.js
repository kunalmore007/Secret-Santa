const countdown = document.getElementById("countdown");
const christmas = new Date("Dec 25, 2026 00:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = christmas - now;

  if (diff <= 0) {
    countdown.innerHTML = "🎄 Merry Christmas!";
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  countdown.innerHTML = `
    <div>${d}<span>Days</span></div>
    <div>${h}<span>Hours</span></div>
    <div>${m}<span>Min</span></div>
    <div>${s}<span>Sec</span></div>
  `;
}, 1000);

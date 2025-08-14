let startTime = Date.now();
let timeInterval;
let flippedCount = 0;
let movieName = "Winter Soldier";
let movie2Name = "Captain america: winter soldier";
let movie3Name = "captain america : winter solider";
let movie4Name = "captain america :winter solider";

let totalFrames = 5;

let frameImages = [
  "assets/frame1.png",
  "assets/frame2.png",
  "assets/frame3.png",
  "assets/frame4.png",
  "assets/frame5.png"
];

function updateTimer() {
  let elapsed = Math.floor((Date.now() - startTime) / 1000);
  document.getElementById("time").textContent = elapsed;
}

timeInterval = setInterval(updateTimer, 1000);

const frameContainer = document.getElementById("frameContainer");
for (let i = 0; i < totalFrames; i++) {
  let frame = document.createElement("div");
  frame.className = "frame";
  frame.innerHTML = `
    <div class="frame-inner">
      <div class="frame-front">?</div>
      <div class="frame-back" style="background-image: url('${frameImages[i]}');"></div>
    </div>
  `;
  frame.addEventListener("click", () => {
    if (!frame.classList.contains("flipped")) {
      frame.classList.add("flipped");
      flippedCount++;
    }
  });
  frameContainer.appendChild(frame);
}

document.getElementById("guessBtn").addEventListener("click", () => {
  let guess = document.getElementById("guessInput").value.trim();
  if (
    guess.toLowerCase() === movieName.toLowerCase() ||
    guess.toLowerCase() === movie2Name.toLowerCase() ||
    guess.toLowerCase() === movie3Name.toLowerCase() ||
    guess.toLowerCase() === movie4Name.toLowerCase()
  ) {
    clearInterval(timeInterval);
    let timeTaken = document.getElementById("time").textContent;
    document.getElementById("result").textContent =
      `🎉 Correct! You found it in ${timeTaken} seconds using ${flippedCount} frames.`;

    let countdownTime = 2 * 60;
    let countdownEl = document.getElementById("countdown");

    let cdInterval = setInterval(() => {
      let min = String(Math.floor(countdownTime / 60)).padStart(2, "0");
      let sec = String(countdownTime % 60).padStart(2, "0");
      countdownEl.textContent = `Next movie in 00:${min}:${sec} hrs`;
      countdownTime--;
      if (countdownTime < 0) {
        clearInterval(cdInterval);
        countdownEl.textContent = "Next movie is ready!";
      }
    }, 1000);
  } else {
    document.getElementById("result").textContent = "❌ Wrong guess, try again!";
  }
});

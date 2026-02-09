const screens = {
  welcome: document.getElementById("welcome"),
  question: document.getElementById("question"),
  memories: document.getElementById("memories"),
  letter: document.getElementById("letter")
};

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const startBtn = document.getElementById("startBtn");
const letterBtn = document.getElementById("letterBtn");
const bgMusic = document.getElementById("bgMusic");

// Slideshow data (add more, change captions!)
const slides = [
  { src: "images/img1.jpeg", caption: "Our first date ☕" },
  { src: "images/img2.jpeg", caption: "That sunset we never forgot 🌅" },
  { src: "images/img3.jpeg", caption: "Laughing till we cried 😂" },
  { src: "images/img4.jpeg", caption: "Just us, forever ❤️" },
  { src: "images/img5.jpeg", caption: "My favorite place — your arms" }
];

let slideIndex = 0;
const slideImg = document.getElementById("slideImg");
const captionEl = document.getElementById("caption");

// Switch screen
function showScreen(screenName) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[screenName].classList.add("active");
}

// Floating hearts everywhere
function createHeart() {
  const heart = document.createElement("span");
  heart.textContent = ["❤", "💕", "💗", "💖"][Math.floor(Math.random()*4)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 18 + "px";
  heart.style.animationDuration = Math.random() * 6 + 7 + "s";
  document.querySelector(".hearts").appendChild(heart);
  setTimeout(() => heart.remove(), 15000);
}
setInterval(createHeart, 400);

// Burst of hearts when clicking Yes
function burstHearts() {
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const h = document.createElement("span");
      h.textContent = "❤";
      h.style.left = Math.random() * 100 + "vw";
      h.style.bottom = "-20px";
      h.style.fontSize = "40px";
      h.style.animation = "float 3s linear forwards";
      document.querySelector(".hearts").appendChild(h);
      setTimeout(() => h.remove(), 3000);
    }, i * 50);
  }
}

// No button runs away (better version)
noBtn.addEventListener("mouseover", () => {
  const maxX = window.innerWidth - noBtn.offsetWidth - 50;
  const maxY = window.innerHeight - noBtn.offsetHeight - 50;
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;
  noBtn.style.position = "fixed";
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
});

// Start button
startBtn.addEventListener("click", () => {
  showScreen("question");
  bgMusic.volume = 0.5;
  bgMusic.play();
});

// Yes → memories
yesBtn.addEventListener("click", () => {
  showScreen("memories");
  burstHearts();
  startSlideshow();
});

// Letter button
letterBtn.addEventListener("click", () => {
  showScreen("letter");
});

// Slideshow
function startSlideshow() {
  let i = 0;
  function next() {
    slideImg.style.opacity = 0;
    setTimeout(() => {
      i = (i + 1) % slides.length;
      slideImg.src = slides[i].src;
      captionEl.textContent = slides[i].caption;
      captionEl.style.opacity = 1;
      slideImg.style.opacity = 1;
    }, 600);
  }
  next();
  setInterval(next, 4500);
}

// Restart
function restart() {
  showScreen("welcome");
  bgMusic.pause();
  bgMusic.currentTime = 0;
}

// Keyboard fun (press Y for yes)
document.addEventListener("keydown", e => {
  if (e.key.toLowerCase() === "y" && screens.question.classList.contains("active")) {
    yesBtn.click();
  }
});
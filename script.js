const screens = {
  welcome: document.getElementById("welcome"),
  question: document.getElementById("question"),
  memories: document.getElementById("memories"),
  happyLetter: document.getElementById("happyLetter"),
  sadLetter: document.getElementById("sadLetter")
};

const bgMusic = document.getElementById("bgMusic");
const mainHeart = document.getElementById("mainHeart");
const sadMessage = document.getElementById("sadMessage");
const maybeBtn = document.getElementById("maybeBtn");
const yesBtn = document.getElementById("yesBtn");
const startBtn = document.getElementById("startBtn");
const slideImg = document.getElementById("slideImg");
const captionEl = document.getElementById("caption");
const video = document.getElementById("memoryVideo");
const happyTextEl = document.getElementById("happyLetterText");
const sadTextEl = document.getElementById("sadLetterText");

// ── Content you can edit ──
const slides = [
  { src: "images/img1.jpeg", caption: "The day we met" },
  { src: "images/img2.jpeg", caption: "Our first adventure" },
  { src: "images/img3.jpeg", caption: "When you smiled at me" },
  { src: "images/img4.jpeg", caption: "My favorite moment" },
  { src: "images/img5.jpeg", caption: "You make everything better" }
];

const happyLetterContent = `
I still remember the first time I saw you...  
My heart knew something beautiful had just entered my life.

Every laugh, every hug, every quiet moment with you  
has become the best parts of my days.

You are my safe place, my biggest joy, my favorite person.  
I choose you, every single day.

Forever yours,  
[Your Name] ❤️
`.trim();

const sadLetterContent = `
Okay... "maybe" ten times... 😔

Each time you clicked maybe, I felt another little crack in my heart.  
I was really hoping for a "yes", but I guess maybe is better than no...

Still love you though.  
Even when you're unsure, I'm sure about you.

With a slightly cracked but still beating heart,  
[Your Name] 💔→❤️
`.trim();

// ── Helpers ──
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
}

function typeWriter(text, element, speed = 45) {
  element.innerHTML = "";
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      element.scrollTop = element.scrollHeight;
    } else {
      clearInterval(interval);
    }
  }, speed);
}

function createHeart() {
  const heart = document.createElement("span");
  heart.textContent = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 22 + 18 + "px";
  heart.style.animationDuration = Math.random() * 6 + 7 + "s";
  document.querySelector(".hearts").appendChild(heart);
  setTimeout(() => heart.remove(), 15000);
}
setInterval(createHeart, 500);

// ── Maybe button logic ──
let maybeCount = 0;
const MAX_MAYBE = 10;

function moveMaybeButton() {
  const maxX = window.innerWidth - maybeBtn.offsetWidth - 50;
  const maxY = window.innerHeight - maybeBtn.offsetHeight - 50;
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;
  maybeBtn.style.position = "fixed";
  maybeBtn.style.left = x + "px";
  maybeBtn.style.top = y + "px";
}

// Click (phone) + hover (desktop)
maybeBtn.addEventListener("click", handleMaybeClick);
maybeBtn.addEventListener("mouseenter", moveMaybeButton);

function handleMaybeClick() {
  maybeCount++;
  moveMaybeButton();

  if (maybeCount <= MAX_MAYBE) {
    mainHeart.className = `main-heart broken-${maybeCount}`;
  }

  if (maybeCount >= MAX_MAYBE) {
    sadMessage.classList.add("visible");

    setTimeout(() => {
      showScreen("sadLetter");
      typeWriter(sadLetterContent, sadTextEl, 50);
    }, 1600);
  }
}

// ── Yes path ──
yesBtn.addEventListener("click", () => {
  showScreen("memories");
  bgMusic.volume = 0.45;
  bgMusic.play().catch(() => {});
  startSlideshow();
});

// ── Slideshow + video sequence ──
let slideIndex = 0;
let slideshowTimer;

function startSlideshow() {
  slideImg.parentElement.style.display = "block";
  video.style.display = "none";

  function next() {
    slideImg.style.opacity = 0;
    setTimeout(() => {
      slideImg.src = slides[slideIndex].src;
      captionEl.textContent = slides[slideIndex].caption;
      slideImg.style.opacity = 1;

      slideIndex++;
      if (slideIndex >= slides.length) {
        clearInterval(slideshowTimer);
        setTimeout(() => {
          slideImg.parentElement.style.display = "none";
          video.style.display = "block";
          video.play();
        }, 2800);
      }
    }, 600);
  }

  next();
  slideshowTimer = setInterval(next, 3800);
}

video.addEventListener("ended", () => {
  setTimeout(() => {
    showScreen("happyLetter");
    typeWriter(happyLetterContent, happyTextEl, 45);
  }, 1200);
});

// ── Start button ──
startBtn.addEventListener("click", () => {
  showScreen("question");
  bgMusic.volume = 0.4;
  bgMusic.play().catch(() => {});
});

// ── Restart buttons ──
document.getElementById("restartHappy").addEventListener("click", () => location.reload());
document.getElementById("restartSad").addEventListener("click", () => location.reload());
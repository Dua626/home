// ==================== COMPLETE UPDATED script.js ====================

const screens = {
  welcome: document.getElementById("welcome"),
  question: document.getElementById("question"),
  memories: document.getElementById("memories"),
  happyLetter: document.getElementById("happyLetter"),
  sadLetter: document.getElementById("sadLetter"),
  quiz: document.getElementById("quiz"),
  score: document.getElementById("score"),
  revealPage: document.getElementById("revealPage")
};

const bgMusic = document.getElementById("bgMusic");
const mainHeart = document.getElementById("mainHeart");
const sadMessage = document.getElementById("sadMessage");
const maybeBtn = document.getElementById("maybeBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const slideImg = document.getElementById("slideImg");
const captionEl = document.getElementById("caption");
const video = document.getElementById("memoryVideo");
const happyTextEl = document.getElementById("happyLetterText");
const sadTextEl = document.getElementById("sadLetterText");
const maybeFeedback = document.getElementById("maybeFeedback");

// Quiz & Reveal elements
const questionText = document.getElementById("questionText");
const optionsDiv = document.getElementById("options");
const currentQ = document.getElementById("currentQ");
const scoreNumber = document.getElementById("scoreNumber");
const scoreTitle = document.getElementById("scoreTitle");
const rememberBtn = document.getElementById("rememberBtn");
const startRevealBtn = document.getElementById("startRevealBtn");
const categoryReveal = document.getElementById("categoryReveal");
const initialRevealView = document.getElementById("initialRevealView");
const catTitle = document.getElementById("catTitle");
const catImage = document.getElementById("catImage");
const catReason = document.getElementById("catReason");
const prevCatBtn = document.getElementById("prevCatBtn");
const nextCatBtn = document.getElementById("nextCatBtn");
const finalReveal = document.getElementById("finalReveal");

// Grid alternating elements
const grid1 = document.getElementById("grid1");
const grid2 = document.getElementById("grid2");

// ── Content ──
const slides = [
  { src: "images/img1.jpeg", caption: "The day we met" },
  { src: "images/img2.jpeg", caption: "Our first adventure" },
  { src: "images/img3.jpeg", caption: "When you smiled at me" },
  { src: "images/img4.jpeg", caption: "My favorite moment" },
  { src: "images/img5.jpeg", caption: "You make everything better" }
];

const happyLetterContent = `You are my safe place, my biggest joy, my favorite person. I choose you, every single day. Forever yours ❤️`.trim();

const sadLetterContent = `Okay... ten times... 😔 Each time you clicked maybe, I felt another little crack in my heart. Still love you though. Even when you're unsure, I'm sure about you. 💔`.trim();

const maybeMessages = [
  "I knew you'd pick this one 😏",
  "You sure about that? 🤨",
  "Guess we're not joking anymore huh…",
  "Still maybe? 🥺",
  "My heart is starting to worry…",
  "Okay… keep going if you're brave",
  "This is getting serious now",
  "You're really testing me huh",
  "Just one more and I might cry fr",
  "Alr I guess u have made ur mind… 😔"
];

const quizQuestions = [
  { q: "What is my favorite color?", a: "Purple", options: ["Blue", "Purple", "Pink", "Black"] },
  { q: "What food do I always steal from your plate?", a: "Sajji", options: ["Biryani", "Sajji", "Burger", "Pizza"] },
  { q: "Which character do I love most?", a: "Shinobu", options: ["Anya", "Shinobu", "Luffy", "Nezuko"] },
  { q: "What season makes me happiest?", a: "Spring", options: ["Rain", "Winter", "Summer", "Spring"] },
  { q: "What drink do I secretly love?", a: "Fanta", options: ["Coke", "Fanta", "Khajoor shake", "Tea"] },
  { q: "What is my secret hobby?", a: "Witchcraft", options: ["Gaming", "Witchcraft", "Cooking", "Reading"] },
  { q: "Who is my favorite protagonist?", a: "Luffy", options: ["Naruto", "Luffy", "Goku", "Ichigo"] }
];

const myAnswers = [
  { cat: "Animal", img: "images/1.jpeg", reason: "goldfish; because he has a 10 sec memory 😂" },
  { cat: "Place", img: "images/2.jpeg", reason: "ocean where two oceans meet; because the sight has always been breathtaking for me.. he has the perfect blend of spiritual and worldly sides." },
  { cat: "Flower", img: "images/3.jpeg", reason: "black rose; because he has that elegant and royal beauty... soft and pure once someone gets to know him." },
  { cat: "Food", img: "images/4.jpeg", reason: "sajji; because this has been my most favourite meal ever since I started going with him." },
  { cat: "Character", img: "images/5.jpeg", reason: "Luffy; no explanation needed — he resembles Luffy so much.. he cares for everyone." },
  { cat: "Hobby", img: "images/6.jpeg", reason: "photography; because he knows I want to record him all the time.. he’s just so breathtaking." },
  { cat: "Colour", img: "images/7.jpeg", reason: "golden; because he shines so bright that his presence has brought light into my life." },
  { cat: "Season", img: "images/8.jpeg", reason: "Rain; because he loves rain... but to me, the smile that rain brings to his lips is worth every good news." },
  { cat: "Drink", img: "images/9.jpeg", reason: "khajoor shake; just because it feels so tasty and perfectly complements our route." }
];

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
    } else {
      clearInterval(interval);
    }
  }, speed);
}

// Floating hearts logic
function createHeart() {
  const activeScreen = document.querySelector(".screen.active");
  const heartsContainer = activeScreen?.querySelector(".hearts");
  if (!heartsContainer) return;
  const heart = document.createElement("span");
  heart.textContent = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 15 + "px";
  heart.style.animationDuration = Math.random() * 5 + 5 + "s";
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 8000);
}
setInterval(createHeart, 600);

// ── No button ──
noBtn.addEventListener("click", () => {
  showScreen("sadLetter");
  typeWriter("A 'no' happens in a heartbeat, but the sting lasts much longer. I'll always care for you though. 😔", sadTextEl);
});

// ── Maybe button logic ──
let maybeCount = 0;
const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

function moveMaybeButton() {
  if (isMobile) return; // Stays fixed on mobile
  const x = Math.random() * (window.innerWidth - maybeBtn.offsetWidth - 40) + 20;
  const y = Math.random() * (window.innerHeight - maybeBtn.offsetHeight - 40) + 20;
  maybeBtn.style.position = "fixed";
  maybeBtn.style.left = x + "px";
  maybeBtn.style.top = y + "px";
}

if (!isMobile) maybeBtn.addEventListener("mouseenter", moveMaybeButton);

maybeBtn.addEventListener("click", () => {
  maybeCount++;
  if (!isMobile) moveMaybeButton();
  if (maybeCount <= 10) {
    mainHeart.className = `main-heart broken-${maybeCount}`;
    maybeFeedback.textContent = maybeMessages[maybeCount - 1];
    maybeFeedback.classList.add("visible");
    if (maybeCount === 10) {
      setTimeout(() => {
        showScreen("sadLetter");
        typeWriter(sadLetterContent, sadTextEl);
      }, 1500);
    }
  }
});

// ── Music + Video ──
video.onplay = () => { bgMusic.pause(); };
video.onended = () => {
  setTimeout(() => {
    bgMusic.play().catch(() => {});
    showScreen("happyLetter");
    typeWriter(happyLetterContent, happyTextEl);
  }, 1000);
};

// ── Yes path ──
yesBtn.addEventListener("click", () => {
  showScreen("memories");
  bgMusic.volume = 0.45;
  bgMusic.play().catch(() => {});
  startSlideshow();
});

// ── Slideshow ──
let slideIndex = 0;
function startSlideshow() {
  slideImg.parentElement.style.display = "block";
  video.style.display = "none";
  const timer = setInterval(() => {
    slideIndex++;
    if (slideIndex >= slides.length) {
      clearInterval(timer);
      slideImg.parentElement.style.display = "none";
      video.style.display = "block";
      video.play();
    } else {
      slideImg.src = slides[slideIndex].src;
      captionEl.textContent = slides[slideIndex].caption;
    }
  }, 3500);
  slideImg.src = slides[0].src;
  captionEl.textContent = slides[0].caption;
}

startBtn.onclick = () => showScreen("question");
nextBtn.onclick = () => { showScreen("quiz"); startQuiz(); };

// ── Quiz ──
let qIdx = 0;
let quizScore = 0;
function startQuiz() { qIdx = 0; quizScore = 0; loadQ(); }
function loadQ() {
  if (qIdx >= quizQuestions.length) {
    showScreen("score");
    const p = Math.round((quizScore / quizQuestions.length) * 100);
    scoreNumber.textContent = p + "%";
    scoreTitle.textContent = p >= 80 ? "You know me perfectly! ❤️" : "We need more dates! 😉";
    return;
  }
  const q = quizQuestions[qIdx];
  questionText.textContent = q.q;
  currentQ.textContent = qIdx + 1;
  optionsDiv.innerHTML = "";
  q.options.forEach(opt => {
    const b = document.createElement("button");
    b.textContent = opt;
    b.onclick = () => { if (opt === q.a) quizScore++; qIdx++; loadQ(); };
    optionsDiv.appendChild(b);
  });
}

// ── Reveal Sequence ──
let revealIdx = 0;
rememberBtn.onclick = () => {
  showScreen("revealPage");
  let t = true;
  setInterval(() => {
    grid1.classList.toggle("hidden", !t);
    grid2.classList.toggle("hidden", t);
    t = !t;
  }, 2000);
};

startRevealBtn.onclick = () => {
  initialRevealView.classList.add("hidden");
  categoryReveal.classList.remove("hidden");
  showCat();
};

nextCatBtn.onclick = () => {
  revealIdx++;
  if (revealIdx < myAnswers.length) showCat();
  else { categoryReveal.classList.add("hidden"); finalReveal.classList.remove("hidden"); }
};

prevCatBtn.onclick = () => { if (revealIdx > 0) { revealIdx--; showCat(); } };

function showCat() {
  const item = myAnswers[revealIdx];
  catTitle.textContent = item.cat;
  catImage.src = item.img;
  catReason.textContent = item.reason;
}

document.getElementById("restartSad").onclick = () => location.reload();
document.getElementById("seeMemoriesAgain").onclick = () => { slideIndex = 0; showScreen("memories"); startSlideshow(); };
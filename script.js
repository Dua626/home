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
  { q: "What drink do I secretly love?", a: "Fanta", options: ["Coke", "Fanta", "Khajoor shake", "Tea"] }
];

const myAnswers = [
  { cat: "Animal", img: "images/1.jpeg", reason: "goldfish; because he has a 10 sec memory 😂" },
  { cat: "Place", img: "images/2.jpeg", reason: "ocean where two oceans meet; because the sight has always been breathtaking for me.. and it makes me realize how perfectly the universe is crafted by God.. just two oceans meeting.. he has the perfect blend of spiritual and worldly sides — his personalities don’t cancel each other but complement each other and create perfect balance 🌊" },
  { cat: "Flower", img: "images/3.jpeg", reason: "black rose; because he has that elegant and royal beauty that doesn’t make him look soft.. but he is actually soft and pure once someone gets to know him closely.. from far, a black rose might look dominating or proud, but for anyone who truly wants to see him, they’ll know he has a good heart at his core 🖤" },
  { cat: "Food", img: "images/4.jpeg", reason: "sajji; because this has been my most favourite meal ever since I started going with him.. I never knew I would enjoy something again and again like this.. if we don’t go, I feel like I haven’t eaten anything.. sajji has become my comfort food now 🍗" },
  { cat: "Character", img: "images/5.jpeg", reason: "Luffy; no explanation needed — he resembles Luffy so much.. from his smile to the way he walks, talks, eats, and most importantly how he cares for everyone.. Luffy is a kid but carries his whole crew with grace and care.. same with him — he’s not that old, but he’s ready to carry the weight of the world on his shoulders 🏴‍☠️" },
  { cat: "Hobby", img: "images/6.jpeg", reason: "photography; because he knows I want to take pictures of him and record him all the time.. he’s just so breathtaking.. I would do anything to see him smile again and again 📸" },
  { cat: "Colour", img: "images/7.jpeg", reason: "golden; because he shines so bright that his presence has brought light into my life.. and only mine.. and so many others’ lives.. I believe whichever path he takes, his scent, light, and positive aura stay there for a very long time ✨" },
  { cat: "Season", img: "images/8.jpeg", reason: "Rain; because he loves rain and always says that rain brings happiness and good news.. but to me, the smile that rain brings to his lips is worth every good news 🌧️" },
  { cat: "Drink", img: "images/9.jpeg", reason: "khajoor shake; just because it feels so tasty and perfectly complements our route 🥤" }
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
      element.scrollTop = element.scrollHeight;
    } else {
      clearInterval(interval);
    }
  }, speed);
}

// Floating hearts only on screens with .hearts
function createHeart() {
  const activeScreen = document.querySelector(".screen.active");
  const heartsContainer = activeScreen?.querySelector(".hearts");
  if (!heartsContainer) return;
  const heart = document.createElement("span");
  heart.textContent = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 22 + 18 + "px";
  heart.style.animationDuration = Math.random() * 6 + 7 + "s";
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 15000);
}
setInterval(createHeart, 500);

// ── No button ──
noBtn.addEventListener("click", () => {
  maybeFeedback.textContent = "Ouch.. that hurts but dw I'll still love you 😔❤️";
  maybeFeedback.classList.add("visible");
  noBtn.disabled = true;
  maybeBtn.disabled = true;
  yesBtn.disabled = true;
  setTimeout(() => {
    showScreen("sadLetter");
    typeWriter(sadLetterContent, sadTextEl, 50);
  }, 2800);
});

// ── Maybe button logic ──
let maybeCount = 0;
const MAX_MAYBE = 10;
const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

function moveMaybeButton() {
  if (isMobile) return;
  const container = document.querySelector("#question .content");
  const containerRect = container.getBoundingClientRect();
  const btnWidth = maybeBtn.offsetWidth;
  const btnHeight = maybeBtn.offsetHeight;
  const safeMinY = containerRect.top + 280;
  const safeMaxY = window.innerHeight - btnHeight - 60;
  const safeMinX = 40;
  const safeMaxX = window.innerWidth - btnWidth - 40;
  let x = Math.random() * (safeMaxX - safeMinX) + safeMinX;
  let y = Math.random() * (safeMaxY - safeMinY) + safeMinY;
  x = Math.max(20, Math.min(x, safeMaxX));
  y = Math.max(safeMinY, Math.min(y, safeMaxY - 100));
  maybeBtn.style.position = "fixed";
  maybeBtn.style.left = x + "px";
  maybeBtn.style.top = y + "px";
}

if (!isMobile) maybeBtn.addEventListener("mouseenter", moveMaybeButton);
maybeBtn.addEventListener("click", handleMaybeClick);

function handleMaybeClick() {
  maybeCount++;
  if (!isMobile) moveMaybeButton();
  if (maybeCount <= MAX_MAYBE) {
    mainHeart.className = `main-heart broken-${maybeCount}`;
    maybeFeedback.textContent = maybeMessages[maybeCount - 1];
    maybeFeedback.classList.add("visible");
    if (maybeCount === MAX_MAYBE) {
      setTimeout(() => {
        sadMessage.classList.add("visible");
        setTimeout(() => {
          showScreen("sadLetter");
          typeWriter(sadLetterContent, sadTextEl, 50);
        }, 1600);
      }, 1400);
    }
  }
}

// ── Music + Video ──
video.addEventListener("play", () => { if (!bgMusic.paused) bgMusic.pause(); });
video.addEventListener("ended", () => {
  setTimeout(() => {
    bgMusic.play().catch(() => {});
    setTimeout(() => {
      showScreen("happyLetter");
      typeWriter(happyLetterContent, happyTextEl, 45);
    }, 1200);
  }, 800);
});

// ── Yes path ──
yesBtn.addEventListener("click", () => {
  showScreen("memories");
  bgMusic.volume = 0.45;
  bgMusic.play().catch(() => {});
  startSlideshow();
});

// ── Slideshow ──
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

// ── Start button ──
startBtn.addEventListener("click", () => showScreen("question"));

// ── Happy Letter → Next ──
nextBtn.addEventListener("click", () => {
  showScreen("quiz");
  startQuiz();
});

// ── Quiz ──
let currentQuestionIndex = 0;
let quizScore = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  quizScore = 0;
  loadQuizQuestion();
}

function loadQuizQuestion() {
  if (currentQuestionIndex >= quizQuestions.length) {
    showScoreScreen();
    return;
  }
  const q = quizQuestions[currentQuestionIndex];
  questionText.textContent = q.q;
  currentQ.textContent = currentQuestionIndex + 1;
  optionsDiv.innerHTML = "";
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => {
      if (opt === q.a) quizScore++;
      currentQuestionIndex++;
      loadQuizQuestion();
    };
    optionsDiv.appendChild(btn);
  });
}

function showScoreScreen() {
  const percent = Math.round((quizScore / quizQuestions.length) * 100);
  scoreNumber.textContent = percent + "%";
  scoreTitle.textContent = percent >= 80 ? "You know me better than anyone ❤️" : "Not bad… but we need more dates together 😉";
  showScreen("score");
}

// ── Score → Reveal Page ──
rememberBtn.addEventListener("click", () => {
  showScreen("revealPage");
  initTemplateReveal();
});

// ── Reveal Page Logic ──
let revealIndex = 0;
let gridInterval = null;

function initTemplateReveal() {
  grid1.classList.remove("hidden");
  grid2.classList.add("hidden");
  startRevealBtn.style.display = "block";
  categoryReveal.classList.add("hidden");
  finalReveal.classList.add("hidden");

  // Start alternating animation
  let showGrid1 = true;
  gridInterval = setInterval(() => {
    if (showGrid1) {
      grid1.classList.add("hidden");
      grid2.classList.remove("hidden");
    } else {
      grid2.classList.add("hidden");
      grid1.classList.remove("hidden");
    }
    showGrid1 = !showGrid1;
  }, 1200); // change every 1.2 seconds
}

startRevealBtn.addEventListener("click", () => {
  clearInterval(gridInterval);
  startRevealBtn.style.display = "none";
  categoryReveal.classList.remove("hidden");
  revealIndex = 0;
  showNextCategory();
});

// Minimal arrow navigation
prevCatBtn.addEventListener("click", () => {
  revealIndex--;
  if (revealIndex < 0) revealIndex = 0;
  showNextCategory();
});

nextCatBtn.addEventListener("click", () => {
  revealIndex++;
  if (revealIndex < myAnswers.length) {
    showNextCategory();
  } else {
    categoryReveal.classList.add("hidden");
    finalReveal.classList.remove("hidden");
  }
});

function showNextCategory() {
  const item = myAnswers[revealIndex];
  catTitle.textContent = item.cat;
  catImage.src = item.img;
  catReason.textContent = item.reason;
}

// ── Sad Letter Try Again ──
document.getElementById("restartSad").addEventListener("click", () => {
  location.reload(); // or showScreen("welcome") if you prefer
});

// ── Restart buttons ──
document.getElementById("restartHappy").addEventListener("click", () => location.reload());
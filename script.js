// ==================== COMPLETE UPDATED script.js ====================

const screens = {
  welcome: document.getElementById("welcome"),
  question: document.getElementById("question"),
  memories: document.getElementById("memories"),
  happyLetter: document.getElementById("happyLetter"),
  sadLetter: document.getElementById("sadLetter"),
  quiz: document.getElementById("quiz"),
  score: document.getElementById("score"),
  // New split sections
  revealIntro: document.getElementById("revealIntro"),
  revealCategory: document.getElementById("revealCategory"),
  revealFinal: document.getElementById("revealFinal")
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

// Category elements
const catTitle = document.getElementById("catTitle");
const catImage = document.getElementById("catImage");
const catReason = document.getElementById("catReason");
const prevCatBtn = document.getElementById("prevCatBtn");
const nextCatBtn = document.getElementById("nextCatBtn");

// Grid alternating elements
const grid1 = document.getElementById("grid1");
const grid2 = document.getElementById("grid2");

// Media Frame for Swipe Logic
const mediaFrame = document.querySelector(".media-frame");
let touchStartX = 0;
let touchEndX = 0;

// ── Content ──
const slides = [
  { src: "images/img1.jpeg", caption: "The day I made up mind (again)" },
  { src: "images/img2.jpeg", caption: "The beginning of our route" },
  { src: "images/img3.jpeg", caption: "V.Bad girl of V.Good Sensei" },
  { src: "images/img4.jpeg", caption: "Well we alr know you're a gift" },
  { src: "images/img5.jpeg", caption: "This day has special place in my heart" }
];

const happyLetterContent = `You are my safe place, my biggest joy, and the best gift ever given to me.🎀 There's a lot I wanna say but ik you won't read it😶 so keeping it short.. I just wanna thank you for always taking care of me and make me feel loved.. and specailly safe (so safe that I don't have to hold back my tears in front of u). You have no idea how positively You've chnaged me as a person. And I've litrally started loving everything after u made me see the world through your eyes. I am always gonna be your biggest supporter and I WILL make sure u never feel alone or unseen at any point of your life💗. I will always stand by your side and do my best to help u make your dreams come true (no matter how silly they might seem to u). As long as I'm alive.. u never have to worry about fighting any battle alone.. And even after I'm dead my Duas will always be by your side.. (these are not just words.. I'll make sure u feel their presence like u feel the wind. (Your Dua will always be with you!❤️))  `.trim();

const sadLetterContent = `Okay... Guess I went too far with my delusions💔 But just so you know My love for u doesn't come with conditions (not even of u loving me back) I will still be your biggest supporter and keep my arms open to hold u and all your worries at any point of your life (and I mean it!) If u ever feel alone.. just remember your Dua is always looking out for you and trying to make sure that if she can't reach her Sensei.. her Duas will! 🖤`.trim();

const maybeMessages = [
  "I knew you'd pick this 😶",
  "You sure about that? 🤨",
  "Guess we're not joking anymore huh…😖",
  "Still maybe? 🤨",
  "Okay… keep going if you're brave 🥺",
  "Thkk",
  "Wow you're persistent (So am I tho😁)",
  "Well a 'maybe' is better than a 'No'😖",
  "Just one more and I might cry fr🥺",
  "Alr I guess this is it💔"
];

const quizQuestions = [
  { q: "When Did u propose me?", a: "29 Aug 2024", options: ["27 Aug 2024", "29 Aug 2024", "30 Aug 2024", "1st Sep 2024"] },
  { q: "When did we officially started our relationship?", a: "31 Aug 2024", options: ["29 Aug 2024", "30 Aug 2024", "31 Aug 2024", "1st Sep 2024"] },
  { q: "Where did u first saw me?", a: "24 Sep 2024", options: ["27 Sep 2024", "22 Sep 2024", "24 Sep 2024", "1st Oct 2024"] },
  { q: "Where did we meet on our first day out?", a: "Cinnabon", options: ["Sweet Creme", "Cinnabon", "Crumble", "Sweet Rack"] },
  { q: "Which nickname do I like the most for u?", a: "Sensei", options: ["Mine", "Shehzade", "Sensei", "Goldfish"] },
  { q: "When did I come to your house for the first time?", a: "19 July 2025", options: ["19 June 2025", "19 July 2025", "19 Aug 2025", "19 Sep 2025"] },
  { q: "When did u come to my house for the first time?", a: "1st Jan 2026", options: ["30 Dec 2025", "31 Dec 2025", "1st Jan 2026", "2nd Jan 2026"] },
  { q: "Which of these do I like the most?", a: "Your Smile", options: ["Your Eyes", "Your Smile", "Your Ears", "Your Voice"] },
  { q: "When did we had 'Nikah' and went to Dogar for the firts time", a: "3 Sep 2025", options: ["2 Sep 2025", "3 Sep 2025", "4 Sep 2025", "5 Sep 2025"] },
  { q: "What nickname gave me the most butterflis when u say it?", a: "Meri Jaan", options: ["My Moon", "CupCake", "Nami", "Meri Jaan"] },
];

const myAnswers = [
  { cat: "Animal", img: "images/1.jpeg", reason: "Goldfish; because You have a literal 10 sec memory :D" },
  { cat: "Place", img: "images/2.jpeg", reason: "Where two oceans meet; because the sight has always been breathtaking for me.. and you have the perfect blend of spiritual and worldly sides.💞 U dont let the two mix.. but compliment each" },
  { cat: "Flower", img: "images/3.jpeg", reason: "Black Rose; because u have that elegant and royal beauty yet soft and pure once someone gets to know u from close.🖤" },
  { cat: "Food", img: "images/4.jpeg", reason: "Sajji; because this has been my most favourite meal ever since I started going with you.. Never Imagined I would crave something every other day💖" },
  { cat: "Character", img: "images/5.jpeg", reason: "Luffy; no explanation needed — You resemble Luffy so much.. Like from your smile to the way u carry the world around u.. You don't expect anything in return but genuinely wanna help everyone like luffy.. And just like he's too young but carries Big dreams.. Same goes for u.. You don't want the fame but a better world (And I have no doubt that you're gonna find your one piece IA❣️)" },
  { cat: "Hobby", img: "images/6.jpeg", reason: "photography; because u know I want to record u all the time.. I wanna see you smile again and again.💖" },
  { cat: "Colour", img: "images/7.jpeg", reason: "Golden; because you litrally shine!! No exageration but I can feel the brightness that your presence brings into my life.💝" },
  { cat: "Season", img: "images/8.jpeg", reason: "Rain; because u love rain... and I love u even more when u smile and feel happy suddenly everytime it rains..💕" },
  { cat: "Drink", img: "images/9.jpeg", reason: "Khoya Khajoor shake; just because it feels so tasty and our route is kinda incomplete without it.🤭" }
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
  typeWriter("A 'no' happens in a heartbeat, but the sting lasts much longer. yk me I will still love u and wait for u no matter what.", sadTextEl);
});

// ── Maybe button logic ──
let maybeCount = 0;
const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

function moveMaybeButton() {
  if (isMobile) return; 
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
  // Initialize unified media
  slideIndex = 0;
  updateMedia();
});

// ── Unified Memories Logic ──
let slideIndex = 0;

function updateMedia() {
  slideImg.classList.remove("hidden");
  video.style.display = "none";
  video.pause();

  if (slideIndex < slides.length) {
    slideImg.src = slides[slideIndex].src;
    captionEl.textContent = slides[slideIndex].caption;
    document.querySelector(".media-nav").style.display = "flex";
  } else {
    slideImg.classList.add("hidden");
    video.style.display = "block";
    captionEl.textContent = "I wanna see this smile of yours for the rest of my life... ❤️";
    video.play();
    document.querySelector(".media-nav").style.display = "none";
  }
}

function handleNext() {
  if (slideIndex <= slides.length - 1) {
    slideIndex++;
    updateMedia();
  }
}

function handlePrev() {
  if (slideIndex > 0) {
    slideIndex--;
    updateMedia();
  }
}

document.getElementById("nextSlide").onclick = handleNext;
document.getElementById("prevSlide").onclick = handlePrev;

if (mediaFrame) {
  mediaFrame.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
  }, false);

  mediaFrame.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
  }, false);
}

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) { handleNext(); }
    if (touchEndX > touchStartX + swipeThreshold) { handlePrev(); }
}

startBtn.onclick = () => showScreen("question");
nextBtn.onclick = () => { showScreen("quiz"); startQuiz(); };

// ── Quiz ──
let qIdx = 0;
let quizScore = 0;
function startQuiz() { qIdx = 0; quizScore = 0; loadQ(); }
function loadQ() {
  if (qIdx >= quizQuestions.length) {
    showScoreScreen();
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

function showScoreScreen() {
  const percent = Math.round((quizScore / quizQuestions.length) * 100);
  scoreNumber.textContent = percent + "%";
  scoreTitle.textContent = percent >= 80 ? "Wow Sensei! ❤️" : "Guess we gotta hangout more! 😉";
  
  const reviewList = document.getElementById("reviewList");
  if (reviewList) {
    reviewList.innerHTML = "";
    quizQuestions.forEach((q, index) => {
      const item = document.createElement("div");
      item.className = "review-item";
      item.innerHTML = `
        <p><strong>${index + 1}. ${q.q}</strong></p>
        <p class="correct-ans">Right Answer: ${q.a}</p>
      `;
      reviewList.appendChild(item);
    });
  }
  showScreen("score");
}

// ── Reveal Sequence (Split Pages) ──
let revealIdx = 0;

// 1. Go to Intro Page
rememberBtn.onclick = () => {
  showScreen("revealIntro"); // Shows the scrolling letter
  let t = true;
  setInterval(() => {
    grid1.classList.toggle("hidden", !t);
    grid2.classList.toggle("hidden", t);
    t = !t;
  }, 2000);
};

// 2. Go to Category Page
startRevealBtn.onclick = () => {
  showScreen("revealCategory"); // Shows the centered slider
  showCat();
};

// 3. Navigate Categories & Go to Final
nextCatBtn.onclick = () => {
  revealIdx++;
  if (revealIdx < myAnswers.length) showCat();
  else { 
    showScreen("revealFinal"); // Shows the final message
  }
};

prevCatBtn.onclick = () => { if (revealIdx > 0) { revealIdx--; showCat(); } };

function showCat() {
  const item = myAnswers[revealIdx];
  catTitle.textContent = item.cat;
  catImage.src = item.img;
  catReason.textContent = item.reason;
}

document.getElementById("restartSad").onclick = () => location.reload();
document.getElementById("seeMemoriesAgain").onclick = () => { 
  slideIndex = 0; 
  showScreen("memories"); 
  updateMedia(); 
};
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const question = document.getElementById("question");
const memories = document.getElementById("memories");
const bgMusic = document.getElementById("bgMusic");
const video = document.getElementById("memoryVideo");

const slides = [
  "images/img1.jpeg",
  "images/img2.jpeg",
  "images/img3.jpeg",
  "images/img4.jpeg",
  "images/img5.jpeg",
];

let index = 0;
const slideImg = document.getElementById("slideImg");

// No button runs away
noBtn.addEventListener("click", () => {
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 200 - 100;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});

// Yes button
yesBtn.addEventListener("click", () => {
  question.classList.remove("active");
  memories.classList.add("active");
  bgMusic.volume = 0.4;
  bgMusic.play();
  startSlideshow();
});

// Slideshow
function startSlideshow() {
  setInterval(() => {
    index = (index + 1) % slides.length;
    slideImg.src = slides[index];
  }, 3500);
}

// Pause music during video
video.addEventListener("play", () => bgMusic.pause());
video.addEventListener("ended", () => bgMusic.play());

// Floating hearts
setInterval(() => {
  const heart = document.createElement("span");
  heart.innerHTML = "❤";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 10 + 14 + "px";
  document.querySelector(".hearts").appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}, 800);

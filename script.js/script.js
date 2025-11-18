const greetingText = [
  "Welcome to Sweet Crumbs Bakery 🍰",
  "Freshly baked happiness every day 🧁",
  "Taste the joy in every bite 🥐"
];

let i = 0, j = 0, currentText = "", isDeleting = false;
function typeWriter() {
  currentText = greetingText[i].substring(0, j);
  document.getElementById("greeting").textContent = currentText;

  if (!isDeleting && j < greetingText[i].length) {
    j++;
    setTimeout(typeWriter, 80);
  } else if (isDeleting && j > 0) {
    j--;
    setTimeout(typeWriter, 40);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) i = (i + 1) % greetingText.length;
    setTimeout(typeWriter, 1500);
  }
}
typeWriter();
const toggle = document.getElementById("themeToggle");
const sound = new Audio("sounds/click.mp3");

toggle.addEventListener("click", () => {
  sound.play();
  body.classList.toggle("dark-mode");
  toggle.innerHTML = body.classList.contains("dark-mode")
    ? "☀ Light Mode"
    : "🌙 Dark Mode";
});
const modal = document.getElementById("specialModal");
const closeModal = document.getElementById("closeModal");

if (!sessionStorage.getItem("modalShown")) {
  setTimeout(() => {
    modal.style.display = "block";
    sessionStorage.setItem("modalShown", "true");
  }, 2500);
}

closeModal.onclick = () => modal.style.display = "none";

let slideIndex = 0;
const slides = document.getElementsByClassName("slide");

function showSlides() {
  for (let s of slides) s.style.display = "none";
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].style.display = "block";
}
setInterval(showSlides, 3000);

const galleryImages = document.querySelectorAll(".gallery img");
const lightbox = document.createElement("div");
lightbox.id = "lightbox";
document.body.appendChild(lightbox);

galleryImages.forEach(image => {
  image.addEventListener("click", () => {
    lightbox.classList.add("active");
    const lightImg = document.createElement("img");
    lightImg.src = image.src;
    lightbox.innerHTML = "";
    lightbox.appendChild(lightImg);
  });
});
lightbox.addEventListener("click", () => lightbox.classList.remove("active"));

window.addEventListener("scroll", () => {
  document.querySelectorAll(".reveal").forEach(el => {
    const position = el.getBoundingClientRect().top;
    if (position < window.innerHeight - 100) {
      el.classList.add("active-element");
    }
  });
});

document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name.length < 3) {
    alert("❌ Name must be at least 3 characters");
    return;
  }
  if (!email.includes("@") || email.length < 5) {
    alert("❌ Please enter a valid email address");
    return;
  }
  if (message.length < 10) {
    alert("❌ Message must be at least 10 characters");
    return;
    }

    const confetti = document.createElement("div");
  confetti.className = "confetti";
  document.body.appendChild(confetti);

  setTimeout(() => confetti.remove(), 3000);

  alert("🎉 Thank you! Your message has been sent successfully.");
  e.target.reset();
});


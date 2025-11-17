// Greeting
function displayGreeting() {
    const greeting = document.getElementById("greeting");
    const hour = new Date().getHours();
    let message = (hour < 12) ? "Good Morning! Start your day with freshly baked treats 🍞" :
                  (hour < 18) ? "Good Afternoon! Enjoy Sweet Crumbs Delights 🍪" :
                  "Good Evening! Treat yourself to cupcakes 🧁";
    greeting.textContent = message;
}
displayGreeting();

// Theme toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Modal popup
const modal = document.getElementById("specialModal");
const closeModal = document.getElementById("closeModal");
setTimeout(() => modal.style.display = "block", 2000);
closeModal.onclick = () => modal.style.display = "none";

// Image slider
let slideIndex = 0;
function showSlides() {
    const slides = document.getElementsByClassName("slide");
    for (let s of slides) s.style.display = "none";
    slideIndex = (slideIndex >= slides.length) ? 0 : slideIndex + 1;
    slides[slideIndex].style.display = "block";
    setTimeout(showSlides, 3000);
}
showSlides();

// Form validation
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("🎉 Thank you! Your message was submitted successfully.");
});

// Scroll reveal
window.addEventListener("scroll", () => {
    document.querySelectorAll(".reveal").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 50) el.classList.add("active");
    });
});

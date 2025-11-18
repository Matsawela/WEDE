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

// slideIndex is already declared above, so remove this redeclaration
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

function displayGreeting() {
    const greeting = document.getElementById("greeting");
    const hours = new Date().getHours();
    let message;

    if (hours < 12) message = "Good Morning, welcome to Sweet Crumbs Bakery! ☀️";
    else if (hours < 17) message = "Good Afternoon, treat yourself with sweetness today! 🍰";
    else message = "Good Evening, enjoy a delicious dessert from us! 🌙";

    greeting.textContent = message;
}
displayGreeting();

const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("themeMode", theme);
});
if (localStorage.getItem("themeMode") === "dark") {
    document.body.classList.add("dark-mode");
}

const revealElements = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
    revealElements.forEach((el) => {
        const revealTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (revealTop < windowHeight - 100) el.classList.add("active");
    });
});

window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("promoModal").style.display = "flex";
    }, 1500);
});
document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("promoModal").style.display = "none";
});

let slideIndex = 0;
function slideShow() {
  const slides = document.getElementsByClassName("slide");
  for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;
  slides[slideIndex - 1].style.display = "block";
  setTimeout(slideShow, 3000);
}
slideShow();
let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

function addToCart(productName, price, image) {
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: productName,
            price: price,
            image: image,
            quantity: 1
        });
    }

    updateCart();
    saveCart();
}

function updateCart() {
    const cartContainer = document.getElementById("cartItems");
    const totalDisplay = document.getElementById("totalPrice");

    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        cartContainer.innerHTML += `
        <div class="cart-item">
            <img src="${item.image}" class="cart-img">
            <h4>${item.name}</h4>
            <p>R${item.price} x ${item.quantity}</p>
            <button class="cart-btn" onclick="increaseItem(${index})">+</button>
            <button class="cart-btn" onclick="decreaseItem(${index})">-</button>
            <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
        </div>`;
    });

    totalDisplay.textContent = "Total: R" + total.toFixed(2);
}

function increaseItem(index) {
    cart[index].quantity++;
    updateCart();
    saveCart();
}

function decreaseItem(index) {
    cart[index].quantity--;
    if (cart[index].quantity === 0) cart.splice(index, 1);
    updateCart();
    saveCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
    saveCart();
}

function saveCart() {
    localStorage.setItem("cartItems", JSON.stringify(cart));
}

updateCart();

document.getElementById("clearCart").addEventListener("click", () => {
    if (confirm("Are you sure you want to clear your cart?")) {
        cart = [];
        updateCart();
        saveCart();
    }
});

document.getElementById("contactForm").addEventListener("submit", (e) => {
    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("emailAddress").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
        alert("Please fill in all fields before submitting!");
        e.preventDefault();
    } else {
        alert("Thank you for your message! We will get back to you soon 😊");
    }
});
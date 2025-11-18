function displayGreeting() {
    const hour = new Date().getHours();
    const greeting = document.getElementById("greeting");

    if (hour < 12) greeting.innerHTML = "Good Morning! Enjoy something sweet to start your day 🍩";
    else if (hour < 18) greeting.innerHTML = "Good Afternoon! Treat yourself to delicious pastries 🍰";
    else greeting.innerHTML = "Good Evening! Satisfy your cravings with our desserts 🌙";
}
displayGreeting();

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

const modal = document.getElementById("specialModal");
const closeModal = document.getElementById("closeModal");

setTimeout(() => { modal.style.display = "block"; }, 2000);
closeModal.addEventListener("click", () => modal.style.display = "none");

let slideIndex = 0;
function showSlides() {
    const slides = document.getElementsByClassName("slide");
    for (let s of slides) s.style.display = "none";
    slideIndex = (slideIndex + 1 > slides.length) ? 1 : slideIndex + 1;
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000);
}
showSlides();

let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }
    saveCart();
    updateCart();
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
          <button onclick="increaseItem(${index})">+</button>
          <button onclick="decreaseItem(${index})">-</button>
          <button onclick="removeItem(${index})">Remove</button>
        </div>
        `;
    });

    totalDisplay.textContent = "Total: R" + total.toFixed(2);
}

function increaseItem(index) {
    cart[index].quantity++;
    saveCart();
    updateCart();
}

function decreaseItem(index) {
    cart[index].quantity--;
    if (cart[index].quantity === 0) cart.splice(index, 1);
    saveCart();
    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCart();
}

function saveCart() {
    localStorage.setItem("cartItems", JSON.stringify(cart));
}

document.getElementById("clearCart").addEventListener("click", () => {
    if (confirm("Clear your cart?")) {
        cart = [];
        saveCart();
        updateCart();
    }
});

updateCart();

// Scroll reveal animation
window.addEventListener("scroll", () => {
    document.querySelectorAll(".reveal").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add("active");
        }
    });
});

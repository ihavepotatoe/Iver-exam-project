const cartItems = document.getElementById("cart-items");
const totalItems = document.getElementById("cart-total");
const clearCartBtn = document.getElementById("clear-cart-btn");
const checkoutBtn = document.getElementById("checkout-btn");

const CART_KEY = "examProjectCart";
let cartLoadFailed = false;

let cart = [];
try {
  cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
} catch (error) {
  console.error(error);
  checkoutBtn.style.display = "none";
  totalItems.style.display = "none";
  clearCartBtn.style.display = "none";

  cartLoadFailed = true;

  cartItems.innerHTML =
    "<p> something went wrong loading you cart. please try again later</p>";
}

if (!cartLoadFailed) {
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    checkoutBtn.style.display = "none";
    cartItems.innerHTML = "<p>Your cart is empty</p>";
    totalItems.textContent = "Total: 0 NOK";
    return;
  }

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
    <img src="${item.image}" alt="${item.title}">

    <div class="cart-item-info">
    <h2>${item.title}</h2>
    <p>Price: ${item.price} NOK</p>
    </div>

    <div class="quantity-btns">
    <button class="minus-btn">-</button>
    <span>${item.quantity}</span>
    <button class="plus-btn">+</button>
    </div>
    `;
    cartItems.appendChild(cartItem);

    const plusBtn = cartItem.querySelector(".plus-btn");
    const minusBtn = cartItem.querySelector(".minus-btn");

    plusBtn.addEventListener("click", () => {
      item.quantity++;

      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      renderCart();
    });

    minusBtn.addEventListener("click", () => {
      item.quantity--;
      if (item.quantity <= 0) {
        cart = cart.filter((cartItem) => cartItem.id !== item.id);
      }
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      renderCart();
    });
  });

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  totalItems.textContent = `total: ${total.toFixed(2)} NOK`;
}

clearCartBtn.addEventListener("click", () => {
  cart = [];

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCart();
});

import { headerBtnResuable } from "../cart/cartLogic.js";
headerBtnResuable();

const headerBtn = document.getElementById("header-btn");

const productMessage = document.getElementById("product-message");
productMessage.textContent = "Loading product";
const CART_KEY = "examProjectCart";

const token = localStorage.getItem("token");
const cartBtn = document.getElementById("cart-btn");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://v2.api.noroff.dev/online-shop/${id}`)
  .then((Response) => {
    if (!Response.ok) {
      throw new Error("could not load products");
    }
    return Response.json();
  })
  .then((data) => {
    const product = data.data;

    renderPage(product);

    productMessage.textContent = "";

    cartBtn.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

      const existingProduct = cart.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image.url || "",
          quantity: 1,
        });
      }
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      alert("product added to cart!");
    });
  })
  .catch((error) => {
    productMessage.textContent =
      "sorry, product would not load. please try again later";
  });

function renderPage(product) {
  document.getElementById("title").textContent = product.title;
  document.getElementById("image").src = product.image.url || "";
  document.getElementById("description").textContent = product.description;
  document.getElementById("price").textContent = product.price + " NOK";
  if (token) {
    cartBtn.style.display = "block";
  }
}

const shareBtn = document.getElementById("share-btn");
shareBtn.addEventListener("click", () => {
  const shareUrl = window.location.href;

  navigator.clipboard.writeText(shareUrl).then(() => {
    alert("product link copied!");
  });
});

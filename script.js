import { addProductToCart } from "./cart/cartLogic.js";
import { headerBtnResuable } from "./cart/cartLogic.js";
headerBtnResuable();

const headerBtn = document.getElementById("header-btn");

console.log("js is running");
const container = document.getElementById("product-list");
const gridContainer = document.getElementById("product-grid");

const token = localStorage.getItem("token");

const CART_KEY = "examProjectCart";

container.innerHTML = "<p>Loading featured products...</p>";
gridContainer.innerHTML = "<p>Loading products </p>";

fetch("https://v2.api.noroff.dev/online-shop")
  .then((Response) => {
    if (!Response.ok) {
      throw new Error("could not load products");
    }
    return Response.json();
  })
  .then((data) => {
    const products = data.data;

    const carouselProducts = products.slice(0, 12);
    let currentIndex = 0;

    const previousBtn = document.getElementById("previous-btn");
    const nextBtn = document.getElementById("next-btn");

    function showslide() {
      const start = currentIndex * 3;
      const end = start + 3;

      const visibleProducts = carouselProducts.slice(start, end);

      container.innerHTML = "";

      visibleProducts.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
        <a href="product/index.html?id=${product.id}">
        <img src="${product.image.url}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.price} NOK</p>
        </a>
        ${token ? `<button class="add-btn">Add to cart</button>` : ""}
`;
        container.appendChild(card);

        const addBtn = card.querySelector(".add-btn");

        if (addBtn) {
          addBtn.addEventListener("click", () => {
            addProductToCart(product);
          });
        }
      });
    }
    nextBtn.addEventListener("click", () => {
      currentIndex++;
      if (currentIndex > 3) currentIndex = 0;
      showslide();
    });

    previousBtn.addEventListener("click", () => {
      currentIndex--;
      if (currentIndex < 0) currentIndex = 3;
      showslide();
    });
    showslide();

    function showGrid() {
      gridContainer.innerHTML = "";
      const gridProducts = products.slice(0, 12);

      gridProducts.forEach((product) => {
        const gridCard = document.createElement("div");
        gridCard.classList.add("product-card");

        gridCard.innerHTML = `
        <a href="product/index.html?id=${product.id}">
        <img src="${product.image.url}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.price} NOK</p>
        </a>

        ${token ? `<button class="add-btn">Add to cart</button>` : ""}
`;
        gridContainer.appendChild(gridCard);

        const addBtn = gridCard.querySelector(".add-btn");

        if (addBtn) {
          addBtn.addEventListener("click", () => {
            addProductToCart(product);
          });
        }
      });
    }
    showGrid();
  })
  .catch((error) => {
    console.error(error);

    container.innerHTML = "<p>featured products failed to load properly</p>";
    gridContainer.innerHTML = "<p> products failed to load</p>";
  });

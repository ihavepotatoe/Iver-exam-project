const CART_KEY = "examProjectCart";

export function addProductToCart(product) {
  let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image.url,
      quantity: 1,
    });
  }
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  alert("product added to cart!");
}

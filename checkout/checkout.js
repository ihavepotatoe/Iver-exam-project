const form = document.getElementById("checkout-form");
const message = document.getElementById("message");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  message.textContent = "Processing purchase...";

  try {
    localStorage.removeItem("examProjectCart");

    window.location.href = "../success/index.html";
  } catch (error) {
    console.error(error);

    message.textContent = "something went wrong, please try again";
  }
});

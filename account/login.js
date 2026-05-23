const form = document.getElementById("login-form");
const message = document.getElementById("message");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;

  message.textContent = "Logging in";
  fetch("https://v2.api.noroff.dev/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      if (data.errors && data.errors.length > 0) {
        message.textContent = data.errors[0].message;
        return;
      }

      localStorage.setItem("token", data.data.accessToken);

      message.textContent = "Logged in successfully";

      window.location.href = "../index.html";
    })
    .catch((error) => {
      console.error(error);
      message.textContent = "Smething went wrong. try again later";
    });
});

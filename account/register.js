const form = document.getElementById("register-form");
const message = document.getElementById("message");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;

  message.textContent = "creating account";

  fetch("https://v2.api.noroff.dev/auth/register", {
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

      message.textContent = "account created succssesfully!";

      window.location.href = "../account/login.html";
    })
    .catch((error) => {
      console.error(error);
      message.textContent = "Smething went wrong. try again later";
    });
});

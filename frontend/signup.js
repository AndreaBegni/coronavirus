const registerButton = document.getElementById("registerButton");
const username = document.getElementById("username");
const password = document.getElementById("password");
const usernameErrorLabel = document.getElementById("usernameErrorLabel");

registerButton.onclick = e => {
  console.log(username.value);
  console.log(password.value);
  let url = "http://localhost:3000/users";
  let data = {
    username: username.value,
    password: password.value
  };
  const HTTPPost = {
    headers: {
      "content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(data),
    method: "POST"
  };
  fetch(url, HTTPPost)
    .then(response => response.json())
    .then(data => {
      if (data.success === "user registered")
        window.location.replace("http://localhost:5500/frontend/login.html");
      else if (data.error === "user alredy exists") {
        usernameErrorLabel.innerHTML = " *Username già esistente";
      }
    });
};

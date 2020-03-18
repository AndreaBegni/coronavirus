const registerButton = document.getElementById("loginButton");
const username = document.getElementById("username");
const password = document.getElementById("password");
const authErrorLabel = document.getElementById("authErrorLabel");

loginButton.onclick = () => {
  let url = "http://localhost:3000/users/" + username.value;
  let data = {
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
      if (data.authenticated){
        document.cookie = "token=" + data.token; 
        window.location.replace("http://localhost:5500/frontend/dashboard.html");
      }
      else if (!data.authenticated) {
        authErrorLabel.innerHTML = " Username o password errati";
      }
    });
};
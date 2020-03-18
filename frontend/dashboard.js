const actuallyPositiveLabel = document.getElementById("actuallyPositiveLabel");
const healedLabel = document.getElementById("healedLabel");
const deadLabel = document.getElementById("deadLabel");
const totalPositiveLabel = document.getElementById("totalPositiveLabel");
let token = document.cookie.split("=")[1];

loadData = async () => {
  let body = await fetch(
    "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json"
  ).then(r => r.json());
  let todayData = body[body.length - 1];
  actuallyPositiveLabel.innerHTML = todayData.totale_attualmente_positivi
  healedLabel.innerHTML = todayData.dimessi_guariti
  deadLabel.innerHTML = todayData.deceduti
  totalPositiveLabel.innerHTML = todayData.totale_casi
};

checkTokenValidity = () => {
  let url = "http://localhost:3000/test";
  const HTTPGet = {
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "x-access-token": token
    },
    method: "GET"
  };
  fetch(url, HTTPGet)
    .then(response => response.json())
    .then(data => {
      if (data.status === "ok") {
        loadData();
      } else if (data.error === "unauthorized") {
        window.location.replace("http://localhost:5500/frontend/login.html");
      }
    });
};

checkTokenValidity();

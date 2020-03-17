const dati = async () => {
  let body = await fetch(
    "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province.json"
  ).then(r => r.json());
  console.log(body);
};

dati()
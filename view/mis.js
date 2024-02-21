const btn = document.querySelector(".getURL");
const originUrl='http://localhost:8000/url';
const getShortUrl = async (err, res) => {
  const url = document.querySelector("#mainUrl").value;
  const entry = await fetch(originUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: url,
    }),
  });

  entry.json().then(makeUrl);
};
const makeUrl=(data) => {
    const newURL = originUrl+"/" + data.ID;
    document.querySelector(".shortUrl").innerHTML = newURL;
}
btn.addEventListener("click", getShortUrl);

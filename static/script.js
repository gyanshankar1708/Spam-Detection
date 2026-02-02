function checkSpam() {
  let msg = document.getElementById("msg").value;
  let col = "";
  const red = "#ff1b1b";
  const green = "#1ffc13";
  let resultDiv = document.getElementById("result");

  fetch("/predict", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "message=" + msg,
  })
    .then((res) => res.json())
    .then((data) => data.prediction)
    .then((prediction) => {
      if (prediction === "Spam") {
        col = red;
      } else {
        col = green;
      }
      resultDiv.innerHTML = `<h3 style="color:${col}">${prediction}</h3>`;
    });
}

document.getElementById("msg").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    checkSpam();
  }
});

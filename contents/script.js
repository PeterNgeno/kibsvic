function savePage() {
  const title = document.getElementById('titleInput').value;
  const description = document.getElementById('descInput').value;
  const font = document.getElementById('fontSelect').value;
  const textColor = document.getElementById('textColorInput').value;
  const bgColor = document.getElementById('bgColorInput').value;
  const animation = document.getElementById('animationSelect').value;
  const image = document.getElementById('imgLinkInput').value;
  const video = document.getElementById('videoLinkInput').value;

  const data = {
    title,
    description,
    font,
    textColor,
    bgColor,
    animation,
    image,
    video
  };

  fetch("YOUR_WEB_APP_URL_HERE", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.text())
  .then(msg => {
    alert("Page saved successfully!");
  })
  .catch(err => {
    console.error("Failed to save:", err);
    alert("Error saving the page");
  });
}

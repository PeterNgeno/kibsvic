const allowedPhones = ['0704956476', '0796029616'];
const adminPIN = '@Kibsvic';

function handleLogin() {
  const phone = document.getElementById("admin-phone").value.trim();
  const pin = document.getElementById("admin-pin").value.trim();

  if (allowedPhones.includes(phone) && pin === adminPIN) {
    localStorage.setItem("admin", "true");
    window.location.href = "page.html";
  } else {
    localStorage.removeItem("admin");
    window.location.href = "index.html";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("admin.html") || window.location.pathname.includes("page.html")) {
    const isAdmin = localStorage.getItem("admin") === "true";
    if (!isAdmin) {
      window.location.href = "admin-login.html";
      return;
    }
    if (window.location.pathname.includes("page.html")) loadTenderData();
  }
});

async function loadTenderData() {
  const sheetID = "1n9KojLvreFgSmY_1jFw43ibqjYw4xmJ2UcfUSuHqfDQ";
  const apiKey = localStorage.getItem("kibsvic_api_key");
  if (!apiKey) return alert("Missing API Key.");
  const range = "Sheet1!A:G";

  try {
    const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`);
    const data = await res.json();
    const rows = data.values;
    if (!rows || rows.length < 2) return;

    const tbody = document.getElementById("tender-data");
    tbody.innerHTML = "";
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const tr = document.createElement("tr");
      row.forEach(cell => {
        const td = document.createElement("td");
        td.textContent = cell || "";
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    }
  } catch (err) {
    alert("Failed to load data. Check your Google Sheet or API key.");
    console.error(err);
  }
}

// Pentru a selecta butoanele și formularul din HTML
const scrapeButton = document.getElementById("scrapeButton");
const insertForm = document.getElementById("insertForm");
const insertForm2 = document.getElementById("insertForm2");
const deleteForm = document.getElementById("deleteForm");

// Pentru a selecta tabelele din HTML
const scrapedTable = document.getElementById("scrapedTable");
const server1Table = document.getElementById("server1Table");
const server2Table = document.getElementById("server2Table");

// Funcție pentru afișarea datelor în tabel
function displayDataInTable(data, table) {
  // Golește tabelul
  table.innerHTML = "";

  // Adaugă capul de tabel
  const thead = table.createTHead();
  const headerRow = thead.insertRow();
  for (let key in data[0]) {
    const th = document.createElement("th");
    th.textContent = key;
    headerRow.appendChild(th);
  }

  // Adaugă rândurile în tabel
  const tbody = table.createTBody();
  data.forEach((item) => {
    const row = tbody.insertRow();
    for (let key in item) {
      const cell = row.insertCell();
      cell.textContent = item[key];
    }
  });
}

// Funcție pentru efectuarea unei cereri HTTP GET
async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Eroare la preluarea datelor:", error);
  }
}

// Funcție pentru efectuarea unei cereri HTTP POST
async function postData(url, body) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Eroare la trimiterea datelor:", error);
  }
}

// Funcție pentru efectuarea unei cereri HTTP DELETE
async function deleteData(url) {
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Eroare la ștergerea datelor:", error);
  }
}

// Eveniment pentru Web Scraping
scrapeButton.addEventListener("click", async () => {
  const scrapedData = await getData("URL_PENTRU_WEB_SCRAPING");
  displayDataInTable(scrapedData, scrapedTable);
});

// Eveniment pentru inserarea pe Server 1
insertForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const field1 = document.getElementById("field1").value;
  const field2 = document.getElementById("field2").value;
  const data = { field1, field2 };
  const response = await postData("URL_PENTRU_SERVER_1", data);
  const server1Data = await getData("URL_PENTRU_SERVER_1");
  displayDataInTable(server1Data, server1Table);
});

// Eveniment pentru inserarea pe Server 2
insertForm2.addEventListener("submit", async (event) => {
  event.preventDefault();
  const field3 = document.getElementById("field3").value;
  const data = { field3 };
  const response = await postData("URL_PENTRU_SERVER_2", data);
  const server2Data = await getData("URL_PENTRU_SERVER_2");
  displayDataInTable(server2Data, server2Table);
});

// Eveniment pentru ștergere
deleteForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const deleteField = document.getElementById("deleteField").value;
  const response1 = await deleteData(`URL_PENTRU_STERGERE_SERVER_1/${deleteField}`);
  const response2 = await deleteData(`URL_PENTRU_STERGERE_SERVER_2/${deleteField}`);
  const server1Data = await getData("URL_PENTRU_SERVER_1");
  const server2Data = await getData("URL_PENTRU_SERVER_2");
  displayDataInTable(server1Data, server1Table);
  displayDataInTable(server2Data, server2Table);
});

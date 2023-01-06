import callApi from "./javascript/callapi.js";
import createElements from "./javascript/createElement.js";
import { callApiFiltered } from "./javascript/callapi.js";
let apiData = await callApi();
createElements(apiData);
const app = document.querySelector("#app");

const filterDataWithSearchInput = async (input, data, isChecked) => {
  if (input) {
    let filteredData;
    input = input.toLowerCase();
    //Filter every object in data to find only what includes the user search (input)
    if (isChecked) {
      filteredData = await callApiFiltered(input, true);
    } else {
      filteredData = await callApiFiltered(input, false);
    }
    console.log(filteredData);
    if (!filteredData) {
      app.innerHTML = "";
      const nothingFoundElement = document.createElement("h2");
      nothingFoundElement.className = "NothingFound";
      nothingFoundElement.style.width = "100%";
      nothingFoundElement.style.color = "white";
      nothingFoundElement.style.textAlign = "center";
      nothingFoundElement.textContent = "Rien n'a été trouvé.🥲";
      app.appendChild(nothingFoundElement);
    } else {
      app.innerHTML = "";
      createElements(filteredData);
    }
  }
};

///////SEARCH
const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const isAliveButton = document.querySelector(".checkbox");

//On click
searchButton.addEventListener("click", async function () {
  console.log(isAliveButton.checked);
  await filterDataWithSearchInput(
    searchInput.value,
    apiData,
    isAliveButton.checked
  );
});

//On enter
searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    filterDataWithSearchInput(searchInput.value, apiData);
  }
});

//H1
const appName = document.querySelector(".appName");
appName.addEventListener("click", function () {
  window.location.reload();
});

//Search Button
const searchButtonFirst = document.querySelector(".first-loup");
searchButtonFirst.addEventListener("click", function () {
  searchButtonFirst.style.display = "none";
  const searchContainer = document.querySelector(".search");
  searchContainer.style.display = "flex";
});

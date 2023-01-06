import createElements from "./javascript/createElement.js";
import { ApiClient } from "./javascript/callapi.js";
const apiClient = new ApiClient();
let apiData = await apiClient.callApi();
createElements(apiData);
const app = document.querySelector("#app");

const filterDataWithSearchInput = async (input, data, isChecked) => {
  if (input) {
    let filteredData;
    input = input.toLowerCase();
    //Filter every object in data to find only what includes the user search (input)
    if (isChecked) {
      filteredData = await apiClient.callApiFiltered(input, true);
      console.log(filteredData);
    } else {
      filteredData = await apiClient.callApiFiltered(input, false);
      console.log(filteredData);
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
searchInput.addEventListener("keypress", async function (e) {
  console.log(isAliveButton.checked);
  if (e.key === "Enter") {
    await filterDataWithSearchInput(
      searchInput.value,
      apiData,
      isAliveButton.checked
    );
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

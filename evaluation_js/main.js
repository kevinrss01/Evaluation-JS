import callApi from "./javascript/callapi.js";
import createElements from "./javascript/createElement.js";
import createSinglePageElement from "./javascript/createSinglePageElement.js";

let apiData = await callApi();
const app = document.querySelector("#app");

createElements(apiData);

const filterDataWithSearchInput = (input, data) => {
  if (input) {
    input.toLowerCase();
    //Filter every object in data to find only what includes the user search (input)
    const filteredData = data.filter((object) =>
      object.name.toLowerCase().includes(input)
    );

    if (filteredData.length === 0) {
      app.innerHTML = "";
      const nothingFoundElement = document.createElement("h2");
      nothingFoundElement.style.marginLeft = "25%";
      nothingFoundElement.textContent =
        "Nothing found 🥲, please search again.";
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

//On click
searchButton.addEventListener("click", function () {
  filterDataWithSearchInput(searchInput.value, apiData);
});

//On enter
searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    filterDataWithSearchInput(searchInput.value, apiData);
  }
});

//Going to Character page

/*const allCard = document.querySelectorAll(".cardContainer");
allCard.forEach((card) => {
  card.addEventListener("click", () => {
    const id = card.getAttribute("data");
    console.log("element clicked");
    //Hide search input in character Page
    const searchDiv = document.querySelector(".search");
    searchDiv.style.display = "none";
    createSinglePageElement(apiData, parseInt(id));
  });
});*/

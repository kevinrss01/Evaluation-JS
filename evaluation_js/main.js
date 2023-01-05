import callApi from "./javascript/callapi.js";

const apiData = await callApi();

const createChild = (
  parentElement,
  tagName,
  className,
  text,
  attribut,
  contentAttribute
) => {
  if (parentElement && tagName) {
    const newChildElement = document.createElement(tagName);

    if (tagName === "img") {
      className ? (newChildElement.className = className) : null;
      newChildElement.setAttribute("src", text);
    } else {
      className ? (newChildElement.className = className) : null;
      text
        ? (newChildElement.textContent = text)
        : (newChildElement.textContent = "/");
    }

    parentElement.appendChild(newChildElement);
  }
};

const createElements = (data) => {
  if (data) {
    const app = document.querySelector("#app");

    data.map((element) => {
      console.log(element);

      //container
      const container = document.createElement("div");
      container.className = `cardContainer ${element.id}`;
      container.style.backgroundImage = `url("${element.image}")`;

      //Name
      createChild(container, "p", "name", element.name);

      //Get elementId and set it in class

      /*
      //gender
      createChild(container, "p", "", `Genre : ${element.gender}`);

      //Status
      createChild(container, "p", "", `Status : ${element.status}`);

      //species
      createChild(container, "p", "", `Species : ${element.species}`);

      //type
      createChild(container, "p", "", `Type : ${element.type}`);*/

      app.appendChild(container);
    });
  }
};

createElements(apiData);

const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");

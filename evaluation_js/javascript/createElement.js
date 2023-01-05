import createSinglePageElement from "./createSinglePageElement.js";

export const createChild = (
  parentElement,
  tagName,
  className,
  text,
  attribut,
  contentAttribute
) => {
  if (parentElement && tagName) {
    const newChildElement = document.createElement(tagName);

    if (text === "img") {
      className && (newChildElement.className = className);
      newChildElement.style.backgroundImage = `url("${attribut}")`;
    } else {
      className ? (newChildElement.className = className) : null;
      text
        ? (newChildElement.textContent = text)
        : (newChildElement.textContent = "/");
      attribut && newChildElement.setAttribute("src", attribut);
    }

    parentElement.appendChild(newChildElement);
  }
};

//For HomePage
const createElements = (data) => {
  if (data) {
    const app = document.querySelector("#app");

    data.map((element) => {
      //container
      const container = document.createElement("div");
      container.className = `cardContainer`;
      container.setAttribute("data", `${element.id}`);
      container.style.backgroundImage = `url("${element.image}")`;
      container.addEventListener("click", () => {
        const id = container.getAttribute("data");
        console.log("element clicked");
        //Hide search input in character Page
        const searchDiv = document.querySelector(".search");
        searchDiv.style.display = "none";
        createSinglePageElement(data, parseInt(id));
      });

      //Name
      createChild(container, "p", "name", element.name);

      //See more
      createChild(container, "p", "moreContent", `Voir plus 👆`);

      app.appendChild(container);
    });
  }
};

export default createElements;

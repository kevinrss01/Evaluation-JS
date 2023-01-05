import { createChild } from "./createElement.js";

const app = document.querySelector("#app");
const createSinglePageElement = (data, id) => {
  let objectWithId;
  data.forEach((element) => {
    if (element.id === id) {
      console.log(element);
      objectWithId = element;
    }
  });

  app.innerHTML = "";

  //Container
  const singlePageContainer = document.createElement("div");
  singlePageContainer.className = "singlePageContainer";

  //Image Container
  const divImage = document.createElement("div");
  divImage.className = "imageContainer";
  singlePageContainer.appendChild(divImage);

  //Image
  createChild(divImage, "div", "imageCharacterPage", "img", objectWithId.image);

  /////////Info container
  const infoContainer = document.createElement("div");
  infoContainer.className = "infoContainer";
  createChild(infoContainer, "h1", "nameCharacterPage", `${objectWithId.name}`);

  //Satut
  createChild(
    infoContainer,
    "p",
    "characterInfo",
    `Status : ${
      objectWithId.status === "Dead" ? "Dead 💀" : objectWithId.status
    }`
  );

  //Species
  createChild(
    infoContainer,
    "p",
    "characterInfo",
    `Espèce : ${objectWithId.species}`
  );

  //Type
  createChild(
    infoContainer,
    "p",
    "characterInfo",
    `Type : ${objectWithId.type ? objectWithId.type : "inconnu"}`
  );

  //Gender
  createChild(
    infoContainer,
    "p",
    "characterInfo",
    `Genre : ${objectWithId.gender}`
  );

  //Origine
  createChild(
    infoContainer,
    "p",
    "characterInfo",
    `Origine : ${
      objectWithId.location[0] ? objectWithId.location[0] : "Inconnu"
    }`
  );

  singlePageContainer.appendChild(infoContainer);

  app.appendChild(singlePageContainer);
};

export default createSinglePageElement;

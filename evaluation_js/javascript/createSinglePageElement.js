import createElements, { createChild } from "./createElement.js";
import { callApiCharacterPage } from "./callapi.js";

const app = document.querySelector("#app");

const createSinglePageElement = async (data, id) => {
  console.log(data);
  let objectWithId;
  data.forEach((element) => {
    if (element.id == id) {
      objectWithId = element;
    }
  });
  console.log(objectWithId);
  app.innerHTML = "";

  //Container
  const singlePageContainer = document.createElement("div");
  singlePageContainer.className = "singlePageContainer";

  //Top Container
  const topContainer = document.createElement("div");
  topContainer.className = "topContainer";
  singlePageContainer.appendChild(topContainer);

  /////Bottom container
  const bottomContainer = document.createElement("div");
  bottomContainer.className = "bottomContainer";
  createChild(
    bottomContainer,
    "h2",
    "titleBottomContainer",
    `Tous les résidents de la dimension de ${objectWithId.name} :`
  );

  //Call api to get all the residents of the planet
  if (objectWithId.location.dimension !== "unknown") {
    const residents = await callApiCharacterPage(
      `${objectWithId.name}`,
      objectWithId.location.id
    );
    residents.data.location.residents.map((resident) => {
      //Creation resident Container
      const residentContainer = document.createElement("div");
      residentContainer.className = "residentContainer";
      residentContainer.style.backgroundImage = `url("${resident.image}")`;
      const nameResident = document.createElement("p");
      nameResident.className = "residentName";
      nameResident.textContent = resident.name;
      residentContainer.appendChild(nameResident);

      bottomContainer.appendChild(residentContainer);
    });
  } else {
    createChild(
      bottomContainer,
      "h3",
      "unknownDimension",
      `Dimension de ${objectWithId.name} inconnu. 🤔`
    );
  }

  //Create Bottom Container
  singlePageContainer.appendChild(bottomContainer);

  //Image Container
  const divImage = document.createElement("div");
  divImage.className = "imageContainer";
  topContainer.appendChild(divImage);

  //Image
  createChild(divImage, "div", "imageCharacterPage", "img", objectWithId.image);

  /////////Info container
  const infoContainer = document.createElement("div");
  infoContainer.className = "infoContainer";
  //Name
  createChild(infoContainer, "h1", "nameCharacterPage", `${objectWithId.name}`);

  //Status
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

  //Origin
  createChild(
    infoContainer,
    "p",
    "characterInfo",
    `Origin : ${
      objectWithId.origin.dimension ? objectWithId.origin.dimension : "Inconnu"
    }`
  );

  //Location
  createChild(
    infoContainer,
    "p",
    "characterInfo",
    `Location : ${
      objectWithId.location.dimension === "unknown"
        ? "Inconnu"
        : objectWithId.location.dimension
    }`
  );

  topContainer.appendChild(infoContainer);

  app.appendChild(singlePageContainer);
};

export default createSinglePageElement;

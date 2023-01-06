/*class ApiClient {
  constructor(){
    this.baseUrl = "https://rickandmortyapi.com/api";
    this.characterUrl = "/character";
    this.locationUrl = "/location";
    this.episodeUrl = "/episode";
    this.graphQLUrl = "https://rickandmortyapi.graphcdn.app/";
  }

}

export default ApiClient;*/

const callApi = async () => {
  const personnages = [];
  try {
    const query = `
      query getCharacters {
      characters {
        results {
          id
          status
          type
          name
          id
          image
          gender
          species
          origin{
          id
          dimension
          }
          location{
            id
            dimension
          }
        }
      }
    }`;

    const res = await fetch("https://rickandmortyapi.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const result = await res.json();
    result.data.characters.results.map((element) => {
      personnages.push(element);
    });
    return personnages;
  } catch (error) {
    throw new Error(error);
  }
};

export const callApiCharacterPage = async (name, dimensionId) => {
  try {
    const query = `
      query {
      characters (filter: {name: "${name}"} ) {
        info {
          count
        }
      }
      location(id: ${dimensionId}) {
        name
        id
        residents {
          id
          name
          image
        }
      }
    }
    `;

    const res = await fetch("https://rickandmortyapi.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const response = await res.json();
    return await response;
  } catch (e) {
    throw new Error(e);
  }
};

export const callApiFiltered = async (name, isAlive) => {
  let character;
  isAlive ? (isAlive = "alive") : (isAlive = "");
  try {
    async function fetchCharacters() {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${name}&status=${isAlive}`
      );
      character = await res.json();
    }
    await fetchCharacters();
    return character.results;
  } catch (error) {}
};

export default callApi;

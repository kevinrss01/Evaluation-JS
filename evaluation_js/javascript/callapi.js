export class ApiClient {
  constructor() {
    this.baseUrlApi = "https://rickandmortyapi.com/api";
    this.baseUrlGraphQL = "https://rickandmortyapi.com/graphql";
  }

  async callApi() {
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

      const res = await fetch(this.baseUrlGraphQL, {
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
  }

  async callApiCharacterPage(name, dimensionId) {
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

      const res = await fetch(this.baseUrlGraphQL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const response = await res.json();
      return await response;
    } catch (e) {
      throw new Error(e);
    }
  }

  async callApiFiltered(name, isAlive) {
    let character;
    let url;
    const urlAlive = `${this.baseUrlApi}/character/?name=${name}&status=alive`;
    const urlDead = `${this.baseUrlApi}/character/?name=${name}`;
    if (isAlive) {
      url = urlAlive;
    } else {
      url = urlDead;
    }

    try {
      async function fetchCharacters() {
        const res = await fetch(url);
        character = await res.json();
      }
      await fetchCharacters();
      console.log(character);
      return character.results;
    } catch (error) {
      console.error("no data found");
    }
  }
}

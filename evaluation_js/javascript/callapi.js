const callApi = async () => {
  const personnages = [];

  let req;
  try {
    req = await fetch("https://rickandmortyapi.com/api/character/715");
    personnages.push(await req.json());

    req = await fetch("https://rickandmortyapi.com/api/character/317");
    personnages.push(await req.json());

    req = await fetch("https://rickandmortyapi.com/api/character/325");
    personnages.push(await req.json());

    req = await fetch("https://rickandmortyapi.com/api/character/521");
    personnages.push(await req.json());

    req = await fetch("https://rickandmortyapi.com/api/character/535");
    personnages.push(await req.json());

    req = await fetch("https://rickandmortyapi.com/api/character/799");
    personnages.push(await req.json());

    return personnages;
  } catch (error) {
    throw new Error(error);
  }
};

//Redemander à ChatGPT de me créer la requête, mais avec l'adresse API de base
const callApiCharacterPage = async (name) => {
  const query = `
  query {
  characters (filter: {name: "Too Cute to Murder Morty"}){
    info {
      count
    }
    results {
      name
      id
    }
  }
  location(id: 1) {
    name
    id
    residents {
      id
    }
  }
  episodesByIds(ids: [1, 2]) {
    id
  }
}
`;

  const res = await fetch("https://rickandmortyapi.com/api/character", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  console.log(await res.json());
};

await callApiCharacterPage();

export default callApi;

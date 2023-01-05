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

export default callApi;

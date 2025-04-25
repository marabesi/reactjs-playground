// export const fetchData = async (url) => {
//   const response = await fetch(url);
//   const json = await response.json();
//   return json.results;
// };

export const fetchData = {
  get: async (url) => {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }
}


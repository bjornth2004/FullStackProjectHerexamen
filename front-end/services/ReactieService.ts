const getReacties = () => {
  const token = JSON.parse(sessionStorage.getItem("loggedInVerhuurder"))?.token;
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/reactie", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const getReactieById = (reactieId: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/reactie/${reactieId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const postReactie = (reactieData) => {
  const token = JSON.parse(sessionStorage.getItem("loggedInVerhuurder"))?.token;
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/reactie", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reactieData),
  });
};

const ReactieService = {
  getReacties,
  getReactieById,
  postReactie,
};

export default ReactieService;

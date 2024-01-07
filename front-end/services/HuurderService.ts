const getHuurders = () => {
  const token = JSON.parse(sessionStorage.getItem("loggedInVerhuurder"))?.token;
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/huurders", {
    //doe een fetch call naar http localhost 3000 / verhuurders
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const getHuurderById = (huurderId: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/huurders/${huurderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const verwijderHuurderById = (huurderId: number) => {
  const token = JSON.parse(sessionStorage.getItem("loggedInVerhuurder"))?.token;
  return fetch(
    process.env.NEXT_PUBLIC_API_URL + `/huurders/delete/${huurderId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const HuurderService = {
  getHuurders,
  getHuurderById,
  verwijderHuurderById,
};

export default HuurderService;

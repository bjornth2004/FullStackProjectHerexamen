const getVerhuurders = () => {
  const token = JSON.parse(sessionStorage.getItem("loggedInVerhuurder"))?.token;
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/verhuurders", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const getVerhuurderById = (verhuurderId: string) => {
  return fetch(
    process.env.NEXT_PUBLIC_API_URL + `/verhuurders/${verhuurderId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const VerhuurderService = {
  getVerhuurders,
  getVerhuurderById,
};

export default VerhuurderService;

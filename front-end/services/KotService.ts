const getKoten = () => {
  const token = JSON.parse(sessionStorage.getItem("loggedInVerhuurder"))?.token;
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/koten`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const getKotById = (kotId: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/koten/${kotId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const KotService = {
  getKoten,
  getKotById,
};

export default KotService;

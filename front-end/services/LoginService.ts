import { Verhuurder } from "../types/index";

const loginVerhuurder = (verhuurder: Verhuurder) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/verhuurders/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(verhuurder),
  });
};

export const LoginService = {
  loginVerhuurder,
};

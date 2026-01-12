export const BASE_URL = "https://web-project-api-full-tx7d.onrender.com";

export const register = ({ email, password }) => {
  console.log("Função register chamada com:", email, password);
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(
          `Error: ${res.status} um dos campos foi preenchido incorretamente`
        );
  });
};

export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(
          `Error: ${res.status} um dos campos foi preenchido incorretamente`
        );
  });
};

export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

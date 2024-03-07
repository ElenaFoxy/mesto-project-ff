const config = {
  url: "https://mesto.nomoreparties.co/v1/wff-cohort-7",
  headers: {
    authorization: "a352596f-0f9a-4dc8-80c9-98649cf73952",
    "Content-Type": "application/json",
  },
};
//обработка ответа сервера
const handleRes = (res) => {
  if (res.ok) {
    return res.json();
  }

  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
};

//получение карточек с сервера
export const getInitialCards = () => {
  return fetch(`${config.url}/cards`, {
    headers: config.headers,
  }).then((res) => handleRes(res));
};

// получение данных о пользователе с сервера

export const getInfoUser = () => {
  return fetch(`${config.url}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// редактирование данных пользователя
export const editInfoUser = (name, about) => {
  return fetch(`${config.url}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => handleRes(res));
};

// создание карточек
export const createNewCard = (name, link) => {
  return fetch(`${config.url}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => handleRes(res));
};

// удаление карточки
export const removeCard = (cardId) => {
  return fetch(`${config.url}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => handleRes(res));
};

// Поставить лайк
export const addLike = (cardId) => {
  return fetch(`${config.url}/cards/${cardId}/likes`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => handleRes(res));
};

// Убрать лайк
export const deleteLike = (cardId) => {
  return fetch(`${config.url}/cards/${cardId}/likes`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => handleRes(res));
};

// изменение аватара
export const editAvatar = (src) => {
  return fetch(`${config.url}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: src,
    }),
  }).then((res) => handleRes(res));
};

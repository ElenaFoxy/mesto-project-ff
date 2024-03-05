import { cardTemplate } from "../pages/index";
import { addLike, deleteLike, removeCard } from "../components/Api";
import { openPopup, closePopup } from "./modal";

let delCards;

//функция like фото
export function likeButton(likes, id, cardElement, cardId) {
  if (isLikesMe(id, likes)) {
    cardElement.classList.remove("card__like-button_is-active");
    deleteLike(cardId);
  } else {
    cardElement.classList.add("card__like-button_is-active");
    addLike(cardId);
  }
}

// проверяем лайки пользователя
export const isLikesMe = (id, likes) => {
  return likes.find(function (item) {
    return item._id === id;
  });
};

export function createCard(
  link,
  name,
  likes,
  idUser,
  cardId,
  ownerId,
  deleteCallBack,
  likeImage,
  openImage
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  // если карточка создана не мной то скрыть элемент корзины
  if (ownerId !== idUser) {
    deleteButton.style.display = "none";
  }

  //попап подтверждения удаления
  const popupConfirm = document.querySelector(".popup_type_delete");
  //при нажатии на корзину открываем окно подтверждения удаления
  deleteButton.addEventListener("click", () => {
    popupConfirm.dataset.idcard = cardId;
    delCards = cardElement;
    openPopup(popupConfirm);
  });

  //удаление карточки после подтверждения
  const deleteConfirmButton = popupConfirm.querySelector(".popup__button");
  deleteConfirmButton.addEventListener("click", () =>
    deleteCallBack(popupConfirm.dataset.idcard)
  );

  //лайкаем изображения
  //реагируем на клик по кнопке с сердечком
  const likeCardButton = cardElement.querySelector(".card__like-button");
  likeCardButton.addEventListener("click", () => {
    likeImage(likes, idUser, cardElement, cardId);
  });

  //добавляем карточку в popup при нажатии на картинку открываем popup
  cardImage.addEventListener("click", () => openImage(cardImage, cardTitle));

  return cardElement;
}

// @todo: Функция удаления карточки
export function deleteCard(cardId) {
  //попап подтверждения удаления
  const popupConfirm = document.querySelector(".popup_type_delete");
  const deleteConfirmButton = popupConfirm.querySelector(".popup__button");
  deleteConfirmButton.textContent = "Удаление...";
  removeCard(cardId)
    .then(() => {
      delCards.remove();
      closePopup(popupConfirm);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      deleteConfirmButton.textContent = "Да";
    });

  // removeCard(cardId);  //удаляем карточку
}

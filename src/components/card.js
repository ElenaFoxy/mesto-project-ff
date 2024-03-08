import { cardTemplate, delCards } from "../pages/index";
import { addLike, deleteLike, removeCard } from "../components/Api";
import { openPopup, closePopup } from "./modal";

//установка лайков карточкам
export function setLikes(cardElement, card, UserId) {
  if (card.likes.length > 0) {
    const likesCount = cardElement.querySelector(".card__like-number");
    likesCount.textContent = card.likes.length;
    if (
      isLikesMe(UserId, card.likes) &&
      !cardElement.classList.contains("card__like-button_is-active")
    ) {
      cardElement
        .querySelector(".card__like-button")
        .classList.add("card__like-button_is-active");
    }
  }
}

//функция like фото
export function likeButton(cardElement, card) {
  const likeCardButton = cardElement.querySelector(".card__like-button");
  const likesCount = cardElement.querySelector(".card__like-number");
  const isLiked = cardElement.classList.contains("card__like-button_is-active");
  const likeMethod = isLiked ? deleteLike : addLike;
  likeMethod(card._id)
    .then((res) => {
      if (res.likes.length > 0) {
      likesCount.textContent = res.likes.length;} else {likesCount.textContent="";}
      likeCardButton.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.log(err);
    });
}

// проверяем лайки пользователя
export const isLikesMe = (id, likes) => {
  return likes.some(function (item) {
    return item._id === id;
  });
};

export function createCard(card, idUser, deleteCallBack, likeImage, openImage) {
  const link = card.link;
  const name = card.name;
  const cardId = card._id;
  const ownerId = card.owner._id;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  //попап подтверждения удаления
  const popupConfirm = document.querySelector(".popup_type_delete");

  const deleteButton = cardElement.querySelector(".card__delete-button");
  // если карточка создана не мной то скрыть элемент корзины
  if (ownerId !== idUser) {
    deleteButton.style.display = "none";
  } else {
    //при нажатии на корзину открываем окно подтверждения удаления
    deleteButton.addEventListener("click", () => {
      deleteCallBack(cardElement, cardId);
    });
  }
  //удаление карточки после подтверждения
  const deleteConfirmButton = popupConfirm.querySelector(".popup__button");
  deleteConfirmButton.addEventListener("click", () =>
    deleteCard(popupConfirm.dataset.idcard)
  );

  //лайкаем изображения
  //реагируем на клик по кнопке с сердечком
  const likeCardButton = cardElement.querySelector(".card__like-button");
  likeCardButton.addEventListener("click", () => {
    //console.log(card);
    likeImage(cardElement, card);
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
}

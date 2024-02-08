import { cardTemplate } from "../pages/index";
export function createCard(link, name, deleteCallBack, likeImage, openImage) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCallBack(cardElement));

  //лайкаем изображения
  //реагируем на клик по кнопке с сердечком
  cardElement.addEventListener("click", (evt) => likeImage(evt));

  //добавляем карточку в popup при нажатии на картинку открываем popup
  cardImage.addEventListener("click", () => openImage(cardImage, cardTitle));

  return cardElement;
}

// @todo: Функция удаления карточки
export function deleteCard(card) {
  card.remove();
}

//функция like фото
export function likeButton(evt) {
  if (evt.target.classList.contains("card__like-button"))
    evt.target.classList.toggle("card__like-button_is-active");
}

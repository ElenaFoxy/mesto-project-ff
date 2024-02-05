import { cardTemplate, placeContainer } from "./index";
import { closePopupOverlay, closePopup, openPopup } from "./modal";
export function createCard(link, name, deleteCallBack) {
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

  //добавляем карточку в popup при нажатии на картинку открываем popup
  cardImage.addEventListener("click", function (evt) {
    //картинка в попап
    const popupImage = document.querySelector(".popup__image");
    //описание картинки в попап
    const popupCaption = document.querySelector(".popup__caption");
    //добавляем картинку в попап
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCaption.innerHTML = cardTitle.textContent;
    //открываем попап
    popup.classList.add("popup_is-animated");
    openPopup(popup);
  });

  //попап с фото
  const popup = document.querySelector(".popup_type_image");
  //кнопка закрытия попап картинки
  const closeButton = popup.querySelector(".popup__close");
  //отслеживаем нажатие на кнопку закрытия и закрывваем попап
  closeButton.addEventListener("click", function () {
    closePopup(popup);
  });
  //отслеживаем нажатие на оверлей
  popup.addEventListener("click", function (event) {
    closePopupOverlay(event, popup);
  });

  //лайкаем изображения
  //реагируем на клик по кнопке с сердечком
  cardElement.addEventListener("click", function (evt) {
    likeButton(evt);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
export function deleteCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу
export function showcards(cards) {
  cards.forEach((item) => {
    const cardElement = createCard(item.link, item.name, deleteCard);
    placeContainer.append(cardElement);
  });
}

//функция like фото
function likeButton(evt) {
  if (evt.target.classList.contains("card__like-button"))
    evt.target.classList.toggle("card__like-button_is-active");
}

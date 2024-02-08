// index.js

import "../index.css"; //  импорт главного файла стилей
import { initialCards } from "../components/cards";
import { closePopupOverlay, closePopup, openPopup } from "../components/modal";
import { deleteCard, createCard, likeButton } from "../components/card";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const placeContainer = document.querySelector(".places__list");
//попап редактирования профиля
const popupEdit = document.querySelector(".popup_type_edit");
//форма добавления фото
const popupAdd = document.querySelector(".popup_type_new-card");
//попап с фото
const popupImage = document.querySelector(".popup_type_image");
//кнопка редактирования профиля
const editButton = document.querySelector(".profile__edit-button");
//кнопка добавления фото
const addButton = document.querySelector(".profile__add-button");

//кнопка закрытия попапа редактирования профиля
const closeButton = popupEdit.querySelector(".popup__close");
//кнопка закрытия попапа добавления фото
const closeButtonAdd = popupAdd.querySelector(".popup__close");
//кнопка закрытия попап картинки
const closeButtonImage = popupImage.querySelector(".popup__close");

// @todo: Вывести карточки на страницу
function showcards(cards) {
  cards.forEach((item) => {
    const cardElement = createCard(
      item.link,
      item.name,
      deleteCard,
      likeButton,
      openImage
    );
    placeContainer.append(cardElement);
  });
}

showcards(initialCards);

editButton.addEventListener("click", () => {
  //заполняем поля формы значениями профиля
  popupEdit.querySelector(".popup__input_type_name").value =
    document.querySelector(".profile__title").innerText;
  popupEdit.querySelector(".popup__input_type_description").value =
    document.querySelector(".profile__description").innerText;
  openPopup(popupEdit);
});
//если на кнопку добавления фото нажали открываем попап
addButton.addEventListener("click", () => openPopup(popupAdd));

//если на кнопку закрытия формы нажали закрываем попап
closeButton.addEventListener("click", () => closePopup(popupEdit));
//если на кнопку добавления фото нажали закрываем попап
closeButtonAdd.addEventListener("click", () => closePopup(popupAdd));
closeButtonImage.addEventListener("click", () => closePopup(popupImage));

//отслеживаем нажатие на оверлей попап картинки
popupImage.addEventListener("click", function (event) {
  closePopupOverlay(event);
});
//закрываем форму нажатием на оверлей
popupEdit.addEventListener("click", function (event) {
  closePopupOverlay(event);
});
popupAdd.addEventListener("click", function (event) {
  closePopupOverlay(event);
});

//открываем окно с фото
export function openImage(image, title) {
  //попап с фото
  const popup = document.querySelector(".popup_type_image");
  //картинка в попап
  const popupImage = document.querySelector(".popup__image");
  //описание картинки в попап
  const popupCaption = document.querySelector(".popup__caption");
  //добавляем картинку в попап
  popupImage.src = image.src;
  popupImage.alt = image.alt;
  popupCaption.textContent = title.textContent;
  //открываем попап
  openPopup(popup);
}

//а теперь про Сохранить!

// Находим поля формы в DOM
const nameInput = popupEdit.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = popupEdit.querySelector(".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function changeProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  const name = nameInput.value;
  const job = jobInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  const nameProfile = document.querySelector(".profile__title");
  const jobProfile = document.querySelector(".profile__description");
  // Вставьте новые значения с помощью
  nameProfile.textContent = name;
  jobProfile.textContent = job;
  closePopup(popupEdit);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupEdit.addEventListener("submit", changeProfile);

//а теперь про Добавить Фото!

// Находим форму в DOM
const formNewPlace = document.querySelector(".popup_type_new-card");
// Находим поля формы в DOM
const namePlace = formNewPlace.querySelector(".popup__input_type_card-name");
const linkPlace = formNewPlace.querySelector(".popup__input_type_url");

// Обработчик «отправки» формы добавления фото
function addPlaceSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  // значение полей имени и ссылка на фото
  const name = namePlace.value;
  const link = linkPlace.value;

  // Добавляем карточку в начало контейнера
  const cardElement = createCard(link, name, deleteCard, likeButton, openImage);
  placeContainer.prepend(cardElement);
  closePopup(formNewPlace);
  namePlace.value = "";
  linkPlace.value = "";
}

// Прикрепляем обработчик к форме Добавления фото:
// он будет следить за событием “submit” - «отправка»
formNewPlace.addEventListener("submit", addPlaceSubmit);

export { cardTemplate, placeContainer };

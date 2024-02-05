// index.js

import "../index.css"; //  импорт главного файла стилей
import { initialCards } from "./cards";
import { closePopupOverlay, closePopup, openPopup } from "./modal";
import { deleteCard, showcards, createCard } from "./card";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const placeContainer = document.querySelector(".places__list");
//попап редактирования профиля
const popupEdit = document.querySelector(".popup_type_edit");
//форма добавления фото
const popupAdd = document.querySelector(".popup_type_new-card");
//кнопка редактирования профиля
const editButton = document.querySelector(".profile__edit-button");
//кнопка добавления фото
const addButton = document.querySelector(".profile__add-button");

//кнопка закрытия попапа редактирования профиля
const closeButton = popupEdit.querySelector(".popup__close");
//кнопка закрытия попапа добавления фото
const closeButtonAdd = popupAdd.querySelector(".popup__close");

showcards(initialCards);

//если на кнопку редактирования профиля нажали открываем попап
popupEdit.classList.add("popup_is-animated");
editButton.addEventListener("click", () => openPopup(popupEdit));
popupAdd.classList.add("popup_is-animated");
//если на кнопку добавления фото нажали открываем попап
addButton.addEventListener("click", () => openPopup(popupAdd));

//если на кнопку закрытия формы нажали закрываем попап
closeButton.addEventListener("click", () => closePopup(popupEdit));
//если на кнопку добавления фото нажали закрываем попап
closeButtonAdd.addEventListener("click", () => closePopup(popupAdd));

//заполняем поля формы значениями профиля
popupEdit.querySelector(".popup__input_type_name").value =
  document.querySelector(".profile__title").innerText;
popupEdit.querySelector(".popup__input_type_description").value =
  document.querySelector(".profile__description").innerText;

//закрываем форму нажатием на оверлей
popupEdit.addEventListener("click", function (event) {
  closePopupOverlay(event, popupEdit);
});
popupAdd.addEventListener("click", function (event) {
  closePopupOverlay(event, popupAdd);
});

//а теперь про Сохранить!

// Находим форму в DOM
const formElement = document.querySelector(".popup_type_edit"); //document.querySelector('.edit-profile');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector(".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
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
  closePopup(formElement);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

//а теперь про Добавить Фото!

// Находим форму в DOM
const formNewPlace = document.querySelector(".popup_type_new-card");
// Находим поля формы в DOM
const namePlace = formNewPlace.querySelector(".popup__input_type_card-name");
const linkPlace = formNewPlace.querySelector(".popup__input_type_url");

// Обработчик «отправки» формы добавления фото
function handlePlaceSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  // значение полей имени и ссылка на фото
  const name = namePlace.value;
  const link = linkPlace.value;

  // Добавляем карточку в начало контейнера
  const cardElement = createCard(link, name, deleteCard);
  placeContainer.prepend(cardElement);
  closePopup(formNewPlace);
}

// Прикрепляем обработчик к форме Добавления фото:
// он будет следить за событием “submit” - «отправка»
formNewPlace.addEventListener("submit", handlePlaceSubmit);

export { cardTemplate, placeContainer };

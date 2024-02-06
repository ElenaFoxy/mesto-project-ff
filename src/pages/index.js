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
//кнопка редактирования профиля
const editButton = document.querySelector(".profile__edit-button");
//кнопка добавления фото
const addButton = document.querySelector(".profile__add-button");

//кнопка закрытия попапа редактирования профиля
const closeButton = popupEdit.querySelector(".popup__close");
//кнопка закрытия попапа добавления фото
const closeButtonAdd = popupAdd.querySelector(".popup__close");

// @todo: Вывести карточки на страницу
function showcards(cards) {
  cards.forEach((item) => {
    const cardElement = createCard(
      item.link,
      item.name,
      deleteCard,
      likeButton
    );
    placeContainer.append(cardElement);
  });
}
showcards(initialCards);

//если на кнопку редактирования профиля нажали открываем попап
popupEdit.classList.add("popup_is-animated");
editButton.addEventListener("click", () => {
  //заполняем поля формы значениями профиля
  popupEdit.querySelector(".popup__input_type_name").value =
    document.querySelector(".profile__title").innerText;
  popupEdit.querySelector(".popup__input_type_description").value =
    document.querySelector(".profile__description").innerText;
  openPopup(popupEdit);
});
popupAdd.classList.add("popup_is-animated");
//если на кнопку добавления фото нажали открываем попап
addButton.addEventListener("click", () => openPopup(popupAdd));

//если на кнопку закрытия формы нажали закрываем попап
closeButton.addEventListener("click", () => closePopup(popupEdit));
//если на кнопку добавления фото нажали закрываем попап
closeButtonAdd.addEventListener("click", () => closePopup(popupAdd));

//закрываем форму нажатием на оверлей
popupEdit.addEventListener("click", function (event) {
  closePopupOverlay(event);
});
popupAdd.addEventListener("click", function (event) {
  closePopupOverlay(event);
});

//открываем окно с фото
export function openImage(Image, Title) {
  //попап с фото
  const popup = document.querySelector(".popup_type_image");
  //кнопка закрытия попап картинки
  const closeButton = popup.querySelector(".popup__close");
  //картинка в попап
  const popupImage = document.querySelector(".popup__image");
  //описание картинки в попап
  const popupCaption = document.querySelector(".popup__caption");
  //добавляем картинку в попап
  popupImage.src = Image.src;
  popupImage.alt = Image.alt;
  popupCaption.textContent = Title.textContent;
  //открываем попап
  popup.classList.add("popup_is-animated");
  openPopup(popup);
  closeButton.addEventListener("click", function () {
    closePopup(popup);
  });
  //отслеживаем нажатие на оверлей
  popup.addEventListener("click", function (event) {
    closePopupOverlay(event);
  });
}

//а теперь про Сохранить!

// Находим форму в DOM
//const formElement = document.querySelector(".popup_type_edit"); //document.querySelector('.edit-profile');// Воспользуйтесь методом querySelector()
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
function AddPlaceSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  // значение полей имени и ссылка на фото
  const name = namePlace.value;
  const link = linkPlace.value;

  // Добавляем карточку в начало контейнера
  const cardElement = createCard(link, name, deleteCard, likeButton);
  placeContainer.prepend(cardElement);
  closePopup(formNewPlace);
  namePlace.value = "";
  linkPlace.value = "";
}

// Прикрепляем обработчик к форме Добавления фото:
// он будет следить за событием “submit” - «отправка»
formNewPlace.addEventListener("submit", AddPlaceSubmit);

export { cardTemplate, placeContainer };

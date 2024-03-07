// index.js

import "../index.css"; //  импорт главного файла стилей
import { closePopupOverlay, closePopup, openPopup } from "../components/modal";
import {
  createCard,
  likeButton,
  isLikesMe,
  deleteCard,
  setLikes,
} from "../components/card";
import { enableValidation } from "../components/validation";
import { clearValidation } from "../components/validation";
import {
  getInitialCards,
  getInfoUser,
  editInfoUser,
  createNewCard,
  editAvatar,
} from "../components/Api";

//переменная для хранения Идентификатора карточки удаления
export let delCards;

// валидация форм
const configValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
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
//попап подтверждения удаления
const popupConfirm = document.querySelector(".popup_type_delete");
//попап смены аватара
const popupAvatar = document.querySelector(".popup_type_avatar");
//кнопка редактирования профиля
const editButton = document.querySelector(".profile__edit-button");
//кнопка добавления фото
const addButton = document.querySelector(".profile__add-button");
//аватар
const avatarEdit = document.querySelector(".profile__image");

//кнопка закрытия попапа редактирования профиля
const closeButton = popupEdit.querySelector(".popup__close");
//кнопка закрытия попапа добавления фото
const closeButtonAdd = popupAdd.querySelector(".popup__close");
//кнопка закрытия попап картинки
const closeButtonImage = popupImage.querySelector(".popup__close");
//кнопка закрытия попап подтверждения
const closeButtonConfirm = popupConfirm.querySelector(".popup__close");
//кнопка закрытия попап подтверждения
const closeButtonAvatar = popupAvatar.querySelector(".popup__close");

//поля формы в DOM Профиль
const nameInput = popupEdit.querySelector(".popup__input_type_name");
const jobInput = popupEdit.querySelector(".popup__input_type_description");
const linkAvatar = popupAvatar.querySelector(".popup__input_type_avatar");

//Информация профиля
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__description");
const avatarProfile = document.querySelector(".profile__image");

const userInfo = {};

//заполняем профиль
function setProfile(user) {
  nameProfile.textContent = user.name;
  jobProfile.textContent = user.about;
}

function setAvatar(user) {
  avatarProfile.setAttribute("style", `background-image: url(${user.src});`);
}

const deleteCardCallback = (cardElement, cardId) => {
  popupConfirm.dataset.idcard = cardId;
  delCards = cardElement;
  openPopup(popupConfirm);
};

Promise.all([getInfoUser(), getInitialCards()])
  .then(([user, cards]) => {
    userInfo.name = user.name;
    userInfo.about = user.about;
    userInfo.src = user.avatar;
    userInfo.id = user._id;

    setProfile(userInfo);
    setAvatar(userInfo);

    cards.forEach((item) => {
      const cardElement = createCard(
        item,
        userInfo.id,
        deleteCardCallback,
        likeButton,
        openImage
      );

      placeContainer.append(cardElement);

      setLikes(cardElement, item, userInfo.id);
    });
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

editButton.addEventListener("click", () => {
  //заполняем поля формы значениями профиля
  popupEdit.querySelector(".popup__input_type_name").value =
    document.querySelector(".profile__title").innerText;
  popupEdit.querySelector(".popup__input_type_description").value =
    document.querySelector(".profile__description").innerText;
  clearValidation(configValidation, popupEdit);
  openPopup(popupEdit);
});
//если на кнопку добавления фото нажали открываем попап
addButton.addEventListener("click", () => {
  clearValidation(configValidation, popupAdd);
  openPopup(popupAdd);
});

//открыть окно редактировать аватар
avatarEdit.addEventListener("click", () => openPopup(popupAvatar));

//если на кнопку закрытия формы нажали закрываем попап
closeButton.addEventListener("click", () => closePopup(popupEdit));
//если на кнопку добавления фото нажали закрываем попап
closeButtonAdd.addEventListener("click", () => closePopup(popupAdd));
closeButtonImage.addEventListener("click", () => closePopup(popupImage));
closeButtonConfirm.addEventListener("click", () => closePopup(popupConfirm));
closeButtonAvatar.addEventListener("click", () => closePopup(popupAvatar));

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
popupConfirm.addEventListener("click", function (event) {
  closePopupOverlay(event);
});
popupAvatar.addEventListener("click", function (event) {
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

// Обработчик «отправки» формы
function changeProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получите значение полей jobInput и nameInput из свойства value
  const name = nameInput.value;
  const job = jobInput.value;

  const editInfoButton = popupAvatar.querySelector(".popup__button");
  editInfoButton.textContent = "Сохранение...";
  // Вставить новое значение
  editInfoUser(name, job)
    .then((res) => {
      setProfile(res);
      closePopup(popupEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editInfoButton.textContent = "Сохранить";
    });
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupEdit.addEventListener("submit", changeProfile);

function changeAvatar(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получите значение поля Input из свойства value
  const link = linkAvatar.value;
  const editAvatarButton = popupAvatar.querySelector(".popup__button");
  editAvatarButton.textContent = "Сохранение...";
  // Вставить новое значение
  editAvatar(link)
    .then((res) => {
      setAvatar(res);
      //   avatarProfile.setAttribute("style", `background-image: url(${link});`);
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editAvatarButton.textContent = "Сохранить";
    });
}

popupAvatar.addEventListener("submit", changeAvatar);

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
  const newPlaceButton = formNewPlace.querySelector(".popup__button");
  newPlaceButton.textContent = "Сохранение...";
  createNewCard(name, link)
    .then((resCard) => {
      // Добавляем карточку
      const cardElement = createCard(
        resCard,
        userInfo.id,
        deleteCard,
        likeButton,
        openImage
      );
      placeContainer.prepend(cardElement);
      closePopup(formNewPlace);
      namePlace.value = "";
      linkPlace.value = "";
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      newPlaceButton.textContent = "Сохранить";
    });
}

// Прикрепляем обработчик к форме Добавления фото:
// он будет следить за событием “submit” - «отправка»
formNewPlace.addEventListener("submit", addPlaceSubmit);

enableValidation(configValidation);

export { cardTemplate, placeContainer };

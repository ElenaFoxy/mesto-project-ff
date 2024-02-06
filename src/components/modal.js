//работа с модальными окнами
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  //обработчик события - нажатие ESC - добавляем
  document.addEventListener("keydown", closePopupEsc);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  //обработчик события удаляем
  document.removeEventListener("keydown", closePopupEsc);
}

export function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}

//функция закрытия по клику на Оверлей
export function closePopupOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.currentTarget);
  }
}

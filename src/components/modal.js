//работа с модальными окнами
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  //обработчик события - нажатие ESC - добавляем
  document.addEventListener("keydown", function (event) {
    closePopupEsc(event, popup);
  });
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  //обработчик события удаляем
  document.removeEventListener("keydown", function (event) {
    closePopupEsc(event, popup);
  });
}

//функция закрытия по esc
export function closePopupEsc(evt, popup) {
  if (evt.key === "Escape") {
    closePopup(popup);
  }
}

//функция закрытия по клику на Оверлей
export function closePopupOverlay(evt, popup) {
  if (evt.currentTarget === evt.target) {
    closePopup(popup);
  }
}

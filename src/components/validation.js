// включение валидации вызовом enableValidation
// все настройки передаются при вызове

// валидация форм
const configValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const showError = (formElement, inputElement, errorMessage) => {
  //ошибка, которая найдена внутри formElement
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  //класс ошибки элемента input
  inputElement.classList.add(configValidation.inputErrorClass);
  //Установим errorMessage в качестве значения textContent для formError.
  errorElement.textContent = errorMessage;
  //Добавим errorClass класс видимости ошибки
  errorElement.classList.add(configValidation.errorClass);
};

const hideError = (formElement, inputElement) => {
  //ошибка, которая найдена внутри formElement
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // удалить класс ошибки с элемента input
  inputElement.classList.remove(configValidation.inputErrorClass);
  //Удалим активный класс ошибки c errorClass.
  errorElement.classList.remove(configValidation.errorClass);
  // Очистим ошибку
  errorElement.textContent = " ";
};

//проверка поля ввода на корректность
//formElement - форма проверки
//inputElement - поле проверки
const checkInputValidity = (formElement, inputElement) => {
  //дело в паттерне?
  if (inputElement.validity.patternMismatch) {
    // встроенный метод setCustomValidity принимает на вход строку
    // и заменяет ею стандартное сообщение об ошибке
    inputElement.setCustomValidity(
      "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"
    );
  } else {
    // не в паттерне
    // оставляем стандартные браузерные сообщения
    inputElement.setCustomValidity("");
  }
  // не прошло проверку
  if (!inputElement.validity.valid) {
    //ошибка
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    //все ок
    hideError(formElement, inputElement);
  }
};

//выясним - Есть ли здесь хотя бы одно поле, которое не прошло валидацию?
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  });
};

//блокировка кнопки в случае, если проверка не пройдена формой
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add(configValidation.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove(configValidation.inactiveButtonClass);
  }
};

//добавляем слушатели на все поля формы
const setEventListeners = (formElement) => {
  //все поля формы с классом inputSelector
  const inputList = Array.from(
    formElement.querySelectorAll(configValidation.inputSelector)
  );
  // Обойдём все элементы полученной коллекции
  const buttonElement = formElement.querySelector(
    configValidation.submitButtonSelector
  );

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      checkInputValidity(formElement, inputElement);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//очистка ошибок валидации - на открытие формы
export const clearValidation = (formValidation) => {
  const inputList = Array.from(
    formValidation.querySelectorAll(configValidation.inputSelector)
  );
  const buttonElement = formValidation.querySelector(
    configValidation.submitButtonSelector
  );
  inputList.forEach((popupInput) => {
    hideError(formValidation, popupInput);
    popupInput.setCustomValidity(" ");
  });

  toggleButtonState(inputList, buttonElement);
};

//setEventListeners(formElement);

export const enableValidation = () => {
  //все формы
  const formList = Array.from(
    document.querySelectorAll(configValidation.formSelector)
  );
  // Переберём формы
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

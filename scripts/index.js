
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placeContainer = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(link, name, deleteCallBack) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () =>  deleteCallBack(cardElement));

    return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(card) {
    card.remove();
}

// @todo: Вывести карточки на страницу
function showcards(cards) {
    cards.forEach(item => {
        const cardElement = createCard(item.link, item.name, deleteCard);
        placeContainer.append(cardElement);
    });
}

showcards(initialCards);

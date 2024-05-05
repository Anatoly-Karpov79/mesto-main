const popupOpenButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupNameEdit = document.querySelector('.popup__input_type_name');
const popupJobEdit = document.querySelector('.popup__input_type_job');
const formEdit = document.querySelector ('.form');
const formAdd = document.querySelector('#form__add');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
export const popupView = document.querySelector('.popup_view');
const popups = document.querySelectorAll('.popup')
const nameInput = document.querySelector ('.profile__name');
const jobInput = document.querySelector ('.profile__profession');
const cardNameAdd = document.querySelector('.popup__input_add_name');
const cardImageAdd = document.querySelector('.popup__input_add_link');
const elements = document.querySelector('.elements');
export const popupImage = document.querySelector('.popup__view-img');
export const popupImageName = document.querySelector('.popup__view-name');
const popupAddSubmitBtn = document.querySelector('#popup__button-add');

// Импортируем данные из модулей
import { Card } from './card.js';
import { initialCards, config } from './data.js';
import { FormValidator } from './formValidator.js'

// Открытие попапов
export function openPopup (popup) {
  popup.classList.add('popup_opened');
 document.addEventListener('keydown', closePopupEsc);
}

// Закрытие попапов
function closePopup (event) {
  event.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

// Закрытие попапов по Esc
const closePopupEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened')
    closePopup(popup)
  }
}

// Открытие попапа редактирование профиля
function editProfile () {
  openPopup(popupEdit);
    popupNameEdit.value = nameInput.textContent;
    popupJobEdit.value = jobInput.textContent;
}

// Редактирование профиля
function submitFormHandler (evt) {
  evt.preventDefault();
  nameInput.textContent = popupNameEdit.value;
  jobInput.textContent = popupJobEdit.value;
  closePopup(popupEdit);
}

// Слушатель на все крестики для закрытия попапа
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
     if (evt.target.classList.contains('popup__button-close')) {
        closePopup(popup)
     }
   });
  
  document.addEventListener('click', function (evt) {
     if (evt.target === popup) {
        closePopup(popup)
     }
   });
});

// Слушатели на кнопки открытия попапов
popupOpenButton.addEventListener ('click', editProfile );
addButton.addEventListener ('click', () => openPopupAdd());

// Слушатели на кнопки Сохранить в попапах
formEdit.addEventListener ('submit', submitFormHandler );
formAdd.addEventListener ('submit', submitAddHandler );

// Создание новой карточки
const creatCard  = (name, link) => {
    const card = new Card(name, link);
    const cardElement = card.generateCard();
    return cardElement;
}
// Вставляем карточку
const insertCard = (name, link) => {
   elements.prepend(creatCard(name, link));

}

// Создаем и вставляем новую карточку из попапа Добавить
function submitAddHandler (evt) {
    evt.preventDefault();
    const name = cardNameAdd.value;
    const link = cardImageAdd.value;
    const alt = cardNameAdd.value;
    
    creatCard(name, link)
    insertCard (name, link);
    closePopup(popupAdd);
    formAdd.reset();
}

// Создаем карточки из массива и вставляем в DOM
initialCards.forEach(({name, link}) => {
     insertCard (name, link);
});

// Включаем валидацию для попапов
const formEditValidate = new FormValidator(formEdit, config);
formEditValidate.enableValidation();

const formAddValidate = new FormValidator(formAdd, config);
formAddValidate.enableValidation();

// Открытие попапа добавить картинку
const openPopupAdd = () => {
  openPopup(popupAdd);
  formAddValidate.disableAddSubmitBtn();
}
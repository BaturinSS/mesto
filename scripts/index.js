const profileOpenPopupButtonEdit = document.querySelector('.profile__button-edit');
const profileOpenPopupButtonAdd = document.querySelector('.profile__button-add');
const popupEditProfileClose = document.querySelector('.popup-close');
const popupEditProfile = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupEditName = document.getElementsByName('name')[0];
const popupEditAboutMe = document.getElementsByName('aboutMe')[0];
const formPopupEdit = document.querySelector('.popup__form');
const formPopupSubmit = document.querySelector('.popup__save-button');
const elementsTemplate = document.querySelector('#elements-template').content;
const elementsCards = document.querySelector('.elements__cards');
const popupTitle = document.querySelector('.popup__title');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
initialCards.forEach((el) => creatureElementCard(el));
function creatureElementCard(el) {
  const elementCard = elementsTemplate.querySelector('.elements__element').cloneNode(true);
  elementCard.querySelector('.elements__mask-group').src = el.link;
  elementCard.querySelector('.elements__title').textContent = el.name;
  elementCard.querySelector('.elements__delete').addEventListener('click', function(event) {
    event.currentTarget.closest('.elements__element').remove();
  })
  elementCard.querySelector('.elements__group').addEventListener('click', function(event) {
    event.target.classList.toggle('elements__group_active');
  })
  elementsCards.prepend(elementCard);
}
function openPopup(event) {
  if (event.target === profileOpenPopupButtonEdit) {
    popupEditProfile.classList.add('popup-opened');
    popupTitle.textContent = 'Редактировать профиль';
    formPopupSubmit.textContent = 'Сохранить';
    popupEditName.value = profileName.textContent;
    popupEditAboutMe.value = profileSubtitle.textContent;
  } else {
    popupEditProfile.classList.add('popup-opened');
    popupTitle.textContent = 'Новое место';
    formPopupSubmit.textContent = 'Создать';
    popupEditName.value = '';
    popupEditAboutMe.value = '';
    popupEditName.placeholder = 'Название';
    popupEditAboutMe.placeholder = 'Ссылка на картинку';
  }
}
function closePopup() {
  popupEditProfile.classList.remove('popup-opened');
}
function getFormValue(event) {
  event.preventDefault();
  if (formPopupSubmit.textContent === 'Сохранить') {
    profileName.textContent = popupEditName.value;
    profileSubtitle.textContent = popupEditAboutMe.value;
  } else {
    const formData = [{name: popupEditName.value, link: popupEditAboutMe.value}]
    formData.forEach((el) => creatureElementCard(el));
  }
  closePopup();
}
profileOpenPopupButtonEdit.addEventListener('click', openPopup);
profileOpenPopupButtonAdd.addEventListener('click', openPopup);
popupEditProfileClose.addEventListener('click', closePopup);
formPopupEdit.addEventListener('submit', getFormValue);
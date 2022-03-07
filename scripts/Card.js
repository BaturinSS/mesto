import {openImagePopup} from './index.js';

export class Card {
  constructor(cardInfo, selectorTemplate) {
    this._name = cardInfo.name;
    this._link = cardInfo.link;
    this._selectorTemplate = selectorTemplate;
  }

  _getTemplate() {
    const elementCard = document
    .querySelector(this._selectorTemplate)
    .content
    .querySelector('.elements__element')
    .cloneNode(true);
    return elementCard;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.elements__mask-group');
    this._setEventListeners(this._elementImage);
    this._element.querySelector('.elements__title').textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    return this._element;
  }

  _setEventListeners(elementImage) {
    this._element.querySelector('.elements__delete').addEventListener('click', event => event.currentTarget.closest('.elements__element').remove());
    this._element.querySelector('.elements__group').addEventListener('click', event => event.target.classList.toggle('elements__group_active'));
    elementImage.addEventListener('click', () => openImagePopup(elementImage));
  }
}
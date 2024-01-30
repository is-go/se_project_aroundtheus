export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this.handleLikeIcon();
    });

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this.handleDeleteCard();
      });

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick({ name: this._name, link: this._link });
      });
  }

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  handleLikeIcon() {
    this._likeButton = this._element.querySelector(".card__like-button");
    this._likeButton.classList.toggle("card__like-button_active");
  }

  getView() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._cardImage = this._element.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle = this._element.querySelector(".card__title");

    this._cardTitle.textContent = this._name;

    return this._element;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._likeButton = cardElement.querySelector(".card__like-button");
    return cardElement;
  }
}

export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleLikes
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikes = handleLikes;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikes(this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  isLiked() {
    return this._isLiked;
  }

  getId() {
    return this._id;
  }
  toggleLikedStatus(isLiked) {
    this._isLiked = isLiked;
    this.setLikedStatus();
    this.handleLikeIcon();
  }
  setLikedStatus() {
    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  getView() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle = this._element.querySelector(".card__title");
    this._cardTitle.textContent = this._name;
    this.setLikedStatus();
    this._setEventListeners();
    return this._element;
  }
}

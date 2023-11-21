const initialCards = [
  {
    name: "Yosemite Valley",
    link: "./images/yosemite-valley.png",
  },
  {
    name: "Lake Louise",
    link: "./images/lake-louise.png",
  },
  {
    name: "Bald Mountains",
    link: "./images/bald-mountains.png",
  },
  {
    name: "Latemar",
    link: "./images/latemar.png",
  },
  {
    name: "Vanoise National Park",
    link: "./images/vanoise-national-park.png",
  },
  {
    name: "Lago di Braies",
    link: "./images/lago-di-braies.png",
  },
];

//
// Elements
//

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditButtonClose = profileEditModal.querySelector(
  "#profile-edit-button-close"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector("#profile-edit-form");
const addNewCardButton = document.querySelector(".profile__add-button");
const addNewCardModal = document.querySelector("#add-card-modal");
const addNewCardForm = addNewCardModal.querySelector("#add-card-form");
const addNewCardButtonClose = addNewCardModal.querySelector(
  "#add-card-button-close"
);
const addNewCardTitleInput = addNewCardForm.querySelector(
  "#add-card-title-input"
);
const addNewCardUrlInput = addNewCardForm.querySelector("#add-card-url-input");
const cardModal = document.querySelector("#modal-card-image");
const cardModalImage = cardModal.querySelector("#modal-card-image-src");
const cardModalCaption = cardModal.querySelector("#modal-card-caption");
const cardModalClose = cardModal.querySelector("#modal-card-close");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

//
// Functions
//

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  cardImageEl.classList.add("card");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    cardModalImage.src = cardData.link;
    cardModalImage.alt = cardData.name;
    cardModalCaption.textContent = cardData.name;
    openModal(cardModal);
  });

  cardModalClose.addEventListener("click", () => {
    closeModal(cardModal);
  });
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

//
// Event Handlers
//

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddNewCardFormSubmit(evt) {
  evt.preventDefault();
  const name = addNewCardTitleInput.value;
  const link = addNewCardUrlInput.value;
  const cardElement = getCardElement({
    name,
    link,
  });
  cardListEl.prepend(cardElement);
  closeModal(addNewCardModal);
}

//
// Event Listeners
//

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileEditButtonClose.addEventListener("click", () =>
  closeModal(profileEditModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addNewCardButton.addEventListener("click", () => openModal(addNewCardModal));

addNewCardButtonClose.addEventListener("click", () =>
  closeModal(addNewCardModal)
);

addNewCardForm.addEventListener("submit", function (evt) {
  handleAddNewCardFormSubmit(evt);
});

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});

const initialCards = [
  {
    name: "Orlando",
    link: "./images/orlando.webp",
  },
  {
    name: "South Beach",
    link: "./images/south-beach.webp",
  },
  {
    name: "Nashville",
    link: "./images/nashville.webp",
  },
  {
    name: "French Quarters",
    link: "./images/french-quarters.webp",
  },
  {
    name: "Boston",
    link: "./images/boston.webp",
  },
  {
    name: "Houston",
    link: "./images/houston.webp",
  },
];

//
// Elements
//
const closeButtons = document.querySelectorAll(".modal__close");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = document.querySelector("#profile-edit-form");
const addNewCardButton = document.querySelector(".profile__add-button");
const addNewCardModal = document.querySelector("#add-card-modal");
const addNewCardForm = document.querySelector("#add-card-form");
const addNewCardTitleInput = addNewCardForm.querySelector(
  "#add-card-title-input"
);
const addNewCardUrlInput = addNewCardForm.querySelector("#add-card-url-input");
const cardModal = document.querySelector("#modal-card-image");
const cardModalImage = cardModal.querySelector("#modal-card-image-src");
const cardModalCaption = cardModal.querySelector("#modal-card-caption");
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
  evt.target.reset();
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

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addNewCardButton.addEventListener("click", () => openModal(addNewCardModal));

addNewCardForm.addEventListener("submit", handleAddNewCardFormSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

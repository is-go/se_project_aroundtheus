import FormValidator from "../components/FormValidation.js";
import Card from "../components/Card.js";

const initialCards = [
  {
    name: "Orlando",
    link: "https://images.unsplash.com/photo-1609184889514-656548112551?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "South Beach",
    link: "https://images.unsplash.com/photo-1593810659067-3abb9b4dfa4c?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Nashville",
    link: "https://images.unsplash.com/photo-1537889230356-e49d1df471b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmFzaHZpbGxlfGVufDB8fDB8fHww",
  },
  {
    name: "French Quarters",
    link: "https://images.unsplash.com/photo-1568693059993-a239b9cd4957?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Boston",
    link: "https://images.unsplash.com/photo-1491249149628-28cb9a16356a?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Houston",
    link: "https://images.unsplash.com/photo-1612152328925-8b4ff8555606?q=80&w=1924&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
const profileEditForm = document.forms["profile-edit-form"];
const addNewCardButton = document.querySelector(".profile__add-button");
const addNewCardModal = document.querySelector("#add-card-modal");
const addNewCardForm = document.forms["add-card-form"];
const addNewCardTitleInput = addNewCardForm.querySelector(
  "#add-card-title-input"
);
const addNewCardUrlInput = addNewCardForm.querySelector("#add-card-url-input");
const cardModal = document.querySelector("#modal-card-image");
const cardModalImage = cardModal.querySelector("#modal-card-image-src");
const cardModalCaption = cardModal.querySelector("#modal-card-caption");
const cardListEl = document.querySelector(".cards__list");

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

//
// Functions
//

function handleImageClick(cardData) {
  cardModalImage.src = cardData.link;
  cardModalImage.alt = cardData.name;
  cardModalCaption.textContent = cardData.name;
  openModal(cardModal);
}

function handleKeyDown(event) {
  if (event.key === "Escape") {
    const openModal = document.querySelector(".modal.modal_opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

function handleOverlayClick(event) {
  if (event.target.classList.contains("modal_opened")) {
    closeModal(event.target);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("click", handleOverlayClick);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleKeyDown);
  document.removeEventListener("click", handleOverlayClick);
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
  const cardElement = createCard({ name, link });
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

addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.toggleButtonState();
  openModal(addNewCardModal);
});

addNewCardForm.addEventListener("submit", handleAddNewCardFormSubmit);

const createCard = (cardData) => {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
};

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
});

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => {
    closeModal(modal);
  });
});

const editProfileFormValidator = new FormValidator(settings, profileEditForm);
editProfileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(settings, addNewCardForm);
addCardFormValidator.enableValidation();

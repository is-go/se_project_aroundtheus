export const initialCards = [
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

const profileEditButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditForm = document.forms["profile-edit-form"];
const addNewCardButton = document.querySelector(".profile__add-button");
const addNewCardForm = document.forms["add-card-form"];
const cardListEl = document.querySelector(".cards__list");
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export {
  profileEditButton,
  profileTitle,
  profileDescription,
  profileEditForm,
  addNewCardButton,
  addNewCardForm,
  cardListEl,
  settings,
};

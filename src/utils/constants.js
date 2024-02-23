export const options = {
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "99e135c9-95eb-4f0e-9b9c-0972899e8ff1",
    "Content-Type": "application/json",
  },
};

export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const profileEditInputs = Array.from(
  profileEditModal.querySelectorAll(".modal__input")
);
export const profileEditImage = document.querySelector(".profile__image_edit");
export const addNewCardButton = document.querySelector(".profile__add-button");
export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
  errorMessage: "modal__error",
};

export const formList = Array.from(
  document.querySelectorAll(settings.formSelector)
);
export const formValidationObj = {};

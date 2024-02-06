import { settings } from "../utils/constants";

export default class FormValidation {
  constructor(
    formElement,
    {
      inputSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
      submitButtonSelector,
    }
  ) {
    this._inputSelector = inputSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._submitButtonSelector = submitButtonSelector;

    this._formElement = formElement;
    this._inputsArray = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );

    this._submitButton = this._formElement.querySelector(submitButtonSelector);
  }

  _showInputError(inputElement) {
    const errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageElement.classList.remove(this._errorClass);
    errorMessageElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      return this._showInputError(inputElement);
    }
    this._hideInputError(inputElement);
  }

  _isFormInvalid = (inputsArray) => {
    return inputsArray.some((inputElement) => !inputElement.validity.valid);
  };

  disableSubmit() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.setAttribute("disabled", true);
  }

  _enableSubmit() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.removeAttribute("disabled");
  }

  _toggleButtonState() {
    if (this._isFormInvalid(this._inputsArray)) {
      this.disableSubmit();
    } else {
      this._enableSubmit();
    }
  }

  resetValidation() {
    this._toggleButtonState(); //<== controlling the submit button ==

    this._inputsArray.forEach((inputElement) => {
      this._hideInputError(inputElement); //<== clearing errors ==
    });
  }

  _setEventListeners() {
    this._toggleButtonState(); // first?

    this._inputsArray.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(); // and after?
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

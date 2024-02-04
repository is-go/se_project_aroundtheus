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

  checkFormValidity() {
    this._inputsArray.forEach((inputElement) => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState(this._inputsArray);
    });
    // Array.from(this._formElement.querySelectorAll(this._inputSelector)).some(
    //   (inputElement) => !inputElement.validity.valid
    // this._inputsArray.some((inputElement) => !inputElement.validity.valid);-----wrong---make arra first?
  }

  _isFormInvalid = (inputsArray) => {
    return inputsArray.some((inputElement) => !inputElement.validity.valid);
  };

  _submitDisabled() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _submitEnabled() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _toggleButtonState() {
    // const isFormInvalid = this.checkFormValidity(); -wrong need 'valid value'

    if (this._isFormInvalid(this._inputsArray)) {
      this._submitDisabled();
      // this._submitButton.classList.add(this._inactiveButtonClass);
      // this._submitButton.disabled = true;
    } else {
      this._submitEnabled();
      // this._submitButton.classList.remove(this._inactiveButtonClass);
      // this._submitButton.disabled = false;
    }
  }

  // resetValidity() {---useless
  //   this._formElement.reset();
  //   this.toggleButtonState();
  //   this._inputElements.forEach((inputElement) => {
  //     this._hideInputError(inputElement);
  //   });
  // }

  // formReset() {---useless
  //   this._inputsArray.forEach((inputElement) => {
  //     inputElement.value.reset();
  //   });
  // }

  _setEventListeners() {
    this._toggleButtonState(this._inputsArray);
    this._inputsArray.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputsArray);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

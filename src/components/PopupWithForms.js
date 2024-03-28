import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, settings) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._button = this._popupElement.querySelector(
      settings.submitButtonSelector
    );
    this._buttonText = this._button.textContent;
    this._popupForm = this._popupElement.querySelector(settings.formSelector);
    this._inputList = Array.from(
      this._popupForm.querySelectorAll(".modal__input")
    );
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    isLoading
      ? (this._button.textContent = loadingText)
      : (this._button.textContent = this._buttonText);
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  resetInputValues() {
    this._popupForm.reset();
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputValuesData = this._getInputValues();
      this._handleFormSubmit(inputValuesData);
    });
    super.setEventListeners();
  }
}

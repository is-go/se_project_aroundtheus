import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFromSubmit) {
    super({ popupSelector });
    this._handleFormSubmit = handleFromSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this.setEventListeners();
  }

  _getInputValues() {
    const inputs = this._popupForm.querySelectorAll(".modal__input");
    const inputValues = {};
    inputs.forEach((input) => (inputValues[input.name] = input.value));
    return inputValues;
  }

  close() {
    // this._popupForm.reset(); // reset() not working
    super.close();
  }

  setEventListeners() {
    this._popupElement.addEventListener("submit", this._handleFormSubmit);
    super.setEventListeners();
  }
}

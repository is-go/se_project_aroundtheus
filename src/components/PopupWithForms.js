import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, formSelector) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(formSelector);
    this._inputList = Array.from(
      this._popupForm.querySelectorAll(".modal__input")
    );
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  resetInputValues() {
    this._inputList.forEach((input) => {
      input.value = "";
    });
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputValuesData = this._getInputValues();
      this._handleFormSubmit(inputValuesData);
      this.close();
    });
    super.setEventListeners();
  }

  // formReset() {
  //   this._popupForm.reset();
  // }

  // close() {
  //   this._popupForm.reset();
  //   super.close();
  // }
}

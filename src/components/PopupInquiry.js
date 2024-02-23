import Popup from "./Popup.js";

export default class PopupInquiry extends Popup {
  constructor(popupSelector, settings) {
    super({ popupSelector });
    this._button = this._popupElement.querySelector(
      settings.submitButtonSelector
    );
    this._buttonText = this._button.textContent;
  }

  renderSaving(isSaving) {
    isSaving
      ? (this._button.textContent = "Saving...")
      : (this._button.textContent = this._buttonText);
  }

  confirmAction(action) {
    this._handleInquiryAction = action;
  }

  setEventListeners() {
    this._button.addEventListener("click", () => {
      this._handleInquiryAction();
    });
    super.setEventListeners();
  }
}

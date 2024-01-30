export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    // this._handleEscClose = _handleEscClose();
    // this._handleOverlayClick = _handleOverlayClick();
    this.setEventListeners();
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", this.close());

    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("click", this._handleOverlayClick);

    const closeButtons = this._popupElement.querySelectorAll(".modal__close");
    closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.close();
      });
    });
  }

  open() {
    this._popupElement.classList.add("modal_opened");
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (
      event &&
      event.key === "Escape" &&
      this._popupElement.classList.contains("modal_opened")
    ) {
      this.close();
    }
  }

  // _handleOverlayClick(event) {
  //   if (
  //     !this._popupElement.contains(event.target) &&
  //     this._popupElement.classList.contains("modal_opened")
  //   ) {
  //     this.close();
  //   }
  // }
}

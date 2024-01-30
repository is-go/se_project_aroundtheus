import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ name, link }) {
    super({ popupSelector: "#modal-card-image" });
    this._name = name;
    this._link = link;
    this._image = this._popupElement.querySelector("#modal-card-image-src");
    this._caption = this._popupElement.querySelector("#modal-card-caption");

    this.open = this.open.bind(this);
  }

  open() {
    this._image.src = this._link;
    this._image.alt = this._name;
    this._caption.textContent = this._name;
    super.open();
  }
}

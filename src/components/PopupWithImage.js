import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._image = this._popupElement.querySelector("#modal-card-image-src");
    this._caption = this._popupElement.querySelector("#modal-card-caption");
  }

  open({ name, link }) {
    this._image.setAttribute("src", link);
    this._image.setAttribute("alt", name);
    this._caption.textContent = name;
    super.open();
  }
}

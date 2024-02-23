export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  makeCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name: name, link: link }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  ///fuse liked and unliked together for a toggle-like function
  likeCard(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //----can add to like with if/else? check online
  // unlikeCard(cardId) {
  //   return fetch(`${this._url}/cards/${cardId}/likes`, {
  //     method: "DELETE",----can add to like with if/else? check online
  //     headers: this._headers,
  //   }).then(this._checkResponse);
  // }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  editProfile({ name, description }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name: name, about: description }),
    }).then(this._checkResponse);
  }

  setAvatar({ link }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: link }),
    }).then(this._checkResponse);
  }
}

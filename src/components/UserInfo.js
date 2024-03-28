export default class UserInfo {
  constructor(nameSelector, descriptionSelector, avatarSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userInfoElements = {};
    userInfoElements.name = this._nameElement.textContent;
    userInfoElements.description = this._descriptionElement.textContent;
    return userInfoElements;
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._descriptionElement.textContent = data.description;
  }
  setUserAvatar(link) {
    this._avatarElement.setAttribute("src", link);
  }
}

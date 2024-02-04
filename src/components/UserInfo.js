export default class UserInfo {
  constructor(nameSelector, descriptionSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
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
}

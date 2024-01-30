export default class UserInfo {
  constructor({ nameSelector, bioSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._bioElement = document.querySelector(bioSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._nameElement.textContent,
      bio: this._bioElement.textContent,
    };
    return userInfo;
  }

  setUserInfo(name, bio) {
    this._nameElement.textContent = name;
    this._bioElement.textContent = bio;
  }
}

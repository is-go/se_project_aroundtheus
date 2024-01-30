import FormValidator from "../components/FormValidation.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForms.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {
  initialCards,
  profileEditButton,
  profileTitle,
  profileDescription,
  profileEditForm,
  addNewCardButton,
  addNewCardForm,
  cardListEl,
  settings,
} from "../utils/constants.js";
import "./index.css";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////-Card Rendering-//////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const createCard = (cardData) => {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
};

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

cardSection.renderItems();

function handleImageClick(cardData) {
  const popupWithImage = new PopupWithImage(cardData);
  popupWithImage.open();
}

// cardListEl.addEventListener("click", (event) => {
//   if (event.target.classList.contains("card__image")) {
//     const cardData = {
//       name: event.target.alt,
//       link: event.target.src,
//     };
//     handleImageClick(cardData);
//   }
// });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////-Add Card Modal-//////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const newCardPopup = new PopupWithForm("#add-card-modal", () => {});
newCardPopup.setEventListeners();

function handleAddNewCardFormSubmit(evt) {
  evt.preventDefault();
  const formData = newCardPopup._getInputValues();
  const cardElement = createCard(formData);
  cardListEl.prepend(cardElement);
  evt.target.reset();
  newCardPopup.close();
}

addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.toggleButtonState();
  newCardPopup.open();
});

const addCardFormValidator = new FormValidator(settings, addNewCardForm);
addCardFormValidator.enableValidation();

addNewCardForm.addEventListener("submit", handleAddNewCardFormSubmit);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////-Profile Rendering/-//////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  bioSelector: ".profile__description",
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////-Edit Profile Modal-//////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

profileEditButton.addEventListener("click", () => {
  const profileUserInfo = userInfo.getUserInfo();
  profileTitle.value = profileUserInfo.title;
  profileDescription.value = profileUserInfo.description;
  editProfilePopup.open();
});

const editProfilePopup = new PopupWithForm("#profile-edit-modal", () => {});
editProfilePopup.setEventListeners();

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  const formData = editProfilePopup._getInputValues();
  userInfo.setUserInfo(formData);
  editProfilePopup.close();
}

const editProfileFormValidator = new FormValidator(settings, profileEditForm);
editProfileFormValidator.enableValidation();

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

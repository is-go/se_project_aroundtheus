import FormValidation from "../components/FormValidation.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForms.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {
  initialCards,
  profileEditModal,
  profileEditButton,
  profileEditInputs,
  addNewCardButton,
  formList,
  formValidationObj,
  settings,
} from "../utils/constants.js";
import "./index.css";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////-Form Validator iterative/////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

formList.forEach((formElement) => {
  const formName = formElement.getAttribute("name");
  if (formName) {
    const formValidator = new FormValidation(formElement, settings);
    formValidator.enableValidation();
    formValidationObj[formName] = formValidator;
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////-Card Rendering-//////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);

  return card.getView();
}

const cardSection = new Section(
  { items: initialCards, renderer: createCard },
  ".cards__list"
);

cardSection.renderItems();

const popupWithImage = new PopupWithImage("#modal-card-image");
popupWithImage.setEventListeners();

function handleImageClick(name, link) {
  popupWithImage.open(name, link);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////-Add Card Modal-//////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const newCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddNewCardFormSubmit,
  "#add-card-form"
);
newCardPopup.setEventListeners();

function handleAddNewCardFormSubmit(inputValuesData) {
  const addedCard = createCard(inputValuesData);
  cardSection.addItem(addedCard);
  newCardPopup.resetInputValues();
  formValidationObj["add-card-form"].disableSubmit();
  newCardPopup.close();
}

addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////-Profile Rendering/-//////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const userInfo = new UserInfo(".profile__title", ".profile__description");

function setProfileInputs() {
  const userProfileInfo = userInfo.getUserInfo();
  const [nameInput, descriptionInput] = profileEditInputs;
  nameInput.value = userProfileInfo.name;
  descriptionInput.value = userProfileInfo.description;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////-Edit Profile Modal-//////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

profileEditButton.addEventListener("click", () => {
  setProfileInputs();
  formValidationObj["profile-edit-form"].resetValidation();
  editProfilePopup.open();
});

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit,
  "#profile-edit-form"
);
editProfilePopup.setEventListeners();

function handleProfileEditSubmit(inputValuesData) {
  userInfo.setUserInfo(inputValuesData);
  editProfilePopup.close();
}

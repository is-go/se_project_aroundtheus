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

// formList.forEach((formElement) => {---not placing form into object---
//   const formValidator = new FormValidation(formElement, settings);
//   const formName = formElement.getAttribute("name");
//   formValidator.enableValidation();
//   formValidationObj[formName] = formValidator;
// });

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

// function handleAddNewCardFormSubmit(inputValuesData) {
//   //---obj not working
//   const AddedCard = createCard(inputValuesData);
//   cardSection.addItem(AddedCard);
//   formValidationObj.newCardPopup.formReset();
//   newCardPopup.close();
// }

function handleAddNewCardFormSubmit(inputValuesData) {
  const AddedCard = createCard(inputValuesData);
  cardSection.addItem(AddedCard);
  newCardPopup.resetInputValues();
  newCardPopup.submitDisabled();
  newCardPopup.close();
}

addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

// const addCardFormValidator = new FormValidator(settings, "#add-card-form");
// addCardFormValidator.enableValidation();
// DRY do not repeat validation code-iterate

// addNewCardForm.addEventListener("submit", handleAddNewCardFormSubmit);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////-Profile Rendering/-//////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const userInfo = new UserInfo(".profile__title", ".profile__description");

function setProfileInputs() {
  const userProfileInfo = userInfo.getUserInfo();
  profileEditInputs[0].value = userProfileInfo.name;
  profileEditInputs[1].value = userProfileInfo.description;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////-Edit Profile Modal-//////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// profileEditButton.addEventListener("click", () => {
//   setProfileInputs();
//   formValidationObj.editProfilePopup.checkFormValidity(); //----obj not working
//   editProfilePopup.open();

//   //   // editProfileFormValidator.resetValidity();-null
//   //   // const { name, description } = userInfo.getUserInfo();-change to object
//   //   // profileTitle.value = name; - change to object
//   //   // profileDescription.value = description; - change to object
//   //   // editProfilePopup.open();
// });

profileEditButton.addEventListener("click", () => {
  setProfileInputs();
  if (formValidationObj["editProfilePopup"]) {
    formValidationObj["editProfilePopup"].checkFormValidity();
  }
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
  editProfilePopup.resetInputValues();
  editProfilePopup.submitDisabled();
  editProfilePopup.close();
}

// const editProfileFormValidator = new FormValidator(
//   settings,
//   "#profile-edit-form"
// );
// editProfileFormValidator.enableValidation();
// DRY do not repeat validation code-iterate

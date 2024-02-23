import FormValidation from "../components/FormValidation.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForms.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupInquiry from "../components/PopupInquiry.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import {
  profileEditButton,
  profileEditInputs,
  profileEditImage,
  addNewCardButton,
  formList,
  formValidationObj,
  settings,
  options,
} from "../utils/constants.js";
import "./index.css";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////-Form Validator iterative/////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

formList.forEach((formElement) => {
  const formName = formElement.getAttribute("name");
  const formValidator = new FormValidation(formElement, settings);
  formValidator.enableValidation();
  formValidationObj[formName] = formValidator;
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////-API-///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const api = new Api(options);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////-Card Rendering-//////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let cardDisplay;

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteCard,
    handleLikes
  );
  return card.getView();
}

api
  .getInitialCards()
  .then((res) => {
    cardDisplay = new Section(
      { items: res, renderer: createCard },
      ".cards__list"
    );
    cardDisplay.renderItems();
  })
  .catch(console.error);

const popupWithImage = new PopupWithImage("#modal-card-image");
popupWithImage.setEventListeners();

function handleImageClick(name, link) {
  popupWithImage.open(name, link);
}

function handleLikes(card) {
  api
    .likeCard(card.getId(), card.isLiked())
    .then((res) => {
      card.toggleLikedStatus(res.isLiked);
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////-Delete Card Modal-//////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const inquiryModal = new PopupInquiry("#delete-card-modal", settings);
inquiryModal.setEventListeners();

function handleDeleteCard(card) {
  inquiryModal.open();
  inquiryModal.confirmAction(() => {
    inquiryModal.renderSaving(true);
    api
      .deleteCard(card.getId())
      .then(() => {
        card.handleDeleteCard();
        inquiryModal.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        inquiryModal.renderSaving(false);
      });
  });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////-Add Card Modal-//////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const newCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddNewCardFormSubmit,
  settings
);
newCardPopup.setEventListeners();

addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

function handleAddNewCardFormSubmit(values) {
  newCardPopup.renderSaving(true);
  api
    .makeCard(values)
    .then((res) => {
      const newCard = createCard(res);
      cardDisplay.addItem(newCard);
      newCardPopup.resetInputValues();
      formValidationObj["add-card-form"].disableSubmit();
      newCardPopup.close();
    })
    .catch(console.error)
    .finally(() => {
      newCardPopup.renderSaving(false);
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////-Profile Rendering/-//////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__image"
);

function setProfileInputs() {
  const userProfileInfo = userInfo.getUserInfo();
  const [nameInput, descriptionInput] = profileEditInputs;
  nameInput.value = userProfileInfo.name;
  descriptionInput.value = userProfileInfo.description;
}

api
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo({
      name: res.name,
      description: res.about,
    });
    userInfo.setUserAvatar(res.avatar);
  })
  .catch(console.error);
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
  settings
);
editProfilePopup.setEventListeners();

function handleProfileEditSubmit(values) {
  editProfilePopup.renderSaving(true);
  api
    .editProfile(values)
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        description: res.about,
      });
      editProfilePopup.close();
    })
    .catch(console.error)
    .finally(() => {
      editProfilePopup.renderSaving(false);
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////-Avatar Modal-///////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

profileEditImage.addEventListener("click", () => profileEditAvatar.open());

const profileEditAvatar = new PopupWithForm(
  "#avatar-modal",
  handleProfileAvatar,
  settings
);
profileEditAvatar.setEventListeners();

api
  .getUserInfo()
  .then((user) => {
    userInfo.setUserInfo({
      name: user.name,
      description: user.description,
    });
    userInfo.setUserAvatar(user.avatar);
  })
  .catch((error) => {
    console.error(error);
  });

function handleProfileAvatar(values) {
  profileEditAvatar.renderSaving(true);
  api
    .setAvatar(values)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      profileEditAvatar.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileEditAvatar.renderSaving(false);
    });
}

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "./images/yosemite-valley.png",
  },
  {
    name: "Lake Louise",
    link: "./images/lake-louise.png",
  },
  {
    name: "Bald Mountains",
    link: "./images/bald-mountains.png",
  },
  {
    name: "Latemar",
    link: "./images/latemar.png",
  },
  {
    name: "Vanoise National Park",
    link: "./images/vanoise-national-park.png",
  },
  {
    name: "Lago di Braies",
    link: "./images/lago-di-braies.png",
  },
];

const profileEditButton = document.querySelector('#profile-edit-button');
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditButtonClose = document.querySelector('#profile-edit-button-close');

profileEditButton.addEventListener('click', () => {
  profileEditModal.classList.add('modal_opened');
})

profileEditButtonClose.addEventListener('click', () => {
  profileEditModal.classList.toggle('modal_opened');
})

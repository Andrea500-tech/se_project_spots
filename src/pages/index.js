import logo from "../images/logo.svg";
import avatar from "../images/avatar.jpg";
import pencil from "../images/pencil.svg";
import pencilLight from "../images/pencil-light.svg";
import plus from "../images/plus.svg";
import closeIcon from "../images/close-icon.svg";
import deleteCloseIcon from "../images/delete-close-icon.svg";
import "../pages/index.css";
import {
  enableValidation,
  settings,
  resetValidation,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";
import { setButtonText } from "../utils/helper.js";
// Set image src attributes in DOM
document.querySelector(".header__logo").src = logo;
document.querySelector(".profile__edit-icon").src = pencil;
document.querySelector(".profile__pencil-icon").src = pencilLight;
document.querySelector(".new-icon").src = plus;
document
  .querySelectorAll(".modal__close-icon")
  .forEach((img) => (img.src = closeIcon));

let selectedCard, selectedCardId;
function renderUserInfo(userInfo) {
  profileName.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  document.querySelector(".profile__avatar").src = userInfo.avatar;
  return userInfo;
}
function renderInitialCards(cards) {
  cards.forEach((card) => {
    const cardElement = getCardElement(card);
    cardsContainer.append(cardElement);
  });
}
function attachCloseHandler(button, modal) {
  button.addEventListener("click", function () {
    closeModal(modal);
  });
}
function attachOpenHandler(button, modal) {
  button.addEventListener("click", function () {
    openModal(modal);
  });
}
// API instance
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "cc793f1d-a132-4605-9f62-93b8758abfb3",
    "Content-Type": "application/json",
  },
});
api
  .getInitialData()
  .then(([userInfo, cards]) => {
    renderUserInfo(userInfo);
    renderInitialCards(cards);
  })
  .catch((err) => {
    console.log(err);
  });
// Profile elements
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
//profile avatar elements
const profileAvatarBtn = document.querySelector(".profile__avatar-btn");
const avatarModal = document.querySelector("#avatar-modal");
const avatarCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarInput = avatarModal.querySelector("#avatar-input");

//new post elements
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const imageLinkInput = newPostModal.querySelector("#card-image-input");
const imageCaptionInput = newPostModal.querySelector("#card-caption-input");

// Delete confirmation modal elements
const deleteModal = document.querySelector("#delete-modal");
const deleteCloseBtn = deleteModal.querySelector(".modal__close-btn");
const cancelBtn = deleteModal.querySelector(".modal__button-cancel");
const deleteForm = deleteModal.querySelector(".modal__form");
// Preview modal elements
const previewModal = document.querySelector("#preview-modal");
const previewCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImage = previewModal.querySelector(".modal__preview-image");
const previewCaption = previewModal.querySelector(".modal__caption");

// Modal functionality
function handleOverlayClick(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal__is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

function openModal(modal) {
  modal.classList.add("modal__is-opened");
  modal.addEventListener("mousedown", handleOverlayClick);
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("modal__is-opened");
  modal.removeEventListener("mousedown", handleOverlayClick);
  document.removeEventListener("keydown", handleEscClose);
}
// Open and close the edit profile modal
editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
  openModal(editProfileModal);
  const modalInputs = Array.from(
    editProfileForm.querySelectorAll(".modal__input")
  );
  resetValidation(editProfileForm, modalInputs, settings);
});
attachCloseHandler(editProfileCloseBtn, editProfileModal);
//open and close the profile avatar modal
attachOpenHandler(profileAvatarBtn, avatarModal);
attachCloseHandler(avatarCloseBtn, avatarModal);
// Open and close the new post modal
attachOpenHandler(newPostBtn, newPostModal);
attachCloseHandler(newPostCloseBtn, newPostModal);
// close the preview modal

attachCloseHandler(previewCloseBtn, previewModal);
// close the delete modal
attachCloseHandler(deleteCloseBtn, deleteModal);
attachCloseHandler(cancelBtn, deleteModal);
//Handle the profile avatar form submission
function handleAvatarSubmit(event) {
  event.preventDefault();
  const avatarbuttonElement = event.target.querySelector(".modal__button");
  setButtonText(avatarbuttonElement, true, "Saving...", "Save");
  api
    .changeAvatar({ avatar: avatarInput.value })
    .then((avatarInfo) => {
      document.querySelector(".profile__avatar").src = avatarInfo.avatar;
      closeModal(avatarModal);
      return avatarInfo;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setButtonText(avatarbuttonElement, false, "Saving...", "Save");
    });
}
avatarForm.addEventListener("submit", handleAvatarSubmit);
// Handle the edit profile form submission

function handleEditProfileFormSubmit(event) {
  event.preventDefault();
  const submitButton = event.target.querySelector(".modal__button");
  //submitButton.textContent = "Saving...";
  setButtonText(submitButton, true, "Saving...", "Save");
  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((userInfo) => {
      renderUserInfo(userInfo);
      closeModal(editProfileModal);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setButtonText(submitButton, false, "Saving...", "Save");
    });
}
editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);
// Card functionality
const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;

// Handle the new post form submission
function handleNewPostFormSubmit(event) {
  event.preventDefault();
  const createButtonText = event.target.querySelector(".modal__button");
  setButtonText(createButtonText, true, "Saving...", "Save");
  api
    .addNewCard({ name: imageCaptionInput.value, link: imageLinkInput.value })
    .then((cardData) => {
      const cardElement = getCardElement(cardData);
      cardsContainer.prepend(cardElement);
      closeModal(newPostModal);
      newPostForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setButtonText(createButtonText, false, "Saving...", "Save");
    });
}
//handle delete modal
function handleDeleteFormSubmit(event) {
  event.preventDefault();
  const deleteButton = event.target.querySelector(".modal__button");
  setButtonText(deleteButton, true, "Deleting...", "Delete");
  api
    .removeCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setButtonText(deleteButton, false, "Deleting...", "Delete");
    });
}
function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}
function handleDeleteModal(cardElement, data) {
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtn.addEventListener("click", (evt) => {
    handleDeleteCard(cardElement, data._id);
  });
}
function handleLike(evt, cardId) {
  //evt.target.classList.toggle("card__like-btn_active");
  const isLiked = evt.target.classList.contains("card__like-btn_active");
  const willLike = !isLiked;
  api
    .handleLikeStatus(cardId, willLike)
    .then(() => {
      if (willLike) {
        evt.target.classList.add("card__like-btn_active");
      } else {
        evt.target.classList.remove("card__like-btn_active");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
newPostForm.addEventListener("submit", handleNewPostFormSubmit);
deleteForm.addEventListener("submit", handleDeleteFormSubmit);
function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitleEl.textContent = data.name;
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  if (data.isLiked) {
    cardLikeBtn.classList.add("card__like-btn_active");
  } else {
    cardLikeBtn.classList.remove("card__like-btn_active");
  }
  cardLikeBtn.addEventListener("click", (evt) => {
    handleLike(evt, data._id);
  });
  handleDeleteModal(cardElement, data);
  cardImage.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

// Initial rendering of cards

enableValidation(settings);

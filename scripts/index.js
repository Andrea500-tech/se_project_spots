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
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const imageLinkInput = newPostModal.querySelector("#card-image-input");
const imageCaptionInput = newPostModal.querySelector("#card-caption-input");
// Open and close the edit profile modal
editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
  editProfileModal.classList.add("modal__isopened");
});
editProfileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal__isopened");
});
// Open and close the new post modal
newPostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal__isopened");
});
newPostCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal__isopened");
});
// Handle the edit profile form submission

function handleEditProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = editProfileNameInput.value;
  profileDescription.textContent = editProfileDescriptionInput.value;
  editProfileModal.classList.remove("modal__isopened");
}
editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);
// Handle the new post form submission
function handleNewPostFormSubmit(event) {
  event.preventDefault();
  console.log("New post added:", {
    imageLink: imageLinkInput.value,
    caption: imageCaptionInput.value,
  });
  newPostModal.classList.remove("modal__isopened");
}

newPostForm.addEventListener("submit", handleNewPostFormSubmit);

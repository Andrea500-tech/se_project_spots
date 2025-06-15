const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

// Open and close the edit profile modal
editProfileBtn.addEventListener("click", function()  {
  editProfileModal.classList.add("modal__isopened");
});
editProfileCloseBtn.addEventListener("click", function()  {
  editProfileModal.classList.remove("modal__isopened");
});
// Open and close the new post modal
newPostBtn.addEventListener("click", function()  {
  newPostModal.classList.add("modal__isopened");
});
newPostCloseBtn.addEventListener("click", function()  {
  newPostModal.classList.remove("modal__isopened");
});
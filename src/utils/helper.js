export function setButtonText(btnElement, isloading, loadingText, defaultText) {
  if (isloading) {
    btnElement.textContent = loadingText;
  } else {
    btnElement.textContent = defaultText;
  }
}

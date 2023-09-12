function initPopupWindow() {
  const body         = document.body;
  const closeBtn     = document.querySelector('.popup__close-btn');
  const popup        = document.querySelector('.popup');
  const popupContent = document.querySelector('.popup__content'); 

  closeBtn.addEventListener('click', () => {
    body.classList.remove('body_locked');
    popup.classList.remove('popup_opened');
  });

  popup.addEventListener('click', () => {
    if (!popupContent.matches(':hover')) {
      body.classList.remove('body_locked');
      popup.classList.remove('popup_opened');
    }
  });
}

initPopupWindow();
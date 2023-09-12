function initBurgerMenu() {
  const burgerBtn         = document.querySelector('.header__burger-menu');
  const burgerMenuWrapper = document.querySelector('.header__menu-body-wrapper');
  const burgerMenuBody    = document.querySelector('.header__menu-body');
  const navLinks          = document.querySelectorAll('.header__nav-link');
  const header            = document.querySelector('.header');
  const body              = document.body;
  
  burgerMenuWrapper.addEventListener('click', () => {
    if (!burgerMenuBody.matches(':hover')) {
      burgerBtn.classList.remove('header__burger-menu_opened');
      burgerMenuWrapper.classList.remove('header__menu-body-wrapper_opened');
      burgerMenuBody.classList.remove('header__menu-body_opened');
      header.classList.remove('header_locked');
      body.classList.remove('body_locked');
    }
  });

  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('header__burger-menu_opened');
    burgerMenuWrapper.classList.toggle('header__menu-body-wrapper_opened');
    burgerMenuBody.classList.toggle('header__menu-body_opened');
    header.classList.toggle('header_locked');
    body.classList.toggle('body_locked');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      burgerBtn.classList.remove('header__burger-menu_opened');
      burgerMenuWrapper.classList.remove('header__menu-body-wrapper_opened');
      burgerMenuBody.classList.remove('header__menu-body_opened');
      header.classList.remove('header_locked');
      body.classList.remove('body_locked');
    });
  });
}

initBurgerMenu();





function getRandomNaturalNumber(max) {
  return Math.floor(Math.random() * max);
}

async function renderPopup(petName) {
  const url      = '../data/pets.json';
  const response = await fetch(url);
  const pets     = Array.from(await response.json());

  let   popupContent  = '';
  let   desiredPet    = pets.find(pet => pet.name == petName);
  popupContent        = `<img src="${desiredPet.img.slice(3)}" alt="${desiredPet.name}" class="popup__img">
                          <div class="popup__text-content">
                            <h3 class="popup__pet-name">${desiredPet.name}</h3>
                            <h4 class="popup__pet-breed">Dog - ${desiredPet.breed}</h4>
                            <p class="popup__pet-desc">${desiredPet.description}</p>
                            <ul class="popup__pet-info">
                              <li class="pet-info__item"><b>Age:</b> ${desiredPet.age}</li>
                              <li class="pet-info__item"><b>Inoculations:</b> ${desiredPet.inoculations.join(', ')}</li>
                              <li class="pet-info__item"><b>Diseases:</b> ${desiredPet.diseases.join(', ')}</li>
                              <li class="pet-info__item"><b>Parasites:</b> ${desiredPet.parasites.join(', ')}</li>
                            </ul>
                          </div>`;

  return popupContent;
}

async function getRandomPets() {
  const url      = '../data/pets.json';
  const response = await fetch(url);
  const pets     = await response.json();


  const randomCards   = [];
  const randomNumbers = [undefined, undefined, undefined, undefined,
                         undefined, undefined, undefined, undefined];
  let   randomNumber  = undefined;
  for (let i = 0; i < pets.length; i++) {
    while (true) {
      randomNumber = getRandomNaturalNumber(8);
      if (!randomNumbers.includes(randomNumber)) {
        break;
      }
    }
    randomNumbers[i] = randomNumber;

    let pet        = pets[randomNumber];
    let card       = document.createElement('div');
    card.innerHTML = `<img src="${pet.img.slice(3)}" alt="${pet.name}" class="pets__pet-image">`+ 
                     `<p class="pets__pet-name">${pet.name}</p>`+
                     `<button class="pets__learn-more-button">Learn more</button>`;
    card.classList.add('pets__card');
    card.addEventListener('click', async () => {
      const body             = document.body;
      const popup            = document.querySelector('.popup');
      const popupContent     = document.querySelector('.popup__content');
      
      popupContent.innerHTML = await renderPopup(card.children[1].textContent);
      popup.classList.add('popup_opened');
      body.classList.add('body_locked');
    });
    randomCards.push(card);
  }

  return randomCards;
}

async function renderPaginationContent() { 
  const paginator  = document.querySelector('.pets__cards');                             
  let   cards      = [];

  for (let i = 0; i < 6; i++) {
    cards = await getRandomPets();
    cards.forEach(card => {
      paginator.append(card);
    });
  }
}

async function initPaginationBehavior() {
  await renderPaginationContent();

  const body              = document.body;
  const paginatorViewport = document.querySelector('.pets__cards-viewport');
  const paginator         = document.querySelector('.pets__cards');
  const beginBtn          = document.querySelector('#pets__button-begin');
  const prevBtn           = document.querySelector('#pets__button-prev');
  const pageNumber        = document.querySelector('#pets__page-number');
  const nextBtn           = document.querySelector('#pets__button-next');
  const endBtn            = document.querySelector('#pets__button-end');
  const devMaxPages = {
    desktop: 6,
    tablet:  8,
    mobile:  16
  };

  let maxPages = undefined;
  if (paginatorViewport.clientWidth == 1200) {
    maxPages = devMaxPages.desktop;
  } else if (paginatorViewport.clientWidth == 580) {
    maxPages = devMaxPages.tablet;
  } else {
    maxPages = devMaxPages.mobile;
  }

  let   page           = 0;
  let   offsetWidth    = undefined;

  nextBtn.addEventListener('click', () => {
    page += 1;  
    pageNumber.textContent = page + 1;
    prevBtn.classList.remove('pets__button_inactive'); prevBtn.classList.add('pets__button_normal');
    beginBtn.classList.remove('pets__button_inactive'); beginBtn.classList.add('pets__button_normal');
    prevBtn.disabled = false;
    beginBtn.disabled = false;
    if (page == maxPages - 1) {
      nextBtn.classList.remove('pets__button_normal'); nextBtn.classList.add('pets__button_inactive');
      endBtn.classList.remove('pets__button_normal'); endBtn.classList.add('pets__button_inactive');
      nextBtn.disabled = true;
      endBtn.disabled = true;
    }

    offsetWidth = paginatorViewport.clientWidth;
    paginator.style.left = -((offsetWidth + 40) * page) + 'px';
  });

  prevBtn.addEventListener('click', () => {
    page -= 1;
    pageNumber.textContent = page + 1;
    nextBtn.classList.remove('pets__button_inactive'); nextBtn.classList.add('pets__button_normal');
    endBtn.classList.remove('pets__button_inactive'); endBtn.classList.add('pets__button_normal');
    nextBtn.disabled = false;
    endBtn.disabled = false;
    if (page == 0) {
      prevBtn.classList.remove('pets__button_normal'); prevBtn.classList.add('pets__button_inactive');
      beginBtn.classList.remove('pets__button_normal'); beginBtn.classList.add('pets__button_inactive');
      prevBtn.disabled = true;
      beginBtn.disabled = true;
    }

    offsetWidth = paginatorViewport.clientWidth;
    paginator.style.left = -((offsetWidth + 40) * page) + 'px';
  });

  beginBtn.addEventListener('click', () => {
    page = 0;
    pageNumber.textContent = page + 1;

    nextBtn.classList.remove('pets__button_inactive'); nextBtn.classList.add('pets__button_normal');
    endBtn.classList.remove('pets__button_inactive'); endBtn.classList.add('pets__button_normal');
    nextBtn.disabled = false;
    endBtn.disabled = false;

    prevBtn.classList.remove('pets__button_normal'); prevBtn.classList.add('pets__button_inactive');
    beginBtn.classList.remove('pets__button_normal'); beginBtn.classList.add('pets__button_inactive');
    prevBtn.disabled = true;
    beginBtn.disabled = true;

    offsetWidth = paginatorViewport.clientWidth;
    paginator.style.left = -((offsetWidth + 40) * page) + 'px';
  });

  endBtn.addEventListener('click', () => {
    page = maxPages - 1;
    pageNumber.textContent = page + 1;

    prevBtn.classList.remove('pets__button_inactive'); prevBtn.classList.add('pets__button_normal');
    beginBtn.classList.remove('pets__button_inactive'); beginBtn.classList.add('pets__button_normal');
    prevBtn.disabled = false;
    beginBtn.disabled = false;

    nextBtn.classList.remove('pets__button_normal'); nextBtn.classList.add('pets__button_inactive');
    endBtn.classList.remove('pets__button_normal'); endBtn.classList.add('pets__button_inactive');
    nextBtn.disabled = true;
    endBtn.disabled = true;
    
    offsetWidth = paginatorViewport.clientWidth;
    paginator.style.left = -((offsetWidth + 40) * page) + 'px';
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1280) {
      maxPages = devMaxPages.desktop;
    } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
      maxPages = devMaxPages.tablet;
      nextBtn.classList.remove('pets__button_inactive'); nextBtn.classList.add('pets__button_normal');
      endBtn.classList.remove('pets__button_inactive'); endBtn.classList.add('pets__button_normal');
      nextBtn.disabled = false;
      endBtn.disabled = false;
    } else {
      maxPages = devMaxPages.mobile;
      nextBtn.classList.remove('pets__button_inactive'); nextBtn.classList.add('pets__button_normal');
      endBtn.classList.remove('pets__button_inactive'); endBtn.classList.add('pets__button_normal');
      nextBtn.disabled = false;
      endBtn.disabled = false;
    }
    if (page > maxPages - 1) {
      page = maxPages - 1;
      pageNumber.textContent = page + 1;
      nextBtn.classList.remove('pets__button_normal'); nextBtn.classList.add('pets__button_inactive');
      endBtn.classList.remove('pets__button_normal'); endBtn.classList.add('pets__button_inactive');
      nextBtn.disabled = true;
      endBtn.disabled = true;
    }
    offsetWidth = paginatorViewport.clientWidth;
    paginator.style.left = -((offsetWidth + 40) * page) + 'px';
  });
}

initPaginationBehavior();
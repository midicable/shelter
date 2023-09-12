function getRandomNaturalNumber(max) {
  return Math.floor(Math.random() * max);
}

async function renderPopup(petName) {
  const url      = 'data/pets.json';
  const response = await fetch(url);
  const pets     = Array.from(await response.json());

  let   popupContent  = '';
  let   desiredPet    = pets.find(pet => pet.name == petName);
  popupContent        = `<img src="${desiredPet.img.slice(6)}" alt="${desiredPet.name}" class="popup__img">
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

const prevRandomNumbers = [undefined, undefined, undefined];
async function createCardsItem() {
  const url      = 'data/pets.json';
  const response = await fetch(url);
  const pets     = await response.json();

  let randomNumbers = [undefined, undefined, undefined];
  let randomNumber  = undefined;
  let cardsItem     = document.createElement('div');
  for (let i = 0; i < 3; i++) {
    while (true) {
      randomNumber = getRandomNaturalNumber(8);
      if (!randomNumbers.includes(randomNumber) && !prevRandomNumbers.includes(randomNumber)) {
        break;
      }
    }
    randomNumbers[i] = randomNumber;

    let pet        = pets[randomNumber];
    let card       = document.createElement('div');
    card.innerHTML = `<img src="${pet.img.slice(6)}" alt="${pet.name}" class="pets__pet-image">`+ 
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
    cardsItem.appendChild(card);
    cardsItem.classList.add('pets__cards-item');
  }
  for (let i = 0; i < 3; i++) {
    prevRandomNumbers[i] = randomNumbers[i];
  }

  return cardsItem;
}

async function initSlider() {
  const slider = document.querySelector('.pets__cards');

  const prevSlide = await createCardsItem();
  const currSlide = await createCardsItem();
  const nextSlide = await createCardsItem();
  
  prevSlide.classList.add('prev-slide');
  currSlide.classList.add('curr-slide');
  nextSlide.classList.add('next-slide');

  slider.appendChild(prevSlide);
  slider.appendChild(currSlide);
  slider.appendChild(nextSlide);
}

async function initArrowBtns() {
  await initSlider();

  const slider        = document.querySelector('.pets__cards');
  const leftArrowBtn  = document.querySelector('#pets__button-arrow-left');
  const rightArrowBtn = document.querySelector('#pets__button-arrow-right');

  leftArrowBtn.addEventListener('click', async () => {
    const currSlide = document.querySelector('.curr-slide');
    const prevSlide = document.querySelector('.prev-slide');
    const newSlide  = await createCardsItem();

    currSlide.classList.remove('curr-slide'); currSlide.classList.add('next-slide');
    prevSlide.classList.remove('prev-slide'); prevSlide.classList.add('curr-slide');
    newSlide.classList.add('prev-slide');
    
    slider.removeChild(slider.lastElementChild);
    slider.prepend(newSlide);
  });

  rightArrowBtn.addEventListener('click', async () => {
    const currSlide = document.querySelector('.curr-slide');
    const nextSlide = document.querySelector('.next-slide');
    const newSlide  = await createCardsItem();

    currSlide.classList.remove('curr-slide'); currSlide.classList.add('prev-slide');
    nextSlide.classList.remove('next-slide'); nextSlide.classList.add('curr-slide');
    newSlide.classList.add('next-slide');

    slider.removeChild(slider.firstElementChild);
    slider.append(newSlide);
  });
}

initArrowBtns();
'use strict';

///////////////////////////////////////
// Modal window

const header = document.querySelector('.header');

const message = document.createElement('div');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const nav = document.querySelector('.nav');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = Array.from(
  document.querySelectorAll('.operations__content')
);

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

message.classList.add('cookie-message');

message.innerHTML =
  "we are collecting cookies for improving the website <button class='btn' > ok </button>";
header.before(message);

document.querySelector('.btn').addEventListener('click', function () {
  message.parentElement.removeChild(message);
});

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//SCROLLING FUNCTION

btnScroll.addEventListener('click', function (e) {
  // const s1coords = section1.getBoundingClientRect();

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top+ window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

// todo list app
// const textInput = document.querySelector('.input-text');
// const addbutton = document.querySelector('.button-add');
// const container = document.querySelector('.container');

// addbutton.addEventListener('click', function () {
//   const div = document.createElement('div');

//   const value = textInput.value;
//   const closebutton = document.createElement('button');
//   const editContent = document.createElement('button');
//   const input = document.createElement('h1');
//   input.innerHTML = `${value}`;
//   editContent.innerText = 'Edit ';

//   input.addEventListener('dblclick', function () {
//     input.contentEditable= true

//   });

//   input.addEventListener('focusout', function() {
//     input.contentEditable=false
//   })
//   closebutton.innerText = 'X';
//   closebutton.addEventListener('click', function () {
//     input.remove();
//     closebutton.remove();
//     editContent.remove();
//   });

//   // div.innerHTML = `<h1>${value}</h1>`;

//   container.appendChild(input);
//   container.appendChild(closebutton);
//   container.appendChild(editContent);
// });
// RGB(255,255,255)

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

nav.addEventListener('click', function (e) {
  e.preventDefault();
  this.style.backgroundColor = randomColor();
});

//  smooth

document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});

//

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

const handleover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');

    siblings.forEach(e => {
      if (e !== link) {
        e.style.opacity = opacity;
      }
    });
  }
};

nav.addEventListener('mouseover', function (e) {
  handleover(e, 0.5);
});

nav.addEventListener('mouseout', function (e) {
  handleover(e, 1);
});

// nav.addEventListener('mouseover', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav')
//     .querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 0.5;
//     });
//     logo.style.opacity = 0.5;

//   }
// });

// nav.addEventListener('mouseout', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 1;
//     });
//     logo.style.opacity = 1;

//   }
// });

//sticky navigation
// const initialcords = section1.getBoundingClientRect();
// console.log(initialcords);

// window.addEventListener('scroll', function () {
//   // console.log(window.scrollY)
//   if (window.scrollY > initialcords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });
// window.addEventListener('scroll', function(e) {
//   console.log(window.scrollY)
// })

//intersection observer

// const obsCallback = function (entries,observer) {
// entries.forEach(entries=> {
//   console.log(entries)
// })
// }
// const obsOptiions = {
// root:null,
// threshold:[0,0.2]
// }
// const observer = new IntersectionObserver(
//   obsCallback,obsOptiions
// )
// observer.observe(section1)

const headers = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px  `,
});
headerObserver.observe(headers);

// //
// const allSections = document.querySelectorAll('.section');
// const revealSection = function (entries, observe) {
//   const [entry] = entries;
//  console.log(entry)

//  if (!entry.isIntersecting)  return
//   entry.target.classList.remove('section--hidden')
//   observe.unobserve(entry.target)
// };
// const sectionObserver = new IntersectionObserver(revealSection, {
//   root: null,
//   threshold: 0.15,
// });

// allSections.forEach(function (section) {
//   sectionObserver.observe(section);
//   section.classList.add('section--hidden');
// });

//reveal section

// const allSection = document.querySelectorAll('.section')

// const revealSection = function(entries,obeserver) {
// const [entry] = entries;
// console.log(entry);
// if(!entry.isIntersecting) return
// entry.target.classList.remove('section--hidden')
// obeserver.unobserve(entry.target)
// }
// const sectionObserver = new IntersectionObserver(revealSection, {
//   root:null,
//   threshold:0.15
// })

// allSection.forEach(function(section) {
//   sectionObserver.observe(section)
//   section.classList.add('section--hidden')
// })

const allSection = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    sectionObserver.unobserve(entry.target);
  });
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//section

const imgselect = document.querySelectorAll('img[data-src]');

const revealimg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(revealimg, {
  root: null,
  threshold: 0,
});

imgselect.forEach(img => imgObserver.observe(img));
//slider
const slider = document.querySelectorAll('.slider');
const slides = document.querySelectorAll('.slide');
const buttonLeft = document.querySelector('.slider__btn--left');
const buttonRight = document.querySelector('.slider__btn--right');


const goToslides = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - curslide)}%)`;
    // -100, 0,100,200
  });
};
let curslide = 0;
let maxSlide = slides.length;

slider.forEach((s, i) => {
  s.style.transform = `scale(0.5)%`;
});

slides.forEach((s, i) => {
  s.style.transform = `translateX(${100 * i}%)`;
  // -0, 100,200,300
});

const prevslide = function () {
  if (curslide === 0) {
    curslide = maxSlide - 1;
  } else {
    curslide--;
  }

  goToslides(slides);
};

buttonLeft.addEventListener('click', prevslide);

const nextslide = function () {
  if (curslide === maxSlide - 1) {
    curslide = 0;
  } else {
    curslide++;
  }
  goToslides(slides);
};
buttonRight.addEventListener('click', nextslide);

const dotcontainer = document.querySelector('.dots');

const createDots = function () {
  slides.forEach(function (_, i) {
    dotcontainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}">
     </button>`
    );
  });
};

createDots();
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevslide()
  if (e.key === 'ArrowRight') nextslide()
 
});

dotcontainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide  = Number(e.target.dataset.slide);
    curslide = slide
    goToslides(slide)
  }
});

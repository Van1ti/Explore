const track = document.querySelector('.secrets_slider--container--track');
const slides = track.querySelectorAll('img');
const prevBtn = document.querySelector('.secrets_slider--container--perv');
const nextBtn = document.querySelector('.secrets_slider--container--next');
const dotsContainer = document.querySelector('.secrets_slider--container--dots');

let currentIndex = 0;

/* Create dots */
slides.forEach((_, index) => {
    const dot = document.createElement('span');
    if (index === 0) dot.classList.add('active');

    dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
    });

    dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll('span');

/* Update slider */
function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

/* Navigation */
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
});

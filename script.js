const track = document.querySelector('.secrets_slider--track');
const slides = document.querySelectorAll('.secrets_slider--track img');
const prev = document.querySelector('.secrets_slider--prev');
const next = document.querySelector('.secrets_slider--next');
const dotsWrap = document.querySelector('.secrets_slider--dots');

let index = 1;
const gap = 24;
const visible = 3;

/* dots */
for (let i = 0; i <= slides.length - visible; i++) {
    const dot = document.createElement('span');
    if (i === index - 1) dot.classList.add('active');

    dot.onclick = () => {
        index = i + 1;
        update();
    };

    dotsWrap.appendChild(dot);
}

const dots = dotsWrap.querySelectorAll('span');

function slideWidth() {
    return slides[0].offsetWidth + gap;
}

function update() {
    track.style.transform = `translateX(-${(index - 1) * slideWidth()}px)`;

    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');

    dots.forEach(dot => dot.classList.remove('active'));
    dots[index - 1].classList.add('active');
}

next.onclick = () => {
    if (index < slides.length - 1) {
        index++;
        update();
    }
};

prev.onclick = () => {
    if (index > 1) {
        index--;
        update();
    }
};

window.addEventListener('resize', update);
update();


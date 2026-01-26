const track = document.querySelector('.secrets_slider--track');
const slides = Array.from(track.children);
const prev = document.querySelector('.secrets_slider--prev');
const next = document.querySelector('.secrets_slider--next');
const dotsWrap = document.querySelector('.secrets_slider--dots');

let visible = window.innerWidth <= 768 ? 1 : 3;
let index = visible;
const gap = 24;

/* ===== CLONE SLIDES FOR INFINITE ===== */
const clonesBefore = slides.slice(-visible).map(slide => slide.cloneNode(true));
const clonesAfter = slides.slice(0, visible).map(slide => slide.cloneNode(true));

clonesBefore.forEach(clone => track.prepend(clone));
clonesAfter.forEach(clone => track.append(clone));

const allSlides = Array.from(track.children);

/* ===== DOTS ===== */
const dotsCount = slides.length;
for (let i = 0; i < dotsCount; i++) {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');

    dot.onclick = () => {
        index = i + visible;
        update();
    };

    dotsWrap.appendChild(dot);
}
const dots = dotsWrap.querySelectorAll('span');

/* ===== SLIDE WIDTH ===== */
function slideWidth() {
    return window.innerWidth <= 768
        ? allSlides[0].offsetWidth
        : allSlides[0].offsetWidth + gap;
}

/* ===== UPDATE ===== */
function update(animate = true) {
    track.style.transition = animate ? 'transform 0.6s ease' : 'none';
    track.style.transform = `translateX(-${index * slideWidth()}px)`;

    allSlides.forEach(slide => slide.classList.remove('active'));

    if (window.innerWidth > 768) {
        allSlides[index + 1]?.classList.add('active');
    }

    dots.forEach(dot => dot.classList.remove('active'));
    dots[(index - visible + dotsCount) % dotsCount].classList.add('active');
}

/* ===== EDGE JUMP (INFINITE EFFECT) ===== */
track.addEventListener('transitionend', () => {
    if (index >= slides.length + visible) {
        index = visible;
        update(false);
    }
    if (index < visible) {
        index = slides.length + visible - 1;
        update(false);
    }
});

/* ===== CONTROLS ===== */
next.onclick = () => {
    index++;
    update();
};

prev.onclick = () => {
    index--;
    update();
};

/* ===== RESIZE ===== */
window.addEventListener('resize', () => {
    visible = window.innerWidth <= 768 ? 1 : 3;
    index = visible;
    update(false);
});

/* INIT */
update(false);

document.getElementById("scrollTopBtn").addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
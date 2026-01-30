const track = document.querySelector('.secrets_slider--track');
const slides = Array.from(track.children);
const prev = document.querySelector('.secrets_slider--prev');
const next = document.querySelector('.secrets_slider--next');
const dotsWrap = document.querySelector('.secrets_slider--dots');

const gap = 24;
let visible;
let index;

/* ===== GET VISIBLE COUNT ===== */
function getVisible() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
}

/* ===== INIT VALUES ===== */
visible = getVisible();
index = visible;

/* ===== CLONE SLIDES FOR INFINITE ===== */
function setupClones() {
    // remove old clones
    track.querySelectorAll('.clone').forEach(c => c.remove());

    const originals = Array.from(track.children);

    const clonesBefore = originals.slice(-visible).map(slide => {
        const clone = slide.cloneNode(true);
        clone.classList.add('clone');
        return clone;
    });

    const clonesAfter = originals.slice(0, visible).map(slide => {
        const clone = slide.cloneNode(true);
        clone.classList.add('clone');
        return clone;
    });

    clonesBefore.forEach(clone => track.prepend(clone));
    clonesAfter.forEach(clone => track.append(clone));
}

/* ===== DOTS ===== */
function setupDots() {
    dotsWrap.innerHTML = '';

    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        if (i === 0) dot.classList.add('active');

        dot.onclick = () => {
            index = i + visible;
            update();
        };

        dotsWrap.appendChild(dot);
    });
}

/* ===== SLIDE WIDTH ===== */
function slideWidth() {
    const slide = track.querySelector('img');
    return slide.offsetWidth + (visible > 1 ? gap : 0);
}

/* ===== UPDATE ===== */
function update(animate = true) {
    track.style.transition = animate ? 'transform 0.6s ease' : 'none';
    track.style.transform = `translateX(-${index * slideWidth()}px)`;

    const allSlides = Array.from(track.children);
    allSlides.forEach(slide => slide.classList.remove('active'));

    if (visible > 1) {
        allSlides[index + Math.floor(visible / 2)]?.classList.add('active');
    } else {
        allSlides[index]?.classList.add('active');
    }

    const dots = dotsWrap.querySelectorAll('span');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[(index - visible + slides.length) % slides.length]?.classList.add('active');
}

/* ===== INFINITE EDGE FIX ===== */
track.addEventListener('transitionend', () => {
    const allSlides = Array.from(track.children);

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
    const newVisible = getVisible();
    if (newVisible !== visible) {
        visible = newVisible;
        index = visible;
        setupClones();
        setupDots();
        update(false);
    }
});

/* ===== INIT ===== */
setupClones();
setupDots();
update(false);


document.getElementById("scrollTopBtn").addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        const el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
    });
});


(function () {
    const carousel = document.getElementById("servicesCarousel");
    const track = document.getElementById("servicesTrack");
    const left = document.getElementById("arrowLeft");
    const right = document.getElementById("arrowRight");

    if (!carousel || !track) return;

    const originals = Array.from(track.children);
    originals.forEach(card => track.appendChild(card.cloneNode(true)));

    function clearFront() {
        track.querySelectorAll(".service-card").forEach(c => c.classList.remove("is-front"));
    }

    track.querySelectorAll(".service-card").forEach(card => {
        card.addEventListener("mouseenter", () => {
            carousel.classList.add("is-paused");
            clearFront();
            card.classList.add("is-front");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("is-front");
            carousel.classList.remove("is-paused");
        });
    });

    function stepSize() {
        const card = track.querySelector(".service-card");
        if (!card) return 0;
        const gap = 24;
        return card.getBoundingClientRect().width + gap;
    }

    let manualX = 0;

    function applyManualMove() {
        track.style.animation = "none";
        track.style.transition = "transform 450ms ease";
        track.style.transform = `translateX(${manualX}px)`;
        carousel.classList.add("is-paused");
    }

    right?.addEventListener("click", () => {
        manualX -= stepSize();
        applyManualMove();
    });

    left?.addEventListener("click", () => {
        manualX += stepSize();
        applyManualMove();
    });

    carousel.addEventListener("mouseleave", () => {
        manualX = 0;
        track.style.transition = "none";
        track.style.transform = "translateX(0px)";
        track.offsetHeight;
        track.style.transition = "";
        track.style.animation = "";
        carousel.classList.remove("is-paused");
        clearFront();
    });
})();

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        const el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
    });
});



(function () {
    const carousel = document.getElementById("servicesCarousel");
    const track = document.getElementById("servicesTrack");
    const left = document.getElementById("arrowLeft");
    const right = document.getElementById("arrowRight");

    if (!carousel || !track) return;

    const originals = Array.from(track.children);
    originals.forEach(card => track.appendChild(card.cloneNode(true)));

    function clearFront() {
        track.querySelectorAll(".service-card").forEach(c => c.classList.remove("is-front"));
    }

    track.querySelectorAll(".service-card").forEach(card => {
        card.addEventListener("mouseenter", () => {
            carousel.classList.add("is-paused");
            clearFront();
            card.classList.add("is-front");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("is-front");
            carousel.classList.remove("is-paused");
        });
    });

    function stepSize() {
        const card = track.querySelector(".service-card");
        if (!card) return 0;
        const gap = 24;
        return card.getBoundingClientRect().width + gap;
    }

    let manualX = 0;

    function applyManualMove() {
        track.style.animation = "none";
        track.style.transition = "transform 450ms ease";
        track.style.transform = `translateX(${manualX}px)`;
        carousel.classList.add("is-paused");
    }

    right?.addEventListener("click", () => {
        manualX -= stepSize();
        applyManualMove();
    });

    left?.addEventListener("click", () => {
        manualX += stepSize();
        applyManualMove();
    });

    carousel.addEventListener("mouseleave", () => {
        manualX = 0;
        track.style.transition = "none";
        track.style.transform = "translateX(0px)";
        track.offsetHeight;
        track.style.transition = "";
        track.style.animation = "";
        carousel.classList.remove("is-paused");
        clearFront();
    });
})();

(function () {

    const overlay = document.querySelector(".modal-overlay");
    const box = overlay?.querySelector(".modal-box");
    if (!overlay || !box) return;

    const openBtn = document.querySelector('[data-open="consulta-modal"]');

    const inputTitulo = overlay.querySelector('[name="titulo"]');
    const inputData = overlay.querySelector('[name="data"]');
    const inputHora = overlay.querySelector('[name="hora"]');
    const inputLocal = overlay.querySelector('[name="local"]');
    const inputObs = overlay.querySelector('[name="obs"]');

    const closeBtns = overlay.querySelectorAll("[data-close]");

    let selectedDateISO = null;

    function openModal() {
        overlay.classList.add("active");

        if (inputData && selectedDateISO) inputData.value = selectedDateISO;

        setTimeout(() => {
            inputTitulo?.focus();
        }, 50);
    }

    function closeModal() {
        overlay.classList.remove("active");
    }

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal();
    });


    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && overlay.classList.contains("active")) {
            closeModal();
        }
    });


    closeBtns.forEach(btn => btn.addEventListener("click", closeModal));


    openBtn?.addEventListener("click", openModal);

    document.querySelectorAll(".day[data-iso]").forEach(day => {
        day.addEventListener("click", () => {
            selectedDateISO = day.getAttribute("data-iso");
        });
    });

    const saveBtn = overlay.querySelector('[data-save="consulta"]');

    function saveConsulta() {
        const titulo = inputTitulo?.value?.trim();
        const data = inputData?.value?.trim();
        const hora = inputHora?.value?.trim();
        const local = inputLocal?.value?.trim() || "";
        const obs = inputObs?.value?.trim() || "";

        if (!titulo || !data || !hora) {
            alert("Preencha Título, Data e Horário.");
            return;
        }
        const key = `agenda_${data}`;
        const eventos = JSON.parse(localStorage.getItem(key) || "[]");
        eventos.push({ titulo, data, hora, local, obs });
        localStorage.setItem(key, JSON.stringify(eventos));

        closeModal();

        if (typeof window.renderAgenda === "function") {
            window.renderAgenda();
        }
    }

    saveBtn?.addEventListener("click", saveConsulta);
})();


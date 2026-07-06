function toggleTheme() {
    const isLight = document.body.classList.toggle("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    syncThemeSwitch();
}

function syncThemeSwitch() {
    const input = document.querySelector(".theme-switch input");
    const thumb = document.querySelector(".theme-switch .thumb");
    if (!input) return;
    const isLight = document.body.classList.contains("light");
    input.checked = isLight;
    if (thumb) thumb.textContent = isLight ? "☀" : "☾";
}

function initializeTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light");
    }
    syncThemeSwitch();
}

function initializeScrollReveal() {
    const panels = document.querySelectorAll("section.panel");

    if (!("IntersectionObserver" in window)) {
        panels.forEach(panel => panel.classList.add("is-visible"));
        return;
    }

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

    panels.forEach(panel => revealObserver.observe(panel));
}

function initializeNavScrollSpy() {
    const sections = Array.from(document.querySelectorAll("main section[id]"));
    const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
    if (!sections.length || !navLinks.length || !("IntersectionObserver" in window)) return;

    const linkFor = (id) => navLinks.find(link => link.getAttribute("href") === `#${id}`);

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const link = linkFor(entry.target.id);
            if (!link) return;
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove("is-active"));
                link.classList.add("is-active");
            }
        });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sections.forEach(section => spyObserver.observe(section));
}

window.addEventListener("DOMContentLoaded", () => {
    initializeTheme();
    initializeScrollReveal();
    initializeNavScrollSpy();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});
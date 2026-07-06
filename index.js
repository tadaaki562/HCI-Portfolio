(function () {
    var themeBtn = document.getElementById("theme-btn");
    var navLinks = document.querySelectorAll(".nav a");

    function applyTheme(dark) {
        document.body.classList.toggle("dark", dark);
        localStorage.setItem("theme", dark ? "dark" : "light");
    }

    function initTheme() {
        var saved = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        applyTheme(saved === "dark" || (!saved && prefersDark));
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", function () {
            applyTheme(!document.body.classList.contains("dark"));
        });
    }

    navLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            var href = link.getAttribute("href");
            if (!href || href.charAt(0) !== "#") return;
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    if ("IntersectionObserver" in window) {
        var sections = document.querySelectorAll("section[id]");
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                navLinks.forEach(function (l) { l.classList.remove("active"); });
                var active = document.querySelector('.nav a[href="#' + entry.target.id + '"]');
                if (active) active.classList.add("active");
            });
        }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });

        sections.forEach(function (s) { observer.observe(s); });
    }

    initTheme();
})();

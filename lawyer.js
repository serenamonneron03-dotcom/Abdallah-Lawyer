document.addEventListener("DOMContentLoaded", () => {
    // MOBILE NAVIGATION
    const menuToggle = document.querySelector(".menu-toggle");
    const primaryNav = document.querySelector("#primary-nav");

    if (menuToggle && primaryNav) {
        menuToggle.addEventListener("click", () => {
            const isOpen = primaryNav.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        primaryNav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                primaryNav.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
            });
        });
    }

    // LIGHT AND DARK THEME
    const themeToggle = document.querySelector(".theme-toggle");

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const isDark = document.body.classList.toggle("dark-theme");

            themeToggle.textContent = isDark ? "☀" : "◐";
            themeToggle.setAttribute(
                "aria-label",
                isDark ? "Switch to light theme" : "Switch to dark theme"
            );
        });
    }

    // REVEAL ELEMENTS WHEN THEY ENTER THE VIEWPORT
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }

    // ANIMATE PROFESSIONAL STATISTICS
    // The displayed figures should be verified before publication.
    const statNumbers = document.querySelectorAll(".stat-number");

    function animateCounter(element) {
        const target = Number(element.dataset.target);

        if (!Number.isFinite(target) || target < 0) {
            return;
        }

        const suffix = element.dataset.suffix || "";
        const duration = 1200;
        const startTime = performance.now();

        function updateCounter(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(target * easedProgress);

            element.textContent = value.toLocaleString() + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    }

    if ("IntersectionObserver" in window && statNumbers.length) {
        const statsObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        statNumbers.forEach((element) => {
            statsObserver.observe(element);
        });
    }

    // BACK TO TOP BUTTON
    const backToTop = document.querySelector("#back-to-top");

    if (backToTop) {
        function updateBackToTop() {
            backToTop.classList.toggle("visible", window.scrollY > 450);
        }

        window.addEventListener("scroll", updateBackToTop, {
            passive: true
        });

        updateBackToTop();

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // AUTOMATIC FOOTER YEAR
    document.querySelectorAll(".current-year").forEach((element) => {
        element.textContent = new Date().getFullYear();
    });
});
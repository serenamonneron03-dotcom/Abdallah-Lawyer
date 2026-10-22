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

            themeToggle.setAttribute(
                "aria-label",
                isDark ? "Switch to light theme" : "Switch to dark theme"
            );
            themeToggle.textContent = isDark ? "☀" : "◐";
        });
    }

    // REVEAL ELEMENTS WHEN THEY ENTER THE VIEWPORT
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            observer.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }

    // TESTIMONIAL SLIDER
    // Replace these examples with genuine reviews only when approved.
    const testimonials = [
        {
            text: "Placeholder testimonial. Replace this with an authentic, permission-approved client review.",
            name: "Placeholder Client",
            role: "Sample review · For demonstration only"
        },
        {
            text: "Client feedback can be displayed here once an authentic review has been approved for publication.",
            name: "Example Client",
            role: "Placeholder · Not a real testimonial"
        },
        {
            text: "Add another approved client review here to highlight the firm's approach to legal service.",
            name: "Sample Client",
            role: "Placeholder · Replace before publication"
        }
    ];

    let currentReview = 0;

    const reviewText = document.querySelector("#review-text");
    const reviewName = document.querySelector("#review-name");
    const reviewRole = document.querySelector("#review-role");
    const previousButton = document.querySelector("#prev-review");
    const nextButton = document.querySelector("#next-review");

    function showReview(index) {
        currentReview =
            (index + testimonials.length) % testimonials.length;

        const review = testimonials[currentReview];

        if (reviewText) reviewText.textContent = review.text;
        if (reviewName) reviewName.textContent = review.name;
        if (reviewRole) reviewRole.textContent = review.role;
    }

    if (previousButton) {
        previousButton.addEventListener("click", () => {
            showReview(currentReview - 1);
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            showReview(currentReview + 1);
        });
    }

    // BACK TO TOP BUTTON
    const backToTop = document.querySelector("#back-to-top");

    if (backToTop) {
        function updateBackToTop() {
            backToTop.classList.toggle(
                "visible",
                window.scrollY > 450
            );
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

    // ANIMATED COUNTERS ON THE HOME PAGE
    const counters = document.querySelectorAll(".hero-proof .counter");

    function animateCounter(counter) {
        const target = Number(counter.dataset.target);

        if (!Number.isFinite(target)) return;

        // Respect reduced-motion accessibility preferences.
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            counter.textContent = target;
            return;
        }

        const duration = 1800;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            // Smooth animation that slows down at the end.
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            counter.textContent = Math.floor(easedProgress * target);

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }

        requestAnimationFrame(updateCounter);
    }

    if ("IntersectionObserver" in window) {
        const counterObserver = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.5
            }
        );

        counters.forEach((counter) => {
            counterObserver.observe(counter);
        });
    } else {
        counters.forEach((counter) => {
            animateCounter(counter);
        });
    }

    // AUTOMATIC FOOTER YEAR
    document.querySelectorAll(".current-year").forEach((element) => {
        element.textContent = new Date().getFullYear();
    });
});
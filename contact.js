document.addEventListener("DOMContentLoaded", () => {
    // Mobile navigation
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            const isOpen = mainNav.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );
            menuToggle.textContent = isOpen ? "×" : "☰";
        });

        mainNav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mainNav.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation");
                menuToggle.textContent = "☰";
            });
        });
    }

    // Automatically update the copyright year
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Prevent selecting a consultation date in the past
    const preferredDate = document.getElementById("preferredDate");

    if (preferredDate) {
        const today = new Date();
        const localToday = [
            today.getFullYear(),
            String(today.getMonth() + 1).padStart(2, "0"),
            String(today.getDate()).padStart(2, "0")
        ].join("-");

        preferredDate.min = localToday;
    }

    // Read URL parameters to auto-select the chosen service from expertise page
    const urlParams = new URLSearchParams(window.location.search);
    const selectedService = urlParams.get("service");

    if (selectedService) {
        const serviceSelect = document.getElementById("serviceSelect");
        const hiddenServiceInput = document.getElementById("hiddenServiceInput");
        
        if (serviceSelect) {
            serviceSelect.value = selectedService;
        }

        // Map code values to clean labels for Formspree email body readability
        const serviceTitles = {
            'family': 'Family Law',
            'criminal': 'Criminal Law',
            'labour': 'Labour / Employment Law',
            'rental': 'Tenancy & Rental Law',
            'commercial': 'Commercial Law',
            'contractual': 'Contractual Disputes',
            'arbitration': 'Litigation & Arbitration',
            'mediation': 'Mediation',
            'contract': 'Contract Drafting'
        };

        if (hiddenServiceInput) {
            hiddenServiceInput.value = serviceTitles[selectedService] || selectedService;
        }
    }

    // Real submission to Formspree via Fetch API
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    if (contactForm && formStatus) {
        contactForm.addEventListener("submit", async event => {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const data = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.className = "form-status success";
                    formStatus.textContent = "Thank you! Your enquiry has been sent successfully.";
                    contactForm.reset();
                } else {
                    const result = await response.json();
                    formStatus.className = "form-status error";
                    if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
                        formStatus.textContent = result["errors"].map(error => error["message"]).join(", ");
                    } else {
                        formStatus.textContent = "There was an error submitting your form. Please try again.";
                    }
                }
            } catch (error) {
                formStatus.className = "form-status error";
                formStatus.textContent = "Unable to send message. Please check your internet connection.";
            }

            formStatus.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        });

        // Clear status when editing form inputs
        contactForm.addEventListener("input", () => {
            formStatus.className = "form-status";
            formStatus.textContent = "";
        });

        // Back to Top Button Functionality
        const backToTopButton = document.getElementById('back-to-top');

        window.addEventListener('scroll', () => {
            // Show the button after scrolling down 300px
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
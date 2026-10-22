document.addEventListener('DOMContentLoaded', function() {
    // ==========================================
    // 1. MOBILE MENU TOGGLE
    // ==========================================
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

    // Automatically update the copyright year if element exists
    const year = document.getElementById("year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // ==========================================
    // 2. SERVICES DATA & SLIDE/SWIPE NAVIGATION
    // ==========================================
    const servicesData = [
        {
            service: "family",
            badge: "OUR PRACTICE AREA",
            title: "Family Law",
            desc: "We provide compassionate and practical legal guidance on family matters, including divorce, child custody, maintenance, and other family-related disputes. Our aim is to protect your rights while helping you navigate sensitive situations with care and understanding.",
            image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80",
            cta: "contact.html?service=family"
        },
        {
            service: "criminal",
            badge: "OUR PRACTICE AREA",
            title: "Criminal Law",
            desc: "Rigorous defense and representation across all stages of criminal proceedings, protecting your constitutional rights with discretion, expertise, and unwavering dedication.",
            image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
            cta: "contact.html?service=criminal"
        },
        {
            service: "labour",
            badge: "OUR PRACTICE AREA",
            title: "Labour / Employment Law",
            desc: "Advising employers and employees on workplace rights, employment contracts, wrongful terminations, grievances, and comprehensive labor dispute resolutions.",
            image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
            cta: "contact.html?service=labour"
        },
        {
            service: "rental",
            badge: "OUR PRACTICE AREA",
            title: "Tenancy & Rental Law",
            desc: "Resolving property disputes, drafting robust lease agreements, and protecting legal rights and obligations for both landlords and tenants.",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
            cta: "contact.html?service=rental"
        },
        {
            service: "commercial",
            badge: "OUR PRACTICE AREA",
            title: "Commercial Law",
            desc: "Comprehensive legal counsel for corporate entities, commercial transactions, business setups, governance, and complex regulatory compliance.",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
            cta: "contact.html?service=commercial"
        },
        {
            service: "contractual",
            badge: "OUR PRACTICE AREA",
            title: "Contractual Disputes",
            desc: "Strategic negotiation and aggressive litigation support designed to resolve breaches of contract and commercial disagreements efficiently.",
            image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
            cta: "contact.html?service=contractual"
        },
        {
            service: "arbitration",
            badge: "OUR PRACTICE AREA",
            title: "Litigation & Arbitration",
            desc: "Expert representation in court litigation and alternative dispute resolution forums to vigorously safeguard your commercial and personal interests.",
            image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=800&q=80",
            cta: "contact.html?service=arbitration"
        },
        {
            service: "mediation",
            badge: "OUR PRACTICE AREA",
            title: "Mediation",
            desc: "Facilitating constructive, confidential dialogue between conflicting parties to reach amicable, cost-effective, and sustainable out-of-court settlements.",
            image: "https://images.pexels.com/photos/7876150/pexels-photo-7876150.jpeg",
            cta: "contact.html?service=mediation"
        },
        {
            service: "contract",
            badge: "OUR PRACTICE AREA",
            title: "Contract Drafting",
            desc: "Drafting precise, airtight legal agreements tailored specifically to protect your interests, clarify expectations, and prevent future disputes.",
            image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
            cta: "contact.html?service=contract"
        }
    ];

    let currentIndex = 0;

    const listItems = document.querySelectorAll('.law-item');
    const panelImage = document.getElementById('panelImage');
    const panelTitle = document.getElementById('panelTitle');
    const panelDescription = document.getElementById('panelDescription');
    const panelCtaBtn = document.getElementById('panelCtaBtn');
    const serviceCounter = document.getElementById('service-counter');
    const prevBtn = document.getElementById('prev-service-btn');
    const nextBtn = document.getElementById('next-service-btn');
    const detailPanel = document.getElementById('lawDetailPanel');

    function displayService(index, direction = 'next') {
        currentIndex = index;
        const data = servicesData[currentIndex];

        if (detailPanel) {
            detailPanel.classList.remove('slide-in');
            detailPanel.classList.add(direction === 'next' ? 'slide-out-left' : 'slide-out-right');
        }

        setTimeout(() => {
            if (panelImage) panelImage.src = data.image;
            if (panelTitle) panelTitle.textContent = data.title;
            if (panelDescription) panelDescription.textContent = data.desc;
            if (panelCtaBtn) panelCtaBtn.href = data.cta;
            if (serviceCounter) serviceCounter.textContent = `${currentIndex + 1} of ${servicesData.length}`;

            listItems.forEach((li, idx) => {
                if (idx === currentIndex) {
                    li.classList.add('active');
                } else {
                    li.classList.remove('active');
                }
            });

            if (detailPanel) {
                detailPanel.classList.remove('slide-out-left', 'slide-out-right');
                detailPanel.classList.add('slide-in');
            }
        }, 180);
    }

    listItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            let direction = index > currentIndex ? 'next' : 'prev';
            displayService(index, direction);
        });
    });

    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            let nextIndex = (currentIndex + 1) % servicesData.length;
            displayService(nextIndex, 'next');
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            let prevIndex = (currentIndex - 1 + servicesData.length) % servicesData.length;
            displayService(prevIndex, 'prev');
        });
    }

    let touchStartX = 0;
    let touchEndX = 0;

    if (detailPanel) {
        detailPanel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        detailPanel.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const swipeThreshold = 40; 
        if (touchEndX < touchStartX - swipeThreshold) {
            let nextIndex = (currentIndex + 1) % servicesData.length;
            displayService(nextIndex, 'next');
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            let prevIndex = (currentIndex - 1 + servicesData.length) % servicesData.length;
            displayService(prevIndex, 'prev');
        }
    }

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

    displayService(0, 'next');
});
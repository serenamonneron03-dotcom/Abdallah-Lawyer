document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. MOBILE NAVIGATION
    // ==========================================

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

        primaryNav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                primaryNav.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
            });
        });
    }

    // ==========================================
    // 2. THEME TOGGLE
    // ==========================================

    const themeToggle = document.querySelector(".theme-toggle");
    const root = document.documentElement;

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);

        if (themeToggle) {
            themeToggle.setAttribute(
                "aria-label",
                theme === "dark"
                    ? "Switch to light theme"
                    : "Switch to dark theme"
            );
        }
    }

    try {
        const savedTheme = localStorage.getItem("abdallah-theme");

        if (savedTheme === "dark" || savedTheme === "light") {
            applyTheme(savedTheme);
        }
    } catch (error) {
        // Continue if local storage is unavailable.
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = root.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";

            applyTheme(newTheme);

            try {
                localStorage.setItem("abdallah-theme", newTheme);
            } catch (error) {
                // Theme switching still works without local storage.
            }
        });
    }

    // ==========================================
    // 3. ARTICLE CONTENT
    // ==========================================

    const articleContent = {
        agreement: {
            category: "LEGAL BASICS",
            title: "Understanding a legal agreement before you sign",
            paragraphs: [
                "A legal agreement sets out terms that the parties intend to follow. Before signing, take time to understand what each party must do, when obligations begin and what happens if the terms are not followed. Read the complete document carefully. Pay attention to payment terms, deadlines, responsibilities, termination provisions and any clauses that limit rights or create additional obligations. If a clause is unclear, ask for an explanation before signing. Keep a copy of the final signed agreement and any related correspondence. The legal effect of an agreement depends on its wording, the circumstances and the applicable law. Consider obtaining advice from a qualified legal professional where necessary."
            ]
        },

        family: {
            category: "FAMILY",
            title: "Family matters: why clear communication matters",
            paragraphs: [
                "Family matters can involve sensitive personal and legal issues. Clear communication can help people understand one another's concerns and reduce unnecessary conflict. When dealing with separation, child arrangements or other family matters, it is important to understand the available options and responsibilities. Keeping relevant documents organised and seeking appropriate legal guidance can help people make informed decisions. Every family situation is different, so advice should reflect the circumstances of the individuals involved."
            ]
        },

        business: {
            category: "BUSINESS",
            title: "Legal considerations when starting a business",
            paragraphs: [
                "Starting a business involves more than developing a product or service. Business owners should consider the appropriate business structure, registration requirements, licences and contractual obligations. Written agreements can help clarify responsibilities between business partners, suppliers and clients. It is also important to understand relevant tax, employment and regulatory requirements. Planning for these matters early can help reduce disputes and support the long-term development of the business."
            ]
        },

        employment: {
            category: "EMPLOYMENT",
            title: "Understanding workplace policies and employment terms",
            paragraphs: [
                "Workplace policies and employment terms help explain the expectations and responsibilities of employers and employees. Important details may include working hours, leave, remuneration, conduct and procedures for raising concerns. Employees should read their employment documents carefully and ask for clarification when necessary. Employers should ensure that workplace policies are communicated clearly and applied consistently. Understanding the applicable employment rules can help both parties address concerns more effectively."
            ]
        },

        consultation: {
            category: "LEGAL BASICS",
            title: "Preparing for an initial legal consultation",
            paragraphs: [
                "Preparing for an initial legal consultation can help make the meeting more productive. Before the appointment, write down the main issues you want to discuss and prepare a timeline of relevant events. Gather useful documents, correspondence, agreements or other records connected to your situation. It can also help to prepare questions about possible options, procedures, costs and next steps. Providing accurate information allows the legal professional to understand the circumstances and explain the assistance that may be available."
            ]
        },

        records: {
            category: "BUSINESS",
            title: "Keeping business records organised",
            paragraphs: [
                "Keeping business records organised helps owners track important information and manage their responsibilities. Records may include contracts, invoices, receipts, financial statements and correspondence with clients or suppliers. Documents should be stored securely and arranged so that they can be located when needed. Maintaining accurate records can support day-to-day decisions, assist with administrative requirements and help resolve disagreements. Businesses should also consider applicable rules concerning record retention, confidentiality and data protection."
            ]
        }
    };

    // ==========================================
    // 4. SEARCH AND CATEGORY FILTERS
    // ==========================================

    const searchInput = document.querySelector("#article-search");
    const filterButtons = document.querySelectorAll(".filter-button");
    const articleCards = document.querySelectorAll(".article-card");
    const noResults = document.querySelector("#no-results");

    let activeCategory = "all";

    function filterArticles() {
        const searchTerm = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        let visibleCount = 0;

        articleCards.forEach(card => {
            const cardCategory = (
                card.dataset.category || ""
            ).toLowerCase();

            const cardTitle = (
                card.dataset.title ||
                card.querySelector("h3")?.textContent ||
                ""
            ).toLowerCase();

            const cardText = card.textContent.toLowerCase();

            const matchesCategory =
                activeCategory === "all" ||
                cardCategory === activeCategory;

            const matchesSearch =
                cardTitle.includes(searchTerm) ||
                cardText.includes(searchTerm);

            const isVisible = matchesCategory && matchesSearch;

            card.hidden = !isVisible;

            if (isVisible) {
                visibleCount++;
            }
        });

        if (noResults) {
            noResults.hidden = visibleCount > 0;
        }
    }

    if (searchInput) {
        searchInput.addEventListener("input", filterArticles);
    }

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            activeCategory = (
                button.dataset.category || "all"
            ).toLowerCase();

            filterButtons.forEach(filterButton => {
                const isActive = filterButton === button;

                filterButton.classList.toggle("active", isActive);
                filterButton.setAttribute(
                    "aria-pressed",
                    String(isActive)
                );
            });

            filterArticles();
        });
    });

    // Display all articles on initial page load.
    filterArticles();

    // ==========================================
    // 5. ARTICLE DIALOG AND READ BUTTONS
    // ==========================================

    const articleDialog = document.querySelector("#article-dialog");
    const dialogCategory = document.querySelector("#dialog-category");
    const dialogTitle = document.querySelector("#dialog-title");
    const dialogBody = document.querySelector("#dialog-body");
    const closeArticle = document.querySelector("#close-article");

    function openArticle(articleKey) {
        const article = articleContent[articleKey];

        if (!article) {
            console.warn("Article not found:", articleKey);
            return;
        }

        if (
            !articleDialog ||
            !dialogCategory ||
            !dialogTitle ||
            !dialogBody
        ) {
            console.error(
                "Article dialog elements are missing from articles.html."
            );
            return;
        }

        dialogCategory.textContent = article.category;
        dialogTitle.textContent = article.title;

        // Display the full article paragraphs.
        dialogBody.replaceChildren();

        article.paragraphs.forEach(paragraphText => {
            const paragraph = document.createElement("p");
            paragraph.textContent = paragraphText;
            dialogBody.appendChild(paragraph);
        });

        if (!articleDialog.open) {
            articleDialog.showModal();
        }
    }

    document.querySelectorAll("[data-article]").forEach(button => {
        button.addEventListener("click", () => {
            openArticle(button.dataset.article);
        });
    });

    if (closeArticle && articleDialog) {
        closeArticle.addEventListener("click", () => {
            articleDialog.close();
        });
    }

    // Close when the user clicks the dialog backdrop.
    if (articleDialog) {
        articleDialog.addEventListener("click", event => {
            if (event.target === articleDialog) {
                const rect = articleDialog.getBoundingClientRect();

                const clickedInside =
                    event.clientX >= rect.left &&
                    event.clientX <= rect.right &&
                    event.clientY >= rect.top &&
                    event.clientY <= rect.bottom;

                if (!clickedInside) {
                    articleDialog.close();
                }
            }
        });
    }

    // ==========================================
    // 6. REVEAL ANIMATIONS
    // Make content visible immediately.
    // ==========================================

    const revealElements = document.querySelectorAll(".reveal");

    // Do not leave content hidden while waiting for an observer.
    revealElements.forEach(element => {
        element.classList.add("visible");
    });

    // Keep visible classes updated for supported browsers.
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    // ==========================================
    // 7. BACK TO TOP BUTTON
    // ==========================================

    const backToTop = document.querySelector("#back-to-top");

    function updateBackToTop() {
        if (backToTop) {
            backToTop.classList.toggle(
                "visible",
                window.scrollY > 400
            );
        }
    }

    if (backToTop) {
        window.addEventListener("scroll", updateBackToTop, {
            passive: true
        });

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

        updateBackToTop();
    }

    // ==========================================
    // 8. AUTOMATIC FOOTER YEAR
    // ==========================================

    document.querySelectorAll(".current-year").forEach(element => {
        element.textContent = new Date().getFullYear();
    });

    // ==========================================
    // 9. DEBUGGING CONFIRMATION
    // ==========================================

    console.log("Abdallah Articles JavaScript loaded successfully.");
});
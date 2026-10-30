
document.addEventListener("DOMContentLoaded", () => {
    const STORAGE_KEY = "careerMargdarshakGraphicV1";

    const get = (selector) => document.querySelector(selector);
    const getAll = (selector) => [...document.querySelectorAll(selector)];

    // Safely load saved progress from this browser.
    function loadProgress() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : {};
        } catch (error) {
            console.warn("Could not load saved progress.", error);
            return {};
        }
    }

    let progress = loadProgress();

    function saveProgress() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        } catch (error) {
            console.warn("Progress could not be saved.", error);
        }
    }

    // Restore and save each checkbox.
    function setupCheckboxes(selector, keyPrefix) {
        getAll(selector).forEach((checkbox, index) => {
            const key = `${keyPrefix}-${index}`;

            checkbox.checked = progress[key] === true;

            checkbox.addEventListener("change", () => {
                progress[key] = checkbox.checked;
                saveProgress();
                updateAllProgress();
            });
        });
    }

    // Update progress bars and percentage labels.
    function updateProgress(selector, fillId, textId, percentId, label) {
        const checkboxes = getAll(selector);
        const completed = checkboxes.filter(item => item.checked).length;
        const total = checkboxes.length;
        const percent = total ? Math.round((completed / total) * 100) : 0;

        const fill = get(fillId);
        const text = get(textId);
        const number = get(percentId);

        if (fill) fill.style.width = `${percent}%`;
        if (text) text.textContent = `${completed} of ${total} ${label} completed`;
        if (number) number.textContent = `${percent}%`;
    }

    function updateAllProgress() {
        updateProgress(
            ".stage-checkbox",
            "#progressFill",
            "#progressText",
            "#progressPercent",
            "stages"
        );

        updateProgress(
            ".topic-check",
            "#syllabusFill",
            "#syllabusText",
            "#syllabusPercent",
            "topics"
        );
    }

    setupCheckboxes(".stage-checkbox", "stage");
    setupCheckboxes(".topic-check", "topic");
    setupCheckboxes(".project-check", "project");
    setupCheckboxes(".application-check", "application");

    updateAllProgress();

    // Mobile navigation.
    const menuToggle = get("#menuToggle");
    const navLinks = get("#navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            });
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            }
        });
    }

    // Search design fields.
    const fieldSearch = get("#fieldSearch");
    const fieldCards = getAll(".field-card");
    const searchCount = get("#searchCount");
    const emptyState = get("#emptyState");

    function filterFields() {
        const query = (fieldSearch?.value || "").trim().toLowerCase();
        let visible = 0;

        fieldCards.forEach(card => {
            const searchableText = (
                (card.dataset.search || "") + " " + card.textContent
            ).toLowerCase();

            const matches = searchableText.includes(query);
            card.hidden = !matches;

            if (matches) visible++;
        });

        if (searchCount) {
            searchCount.textContent = `${visible} ${visible === 1 ? "field" : "fields"}`;
        }

        if (emptyState) {
            emptyState.hidden = visible !== 0;
        }
    }

    fieldSearch?.addEventListener("input", filterFields);

    // Reset only roadmap stage progress.
    get("#resetProgress")?.addEventListener("click", () => {
        const confirmed = window.confirm(
            "Reset all six roadmap stages? Syllabus and project progress will remain unchanged."
        );

        if (!confirmed) return;

        getAll(".stage-checkbox").forEach((checkbox, index) => {
            checkbox.checked = false;
            delete progress[`stage-${index}`];
        });

        saveProgress();
        updateAllProgress();
    });

    // Copy the editable application email.
    const copyButton = get("#copyEmail");
    const emailTemplate = get("#emailTemplate");
    const copyStatus = get("#copyStatus");

    copyButton?.addEventListener("click", async () => {
        if (!emailTemplate) return;

        const text = emailTemplate.value;

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
            } else {
                emailTemplate.focus();
                emailTemplate.select();

                const copied = document.execCommand("copy");

                if (!copied) {
                    throw new Error("Copy command was not successful.");
                }

                emailTemplate.setSelectionRange(0, 0);
            }

            if (copyStatus) {
                copyStatus.textContent = "Email draft copied successfully.";
            }
        } catch (error) {
            if (copyStatus) {
                copyStatus.textContent =
                    "Copy was blocked. Select the text and copy it manually.";
            }
        }
    });

    // Personalized improvement plans.
    const plans = {
        typography: {
            title: "Typography Practice Plan",
            tasks: [
                "Compare serif and sans-serif fonts.",
                "Create a clear heading, subheading and body-text hierarchy.",
                "Design two posters using different font pairings.",
                "Check readability, spacing and alignment."
            ]
        },
        color: {
            title: "Color Theory Practice Plan",
            tasks: [
                "Learn primary, secondary and complementary colors.",
                "Create three palettes for different brand personalities.",
                "Test text contrast against backgrounds.",
                "Apply one palette to a poster and a social media post."
            ]
        },
        layout: {
            title: "Layout & Composition Practice Plan",
            tasks: [
                "Study alignment, balance, proximity and negative space.",
                "Build a simple grid for a poster.",
                "Create three layout variations for the same brief.",
                "Ask someone to review visual hierarchy and readability."
            ]
        },
        tools: {
            title: "Design Software Practice Plan",
            tasks: [
                "Choose one main design tool to learn first.",
                "Practise layers, shapes, selections and text.",
                "Create one original design without following a tutorial.",
                "Export the correct file formats for digital and print use."
            ]
        },
        branding: {
            title: "Brand Identity Practice Plan",
            tasks: [
                "Choose a fictional business and define its target audience.",
                "Write a short creative brief and collect references.",
                "Create a logo, color palette and typography system.",
                "Present the brand on mockups and explain your decisions."
            ]
        },
        portfolio: {
            title: "Portfolio Improvement Plan",
            tasks: [
                "Select your strongest original projects.",
                "Explain the brief, audience and design problem.",
                "Show iterations, alternatives and final deliverables.",
                "Review project descriptions, spelling and presentation."
            ]
        },
        communication: {
            title: "Communication & Feedback Plan",
            tasks: [
                "Practise asking questions before starting a design brief.",
                "Explain why you selected specific colors and layouts.",
                "Request specific, constructive feedback.",
                "Revise a design and document what improved."
            ]
        }
    };

    get("#getPlan")?.addEventListener("click", () => {
        const selectedSkill = get("#weakSkill")?.value;
        const plan = plans[selectedSkill];
        const output = get("#practicePlan");

        if (!plan || !output) return;

        output.replaceChildren();

        const heading = document.createElement("h3");
        heading.textContent = plan.title;
        output.appendChild(heading);

        const intro = document.createElement("p");
        intro.textContent =
            "Suggested practice: complete these tasks, then review your work.";
        output.appendChild(intro);

        const list = document.createElement("ul");

        plan.tasks.forEach(task => {
            const item = document.createElement("li");
            item.textContent = task;
            list.appendChild(item);
        });

        output.appendChild(list);
    });
});

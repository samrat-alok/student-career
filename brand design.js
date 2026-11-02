
// MOBILE NAVIGATION
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    menuBtn.textContent =
        navMenu.classList.contains("active") ? "✕" : "☰";
});

// CLOSE MENU AFTER CLICK
document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuBtn.textContent = "☰";
    });
});

// ROADMAP PROGRESS
const checks = document.querySelectorAll(".roadmap-check");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

function updateProgress() {

    const completed = document.querySelectorAll(
        ".roadmap-check:checked"
    ).length;

    const total = checks.length;

    const percentage = total
        ? Math.round((completed / total) * 100)
        : 0;

    progressBar.style.width = percentage + "%";
    progressText.textContent = percentage + "% Completed";

    localStorage.setItem(
        "brandRoadmap",
        JSON.stringify([...checks].map(check => check.checked))
    );
}

// RESTORE ROADMAP
const savedProgress = JSON.parse(
    localStorage.getItem("brandRoadmap") || "[]"
);

checks.forEach((check, index) => {

    check.checked = savedProgress[index] === true;

    check.addEventListener("change", updateProgress);
});

updateProgress();

// RESET ROADMAP
document.getElementById("resetProgress").addEventListener("click", () => {

    const confirmReset = confirm(
        "Are you sure you want to reset your Brand Design roadmap?"
    );

    if (confirmReset) {

        checks.forEach(check => {
            check.checked = false;
        });

        localStorage.removeItem("brandRoadmap");

        updateProgress();
    }
});

// PORTFOLIO CHECKLIST
const portfolioChecks = document.querySelectorAll(".portfolio-check");

const savedPortfolio = JSON.parse(
    localStorage.getItem("brandPortfolio") || "[]"
);

portfolioChecks.forEach((check, index) => {

    check.checked = savedPortfolio[index] === true;

    check.addEventListener("change", () => {

        const progress = [...portfolioChecks].map(
            item => item.checked
        );

        localStorage.setItem(
            "brandPortfolio",
            JSON.stringify(progress)
        );
    });
});

// BRAND DESIGN QUIZ
const quizOptions = document.querySelectorAll(".quiz-option");
const quizResult = document.getElementById("quizResult");
const retryQuiz = document.getElementById("retryQuiz");

quizOptions.forEach(option => {

    option.addEventListener("click", () => {

        quizOptions.forEach(button => {
            button.classList.remove("correct", "wrong");
            button.disabled = true;
        });

        if (option.dataset.answer === "correct") {

            option.classList.add("correct");

            quizResult.textContent =
                "✓ Correct! Brand identity creates recognition and consistency.";

        } else {

            option.classList.add("wrong");

            document.querySelector(
                '[data-answer="correct"]'
            ).classList.add("correct");

            quizResult.textContent =
                "✗ Incorrect! A brand identity creates a recognizable and consistent brand.";
        }
    });
});

// RETRY QUIZ
retryQuiz.addEventListener("click", () => {

    quizOptions.forEach(button => {
        button.disabled = false;
        button.classList.remove("correct", "wrong");
    });

    quizResult.textContent = "";
});

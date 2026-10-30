
// MOBILE NAVIGATION
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    menuBtn.textContent =
        navMenu.classList.contains("active") ? "✕" : "☰";
});

// CLOSE MENU AFTER NAVIGATION
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
        "3dRoadmap",
        JSON.stringify([...checks].map(check => check.checked))
    );
}

// RESTORE SAVED ROADMAP
const savedProgress = JSON.parse(
    localStorage.getItem("3dRoadmap") || "[]"
);

checks.forEach((check, index) => {

    check.checked = savedProgress[index] === true;

    check.addEventListener("change", updateProgress);
});

updateProgress();

// RESET ROADMAP
document.getElementById("resetProgress").addEventListener("click", () => {

    const confirmReset = confirm(
        "Are you sure you want to reset your 3D Design roadmap?"
    );

    if (confirmReset) {

        checks.forEach(check => {
            check.checked = false;
        });

        localStorage.removeItem("3dRoadmap");

        updateProgress();
    }
});

// PORTFOLIO CHECKLIST
const portfolioChecks = document.querySelectorAll(".portfolio-check");

const savedPortfolio = JSON.parse(
    localStorage.getItem("3dPortfolio") || "[]"
);

portfolioChecks.forEach((check, index) => {

    check.checked = savedPortfolio[index] === true;

    check.addEventListener("change", () => {

        const progress = [...portfolioChecks].map(
            item => item.checked
        );

        localStorage.setItem(
            "3dPortfolio",
            JSON.stringify(progress)
        );
    });
});

// QUIZ
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
                "✓ Correct! UV Mapping prepares a 3D model surface for texturing.";

        } else {

            option.classList.add("wrong");

            document.querySelector(
                '[data-answer="correct"]'
            ).classList.add("correct");

            quizResult.textContent =
                "✗ Incorrect! The correct answer is UV Mapping.";
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

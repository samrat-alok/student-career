
// MOBILE NAVIGATION
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuBtn.textContent = navMenu.classList.contains("active") ? "✕" : "☰";
});

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
    const completed = document.querySelectorAll(".roadmap-check:checked").length;
    const total = checks.length;
    const percentage = total ? Math.round((completed / total) * 100) : 0;

    progressBar.style.width = percentage + "%";
    progressText.textContent = percentage + "% Completed";

    localStorage.setItem("fashionRoadmap", JSON.stringify(
        [...checks].map(check => check.checked)
    ));
}

// Restore previously saved progress
const savedProgress = JSON.parse(
    localStorage.getItem("fashionRoadmap") || "[]"
);

checks.forEach((check, index) => {
    check.checked = savedProgress[index] === true;
    check.addEventListener("change", updateProgress);
});

updateProgress();

// RESET PROGRESS
document.getElementById("resetProgress").addEventListener("click", () => {
    const confirmReset = confirm("Are you sure you want to reset your roadmap?");

    if (confirmReset) {
        checks.forEach(check => check.checked = false);
        localStorage.removeItem("fashionRoadmap");
        updateProgress();
    }
});

// FASHION DESIGN QUIZ
const quizOptions = document.querySelectorAll(".quiz-option");
const quizResult = document.getElementById("quizResult");

quizOptions.forEach(option => {
    option.addEventListener("click", () => {
        quizOptions.forEach(btn => {
            btn.classList.remove("correct", "wrong");
            btn.disabled = true;
        });

        if (option.dataset.answer === "correct") {
            option.classList.add("correct");
            quizResult.textContent = "✓ Correct! CLO 3D is used for 3D garment simulation.";
        } else {
            option.classList.add("wrong");
            quizResult.textContent = "✗ Incorrect. The correct answer is CLO 3D.";
            document.querySelector('[data-answer="correct"]').classList.add("correct");
        }
    });
});

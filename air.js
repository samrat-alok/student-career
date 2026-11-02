
document.addEventListener("DOMContentLoaded", () => {

    const checkboxes = document.querySelectorAll(
        '#taskList input[type="checkbox"]'
    );

    const progressFill = document.getElementById("progressFill");
    const progressText = document.getElementById("progressText");

    const STORAGE_KEY = "aerospaceCareerProgress";

    // Load saved progress
    const savedProgress = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
    );

    checkboxes.forEach((checkbox, index) => {
        checkbox.checked = savedProgress[index] === true;
    });

    // Update progress bar
    function updateProgress() {

        const completed = [...checkboxes].filter(
            checkbox => checkbox.checked
        ).length;

        const total = checkboxes.length;

        const percentage = total
            ? Math.round((completed / total) * 100)
            : 0;

        progressFill.style.width = percentage + "%";
        progressText.textContent = percentage + "%";

        // Save progress
        const progress = [...checkboxes].map(
            checkbox => checkbox.checked
        );

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(progress)
        );
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", updateProgress);
    });

    updateProgress();

});

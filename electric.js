
document.addEventListener("DOMContentLoaded", () => {
    const tasks = document.querySelectorAll(".task");
    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");

    const storageKey = "electricalEngineeringProgress";

    // Load previously saved progress
    const savedProgress = JSON.parse(
        localStorage.getItem(storageKey) || "[]"
    );

    tasks.forEach((task, index) => {
        task.checked = savedProgress[index] === true;

        task.addEventListener("change", updateProgress);
    });

    function updateProgress() {
        const completed = [];

        tasks.forEach((task, index) => {
            completed[index] = task.checked;
        });

        localStorage.setItem(
            storageKey,
            JSON.stringify(completed)
        );

        const totalTasks = tasks.length;
        const completedTasks = document.querySelectorAll(
            ".task:checked"
        ).length;

        const percentage = Math.round(
            (completedTasks / totalTasks) * 100
        );

        progressBar.style.width = percentage + "%";

        progressText.textContent =
            percentage + "% Completed (" +
            completedTasks + "/" + totalTasks + " tasks)";
    }

    updateProgress();
});

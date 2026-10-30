
document.addEventListener("DOMContentLoaded", () => {

    const tasks = document.querySelectorAll(".task");
    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");

    const storageKey = "chemicalEngineeringProgress";

    let savedProgress = [];

    try {
        savedProgress = JSON.parse(
            localStorage.getItem(storageKey) || "[]"
        );
    } catch (error) {
        savedProgress = [];
    }

    tasks.forEach((task, index) => {

        task.checked = savedProgress[index] === true;

        task.addEventListener("change", updateProgress);

    });

    function updateProgress() {

        const completedTasks = Array.from(tasks)
            .filter(task => task.checked).length;

        const totalTasks = tasks.length;

        const percentage = totalTasks
            ? Math.round((completedTasks / totalTasks) * 100)
            : 0;

        const progress = Array.from(tasks)
            .map(task => task.checked);

        localStorage.setItem(
            storageKey,
            JSON.stringify(progress)
        );

        progressBar.style.width = percentage + "%";

        progressText.textContent =
            `${percentage}% Completed (${completedTasks}/${totalTasks} tasks)`;
    }

    updateProgress();

});

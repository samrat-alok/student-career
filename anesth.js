
document.addEventListener("DOMContentLoaded", () => {

    // =================================
    // 1. ROADMAP PROGRESS TRACKER
    // =================================

    const roadmapChecks = document.querySelectorAll(".roadmap-check");
    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");
    const resetButton = document.getElementById("resetRoadmap");

    const roadmapKey = "anesthesiologyRoadmapProgress";

    function updateProgress() {

        const completed = document.querySelectorAll(
            ".roadmap-check:checked"
        ).length;

        const total = roadmapChecks.length;

        const percentage = total === 0
            ? 0
            : Math.round((completed / total) * 100);

        progressBar.style.width = percentage + "%";
        progressText.textContent = percentage + "% Completed";

        const progress = Array.from(roadmapChecks).map(
            checkbox => checkbox.checked
        );

        localStorage.setItem(
            roadmapKey,
            JSON.stringify(progress)
        );
    }

    const savedProgress = JSON.parse(
        localStorage.getItem(roadmapKey) || "[]"
    );

    roadmapChecks.forEach((checkbox, index) => {

        checkbox.checked = savedProgress[index] === true;

        checkbox.addEventListener("change", updateProgress);

    });

    updateProgress();

    resetButton.addEventListener("click", () => {

        const confirmReset = confirm(
            "Are you sure you want to reset your roadmap progress?"
        );

        if (confirmReset) {

            roadmapChecks.forEach(checkbox => {
                checkbox.checked = false;
            });

            updateProgress();

        }

    });


    // =================================
    // 2. PERSONAL STUDY PLANNER
    // =================================

    const studyInput = document.getElementById("studyGoal");
    const addGoalButton = document.getElementById("addGoal");
    const goalList = document.getElementById("goalList");

    const goalsKey = "anesthesiologyStudyGoals";

    let goals = JSON.parse(
        localStorage.getItem(goalsKey) || "[]"
    );

    function saveGoals() {

        localStorage.setItem(
            goalsKey,
            JSON.stringify(goals)
        );

    }

    function renderGoals() {

        goalList.replaceChildren();

        goals.forEach((goal, index) => {

            const li = document.createElement("li");

            const goalText = document.createElement("span");
            goalText.textContent = goal;

            const deleteButton = document.createElement("button");

            deleteButton.textContent = "Delete";
            deleteButton.className = "goal-delete";
            deleteButton.type = "button";
            deleteButton.setAttribute(
                "aria-label",
                "Delete study goal"
            );

            deleteButton.addEventListener("click", () => {

                goals.splice(index, 1);

                saveGoals();
                renderGoals();

            });

            li.append(goalText, deleteButton);

            goalList.appendChild(li);

        });

    }

    function addGoal() {

        const goal = studyInput.value.trim();

        if (goal === "") {

            alert("Please enter a study goal.");
            return;

        }

        goals.push(goal);

        saveGoals();
        renderGoals();

        studyInput.value = "";
        studyInput.focus();

    }

    addGoalButton.addEventListener("click", addGoal);

    studyInput.addEventListener("keydown", event => {

        if (event.key === "Enter") {
            addGoal();
        }

    });

    renderGoals();


    // =================================
    // 3. STUDENT PROFILE
    // =================================

    const profileForm = document.getElementById("profileForm");
    const profileMessage = document.getElementById("profileMessage");

    const profileKey = "anesthesiologyStudentProfile";

    const savedProfile = JSON.parse(
        localStorage.getItem(profileKey) || "null"
    );

    if (savedProfile) {

        document.getElementById("studentName").value =
            savedProfile.name || "";

        document.getElementById("studentAge").value =
            savedProfile.age || "";

        document.getElementById("studentClass").value =
            savedProfile.studentClass || "";

        document.getElementById("studentGoal").value =
            savedProfile.goal || "";

    }

    profileForm.addEventListener("submit", event => {

        event.preventDefault();

        const profile = {

            name: document.getElementById("studentName").value.trim(),

            age: document.getElementById("studentAge").value,

            studentClass: document.getElementById("studentClass").value,

            goal: document.getElementById("studentGoal").value.trim()

        };

        localStorage.setItem(
            profileKey,
            JSON.stringify(profile)
        );

        profileMessage.textContent =
            "Your student profile has been saved successfully!";

    });


    // =================================
    // 4. BACK TO TOP BUTTON
    // =================================

    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {

        backToTop.style.display =
            window.scrollY > 300 ? "block" : "none";

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});

document.addEventListener("DOMContentLoaded", () => {

    // 1. ROADMAP PROGRESS TRACKER

    const roadmapChecks = document.querySelectorAll(".roadmap-check");
    const progressFill = document.getElementById("progressFill");
    const progressText = document.getElementById("progressText");
    const resetRoadmap = document.getElementById("resetRoadmap");

    const roadmapKey = "entRoadmapProgress";

    function updateProgress() {

        const completed = document.querySelectorAll(
            ".roadmap-check:checked"
        ).length;

        const total = roadmapChecks.length;

        const percentage = total
            ? Math.round((completed / total) * 100)
            : 0;

        progressFill.style.width = percentage + "%";
        progressText.textContent = percentage + "% Completed";

        roadmapChecks.forEach(check => {

            check.closest(".roadmap-step").classList.toggle(
                "completed",
                check.checked
            );

        });

        localStorage.setItem(
            roadmapKey,
            JSON.stringify(
                Array.from(roadmapChecks).map(check => check.checked)
            )
        );
    }

    const savedProgress = JSON.parse(
        localStorage.getItem(roadmapKey) || "[]"
    );

    roadmapChecks.forEach((check, index) => {

        check.checked = savedProgress[index] === true;

        check.addEventListener("change", updateProgress);

    });

    updateProgress();

    resetRoadmap.addEventListener("click", () => {

        roadmapChecks.forEach(check => {
            check.checked = false;
        });

        updateProgress();

    });


    // 2. PERSONAL STUDY PLANNER

    const goalInput = document.getElementById("goalInput");
    const addGoal = document.getElementById("addGoal");
    const goalList = document.getElementById("goalList");

    const goalsKey = "entStudyGoals";

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

        goalList.innerHTML = "";

        goals.forEach((goal, index) => {

            const li = document.createElement("li");

            li.className = "goal-item" +
                (goal.completed ? " done" : "");

            const label = document.createElement("label");

            const checkbox = document.createElement("input");

            checkbox.type = "checkbox";
            checkbox.checked = goal.completed;

            const text = document.createElement("span");

            text.textContent = goal.text;

            checkbox.addEventListener("change", () => {

                goals[index].completed = checkbox.checked;

                saveGoals();
                renderGoals();

            });

            label.append(checkbox, text);

            const deleteButton = document.createElement("button");

            deleteButton.className = "delete-goal";
            deleteButton.textContent = "Delete";
            deleteButton.type = "button";

            deleteButton.addEventListener("click", () => {

                goals.splice(index, 1);

                saveGoals();
                renderGoals();

            });

            li.append(label, deleteButton);

            goalList.appendChild(li);

        });

    }

    function addNewGoal() {

        const text = goalInput.value.trim();

        if (!text) {

            alert("Please enter a study goal.");
            return;

        }

        goals.push({
            text: text,
            completed: false
        });

        saveGoals();
        renderGoals();

        goalInput.value = "";

    }

    addGoal.addEventListener("click", addNewGoal);

    goalInput.addEventListener("keydown", event => {

        if (event.key === "Enter") {
            addNewGoal();
        }

    });

    renderGoals();


    // 3. STUDENT PROFILE

    const profileForm = document.getElementById("profileForm");

    const profileMessage = document.getElementById("profileMessage");

    const profileKey = "entStudentProfile";

    const savedProfile = JSON.parse(
        localStorage.getItem(profileKey) || "null"
    );

    if (savedProfile) {

        document.getElementById("studentName").value =
            savedProfile.name;

        document.getElementById("studentEmail").value =
            savedProfile.email;

        document.getElementById("studentClass").value =
            savedProfile.education;

    }

    profileForm.addEventListener("submit", event => {

        event.preventDefault();

        const profile = {

            name: document.getElementById("studentName").value.trim(),

            email: document.getElementById("studentEmail").value.trim(),

            education: document.getElementById("studentClass").value

        };

        localStorage.setItem(
            profileKey,
            JSON.stringify(profile)
        );

        profileMessage.textContent =
            "Your profile has been saved successfully!";

    });


    // 4. BACK TO TOP

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

document.addEventListener("DOMContentLoaded", () => {

    // 1. ROADMAP PROGRESS TRACKER

    const roadmapItems = document.querySelectorAll(".roadmap-item");
    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");

    const roadmapKey = "dermatologyRoadmapProgress";

    function updateProgress() {

        const completed = document.querySelectorAll(
            ".roadmap-item input:checked"
        ).length;

        const total = roadmapItems.length;

        const percentage = total === 0
            ? 0
            : Math.round((completed / total) * 100);

        progressBar.style.width = percentage + "%";
        progressText.textContent = percentage + "% Completed";

        const savedProgress = Array.from(roadmapItems).map(item =>
            item.querySelector("input").checked
        );

        localStorage.setItem(
            roadmapKey,
            JSON.stringify(savedProgress)
        );
    }

    const savedProgress = JSON.parse(
        localStorage.getItem(roadmapKey) || "[]"
    );

    roadmapItems.forEach((item, index) => {

        const checkbox = item.querySelector("input");

        checkbox.checked = savedProgress[index] === true;

        item.classList.toggle("completed", checkbox.checked);

        checkbox.addEventListener("change", () => {

            item.classList.toggle("completed", checkbox.checked);

            updateProgress();

        });

    });

    updateProgress();


    // 2. PERSONAL STUDY PLANNER

    const goalInput = document.getElementById("goalInput");
    const addGoalBtn = document.getElementById("addGoalBtn");
    const goalList = document.getElementById("goalList");

    const goalsKey = "dermatologyStudyGoals";

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

            const text = document.createElement("span");

            text.textContent = goal;

            const deleteButton = document.createElement("button");

            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-btn";
            deleteButton.type = "button";

            deleteButton.addEventListener("click", () => {

                goals.splice(index, 1);

                saveGoals();

                renderGoals();

            });

            li.append(text, deleteButton);

            goalList.appendChild(li);

        });

    }

    function addGoal() {

        const goal = goalInput.value.trim();

        if (!goal) {

            alert("Please enter a study goal.");

            return;
        }

        goals.push(goal);

        saveGoals();

        renderGoals();

        goalInput.value = "";

        goalInput.focus();

    }

    addGoalBtn.addEventListener("click", addGoal);

    goalInput.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            addGoal();

        }

    });

    renderGoals();


    // 3. STUDENT PROFILE

    const profileForm = document.getElementById("profileForm");

    const profileMessage = document.getElementById("profileMessage");

    const profileKey = "dermatologyStudentProfile";

    const savedProfile = JSON.parse(
        localStorage.getItem(profileKey) || "null"
    );

    if (savedProfile) {

        document.getElementById("studentName").value =
            savedProfile.name || "";

        document.getElementById("studentClass").value =
            savedProfile.studentClass || "";

        document.getElementById("studentEmail").value =
            savedProfile.email || "";

    }

    profileForm.addEventListener("submit", event => {

        event.preventDefault();

        const profile = {

            name: document.getElementById("studentName").value.trim(),

            studentClass: document.getElementById("studentClass").value.trim(),

            email: document.getElementById("studentEmail").value.trim()

        };

        localStorage.setItem(
            profileKey,
            JSON.stringify(profile)
        );

        profileMessage.textContent =
            "Your student profile has been saved successfully.";

    });


    // 4. BACK TO TOP BUTTON

    const topButton = document.getElementById("topBtn");

    window.addEventListener("scroll", () => {

        topButton.style.display =
            window.scrollY > 300 ? "block" : "none";

    });

    topButton.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});


document.addEventListener("DOMContentLoaded", () => {

    // CARDIOLOGY ROADMAP PROGRESS TRACKER
    const checkboxes = document.querySelectorAll(".progress-check");
    const progressFill = document.getElementById("progressFill");
    const progressText = document.getElementById("progressText");
    const resetButton = document.getElementById("resetProgress");

    const progressKey = "cardiologyRoadmapProgress";

    function updateProgress() {
        const completed = [...checkboxes].filter(box => box.checked).length;
        const total = checkboxes.length;
        const percentage = total ? Math.round((completed / total) * 100) : 0;

        progressFill.style.width = percentage + "%";
        progressText.textContent = percentage + "%";

        localStorage.setItem(
            progressKey,
            JSON.stringify([...checkboxes].map(box => box.checked))
        );
    }

    const savedProgress = JSON.parse(localStorage.getItem(progressKey) || "[]");

    checkboxes.forEach((checkbox, index) => {
        checkbox.checked = savedProgress[index] || false;
        checkbox.addEventListener("change", updateProgress);
    });

    updateProgress();

    resetButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to reset your roadmap progress?")) {
            checkboxes.forEach(box => box.checked = false);
            updateProgress();
        }
    });


    // EDUCATION LEVEL GUIDANCE
    const guidanceData = {
        "10": {
            title: "Guidance for Class 10 Students",
            text: "Focus on Science, Mathematics, and English. Develop a regular study routine and learn the fundamentals of human biology."
        },
        "12": {
            title: "Guidance for Class 11–12 Students",
            text: "Choose Physics, Chemistry, and Biology (PCB). Prepare systematically for NEET-UG and understand medical admission requirements."
        },
        "after12": {
            title: "Guidance After Class 12",
            text: "Review NEET-UG eligibility, examination notifications, counselling procedures, and recognised medical colleges through official sources."
        },
        "mbbs": {
            title: "Guidance for MBBS Students",
            text: "Build strong clinical foundations, learn cardiovascular medicine, gain supervised clinical experience, and explore eligible postgraduate pathways."
        }
    };

    const guidanceBox = document.getElementById("levelGuidance");

    document.querySelectorAll("[data-level]").forEach(button => {
        button.addEventListener("click", () => {
            const level = button.dataset.level;
            const guidance = guidanceData[level];

            guidanceBox.innerHTML = `
                <h3>${guidance.title}</h3>
                <p>${guidance.text}</p>
            `;

            guidanceBox.hidden = false;
            guidanceBox.scrollIntoView({ behavior: "smooth", block: "center" });
        });
    });


    // STUDY PLANNER
    const studyForm = document.getElementById("studyForm");
    const studyTask = document.getElementById("studyTask");
    const studySubject = document.getElementById("studySubject");
    const studyList = document.getElementById("studyList");

    const studyKey = "cardiologyStudyGoals";
    let studyGoals = JSON.parse(localStorage.getItem(studyKey) || "[]");

    function renderStudyGoals() {
        studyList.innerHTML = "";

        studyGoals.forEach((goal, index) => {
            const li = document.createElement("li");
            const text = document.createElement("span");
            const deleteButton = document.createElement("button");

            text.textContent = `${goal.subject}: ${goal.task}`;
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-task";
            deleteButton.type = "button";

            deleteButton.addEventListener("click", () => {
                studyGoals.splice(index, 1);
                saveStudyGoals();
            });

            li.append(text, deleteButton);
            studyList.appendChild(li);
        });
    }

    function saveStudyGoals() {
        localStorage.setItem(studyKey, JSON.stringify(studyGoals));
        renderStudyGoals();
    }

    studyForm.addEventListener("submit", event => {
        event.preventDefault();

        const task = studyTask.value.trim();
        const subject = studySubject.value;

        if (!task || !subject) {
            alert("Please enter a study goal and select a subject.");
            return;
        }

        studyGoals.push({ task, subject });
        saveStudyGoals();

        studyForm.reset();
    });

    renderStudyGoals();


    // STUDENT CAREER PROFILE
    const profileForm = document.getElementById("profileForm");
    const profileMessage = document.getElementById("profileMessage");
    const profileKey = "cardiologyStudentProfile";

    const savedProfile = JSON.parse(localStorage.getItem(profileKey) || "null");

    if (savedProfile) {
        document.getElementById("studentName").value = savedProfile.name || "";
        document.getElementById("studentEmail").value = savedProfile.email || "";
        document.getElementById("currentEducation").value = savedProfile.education || "";
    }

    profileForm.addEventListener("submit", event => {
        event.preventDefault();

        const profile = {
            name: document.getElementById("studentName").value.trim(),
            email: document.getElementById("studentEmail").value.trim(),
            education: document.getElementById("currentEducation").value
        };

        localStorage.setItem(profileKey, JSON.stringify(profile));

        profileMessage.textContent = "Your career profile has been saved successfully.";
    });

});

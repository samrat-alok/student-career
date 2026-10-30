
"use strict";

const STORAGE = {
    tasks: "gm_roadmap_tasks_v1",
    studies: "gm_study_goals_v1",
    profile: "gm_career_profile_v1"
};

function readData(key, fallback) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
    } catch {
        return fallback;
    }
}

function saveData(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch {
        alert("Browser storage unavailable. Your changes may not be saved.");
        return false;
    }
}

// -------------------------------------
// 1. Roadmap + skills progress tracker
// -------------------------------------

const checkboxes = [
    ...document.querySelectorAll('input[type="checkbox"][data-task]')
];

let completedTasks = readData(STORAGE.tasks, {});

checkboxes.forEach((checkbox) => {
    const taskId = checkbox.dataset.task;
    checkbox.checked = completedTasks[taskId] === true;

    checkbox.addEventListener("change", () => {
        completedTasks[taskId] = checkbox.checked;
        saveData(STORAGE.tasks, completedTasks);
        updateProgress();
    });
});

function updateProgress() {
    const total = checkboxes.length;
    const completed = checkboxes.filter(
        checkbox => checkbox.checked
    ).length;

    const percent = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    document.getElementById("progressCount").textContent =
        `${completed} / ${total}`;

    document.getElementById("progressPercent").textContent =
        `${percent}%`;

    document.getElementById("progressBar").style.width =
        `${percent}%`;

    let message;

    if (completed === 0) {
        message = "शुरुआत करें: अपने वर्तमान स्तर का पहला task पूरा करें।";
    } else if (percent < 25) {
        message = "अच्छी शुरुआत! अब अगले छोटे लक्ष्य पर ध्यान दें।";
    } else if (percent < 50) {
        message = "आप आगे बढ़ रहे हैं। अपने कमजोर विषयों को revise करें।";
    } else if (percent < 75) {
        message = "अच्छी प्रगति! Practical learning और बाकी tasks जारी रखें।";
    } else if (percent < 100) {
        message = "आपका काफी काम पूरा है। बाकी tasks और official requirements जाँचें।";
    } else {
        message = "सभी checklist tasks mark हो चुके हैं। यह qualification या clinical competence का प्रमाण नहीं है।";
    }

    document.getElementById("nextStep").textContent = message;
}

updateProgress();

// -------------------------------------
// 2. Level-wise next-step guidance
// -------------------------------------

const levelAdvice = {
    "10th":
        "Next step: 11वीं में PCB stream के विकल्प, school eligibility और Biology, Physics तथा Chemistry की foundations पर ध्यान दें।",

    "12th":
        "Next step: NEET-UG syllabus, NCERT revision, MCQs और mock-test analysis पर काम करें। Eligibility और admission rules official NEET bulletin से जाँचें।",

    "mbbs":
        "Next step: अपने वर्तमान MBBS phase के subjects, practical assessments, supervised clinical exposure और logbook requirements पर ध्यान दें।",

    "intern":
        "Next step: applicable internship completion, medical registration, eligible job vacancies और postgraduate options की आधिकारिक requirements जाँचें।"
};

const levelCards = document.querySelectorAll(".level-card");

levelCards.forEach(card => {
    card.addEventListener("click", () => {
        levelCards.forEach(item => item.classList.remove("selected"));
        card.classList.add("selected");

        document.getElementById("levelAdvice").textContent =
            levelAdvice[card.dataset.level];

        // Keep the profile level in sync with the selected level.
        document.getElementById("profileLevel").value =
            card.dataset.level;
    });
});

// -------------------------------------
// 3. Weekly study planner
// -------------------------------------

const studyForm = document.getElementById("studyForm");
const studyTopic = document.getElementById("studyTopic");
const studyHours = document.getElementById("studyHours");
const studyList = document.getElementById("studyList");

let studyGoals = readData(STORAGE.studies, []);

function createStudyElement(goal) {
    const article = document.createElement("article");
    article.className = "study-item";

    const content = document.createElement("div");
    const title = document.createElement("h4");
    const description = document.createElement("p");

    title.textContent = goal.topic;
    description.textContent =
        `${goal.hours} hours/week · ${goal.done ? "Completed" : "In progress"}`;

    content.append(title, description);

    const actions = document.createElement("div");

    const doneButton = document.createElement("button");
    doneButton.type = "button";
    doneButton.textContent = goal.done ? "Completed ✓" : "Mark Complete";
    doneButton.classList.toggle("done", goal.done);

    doneButton.addEventListener("click", () => {
        studyGoals = studyGoals.map(item =>
            item.id === goal.id
                ? { ...item, done: !item.done }
                : item
        );

        saveData(STORAGE.studies, studyGoals);
        renderStudyGoals();
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
        studyGoals = studyGoals.filter(item => item.id !== goal.id);
        saveData(STORAGE.studies, studyGoals);
        renderStudyGoals();
    });

    actions.append(doneButton, deleteButton);
    article.append(content, actions);

    return article;
}

function renderStudyGoals() {
    studyList.replaceChildren();

    if (studyGoals.length === 0) {
        const empty = document.createElement("p");
        empty.className = "small-note";
        empty.textContent = "अभी कोई study goal नहीं है। ऊपर से पहला goal जोड़ें।";
        studyList.append(empty);
        return;
    }

    studyGoals.forEach(goal => {
        studyList.append(createStudyElement(goal));
    });
}

studyForm.addEventListener("submit", event => {
    event.preventDefault();

    const topic = studyTopic.value.trim();
    const hours = Number(studyHours.value);

    if (!topic || !Number.isFinite(hours) || hours < 1 || hours > 80) {
        alert("एक valid topic और 1 से 80 घंटे के बीच weekly target दर्ज करें।");
        return;
    }

    studyGoals.push({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        topic,
        hours,
        done: false
    });

    if (saveData(STORAGE.studies, studyGoals)) {
        studyForm.reset();
        studyHours.value = "5";
        renderStudyGoals();
    } else {
        studyGoals.pop();
    }
});

renderStudyGoals();

// -------------------------------------
// 4. Career profile
// -------------------------------------

const profileForm = document.getElementById("profileForm");
const profileMessage = document.getElementById("profileMessage");

function loadProfile() {
    const profile = readData(STORAGE.profile, null);

    if (!profile) return;

    document.getElementById("profileName").value =
        profile.name || "";

    document.getElementById("profileLevel").value =
        profile.level || "10th";

    document.getElementById("profileGoal").value =
        profile.goal || "General Physician";

    document.getElementById("targetDate").value =
        profile.targetDate || "";
}

profileForm.addEventListener("submit", event => {
    event.preventDefault();

    const profile = {
        name: document.getElementById("profileName").value.trim(),
        level: document.getElementById("profileLevel").value,
        goal: document.getElementById("profileGoal").value,
        targetDate: document.getElementById("targetDate").value
    };

    if (saveData(STORAGE.profile, profile)) {
        profileMessage.textContent =
            "Profile इस browser में save हो गई है।";
    }
});

loadProfile();

// -------------------------------------
// 5. Reset all progress
// -------------------------------------

document.getElementById("resetProgress").addEventListener("click", () => {
    const confirmed = confirm(
        "क्या आप सभी roadmap tasks, skill checkboxes और study goals reset करना चाहते हैं? Career profile अलग से बनी रहेगी।"
    );

    if (!confirmed) return;

    completedTasks = {};
    studyGoals = [];

    const tasksSaved = saveData(STORAGE.tasks, completedTasks);
    const studiesSaved = saveData(STORAGE.studies, studyGoals);

    if (tasksSaved && studiesSaved) {
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        renderStudyGoals();
        updateProgress();
    }
});

// -------------------------------------
// 6. Language toggle: Hindi / English
// -------------------------------------

let englishMode = false;

const translations = {
    en: {
        "Explore Roadmap ↗": "Explore Roadmap ↗",
        "Track My Progress": "Track My Progress",
        "अपना वर्तमान स्तर चुनें": "Choose Your Current Level",
        "Complete Study Roadmap": "Complete Study Roadmap",
        "Skills Students Should Develop": "Skills Students Should Develop",
        "Internship & Clinical Exposure Finder": "Internship & Clinical Exposure Finder",
        "Job Profiles & Career Opportunities": "Job Profiles & Career Opportunities",
        "My Medical Career Profile": "My Medical Career Profile",
        "My Progress Tracker": "My Progress Tracker"
    },
    hi: {
        "Explore Roadmap ↗": "रोडमैप देखें ↗",
        "Track My Progress": "मेरी प्रगति देखें",
        "अपना वर्तमान स्तर चुनें": "अपना वर्तमान स्तर चुनें",
        "Complete Study Roadmap": "पूरा पढ़ाई रोडमैप",
        "Skills Students Should Develop": "स्टूडेंट्स की जरूरी स्किल्स",
        "Internship & Clinical Exposure Finder": "इंटर्नशिप और क्लिनिकल ट्रेनिंग",
        "Job Profiles & Career Opportunities": "जॉब प्रोफाइल और करियर अवसर",
        "My Medical Career Profile": "मेरी मेडिकल करियर प्रोफाइल",
        "My Progress Tracker": "मेरी प्रगति ट्रैकर"
    }
};

const originalLabels = new Map();

document.querySelectorAll("h2, .actions a").forEach(element => {
    originalLabels.set(element, element.textContent.trim());
});

document.getElementById("langBtn").addEventListener("click", () => {
    englishMode = !englishMode;
    const dictionary = englishMode ? translations.en : translations.hi;

    originalLabels.forEach((originalText, element) => {
        element.textContent = dictionary[originalText] || originalText;
    });

    document.documentElement.lang = englishMode ? "en" : "hi";
    document.getElementById("langBtn").textContent =
        englishMode ? "English / हिंदी" : "हिंदी / English";
});

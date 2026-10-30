
const examData = {
    upsc: {
        title: "UPSC & Civil Services",
        description: "Civil Services Examination mein Prelims, Mains aur Personality Test ke stages hote hain. Exact rules official notification se check karein.",
        jobs: ["Civil Services Examination", "Indian Forest Service", "NDA / CDS", "CAPF Assistant Commandant"],
        subjects: ["History, Geography and Polity", "Economy and Environment", "Current Affairs", "Exam-specific subjects"],
        stages: ["Preliminary examination, where applicable", "Main examination, where applicable", "Interview / Personality Test, where applicable"],
        syllabus: ["History and Indian National Movement", "Geography and Indian Society", "Constitution, Polity and Governance", "Economy, Environment and Science", "Current Affairs and exam-specific papers"],
        url: "https://www.upsc.gov.in/"
    },

    ssc: {
        title: "Staff Selection Commission (SSC)",
        description: "SSC CGL, CHSL, MTS, GD aur doosre exams ki requirements post aur notification ke mutabik alag hoti hain.",
        jobs: ["SSC CGL", "SSC CHSL", "SSC MTS", "SSC GD Constable"],
        subjects: ["Reasoning", "Quantitative Aptitude / Mathematics", "English", "General Awareness"],
        stages: ["Computer-based examination", "Skill test / Physical test, where applicable", "Document verification and medical examination, where applicable"],
        syllabus: ["Reasoning and problem solving", "Arithmetic and mathematics", "English language", "General Awareness and current affairs", "Post-specific skill test, if notified"],
        url: "https://ssc.gov.in/"
    },

    railway: {
        title: "Railway Recruitment",
        description: "Railway NTPC, Group D, ALP aur technical posts ke exam pattern aur medical standards alag ho sakte hain.",
        jobs: ["RRB NTPC", "RRB Group D", "Assistant Loco Pilot", "Technician"],
        subjects: ["Mathematics", "General Intelligence and Reasoning", "General Awareness", "Science or technical topics, where applicable"],
        stages: ["Computer-based test(s)", "Aptitude / skill test, where applicable", "Document verification and post-specific medical test"],
        syllabus: ["Mathematics and arithmetic", "Reasoning", "General Awareness", "General Science", "Technical subject or aptitude test, if required"],
        url: "https://indianrailways.gov.in/"
    },

    banking: {
        title: "Banking Exams",
        description: "IBPS aur SBI ke notified clerical, PO aur specialist roles mein exam stages aur eligibility differ karte hain.",
        jobs: ["IBPS PO", "IBPS Clerk / Customer Service Associate", "SBI PO", "SBI Junior Associate"],
        subjects: ["Reasoning", "Quantitative Aptitude", "English Language", "General / Banking Awareness, where applicable"],
        stages: ["Preliminary examination, where applicable", "Main examination", "Interview or local language test, where applicable"],
        syllabus: ["Reasoning and logical ability", "Quantitative Aptitude", "English Language", "Banking and financial awareness", "Computer aptitude, where applicable"],
        url: "https://www.ibps.in/"
    },

    defence: {
        title: "Defence Recruitment",
        description: "NDA, CDS, Agniveer aur doosri defence entries ki age, education, selection, fitness aur medical requirements alag hoti hain.",
        jobs: ["NDA", "CDS", "Agniveer entries", "Other notified defence entries"],
        subjects: ["Mathematics, where applicable", "English", "General Knowledge", "Entry-specific subjects and aptitude"],
        stages: ["Written examination or notified selection process", "SSB / physical tests, where applicable", "Medical examination and merit process"],
        syllabus: ["Entry-specific written subjects", "English and general knowledge, where applicable", "Mathematics, where applicable", "Physical and interview preparation as required"],
        url: "https://www.upsc.gov.in/"
    },

    police: {
        title: "Police & CAPF",
        description: "Police constable, SI, SSC GD aur CAPF roles mein written exam ke saath physical aur medical stages bhi ho sakte hain.",
        jobs: ["State Police Constable", "State Police Sub-Inspector", "SSC GD Constable", "CAPF posts"],
        subjects: ["Reasoning", "General Knowledge and Current Affairs", "Mathematics", "Language and post-specific subjects"],
        stages: ["Written / computer-based examination", "PET / PST, where applicable", "Medical examination and document verification"],
        syllabus: ["Reasoning and mental ability", "Arithmetic", "General Knowledge and current affairs", "Language skills", "Physical test standards from the notification"],
        url: "https://ssc.gov.in/"
    },

    teaching: {
        title: "Teaching Recruitment",
        description: "CTET, State TET aur teacher recruitment ki qualification aur paper requirements class level aur post par depend karti hain.",
        jobs: ["CTET", "State TET", "Government school teacher recruitment", "Other notified teaching posts"],
        subjects: ["Child Development and Pedagogy", "Language", "Mathematics", "Environmental Studies or subject-specific content"],
        stages: ["Eligibility test, where required", "Recruitment examination or merit process", "Document verification and other notified requirements"],
        syllabus: ["Child development and pedagogy", "Language comprehension and pedagogy", "Relevant school subjects", "Subject-specific content as applicable"],
        url: "https://ctet.nic.in/"
    },

    state: {
        title: "State Government Jobs",
        description: "State PSC, clerical, revenue aur department-specific posts ke rules respective state recruitment board decide karta hai.",
        jobs: ["State Public Service Commission", "Clerk / Assistant", "Revenue-related posts", "Department-specific vacancies"],
        subjects: ["General Knowledge", "State-specific history and geography", "Reasoning and mathematics", "Language and role-specific subjects"],
        stages: ["Written examination, where applicable", "Skill / interview / physical test, where notified", "Document verification and other requirements"],
        syllabus: ["State history, geography and culture", "Indian Polity and General Awareness", "Reasoning and arithmetic", "State language and post-specific subjects"],
        url: "https://www.india.gov.in/"
    },

    technical: {
        title: "Technical Government Jobs",
        description: "Engineering, IT, scientific aur technical vacancies mein required degree, diploma ya specialist knowledge post-specific hota hai.",
        jobs: ["Technical Assistant", "Engineering posts", "IT / Computer posts", "Scientific and laboratory posts"],
        subjects: ["Core technical subject", "Reasoning or aptitude, where applicable", "General Awareness", "Computer or professional knowledge"],
        stages: ["Written or computer-based examination", "Technical test / interview, where applicable", "Document verification and notified medical requirements"],
        syllabus: ["Core discipline syllabus", "Technical fundamentals", "Aptitude and reasoning, if included", "Post-specific practical or professional knowledge"],
        url: "https://www.ncs.gov.in/"
    },

    other: {
        title: "Other Government Department Jobs",
        description: "Postal, court, healthcare aur doosre departments apne recruitment notices ke through eligibility aur selection rules batate hain.",
        jobs: ["Postal and departmental posts", "Court and administrative posts", "Government healthcare roles", "Other notified vacancies"],
        subjects: ["General Awareness", "Reasoning", "Mathematics", "Language or professional subjects, as applicable"],
        stages: ["Written / skill test, where notified", "Interview, where applicable", "Document verification and role-specific checks"],
        syllabus: ["Read the exact recruitment syllabus", "Identify common aptitude subjects", "Prepare role-specific subjects", "Practise the notified test format"],
        url: "https://www.india.gov.in/"
    }
};

function fillList(element, items) {
    element.replaceChildren();

    items.forEach(function(text) {
        const li = document.createElement("li");
        li.textContent = text;
        element.appendChild(li);
    });
}

function showExamDetails(key) {
    const exam = examData[key];
    if (!exam) return;

    document.getElementById("examSelect").value = key;
    document.getElementById("examTitle").textContent = exam.title;
    document.getElementById("examDescription").textContent = exam.description;

    fillList(document.getElementById("examJobs"), exam.jobs);
    fillList(document.getElementById("examSubjects"), exam.subjects);
    fillList(document.getElementById("examStages"), exam.stages);

    const officialLink = document.getElementById("officialLink");
    officialLink.href = exam.url;

    document.querySelectorAll(".job-card").forEach(function(card) {
        card.classList.toggle("active", card.dataset.exam === key);
    });
}

document.getElementById("showExam").addEventListener("click", function() {
    showExamDetails(document.getElementById("examSelect").value);
});

document.querySelectorAll(".job-card").forEach(function(card) {
    card.addEventListener("click", function() {
        const key = card.dataset.exam;
        showExamDetails(key);
        document.getElementById("examSelect").value = key;

        document.querySelector(".details-panel").scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    });
});

showExamDetails("upsc");


// SYLLABUS STUDY PLAN

function showSyllabus(key) {
    const exam = examData[key];
    const result = document.getElementById("syllabusResult");

    if (!exam) return;

    result.replaceChildren();

    const title = document.createElement("h3");
    title.textContent = exam.title + " — Starting Study Checklist";

    const intro = document.createElement("p");
    intro.textContent =
        "Use this as a starting guide. Match every topic with the official syllabus for your exact exam.";

    const heading = document.createElement("h4");
    heading.textContent = "Topics to review";

    const list = document.createElement("ul");

    exam.syllabus.forEach(function(subject) {
        const li = document.createElement("li");
        li.textContent = subject;
        list.appendChild(li);
    });

    const scheduleHeading = document.createElement("h4");
    scheduleHeading.textContent = "Suggested daily routine";

    const schedule = document.createElement("ol");

    [
        "30 minutes: revise one concept.",
        "30 minutes: practise questions from that topic.",
        "20 minutes: review mistakes and write short notes.",
        "10 minutes: revise previously studied topics."
    ].forEach(function(text) {
        const li = document.createElement("li");
        li.textContent = text;
        schedule.appendChild(li);
    });

    result.append(
        title,
        intro,
        heading,
        list,
        scheduleHeading,
        schedule
    );
}

document.getElementById("showSyllabus").addEventListener("click", function() {
    showSyllabus(document.getElementById("syllabusSelect").value);
});

showSyllabus("upsc");


// PRACTICE QUESTIONS
// These are original sample questions for practice, not official PYQs.

const questionBank = {
    general: [
        {
            q: "What is the capital of India?",
            options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
            answer: 1,
            explanation: "New Delhi is the capital of India."
        },
        {
            q: "Which body conducts the UPSC Civil Services Examination?",
            options: ["UPSC", "RBI", "Election Commission", "NITI Aayog"],
            answer: 0,
            explanation: "The Union Public Service Commission conducts the Civil Services Examination."
        },
        {
            q: "Fundamental Rights are included in which part of the Indian Constitution?",
            options: ["Part I", "Part II", "Part III", "Part IV"],
            answer: 2,
            explanation: "Fundamental Rights are in Part III."
        },
        {
            q: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Mercury"],
            answer: 1,
            explanation: "Mars is commonly called the Red Planet."
        },
        {
            q: "The main function of the Reserve Bank of India includes:",
            options: ["Conducting school exams", "Monetary policy", "Making laws in Parliament", "Running the Railways"],
            answer: 1,
            explanation: "RBI is India's central bank and conducts monetary policy."
        }
    ],

    math: [
        {
            q: "What is 25% of 200?",
            options: ["25", "40", "50", "75"],
            answer: 2,
            explanation: "25% of 200 = 200 × 25 / 100 = 50."
        },
        {
            q: "A train covers 120 km in 2 hours. What is its average speed?",
            options: ["40 km/h", "50 km/h", "60 km/h", "80 km/h"],
            answer: 2,
            explanation: "Speed = distance / time = 120 / 2 = 60 km/h."
        },
        {
            q: "What is the average of 10, 20 and 30?",
            options: ["15", "20", "25", "30"],
            answer: 1,
            explanation: "(10 + 20 + 30) / 3 = 20."
        },
        {
            q: "If x + 7 = 15, what is x?",
            options: ["6", "7", "8", "9"],
            answer: 2,
            explanation: "x = 15 - 7 = 8."
        },
        {
            q: "A product costs ₹500 and is discounted by 10%. What is the sale price?",
            options: ["₹400", "₹450", "₹475", "₹490"],
            answer: 1,
            explanation: "10% of ₹500 is ₹50. Sale price = ₹450."
        }
    ],

    reasoning: [
        {
            q: "Find the next number: 2, 4, 6, 8, __",
            options: ["9", "10", "11", "12"],
            answer: 1,
            explanation: "The sequence increases by 2 each time."
        },
        {
            q: "Which one is different from the others?",
            options: ["Apple", "Mango", "Carrot", "Banana"],
            answer: 2,
            explanation: "Carrot is commonly classified as a vegetable; the others are fruits."
        },
        {
            q: "If CAT is coded as DBU by shifting each letter forward one place, DOG becomes:",
            options: ["EPH", "EOG", "DPH", "FQI"],
            answer: 0,
            explanation: "D→E, O→P, G→H."
        },
        {
            q: "Monday comes immediately before which day?",
            options: ["Sunday", "Tuesday", "Wednesday", "Friday"],
            answer: 1,
            explanation: "Tuesday follows Monday."
        },
        {
            q: "Complete the pattern: 3, 6, 12, 24, __",
            options: ["30", "36", "42", "48"],
            answer: 3,
            explanation: "Each number is multiplied by 2."
        }
    ],

    english: [
        {
            q: "Choose the synonym of 'Rapid'.",
            options: ["Slow", "Fast", "Weak", "Late"],
            answer: 1,
            explanation: "Rapid means fast or quick."
        },
        {
            q: "Choose the correct spelling.",
            options: ["Goverment", "Government", "Governmant", "Goverenment"],
            answer: 1,
            explanation: "The correct spelling is Government."
        },
        {
            q: "Choose the opposite of 'Ancient'.",
            options: ["Old", "Historic", "Modern", "Past"],
            answer: 2,
            explanation: "Modern is an antonym of ancient."
        },
        {
            q: "Choose the correct sentence.",
            options: [
                "She go to school.",
                "She going school.",
                "She goes to school.",
                "She gone to school."
            ],
            answer: 2,
            explanation: "With 'she' in the simple present, use 'goes'."
        },
        {
            q: "What is the plural of 'Child'?",
            options: ["Childs", "Children", "Childes", "Childrens"],
            answer: 1,
            explanation: "The plural form is children."
        }
    ]
};

let currentQuestions = [];
let currentQuestionIndex = 0;
let selectedAnswers = {};
let checkedQuestions = {};

const quizCategory = document.getElementById("quizCategory");
const questionText = document.getElementById("questionText");
const answerOptions = document.getElementById("answerOptions");
const quizProgress = document.getElementById("quizProgress");
const quizFeedback = document.getElementById("quizFeedback");
const quizScore = document.getElementById("quizScore");
const checkAnswerButton = document.getElementById("checkAnswer");
const nextQuestionButton = document.getElementById("nextQuestion");

function getScore() {
    return currentQuestions.reduce(function(total, question, index) {
        return total + (
            checkedQuestions[index] === true &&
            selectedAnswers[index] === question.answer ? 1 : 0
        );
    }, 0);
}

function renderQuestion() {
    const question = currentQuestions[currentQuestionIndex];

    if (!question) return;

    quizProgress.textContent =
        "Question " + (currentQuestionIndex + 1) +
        " of " + currentQuestions.length;

    questionText.textContent = question.q;
    answerOptions.replaceChildren();
    quizFeedback.textContent = "";

    question.options.forEach(function(option, index) {
        const label = document.createElement("label");
        label.className = "answer-option";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = "quizAnswer";
        input.value = index;
        input.checked = selectedAnswers[currentQuestionIndex] === index;
        input.disabled = checkedQuestions[currentQuestionIndex] === true;

        input.addEventListener("change", function() {
            selectedAnswers[currentQuestionIndex] = index;
        });

        const text = document.createElement("span");
        text.textContent = option;

        label.append(input, text);

        if (checkedQuestions[currentQuestionIndex] === true) {
            if (index === question.answer) {
                label.classList.add("correct");
            } else if (selectedAnswers[currentQuestionIndex] === index) {
                label.classList.add("incorrect");
            }
        }

        answerOptions.appendChild(label);
    });

    checkAnswerButton.disabled =
        checkedQuestions[currentQuestionIndex] === true;

    nextQuestionButton.disabled =
        checkedQuestions[currentQuestionIndex] !== true;

    nextQuestionButton.textContent =
        currentQuestionIndex === currentQuestions.length - 1
            ? "Finish Quiz"
            : "Next Question";

    quizScore.textContent =
        "Score: " + getScore() + " / " + currentQuestions.length;

    if (checkedQuestions[currentQuestionIndex] === true) {
        quizFeedback.textContent = question.explanation;
    }
}

function loadQuiz() {
    currentQuestions = questionBank[quizCategory.value];
    currentQuestionIndex = 0;
    selectedAnswers = {};
    checkedQuestions = {};
    renderQuestion();
}

checkAnswerButton.addEventListener("click", function() {
    const question = currentQuestions[currentQuestionIndex];

    if (selectedAnswers[currentQuestionIndex] === undefined) {
        quizFeedback.textContent = "Please select an answer first.";
        return;
    }

    checkedQuestions[currentQuestionIndex] = true;

    if (selectedAnswers[currentQuestionIndex] === question.answer) {
        quizFeedback.textContent = "Correct! " + question.explanation;
    } else {
        quizFeedback.textContent =
            "Not quite. Correct answer: " +
            question.options[question.answer] + ". " +
            question.explanation;
    }

    renderQuestion();
});

nextQuestionButton.addEventListener("click", function() {
    if (currentQuestionIndex < currentQuestions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        const finalScore = getScore();

        quizProgress.textContent = "Practice completed!";
        questionText.textContent =
            "Your final score: " + finalScore + " / " + currentQuestions.length;

        answerOptions.replaceChildren();

        quizFeedback.textContent =
            finalScore === currentQuestions.length
                ? "Excellent work! Keep practising."
                : "Review the explanations and try the quiz again.";

        checkAnswerButton.disabled = true;
        nextQuestionButton.disabled = true;
        quizScore.textContent =
            "Final Score: " + finalScore + " / " + currentQuestions.length;
    }
});

document.getElementById("newQuiz").addEventListener("click", loadQuiz);
quizCategory.addEventListener("change", loadQuiz);

loadQuiz();


// INITIAL ELIGIBILITY CHECKLIST

document.getElementById("eligibilityForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const education = document.getElementById("education").value;
    const age = Number(document.getElementById("age").value);
    const target = document.getElementById("targetExam").value;
    const exam = examData[target];

    const result = document.getElementById("eligibilityResult");
    result.replaceChildren();

    const title = document.createElement("h3");
    title.textContent = "Your Eligibility Verification Checklist";

    const summary = document.createElement("p");
    summary.textContent =
        "Selected category: " + exam.title +
        " | Qualification entered: " + education +
        " | Age entered: " + age;

    const list = document.createElement("ul");

    const tasks = [
        "Open the latest official notification for the exact post.",
        "Verify the minimum qualification and any required subjects or degree.",
        "Verify the minimum and maximum age and applicable relaxation rules.",
        "Check nationality, category certificates and other required documents.",
        "Check whether a physical, skill, aptitude or medical test applies."
    ];

    tasks.forEach(function(task) {
        const li = document.createElement("li");
        li.textContent = task;
        list.appendChild(li);
    });

    const note = document.createElement("p");
    note.className = "small-note";
    note.textContent =
        "This demo does not determine whether you are eligible. " +
        "Age limits and qualifications vary by exam, post, category and notification.";

    result.append(title, summary, list, note);
    result.classList.add("show");

    result.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

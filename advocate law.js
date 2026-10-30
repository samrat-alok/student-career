
"use strict";

// ==========================================
// 1. MOBILE NAVIGATION
// ==========================================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// ==========================================
// 2. CAREER ROADMAP
// ==========================================
const roadmaps = {
  "12th": [
    {
      title: "Complete Class 12",
      description: "Complete your 10+2 education. Students from different streams can generally pursue law, subject to the institution's eligibility requirements.",
      duration: "STEP 1"
    },
    {
      title: "Explore Law Entrance Exams",
      description: "Research CLAT, relevant university entrance exams and other admission routes. Check the latest eligibility, dates and participating colleges.",
      duration: "STEP 2"
    },
    {
      title: "Join a Recognized 5-Year Integrated LL.B.",
      description: "Consider BA LL.B., BBA LL.B., BCom LL.B. or another approved integrated programme at an eligible institution.",
      duration: "5 YEARS"
    },
    {
      title: "Build Practical Legal Skills",
      description: "Study core subjects, attend moot courts, practise legal research and seek supervised internships.",
      duration: "DURING DEGREE"
    },
    {
      title: "Check Enrolment and AIBE Requirements",
      description: "After graduation, verify current State Bar Council enrolment requirements and applicable All India Bar Examination rules.",
      duration: "AFTER DEGREE"
    },
    {
      title: "Choose Your Legal Career",
      description: "Explore litigation, law firms, corporate legal work, research, public service and other eligible legal roles.",
      duration: "CAREER STAGE"
    }
  ],

  graduate: [
    {
      title: "Complete Your Bachelor's Degree",
      description: "Finish your BA, BSc, BCom, BCA or another qualifying graduation programme.",
      duration: "STEP 1"
    },
    {
      title: "Check 3-Year LL.B. Admissions",
      description: "Check eligibility and entrance requirements for a recognized, BCI-approved three-year LL.B. programme.",
      duration: "STEP 2"
    },
    {
      title: "Complete Your LL.B.",
      description: "Study substantive and procedural law, participate in moot courts and develop drafting skills.",
      duration: "3 YEARS"
    },
    {
      title: "Gain Practical Experience",
      description: "Seek appropriate internships, supervised research projects and professional exposure.",
      duration: "DURING DEGREE"
    },
    {
      title: "Verify Professional Requirements",
      description: "Review State Bar Council enrolment procedures and the current applicable AIBE rules.",
      duration: "AFTER DEGREE"
    },
    {
      title: "Apply for Relevant Opportunities",
      description: "Prepare your CV and explore legal practice, law firms, companies, legal research and other suitable roles.",
      duration: "CAREER STAGE"
    }
  ],

  lawstudent: [
    {
      title: "Understand Your Course and Syllabus",
      description: "Identify your semester subjects, exam requirements and important statutes.",
      duration: "START NOW"
    },
    {
      title: "Create a Legal Research Routine",
      description: "Read Bare Acts, locate judgments and practise concise case briefs using reliable sources.",
      duration: "WEEKLY"
    },
    {
      title: "Develop Drafting and Advocacy",
      description: "Practise memorial writing, moot courts, legal opinions and oral presentations under academic guidance.",
      duration: "DURING DEGREE"
    },
    {
      title: "Prepare Your Internship CV",
      description: "List education, writing samples, research projects, relevant skills and academic activities honestly.",
      duration: "BEFORE APPLYING"
    },
    {
      title: "Apply for Supervised Internships",
      description: "Research advocates, chambers, firms, legal aid organizations and relevant legal departments.",
      duration: "DURING BREAKS"
    },
    {
      title: "Plan Your Next Career Step",
      description: "Review enrolment and AIBE rules if you intend to practise, or explore non-litigation careers.",
      duration: "BEFORE GRADUATION"
    }
  ],

  graduateLaw: [
    {
      title: "Verify Your Degree and Documents",
      description: "Ensure your law degree and institution meet the applicable requirements.",
      duration: "STEP 1"
    },
    {
      title: "Choose Your Professional Route",
      description: "Decide whether to pursue litigation, corporate legal work, legal research, public service or further study.",
      duration: "STEP 2"
    },
    {
      title: "Review Enrolment and AIBE Rules",
      description: "If you intend to practise as an advocate, check the latest State Bar Council and applicable AIBE requirements.",
      duration: "STEP 3"
    },
    {
      title: "Prepare a Professional CV",
      description: "Highlight internships, research, drafting, subject knowledge, writing samples and verified experience.",
      duration: "STEP 4"
    },
    {
      title: "Apply and Prepare for Interviews",
      description: "Target suitable vacancies and practise case discussions, legal research tasks and professional interviews.",
      duration: "STEP 5"
    },
    {
      title: "Continue Professional Development",
      description: "Stay updated on legislation, judgments, professional ethics and your chosen specialization.",
      duration: "ONGOING"
    }
  ]
};

const educationPath = document.getElementById("educationPath");
const roadmapContent = document.getElementById("roadmapContent");
const roadmapChecklist = document.getElementById("roadmapChecklist");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const resetProgress = document.getElementById("resetProgress");

function renderRoadmap() {
  const steps = roadmaps[educationPath.value] || roadmaps["12th"];

  roadmapContent.innerHTML = steps.map((step, index) => `
    <article class="roadmap-step">
      <div class="step-number">${String(index + 1).padStart(2, "0")}</div>
      <div>
        <h3>${step.title}</h3>
        <p>${step.description}</p>
        <span class="step-duration">${step.duration}</span>
      </div>
    </article>
  `).join("");

  roadmapChecklist.innerHTML = steps.map((step, index) => `
    <label>
      <input type="checkbox" class="roadmap-check" data-step="${index}">
      <span>${step.title}</span>
    </label>
  `).join("");

  const storageKey = "advocate-roadmap-" + educationPath.value;

  roadmapChecklist.querySelectorAll(".roadmap-check").forEach((checkbox) => {
    checkbox.checked = loadProgress(storageKey, checkbox.dataset.step);

    checkbox.addEventListener("change", () => {
      saveProgress(
        storageKey,
        checkbox.dataset.step,
        checkbox.checked
      );
      updateProgress();
    });
  });

  updateProgress();
}

function loadProgress(key, step) {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || "{}");
    return saved[step] === true;
  } catch {
    return false;
  }
}

function saveProgress(key, step, checked) {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || "{}");
    saved[step] = checked;
    localStorage.setItem(key, JSON.stringify(saved));
  } catch {
    // Progress still works for the current page session.
  }
}

function updateProgress() {
  const checks = [...roadmapChecklist.querySelectorAll(".roadmap-check")];
  const completed = checks.filter((item) => item.checked).length;
  const percentage = checks.length
    ? Math.round((completed / checks.length) * 100)
    : 0;

  progressFill.style.width = percentage + "%";
  progressText.textContent = percentage + "% completed";
  progressFill.setAttribute("aria-valuenow", String(percentage));
}

educationPath.addEventListener("change", renderRoadmap);

resetProgress.addEventListener("click", () => {
  const key = "advocate-roadmap-" + educationPath.value;

  try {
    localStorage.removeItem(key);
  } catch {
    // Continue with an empty checklist even if storage is unavailable.
  }

  roadmapChecklist.querySelectorAll(".roadmap-check").forEach((item) => {
    item.checked = false;
  });

  updateProgress();
});

renderRoadmap();

// ==========================================
// 3. LEGAL REASONING QUIZ
// ==========================================
const quizQuestions = [
  {
    question: "A contract dispute arises. What should you identify first?",
    options: [
      "The parties, facts and legal issues",
      "The judge's personal opinion",
      "The result without examining evidence",
      "An unrelated law"
    ],
    answer: 0,
    explanation: "Correct. Start with relevant facts, the parties, the issues and the applicable law."
  },
  {
    question: "Where should you verify the text of a Central Act?",
    options: [
      "An anonymous social post",
      "An unverified AI answer",
      "India Code and other appropriate official sources",
      "An unrelated news headline"
    ],
    answer: 2,
    explanation: "Correct. Check authoritative legal sources and confirm amendments and effective dates."
  },
  {
    question: "What is a good first step when reading a judgment?",
    options: [
      "Ignore the facts",
      "Identify the facts, issues, reasoning and decision",
      "Copy the conclusion without context",
      "Assume every judgment applies to every case"
    ],
    answer: 1,
    explanation: "Correct. Understanding the facts, legal issues, reasoning and holding helps you evaluate a judgment."
  },
  {
    question: "How should a lawyer handle confidential client information?",
    options: [
      "Share it publicly",
      "Post it on social media",
      "Send it to anyone who asks",
      "Protect it under applicable professional duties and law"
    ],
    answer: 3,
    explanation: "Correct. Confidentiality is a core professional responsibility, subject to applicable law and rules."
  }
];

let quizIndex = 0;
let quizAnswered = false;

const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");

function renderQuiz() {
  const current = quizQuestions[quizIndex];
  quizAnswered = false;
  quizQuestion.textContent = current.question;
  quizFeedback.textContent = "";

  quizOptions.innerHTML = current.options.map((option, index) => `
    <button type="button" class="quiz-option" data-answer="${index}">
      ${String.fromCharCode(65 + index)}. ${option}
    </button>
  `).join("");

  quizOptions.querySelectorAll(".quiz-option").forEach((button) => {
    button.addEventListener("click", () => {
      if (quizAnswered) return;
      quizAnswered = true;

      const selected = Number(button.dataset.answer);
      quizFeedback.textContent = current.explanation;
      quizFeedback.style.color =
        selected === current.answer ? "var(--success)" : "var(--secondary)";

      quizOptions.querySelectorAll("button").forEach((item) => {
        item.disabled = true;
      });

      button.textContent += selected === current.answer ? " ✓" : " — Review";
    });
  });
}

quizQuestion.addEventListener("click", () => {});
renderQuiz();

// Move to the next question after answering.
// Clicking the heading is not required to use the quiz.
quizQuestion.setAttribute("tabindex", "-1");
quizQuestion.setAttribute("aria-live", "polite");

const quizNextButton = document.createElement("button");
quizNextButton.type = "button";
quizNextButton.className = "btn btn-outline btn-small";
quizNextButton.textContent = "Next Question →";
quizNextButton.addEventListener("click", () => {
  quizIndex = (quizIndex + 1) % quizQuestions.length;
  renderQuiz();
});

quizOptions.parentElement.appendChild(quizNextButton);

// ==========================================
// 4. INTERNSHIP APPLICATION DRAFT
// ==========================================
const internshipForm = document.getElementById("internshipForm");
const applicationResult = document.getElementById("applicationResult");
const applicationDraft = document.getElementById("applicationDraft");
const copyDraft = document.getElementById("copyDraft");
const copyFeedback = document.getElementById("copyFeedback");

internshipForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("studentName").value.trim();
  const course = document.getElementById("lawCourse").value;
  const area = document.getElementById("internshipArea").value;
  const organization = document.getElementById("internshipType").value;

  if (!name || !course || !area || !organization) {
    alert("Please complete all fields.");
    return;
  }

  const draft = `Subject: Application for a Legal Internship

Dear Hiring Team,

My name is ${name}, and I am currently a ${course}.

I am interested in exploring an internship opportunity in ${area} with your ${organization.toLowerCase()}.

I would welcome the opportunity to develop my legal research, analytical writing and professional communication skills under appropriate supervision. I am willing to learn, work responsibly and follow professional confidentiality and ethical requirements.

I would be happy to share my CV and any relevant academic writing samples for your consideration.

Thank you for your time and consideration.

Sincerely,
${name}`;

  applicationDraft.value = draft;
  applicationResult.hidden = false;
  copyFeedback.textContent = "Draft generated. Review and personalize it before sending.";
  applicationResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

copyDraft.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(applicationDraft.value);
    copyFeedback.textContent = "Draft copied successfully.";
  } catch {
    applicationDraft.focus();
    applicationDraft.select();
    copyFeedback.textContent =
      "Select the draft and copy it manually using Ctrl+C.";
  }
});

// ==========================================
// 5. LEGAL CAREER DATA AND JOB FILTERS
// ==========================================
const careers = [
  {
    title: "Junior Advocate",
    category: "practice",
    label: "LEGAL PRACTICE",
    description: "Assist with case preparation, legal research, drafting and court-related work under appropriate supervision.",
    skills: "Research • Drafting • Advocacy",
    link: "https://www.barcouncilofindia.org/"
  },
  {
    title: "Litigation Associate",
    category: "practice",
    label: "LEGAL PRACTICE",
    description: "Work on pleadings, case files, research and litigation strategy within a law firm or chamber.",
    skills: "Case Analysis • Writing",
    link: "https://www.linkedin.com/jobs/"
  },
  {
    title: "Corporate Legal Associate",
    category: "corporate",
    label: "CORPORATE",
    description: "Support contract review, legal documentation, company matters and legal research.",
    skills: "Contracts • Commercial Law",
    link: "https://www.linkedin.com/jobs/"
  },
  {
    title: "Legal Compliance Analyst",
    category: "corporate",
    label: "CORPORATE",
    description: "Help organizations track applicable regulatory obligations, documentation and compliance processes.",
    skills: "Research • Documentation",
    link: "https://www.linkedin.com/jobs/"
  },
  {
    title: "Government Legal Officer",
    category: "public",
    label: "PUBLIC SERVICE",
    description: "Explore eligible legal officer and public-sector roles through official recruitment notifications.",
    skills: "Legal Knowledge • Exams",
    link: "https://www.ncs.gov.in/"
  },
  {
    title: "Judicial Services Candidate",
    category: "public",
    label: "JUDICIAL SERVICES",
    description: "Prepare for the relevant state judicial service examination, subject to current eligibility rules.",
    skills: "Law • Writing • Reasoning",
    link: "https://www.sci.gov.in/"
  },
  {
    title: "Legal Researcher",
    category: "research",
    label: "RESEARCH",
    description: "Assist with case-law research, legal reports, policy analysis and research projects.",
    skills: "Research • Citation • Writing",
    link: "https://www.indiacode.nic.in/"
  },
  {
    title: "Legal Academic",
    category: "research",
    label: "EDUCATION",
    description: "Explore teaching and academic research pathways, including the additional qualifications required for specific positions.",
    skills: "Research • Teaching",
    link: "https://www.barcouncilofindia.org/"
  },
  {
    title: "Cyber Law Professional",
    category: "corporate",
    label: "TECHNOLOGY LAW",
    description: "Explore privacy, technology contracts, cyber regulation and digital policy-related work.",
    skills: "Technology • Legal Research",
    link: "https://www.indiacode.nic.in/"
  }
];

const jobSearch = document.getElementById("jobSearch");
const jobType = document.getElementById("jobType");
const jobGrid = document.getElementById("jobGrid");

function renderJobs() {
  const search = jobSearch.value.trim().toLowerCase();
  const category = jobType.value;

  const filtered = careers.filter((career) => {
    const matchesCategory =
      category === "all" || career.category === category;

    const text = [
      career.title,
      career.label,
      career.description,
      career.skills
    ].join(" ").toLowerCase();

    return matchesCategory && text.includes(search);
  });

  if (!filtered.length) {
    jobGrid.innerHTML = `
      <article class="info-card">
        <h3>No matching careers found</h3>
        <p>Try another search term or select All Careers.</p>
      </article>`;
    return;
  }

  jobGrid.innerHTML = filtered.map((career) => `
    <article class="info-card job-card">
      <span class="job-category">${career.label}</span>
      <h3>${career.title}</h3>
      <p class="job-description">${career.description}</p>
      <div class="job-details">
        <p><strong>Focus:</strong> ${career.skills}</p>
        <a class="text-link"
           href="${career.link}"
           target="_blank"
           rel="noopener noreferrer">Explore relevant information ↗</a>
      </div>
    </article>
  `).join("");
}

jobSearch.addEventListener("input", renderJobs);
jobType.addEventListener("change", renderJobs);
renderJobs();

// ==========================================
// 6. INTERVIEW PRACTICE
// ==========================================
const interviewQuestions = [
  {
    question: "Tell us about yourself and your interest in law.",
    tip: "Introduce your education, explain why law interests you, and mention one skill or academic activity. Keep your answer specific and honest."
  },
  {
    question: "How would you research an unfamiliar legal issue?",
    tip: "Explain how you would identify the issue, locate applicable legislation, check relevant judgments, verify the source and summarize your findings."
  },
  {
    question: "How would you handle confidential client information?",
    tip: "Discuss confidentiality, secure document handling, professional obligations and seeking guidance where a legal or ethical issue arises."
  },
  {
    question: "What are your short-term and long-term career goals?",
    tip: "Give realistic goals: improve research and drafting first, gain supervised experience, and develop expertise in a chosen area."
  }
];

const interviewQuestion = document.getElementById("interviewQuestion");
const interviewTip = document.getElementById("interviewTip");
const interviewTabs = document.getElementById("interviewTabs");
const nextInterview = document.getElementById("nextInterview");

let interviewIndex = 0;

function renderInterview() {
  const item = interviewQuestions[interviewIndex];

  interviewQuestion.textContent = item.question;
  interviewTip.textContent = item.tip;

  interviewTabs.querySelectorAll(".tab-button").forEach((button) => {
    const active = Number(button.dataset.index) === interviewIndex;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

interviewTabs.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", () => {
    interviewIndex = Number(button.dataset.index);
    renderInterview();
  });
});

nextInterview.addEventListener("click", () => {
  interviewIndex = (interviewIndex + 1) % interviewQuestions.length;
  renderInterview();
});

renderInterview();

// ==========================================
// 7. FOOTER YEAR
// ==========================================
document.getElementById("currentYear").textContent =
  new Date().getFullYear();

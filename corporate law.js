
"use strict";

// ========================================
// 1. MOBILE NAVIGATION
// ========================================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// ========================================
// 2. CORPORATE LAW ROADMAP
// ========================================
const roadmaps = {
  "12th": [
    {
      title: "Complete Class 12",
      description: "Complete your 10+2 education. Explore law as a career regardless of your stream, subject to college eligibility.",
      duration: "STEP 1"
    },
    {
      title: "Prepare for Law Entrance Exams",
      description: "Explore CLAT, university entrance examinations and other available admission routes.",
      duration: "STEP 2"
    },
    {
      title: "Choose an Integrated Law Degree",
      description: "Consider BA LL.B., BBA LL.B. or BCom LL.B. from an appropriately recognized institution.",
      duration: "5 YEARS"
    },
    {
      title: "Learn Corporate Law Subjects",
      description: "Study Company Law, Contract Law, Business Law, Competition Law and Corporate Governance.",
      duration: "DURING DEGREE"
    },
    {
      title: "Build Practical Skills",
      description: "Practise contract drafting, legal research, business communication and due diligence.",
      duration: "DURING DEGREE"
    },
    {
      title: "Apply for Corporate Internships",
      description: "Explore law firms, company legal departments, financial institutions and startups.",
      duration: "DURING DEGREE"
    },
    {
      title: "Prepare for Professional Roles",
      description: "Complete your law degree and explore suitable corporate legal opportunities. Verify professional requirements if practising as an advocate.",
      duration: "AFTER DEGREE"
    }
  ],

  "graduate": [
    {
      title: "Complete Your Graduation",
      description: "Complete BA, BCom, BBA, BCA or another qualifying bachelor's degree.",
      duration: "STEP 1"
    },
    {
      title: "Apply for a 3-Year LL.B.",
      description: "Check eligibility for a recognized and appropriately approved three-year LL.B. programme.",
      duration: "STEP 2"
    },
    {
      title: "Study Corporate Law",
      description: "Learn Company Law, Contract Law, Mergers and Acquisitions, Banking Law and Business Regulations.",
      duration: "3 YEARS"
    },
    {
      title: "Develop Corporate Skills",
      description: "Learn contract drafting, legal research, compliance and transaction documentation.",
      duration: "DURING DEGREE"
    },
    {
      title: "Complete Relevant Internships",
      description: "Gain supervised experience with corporate law firms, companies or legal departments.",
      duration: "DURING DEGREE"
    },
    {
      title: "Start Your Corporate Career",
      description: "Prepare your CV, writing samples and interview skills and apply to suitable employers.",
      duration: "AFTER DEGREE"
    }
  ],

  "lawstudent": [
    {
      title: "Understand Your Law Subjects",
      description: "Focus on Company Law, Contract Law, Business Law, Competition Law and Corporate Governance.",
      duration: "START NOW"
    },
    {
      title: "Learn Contract Drafting",
      description: "Practise reviewing NDAs, service agreements and sample employment contracts.",
      duration: "WEEKLY"
    },
    {
      title: "Build Research Skills",
      description: "Read Bare Acts, analyse judgments and prepare short legal research notes.",
      duration: "ONGOING"
    },
    {
      title: "Learn Business Fundamentals",
      description: "Understand financial statements, business structures, company formation and basic accounting.",
      duration: "ONGOING"
    },
    {
      title: "Apply for Internships",
      description: "Target corporate law firms, startups, legal departments and financial organizations.",
      duration: "DURING BREAKS"
    },
    {
      title: "Prepare for Job Interviews",
      description: "Develop a CV, drafting samples, transaction knowledge and communication skills.",
      duration: "BEFORE GRADUATION"
    }
  ],

  "graduateLaw": [
    {
      title: "Strengthen Corporate Law Knowledge",
      description: "Review the Companies Act, Contract Act and applicable regulatory frameworks.",
      duration: "STEP 1"
    },
    {
      title: "Choose a Specialization",
      description: "Consider M&A, Company Law, Compliance, Banking and Finance, Technology Law or Corporate Litigation.",
      duration: "STEP 2"
    },
    {
      title: "Build a Professional Portfolio",
      description: "Prepare academic case studies, sample agreements and research papers without sharing confidential documents.",
      duration: "STEP 3"
    },
    {
      title: "Complete Relevant Internships",
      description: "Gain practical experience in a law firm or corporate legal department.",
      duration: "STEP 4"
    },
    {
      title: "Prepare Your CV and Interviews",
      description: "Highlight drafting, research, internships and knowledge of business regulations.",
      duration: "STEP 5"
    },
    {
      title: "Apply for Corporate Legal Jobs",
      description: "Explore legal associate, contract analyst, compliance and corporate advisory roles.",
      duration: "CAREER STAGE"
    }
  ]
};

const educationPath = document.getElementById("educationPath");
const roadmapContent = document.getElementById("roadmapContent");
const roadmapChecklist = document.getElementById("roadmapChecklist");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

function renderRoadmap() {
  const steps = roadmaps[educationPath.value] || roadmaps["12th"];

  roadmapContent.innerHTML = steps.map((step, index) => `
    <article class="roadmap-step">
      <div class="step-number">
        ${String(index + 1).padStart(2, "0")}
      </div>
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

  const key = "corporate-roadmap-" + educationPath.value;

  roadmapChecklist.querySelectorAll(".roadmap-check").forEach(check => {
    check.checked = getProgress(key, check.dataset.step);

    check.addEventListener("change", () => {
      setProgress(key, check.dataset.step, check.checked);
      updateProgress();
    });
  });

  updateProgress();
}

function getProgress(key, step) {
  try {
    const data = JSON.parse(localStorage.getItem(key) || "{}");
    return data[step] === true;
  } catch {
    return false;
  }
}

function setProgress(key, step, checked) {
  try {
    const data = JSON.parse(localStorage.getItem(key) || "{}");
    data[step] = checked;
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Checklist continues to work for the current session.
  }
}

function updateProgress() {
  const checks = [...roadmapChecklist.querySelectorAll(".roadmap-check")];
  const completed = checks.filter(item => item.checked).length;

  const percentage = checks.length
    ? Math.round((completed / checks.length) * 100)
    : 0;

  progressFill.style.width = percentage + "%";
  progressText.textContent = percentage + "% completed";
  progressFill.setAttribute("aria-valuenow", String(percentage));
}

educationPath.addEventListener("change", renderRoadmap);

document.getElementById("resetProgress").addEventListener("click", () => {
  const key = "corporate-roadmap-" + educationPath.value;

  try {
    localStorage.removeItem(key);
  } catch {}

  roadmapChecklist.querySelectorAll(".roadmap-check").forEach(item => {
    item.checked = false;
  });

  updateProgress();
});

renderRoadmap();

// ========================================
// 3. CORPORATE LAW QUIZ
// ========================================
const questions = [
  {
    question: "What is the main purpose of an NDA?",
    options: [
      "To protect confidential information",
      "To register a company",
      "To hire employees",
      "To pay company taxes"
    ],
    answer: 0,
    explanation: "Correct! An NDA establishes obligations regarding the handling and disclosure of confidential information."
  },
  {
    question: "Which Indian law primarily governs companies?",
    options: [
      "Indian Contract Act",
      "Companies Act, 2013",
      "Transfer of Property Act",
      "Motor Vehicles Act"
    ],
    answer: 1,
    explanation: "Correct! The Companies Act, 2013 is a key legislation governing companies in India."
  },
  {
    question: "What is due diligence?",
    options: [
      "A company advertisement",
      "A recruitment interview",
      "A systematic investigation and review",
      "A marketing campaign"
    ],
    answer: 2,
    explanation: "Correct! Due diligence involves examining relevant information, documents and risks before a business decision or transaction."
  },
  {
    question: "What does M&A stand for?",
    options: [
      "Management and Accounts",
      "Marketing and Advertising",
      "Money and Assets",
      "Mergers and Acquisitions"
    ],
    answer: 3,
    explanation: "Correct! M&A refers to mergers and acquisitions involving business combinations or takeovers."
  },
  {
    question: "What is a legal compliance process?",
    options: [
      "Ignoring regulations",
      "Identifying and meeting applicable legal obligations",
      "Only preparing advertisements",
      "Avoiding documentation"
    ],
    answer: 1,
    explanation: "Correct! Compliance involves identifying, monitoring and meeting applicable legal and regulatory obligations."
  }
];

let quizIndex = 0;
let quizAnswered = false;

const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");

function renderQuiz() {
  const current = questions[quizIndex];
  quizAnswered = false;

  quizQuestion.textContent = current.question;
  quizFeedback.textContent = "";

  quizOptions.innerHTML = current.options.map((option, index) => `
    <button type="button" class="quiz-option" data-answer="${index}">
      ${String.fromCharCode(65 + index)}. ${option}
    </button>
  `).join("");

  quizOptions.querySelectorAll(".quiz-option").forEach(button => {
    button.addEventListener("click", () => {
      if (quizAnswered) return;

      quizAnswered = true;

      const selected = Number(button.dataset.answer);

      quizFeedback.textContent = current.explanation;
      quizFeedback.style.color =
        selected === current.answer
          ? "var(--success)"
          : "var(--secondary)";

      quizOptions.querySelectorAll("button").forEach(item => {
        item.disabled = true;
      });

      button.textContent +=
        selected === current.answer ? " ✓" : " — Review";
    });
  });
}

document.getElementById("nextQuiz").addEventListener("click", () => {
  if (!quizAnswered) {
    quizFeedback.textContent = "Answer the current question first.";
    return;
  }

  quizIndex = (quizIndex + 1) % questions.length;
  renderQuiz();
});

renderQuiz();

// ========================================
// 4. INTERNSHIP APPLICATION GENERATOR
// ========================================
const internshipForm = document.getElementById("internshipForm");
const applicationResult = document.getElementById("applicationResult");
const applicationDraft = document.getElementById("applicationDraft");
const copyDraft = document.getElementById("copyDraft");
const copyFeedback = document.getElementById("copyFeedback");

internshipForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("studentName").value.trim();
  const course = document.getElementById("lawCourse").value;
  const area = document.getElementById("internshipArea").value;
  const organization = document.getElementById("organization").value;

  if (!name || !course || !area || !organization) {
    alert("Please fill in all fields.");
    return;
  }

  const draft = `Subject: Application for Corporate Law Internship

Dear Hiring Team,

My name is ${name}, and I am currently a ${course}.

I am interested in gaining practical exposure in ${area} and would like to explore an internship opportunity with your ${organization}.

I am keen to develop my skills in corporate legal research, contract analysis, business documentation and professional communication.

I am a motivated learner and would appreciate the opportunity to contribute to appropriate research and documentation tasks under professional supervision.

I would be happy to share my CV and relevant academic writing samples for your consideration.

Thank you for your time and consideration.

Sincerely,
${name}`;

  applicationDraft.value = draft;
  applicationResult.hidden = false;

  copyFeedback.textContent =
    "Your draft is ready. Review and personalize it before sending.";

  applicationResult.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
});

copyDraft.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(applicationDraft.value);
    copyFeedback.textContent = "Application copied successfully.";
  } catch {
    applicationDraft.focus();
    applicationDraft.select();
    copyFeedback.textContent =
      "Use Ctrl+C to copy your selected application.";
  }
});

// ========================================
// 5. CORPORATE JOB DATABASE
// ========================================
const careers = [
  {
    title: "Corporate Lawyer",
    category: "legal",
    label: "CORPORATE LEGAL",
    description: "Advise businesses on company law, contracts, transactions and legal risks.",
    skills: "Company Law • Contracts • Research",
    link: "https://www.linkedin.com/jobs/"
  },
  {
    title: "Legal Associate",
    category: "legal",
    label: "LEGAL PRACTICE",
    description: "Assist legal teams with research, agreements, documentation and corporate matters.",
    skills: "Drafting • Analysis • Communication",
    link: "https://www.linkedin.com/jobs/"
  },
  {
    title: "M&A Associate",
    category: "finance",
    label: "TRANSACTIONS",
    description: "Support merger and acquisition transactions, due diligence and legal documentation.",
    skills: "M&A • Due Diligence • Contracts",
    link: "https://www.linkedin.com/jobs/"
  },
  {
    title: "Contract Analyst",
    category: "legal",
    label: "CONTRACT MANAGEMENT",
    description: "Review agreements, identify contractual risks and maintain contract records.",
    skills: "Contract Review • Documentation",
    link: "https://www.linkedin.com/jobs/"
  },
  {
    title: "Compliance Officer",
    category: "compliance",
    label: "COMPLIANCE",
    description: "Monitor applicable regulations and support internal compliance processes.",
    skills: "Regulations • Reporting • Research",
    link: "https://www.linkedin.com/jobs/"
  },
  {
    title: "Company Secretary",
    category: "compliance",
    label: "CORPORATE GOVERNANCE",
    description: "A specialized professional role involving company secretarial practice and statutory compliance. Relevant ICSI qualification and membership requirements apply.",
    skills: "Governance • Filings • Company Law",
    link: "https://www.icsi.edu/"
  },
  {
    title: "Banking Legal Associate",
    category: "finance",
    label: "BANKING & FINANCE",
    description: "Support banking agreements, financial documentation and legal research.",
    skills: "Finance • Agreements • Banking Law",
    link: "https://www.linkedin.com/jobs/"
  },
  {
    title: "Legal Research Analyst",
    category: "research",
    label: "LEGAL RESEARCH",
    description: "Prepare legal reports, analyse legislation and research corporate regulations.",
    skills: "Research • Writing • Case Analysis",
    link: "https://www.linkedin.com/jobs/"
  },
  {
    title: "Corporate Legal Consultant",
    category: "research",
    label: "ADVISORY",
    description: "Support businesses with legal research, contracts and corporate advisory projects.",
    skills: "Business Law • Risk • Communication",
    link: "https://www.linkedin.com/jobs/"
  },
  {
    title: "Legal Operations Analyst",
    category: "compliance",
    label: "LEGAL OPERATIONS",
    description: "Support legal teams with document management, contract workflows and reporting.",
    skills: "Technology • Excel • Documentation",
    link: "https://www.linkedin.com/jobs/"
  }
];

const jobSearch = document.getElementById("jobSearch");
const jobType = document.getElementById("jobType");
const jobGrid = document.getElementById("jobGrid");

function renderJobs() {
  const search = jobSearch.value.trim().toLowerCase();
  const category = jobType.value;

  const filtered = careers.filter(career => {
    const matchesCategory =
      category === "all" || career.category === category;

    const searchable = [
      career.title,
      career.description,
      career.skills,
      career.label
    ].join(" ").toLowerCase();

    return matchesCategory && searchable.includes(search);
  });

  if (filtered.length === 0) {
    jobGrid.innerHTML = `
      <article class="info-card">
        <h3>No Jobs Found</h3>
        <p>Try a different search or select All Jobs.</p>
      </article>
    `;
    return;
  }

  jobGrid.innerHTML = filtered.map(career => `
    <article class="info-card job-card">
      <span class="job-category">${career.label}</span>
      <h3>${career.title}</h3>
      <p class="job-description">${career.description}</p>
      <div class="job-details">
        <p><strong>Skills:</strong> ${career.skills}</p>
        <a class="text-link"
           href="${career.link}"
           target="_blank"
           rel="noopener noreferrer">
           Explore Opportunities ↗
        </a>
      </div>
    </article>
  `).join("");
}

jobSearch.addEventListener("input", renderJobs);
jobType.addEventListener("change", renderJobs);

renderJobs();

// ========================================
// 6. INTERVIEW PREPARATION
// ========================================
const interviewQuestions = [
  {
    question: "Tell me about yourself and why you chose Corporate Law.",
    tip: "Introduce your education, explain your interest in business and law, and mention relevant research or academic projects."
  },
  {
    question: "What is the difference between an NDA and a Service Agreement?",
    tip: "An NDA primarily deals with confidentiality obligations. A Service Agreement sets out the terms of services, responsibilities and other agreed conditions."
  },
  {
    question: "What do you understand by the Companies Act, 2013?",
    tip: "Explain that it is a major Indian law governing company formation, administration, corporate governance and related matters."
  },
  {
    question: "What is your understanding of due diligence?",
    tip: "Describe it as a systematic review of relevant legal, financial, operational and business records to identify risks before a transaction or decision."
  },
  {
    question: "Why do you want to work with our company or law firm?",
    tip: "Research the organization, its practice areas and work. Explain how the opportunity aligns with your genuine interests."
  },
  {
    question: "What are your long-term career goals?",
    tip: "Explain how you plan to develop expertise in a chosen corporate law area and build practical professional experience."
  }
];

const interviewTabs = document.getElementById("interviewTabs");
const interviewQuestion = document.getElementById("interviewQuestion");
const interviewTip = document.getElementById("interviewTip");
const nextInterview = document.getElementById("nextInterview");

let interviewIndex = 0;

function renderInterview() {
  const item = interviewQuestions[interviewIndex];

  interviewQuestion.textContent = item.question;
  interviewTip.textContent = item.tip;

  interviewTabs.querySelectorAll(".tab-button").forEach(button => {
    const active = Number(button.dataset.index) === interviewIndex;

    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

interviewTabs.querySelectorAll(".tab-button").forEach(button => {
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

// ========================================
// 7. FOOTER YEAR
// ========================================
document.getElementById("currentYear").textContent =
  new Date().getFullYear();

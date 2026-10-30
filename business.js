
const businessData = {
    online: {
        title: "Online Business",
        description: "Internet ke through products ya digital services sell karo.",
        steps: [
            "Ek product category aur target customer choose karo.",
            "Competitors, demand, delivery aur platform fees research karo.",
            "Small catalogue ya sample listing banao.",
            "Website ya suitable selling platform choose karo.",
            "Payments, delivery, returns aur customer support plan karo."
        ],
        income: [
            "Physical product sales",
            "Digital products",
            "Subscription services"
        ]
    },

    service: {
        title: "Service Business",
        description: "Apni knowledge ya skill ke through customers ki problem solve karo.",
        steps: [
            "Ek useful skill aur specific service choose karo.",
            "Sample work aur portfolio banao.",
            "Potential customers se baat karke demand check karo.",
            "Pricing, project scope aur delivery time define karo.",
            "Initial clients se feedback aur referrals lo."
        ],
        income: [
            "Project-based fees",
            "Monthly service packages",
            "Consulting or maintenance contracts"
        ]
    },

    manufacturing: {
        title: "Manufacturing Business",
        description: "Raw materials se product bana kar customers ya retailers ko sell karo.",
        steps: [
            "Product demand aur production feasibility check karo.",
            "Materials, machinery, suppliers aur production cost calculate karo.",
            "Small prototype ya sample batch banao.",
            "Quality, packaging, safety aur relevant licences check karo.",
            "Small-scale production aur sales se start karo."
        ],
        income: [
            "Direct product sales",
            "Wholesale supply",
            "Private-label manufacturing"
        ]
    },

    food: {
        title: "Food Business",
        description: "Food products, catering, packaged food ya food outlet ka business explore karo.",
        steps: [
            "Food category aur target customers choose karo.",
            "Recipe, ingredients, packaging aur per-item cost calculate karo.",
            "Food safety aur FSSAI requirements verify karo.",
            "Small batch aur customer feedback se product test karo.",
            "Orders, hygiene, storage aur delivery system organize karo."
        ],
        income: [
            "Food orders",
            "Catering services",
            "Packaged food sales"
        ]
    },

    technology: {
        title: "Technology / Startup",
        description: "Software, apps, websites ya digital tools ke through ek real problem solve karo.",
        steps: [
            "Customer problem aur target user define karo.",
            "Existing solutions aur competing products research karo.",
            "Basic MVP ya working demo banao.",
            "Users ke saath usability aur willingness to pay test karo.",
            "Feedback, business model aur measurable results ke basis par improve karo."
        ],
        income: [
            "Software subscriptions",
            "Project or licensing fees",
            "Paid features or business plans"
        ]
    },

    franchise: {
        title: "Franchise Business",
        description: "Ek established brand ke rules aur agreement ke under business operate karna.",
        steps: [
            "Industry aur potential brands shortlist karo.",
            "Initial fee, royalty, rent aur working capital calculate karo.",
            "Brand ki official website aur business terms verify karo.",
            "Agreement, territory, training aur support details samjho.",
            "Independent legal and financial review ke baad hi commitment karo."
        ],
        income: [
            "Product or service sales",
            "Customer transactions",
            "Agreement ke mutabik operating revenue"
        ]
    },

    freelance: {
        title: "Freelancing",
        description: "Apni skills ko independent clients ke liye use karke projects complete karo.",
        steps: [
            "Ek marketable skill choose karo.",
            "3–5 sample projects ka portfolio banao.",
            "Clear service packages aur rates define karo.",
            "Trusted platforms, referrals aur direct outreach se clients find karo.",
            "Written scope, deadlines, payment terms aur feedback manage karo."
        ],
        income: [
            "Per-project payments",
            "Hourly work",
            "Retainer contracts"
        ]
    },

    agriculture: {
        title: "Agriculture Business",
        description: "Farming, agricultural products, food processing ya farm-related services explore karo.",
        steps: [
            "Local demand, season aur available resources assess karo.",
            "Crop ya product ke liye costs aur possible risks calculate karo.",
            "Suppliers, storage, transport aur buyers identify karo.",
            "Small pilot se production aur selling test karo.",
            "Required local permissions aur relevant schemes verify karo."
        ],
        income: [
            "Farm produce sales",
            "Processed agricultural products",
            "Agriculture-related services"
        ]
    }
};

const businessSelect = document.getElementById("businessSelect");
const showBusiness = document.getElementById("showBusiness");
const businessTitle = document.getElementById("businessTitle");
const businessDescription = document.getElementById("businessDescription");
const businessSteps = document.getElementById("businessSteps");
const businessIncome = document.getElementById("businessIncome");
const businessCards = document.querySelectorAll(".business-card");

function displayList(element, items) {
    element.replaceChildren();

    items.forEach(function(text) {
        const item = document.createElement("li");
        item.textContent = text;
        element.appendChild(item);
    });
}

function showBusinessDetails(key) {
    const data = businessData[key];

    if (!data) return;

    businessSelect.value = key;
    businessTitle.textContent = data.title;
    businessDescription.textContent = data.description;

    displayList(businessSteps, data.steps);
    displayList(businessIncome, data.income);

    businessCards.forEach(function(card) {
        card.classList.toggle(
            "active",
            card.dataset.business === key
        );
    });
}

showBusiness.addEventListener("click", function() {
    showBusinessDetails(businessSelect.value);
});

businessCards.forEach(function(card) {
    card.addEventListener("click", function() {
        showBusinessDetails(card.dataset.business);

        document.querySelector(".details-panel").scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    });
});

// Display the default category.
showBusinessDetails("online");


// BUSINESS IDEA EXPLORER

const ideas = {
    student: {
        title: "Student Study Planner",
        description: "Students ke liye assignments, exams aur study schedules manage karne ka simple tool.",
        test: "10 students se baat karo aur ek clickable demo test karo."
    },

    technology: {
        title: "Local Business Website Service",
        description: "Local shops ke liye simple websites, digital menus aur contact pages banana.",
        test: "3 local shops se poochho ki unhe kis digital service ki zarurat hai."
    },

    health: {
        title: "Healthcare Appointment Helper",
        description: "Clinics ko appointment requests aur patient reminders organize karne mein help karne wala tool.",
        test: "Clinic staff se workflow samjho aur patient data ko secure rakhne ki requirements assess karo."
    },

    environment: {
        title: "Reusable Product Store",
        description: "Reusable bags, bottles ya daily-use eco-friendly products ka small catalogue test karna.",
        test: "Potential buyers se price aur product preference poochho."
    },

    local: {
        title: "Local Shop Digital Catalogue",
        description: "Local shops ke products ko online catalogue mein dikhane ka solution.",
        test: "Ek shop ke 10 products ka demo catalogue banao aur customer interest check karo."
    },

    education: {
        title: "Skill Learning Club",
        description: "Beginners ke liye practical computer skills, coding basics ya exam preparation sessions.",
        test: "Ek trial session chalao aur learners se useful feedback lo."
    }
};

const ideaCategory = document.getElementById("ideaCategory");
const generateIdea = document.getElementById("generateIdea");
const ideaResult = document.getElementById("ideaResult");

generateIdea.addEventListener("click", function() {
    const idea = ideas[ideaCategory.value];

    if (!idea) return;

    const heading = document.createElement("h4");
    heading.textContent = idea.title;

    const description = document.createElement("p");
    description.textContent = idea.description;

    const testHeading = document.createElement("strong");
    testHeading.textContent = "First validation step:";

    const test = document.createElement("p");
    test.textContent = idea.test;

    ideaResult.replaceChildren(
        heading,
        description,
        testHeading,
        test
    );
});


// PERSONAL BUSINESS PLANNER

const businessForm = document.getElementById("businessForm");
const businessResult = document.getElementById("businessResult");

businessForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const founderName =
        document.getElementById("founderName").value.trim();

    const businessIdea =
        document.getElementById("businessIdea").value.trim();

    const category =
        document.getElementById("plannerCategory").value;

    const budget =
        document.getElementById("budget").value;

    const stage =
        document.getElementById("businessStage").value;

    const goal =
        document.getElementById("businessGoal").value;

    if (
        !founderName ||
        !businessIdea ||
        !businessData[category]
    ) {
        businessResult.classList.add("show");
        businessResult.textContent =
            "Please fill in all required fields correctly.";
        return;
    }

    const tasks = [];

    // Starting steps depend on the current stage.
    if (stage === "idea") {
        tasks.push(
            "Write down the customer problem and your proposed solution.",
            "Interview at least 10 potential customers before investing heavily."
        );
    } else if (stage === "research") {
        tasks.push(
            "Compare at least 3 competitors, including their prices and customer reviews.",
            "Estimate demand and calculate your expected costs."
        );
    } else if (stage === "prototype") {
        tasks.push(
            "Test your sample or MVP with potential customers.",
            "Record feedback and fix the most important problems."
        );
    } else {
        tasks.push(
            "Review real sales, costs, customer feedback and repeat purchases.",
            "Identify the biggest obstacle to profitable growth."
        );
    }

    if (goal === "validate") {
        tasks.push(
            "Define what evidence would show that customers genuinely want your product.",
            "Test willingness to pay, not only whether people say they like the idea."
        );
    } else if (goal === "register") {
        tasks.push(
            "Compare suitable business structures and understand their legal responsibilities.",
            "Check applicable registrations, tax obligations and licences on official portals."
        );
    } else if (goal === "launch") {
        tasks.push(
            "Prepare pricing, packaging or service delivery, customer support and launch messaging.",
            "Start with a manageable pilot and track customer responses."
        );
    } else {
        tasks.push(
            "Choose one clear growth metric, such as repeat purchases or profitable sales.",
            "Test marketing channels and increase spending only when results justify it."
        );
    }

    tasks.push(
        "Prepare a simple budget and keep some funds for unexpected expenses."
    );

    if (budget === "low") {
        tasks.push(
            "Prefer low-cost customer interviews, free tools, samples and pre-orders where appropriate."
        );
    } else if (budget === "medium") {
        tasks.push(
            "Split your budget between validation, essential tools, delivery and a reserve."
        );
    } else if (budget === "high") {
        tasks.push(
            "Create a detailed cost forecast and validate demand before committing large expenses."
        );
    } else {
        tasks.push(
            "Use a documented business plan, risk assessment and professional financial or legal advice where appropriate."
        );
    }

    const heading = document.createElement("h3");
    heading.textContent = founderName + "'s Business Action Plan";

    const summary = document.createElement("p");
    summary.textContent =
        "Idea: " + businessIdea +
        " | Category: " + businessData[category].title;

    const list = document.createElement("ol");

    tasks.forEach(function(task) {
        const item = document.createElement("li");
        item.textContent = task;
        list.appendChild(item);
    });

    const note = document.createElement("p");
    note.className = "small-note";
    note.textContent =
        "This is a planning checklist, not legal, tax or investment advice. " +
        "No company is registered and no funding or sales are guaranteed.";

    businessResult.replaceChildren(heading, summary, list, note);
    businessResult.classList.add("show");

    businessResult.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

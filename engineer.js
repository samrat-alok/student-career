
const departments = {
    cse: {
        title: "Computer Science & IT",
        description: "Computer software, websites, apps, networks aur digital systems banane ka field.",
        skills: ["C/C++ ya Python", "HTML, CSS, JavaScript", "DSA aur problem solving", "Database aur Git"],
        careers: ["Software Developer", "Web Developer", "Cybersecurity Analyst", "Cloud / Network Engineer"]
    },

    aiml: {
        title: "Artificial Intelligence & Machine Learning",
        description: "AI systems, prediction models aur intelligent applications banane ka field.",
        skills: ["Python", "Mathematics aur Statistics", "Machine Learning", "Data Analysis"],
        careers: ["AI Engineer", "ML Engineer", "Data Analyst", "Data Scientist"]
    },

    ece: {
        title: "Electronics & Communication",
        description: "Electronic circuits, communication systems aur embedded devices ka field.",
        skills: ["Circuit Design", "Digital Electronics", "Embedded C", "Microcontrollers"],
        careers: ["Electronics Engineer", "Embedded Engineer", "VLSI Engineer", "Telecom Engineer"]
    },

    electrical: {
        title: "Electrical Engineering",
        description: "Electric power, electrical machines, energy systems aur control technology ka field.",
        skills: ["Electrical Circuits", "Power Systems", "Electrical Machines", "Safety Standards"],
        careers: ["Electrical Engineer", "Power Systems Engineer", "Maintenance Engineer", "Renewable Energy Engineer"]
    },

    mechanical: {
        title: "Mechanical Engineering",
        description: "Machines, mechanical design, manufacturing aur industrial systems ka field.",
        skills: ["Engineering Drawing", "CAD Software", "Thermodynamics", "Manufacturing"],
        careers: ["Mechanical Design Engineer", "Production Engineer", "Quality Engineer", "Maintenance Engineer"]
    },

    civil: {
        title: "Civil Engineering",
        description: "Buildings, bridges, roads, water systems aur infrastructure ka field.",
        skills: ["AutoCAD", "Structural Basics", "Surveying", "Construction Planning"],
        careers: ["Site Engineer", "Structural Engineer", "Quantity Surveyor", "Government Engineering Roles"]
    },

    chemical: {
        title: "Chemical Engineering",
        description: "Industrial chemical processes, production plants aur materials ka field.",
        skills: ["Process Calculations", "Thermodynamics", "Process Safety", "Process Simulation"],
        careers: ["Process Engineer", "Production Engineer", "Quality Engineer", "Plant Engineer"]
    },

    biotech: {
        title: "Biotechnology Engineering",
        description: "Biology aur technology ka use karke biological products aur processes develop karna.",
        skills: ["Biology Basics", "Laboratory Techniques", "Bioprocessing", "Data Analysis"],
        careers: ["Bioprocess Engineer", "Research Assistant", "Quality Control Analyst", "Biotechnology Associate"]
    },

    aerospace: {
        title: "Aerospace Engineering",
        description: "Aircraft, spacecraft, aerodynamics aur flight systems ka field.",
        skills: ["Mathematics", "Aerodynamics", "CAD / Simulation", "Materials Science"],
        careers: ["Aerospace Engineer", "Aircraft Design Engineer", "Simulation Engineer", "Research Engineer"]
    },

    automobile: {
        title: "Automobile Engineering",
        description: "Vehicles, vehicle design, manufacturing aur electric vehicle technology ka field.",
        skills: ["Vehicle Systems", "CAD", "Automotive Electronics", "EV Basics"],
        careers: ["Automotive Design Engineer", "Vehicle Testing Engineer", "EV Engineer", "Production Engineer"]
    },

    robotics: {
        title: "Robotics & Mechatronics",
        description: "Robots, sensors, mechanical systems aur automated machines ka combination.",
        skills: ["Python / C++", "Electronics", "Sensors", "Control Systems"],
        careers: ["Robotics Engineer", "Automation Engineer", "Controls Engineer", "Mechatronics Engineer"]
    },

    environmental: {
        title: "Environmental Engineering",
        description: "Water treatment, pollution control, waste management aur environmental protection ka field.",
        skills: ["Water Treatment", "Environmental Monitoring", "Data Analysis", "Environmental Regulations"],
        careers: ["Environmental Engineer", "Water Treatment Engineer", "Sustainability Associate", "Environmental Consultant"]
    },

    biomedical: {
        title: "Biomedical Engineering",
        description: "Healthcare aur medical technology ke liye devices aur engineering systems banana.",
        skills: ["Electronics Basics", "Medical Instrumentation", "Signal Processing", "Medical Device Safety"],
        careers: ["Biomedical Engineer", "Medical Equipment Engineer", "Clinical Engineer", "Medical Device Associate"]
    }
};

const departmentSelect = document.getElementById("departmentSelect");
const showDepartmentButton = document.getElementById("showDepartment");
const departmentTitle = document.getElementById("departmentTitle");
const departmentDescription = document.getElementById("departmentDescription");
const departmentSkills = document.getElementById("departmentSkills");
const departmentCareers = document.getElementById("departmentCareers");
const departmentDetails = document.getElementById("departmentDetails");

function fillList(element, items) {
    element.replaceChildren();

    items.forEach(function (item) {
        const li = document.createElement("li");
        li.textContent = item;
        element.appendChild(li);
    });
}

function showDepartment(departmentKey) {
    const department = departments[departmentKey];

    if (!department) return;

    departmentSelect.value = departmentKey;
    departmentTitle.textContent = department.title;
    departmentDescription.textContent = department.description;

    fillList(departmentSkills, department.skills);
    fillList(departmentCareers, department.careers);

    document.querySelectorAll(".department-card").forEach(function (card) {
        const isSelected = card.dataset.department === departmentKey;

        card.classList.toggle("active", isSelected);
        card.setAttribute("aria-pressed", String(isSelected));
    });
}

showDepartmentButton.addEventListener("click", function () {
    showDepartment(departmentSelect.value);
    departmentDetails.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
});

departmentSelect.addEventListener("change", function () {
    showDepartment(departmentSelect.value);
});

document.querySelectorAll(".department-card").forEach(function (card) {
    card.addEventListener("click", function () {
        showDepartment(card.dataset.department);

        departmentDetails.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    });
});

// Application preparation checklist
const engineeringForm = document.getElementById("engineeringForm");
const applicationResult = document.getElementById("applicationResult");

engineeringForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const email = document.getElementById("studentEmail").value.trim();
    const qualification = document.getElementById("qualification").value;
    const applicationType = document.getElementById("applicationType").value;
    const department = document.getElementById("formDepartment").value;

    if (!name || !email || !qualification || !applicationType || !department) {
        applicationResult.textContent = "Kripya sabhi details bharein.";
        applicationResult.classList.add("show");
        return;
    }

    applicationResult.replaceChildren();

    const heading = document.createElement("h3");
    heading.textContent = "Aapki Engineering Checklist";

    const greeting = document.createElement("p");
    greeting.textContent = `Namaste ${name}! Aapne ${applicationType} select kiya hai.`;

    const details = document.createElement("p");
    details.textContent =
        `Qualification: ${qualification} | Department: ${department} | Email: ${email}`;

    const list = document.createElement("ul");

    [
        "Updated resume taiyar karein.",
        "Apne technical projects aur skills add karein.",
        "Certificates aur academic documents taiyar rakhein.",
        "Official portal par eligibility aur last date check karein.",
        "Interview aur technical questions ki practice karein."
    ].forEach(function (item) {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
    });

    const note = document.createElement("p");
    note.textContent =
        "Yeh checklist hai, actual job ya internship application submit nahi hui hai.";

    applicationResult.append(heading, greeting, details, list, note);
    applicationResult.classList.add("show");

    applicationResult.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
});

// Default department
showDepartment("cse");

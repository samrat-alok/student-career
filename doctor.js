
const departments = {
    general: {
        title: "General Medicine",
        description: "Adults ki common aur complex medical conditions ki diagnosis aur treatment par focus.",
        skills: ["Clinical examination", "Medical diagnosis", "Patient communication", "Evidence-based medicine"],
        careers: ["General Physician", "Hospital Medical Officer", "Resident Doctor (eligible training)", "Medical Research"]
    },
    cardiology: {
        title: "Cardiology",
        description: "Heart aur blood circulation se related diseases ka specialist field.",
        skills: ["Cardiovascular medicine", "ECG interpretation", "Clinical assessment", "Cardiac diagnostics"],
        careers: ["Cardiologist", "Cardiac Researcher", "Hospital Specialist", "Academic Medicine"]
    },
    neurology: {
        title: "Neurology",
        description: "Brain, spinal cord aur nervous system ki conditions ka diagnosis aur treatment.",
        skills: ["Neurological examination", "Brain imaging basics", "Clinical reasoning", "Patient assessment"],
        careers: ["Neurologist", "Clinical Researcher", "Hospital Specialist", "Academic Medicine"]
    },
    pediatrics: {
        title: "Pediatrics",
        description: "Newborns, children aur adolescents ki health aur development par focus.",
        skills: ["Child assessment", "Growth monitoring", "Communication with families", "Preventive care"],
        careers: ["Pediatrician", "Neonatal Care Specialist (further training)", "Child Health Researcher", "Hospital Doctor"]
    },
    orthopedics: {
        title: "Orthopedics",
        description: "Bones, joints, muscles aur musculoskeletal conditions ka treatment.",
        skills: ["Musculoskeletal examination", "Imaging interpretation", "Surgical principles", "Rehabilitation basics"],
        careers: ["Orthopedic Surgeon", "Trauma Specialist", "Sports Medicine (relevant training)", "Clinical Research"]
    },
    surgery: {
        title: "General Surgery",
        description: "Surgical conditions ki assessment aur operative treatment ka specialist field.",
        skills: ["Surgical anatomy", "Clinical assessment", "Sterile practice", "Surgical teamwork"],
        careers: ["General Surgeon", "Surgical Specialist (further training)", "Hospital Surgeon", "Surgical Research"]
    },
    dermatology: {
        title: "Dermatology",
        description: "Skin, hair, nails aur related disorders ki medical care.",
        skills: ["Skin examination", "Clinical diagnosis", "Dermatology procedures", "Patient counselling"],
        careers: ["Dermatologist", "Clinical Researcher", "Academic Dermatology", "Hospital Specialist"]
    },
    gynecology: {
        title: "Obstetrics & Gynecology",
        description: "Pregnancy, childbirth aur women's reproductive health se related care.",
        skills: ["Maternal health", "Clinical examination", "Reproductive health", "Patient communication"],
        careers: ["Obstetrician-Gynecologist", "Maternal Health Specialist", "Hospital Doctor", "Researcher"]
    },
    ophthalmology: {
        title: "Ophthalmology",
        description: "Eyes, vision aur eye diseases ki diagnosis aur treatment.",
        skills: ["Eye examination", "Vision assessment", "Ophthalmic instruments", "Clinical diagnosis"],
        careers: ["Ophthalmologist", "Eye Surgeon (qualified specialist)", "Hospital Specialist", "Eye Researcher"]
    },
    ent: {
        title: "ENT",
        description: "Ear, nose, throat aur related head-and-neck conditions ka field.",
        skills: ["ENT examination", "Clinical diagnosis", "Audiology basics", "Surgical principles"],
        careers: ["ENT Specialist", "Head and Neck Specialist (further training)", "Hospital Doctor", "Researcher"]
    },
    radiology: {
        title: "Radiology",
        description: "Medical imaging ke through diseases ki diagnosis mein help karna.",
        skills: ["X-ray and CT principles", "MRI basics", "Image interpretation", "Radiation safety"],
        careers: ["Radiologist", "Imaging Researcher", "Hospital Specialist", "Academic Radiology"]
    },
    psychiatry: {
        title: "Psychiatry",
        description: "Mental health conditions ki medical assessment aur treatment.",
        skills: ["Mental health assessment", "Clinical communication", "Diagnostic reasoning", "Patient care"],
        careers: ["Psychiatrist", "Mental Health Researcher", "Hospital Specialist", "Academic Medicine"]
    },
    emergency: {
        title: "Emergency Medicine",
        description: "Urgent illnesses aur injuries ke liye rapid assessment aur emergency care.",
        skills: ["Emergency assessment", "Teamwork", "Clinical prioritisation", "Resuscitation training"],
        careers: ["Emergency Medicine Specialist", "Emergency Department Doctor", "Disaster Medicine (relevant training)", "Researcher"]
    },
    anesthesia: {
        title: "Anesthesiology",
        description: "Surgery ke dauran anesthesia, pain management aur perioperative care.",
        skills: ["Physiology", "Patient monitoring", "Airway management training", "Perioperative care"],
        careers: ["Anesthesiologist", "Pain Medicine Specialist (further training)", "Critical Care (further training)", "Hospital Specialist"]
    },
    oncology: {
        title: "Oncology",
        description: "Cancer ki diagnosis aur treatment; specialty ke hisaab se medical, surgical ya radiation care.",
        skills: ["Cancer biology", "Clinical assessment", "Treatment planning", "Patient communication"],
        careers: ["Medical Oncologist", "Surgical Oncologist", "Radiation Oncologist", "Cancer Researcher"]
    },
    pathology: {
        title: "Pathology",
        description: "Laboratory tests, tissues aur samples ke analysis se diseases diagnose karna.",
        skills: ["Laboratory medicine", "Microscopy", "Sample analysis", "Quality control"],
        careers: ["Pathologist", "Laboratory Medicine Specialist", "Researcher", "Academic Pathology"]
    },
    pulmonology: {
        title: "Pulmonology",
        description: "Lungs, breathing aur respiratory diseases ki medical care.",
        skills: ["Respiratory examination", "Pulmonary function tests", "Imaging basics", "Clinical diagnosis"],
        careers: ["Pulmonologist", "Respiratory Researcher", "Hospital Specialist", "Academic Medicine"]
    },
    urology: {
        title: "Urology",
        description: "Urinary system aur male reproductive system se related conditions ka specialist field.",
        skills: ["Clinical examination", "Urinary system assessment", "Imaging basics", "Surgical principles"],
        careers: ["Urologist", "Urology Surgeon", "Hospital Specialist", "Clinical Researcher"]
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

function showDepartment(key) {
    const department = departments[key];

    if (!department) return;

    departmentSelect.value = key;
    departmentTitle.textContent = department.title;
    departmentDescription.textContent = department.description;

    fillList(departmentSkills, department.skills);
    fillList(departmentCareers, department.careers);

    document.querySelectorAll(".department-card").forEach(function (card) {
        const selected = card.dataset.department === key;
        card.classList.toggle("active", selected);
        card.setAttribute("aria-pressed", String(selected));
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
const doctorForm = document.getElementById("doctorForm");
const applicationResult = document.getElementById("applicationResult");

doctorForm.addEventListener("submit", function (event) {
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
    heading.textContent = "Aapki Medical Career Checklist";

    const greeting = document.createElement("p");
    greeting.textContent = `Namaste ${name}!`;

    const details = document.createElement("p");
    details.textContent =
        `Qualification: ${qualification} | Interest: ${department} | Opportunity: ${applicationType}`;

    const list = document.createElement("ul");

    [
        "Updated CV ya resume taiyar karein.",
        "Apne academic aur training documents taiyar rakhein.",
        "Role ke liye required qualification aur registration verify karein.",
        "Official portal par application dates aur eligibility check karein.",
        "Interview ya research proposal ki taiyari karein."
    ].forEach(function (item) {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
    });

    const note = document.createElement("p");
    note.textContent =
        "Yeh sirf preparation checklist hai. Aapki details kisi hospital ya employer ko submit nahi hui hain.";

    applicationResult.append(heading, greeting, details, list, note);
    applicationResult.classList.add("show");

    applicationResult.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
});

// Default selected department
showDepartment("general");

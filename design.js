
const departments = {
    graphic: {
        title: "Graphic Design",
        description: "Graphic designers visual content banate hain, jaise logos, posters, advertisements aur social media graphics.",
        skills: ["Color theory and typography", "Layout and visual composition", "Canva, Photoshop or Illustrator"],
        careers: ["Graphic Designer", "Logo Designer", "Social Media Designer", "Brand Identity Designer"]
    },

    uiux: {
        title: "UI/UX Design",
        description: "UI/UX designers websites aur apps ko attractive, understandable aur easy to use banate hain.",
        skills: ["User research and wireframes", "Prototyping and usability testing", "Figma and design systems"],
        careers: ["UI Designer", "UX Designer", "Product Designer", "UX Research Assistant"]
    },

    web: {
        title: "Web Design",
        description: "Web designers website ka layout, visual appearance, navigation aur responsive design banate hain.",
        skills: ["HTML and CSS fundamentals", "Responsive layouts and typography", "Figma and browser testing"],
        careers: ["Web Designer", "Junior Front-End Developer", "Website Designer", "Landing Page Designer"]
    },

    fashion: {
        title: "Fashion Design",
        description: "Fashion designers clothing, accessories, patterns aur fashion collections design karte hain.",
        skills: ["Fashion illustration", "Fabric and color knowledge", "Pattern making and garment construction"],
        careers: ["Fashion Designer", "Textile Designer", "Fashion Illustrator", "Fashion Assistant"]
    },

    interior: {
        title: "Interior Design",
        description: "Interior designers ghar, office aur commercial spaces ko functional aur visually appealing banate hain.",
        skills: ["Space planning and measurements", "Lighting, materials and color", "AutoCAD or SketchUp basics"],
        careers: ["Interior Designer", "Space Planner", "CAD Drafting Assistant", "3D Visualizer"]
    },

    product: {
        title: "Product Design",
        description: "Product designers digital ya physical products ki usability, appearance aur user experience par kaam karte hain.",
        skills: ["Problem solving and research", "Sketching and prototyping", "Figma or relevant 3D tools"],
        careers: ["Product Designer", "Industrial Design Assistant", "UX Designer", "Prototype Designer"]
    },

    animation: {
        title: "Animation & Motion Graphics",
        description: "Is field mein animated videos, motion graphics, visual effects aur animated stories banayi jati hain.",
        skills: ["Timing and storytelling", "Animation principles", "Blender, After Effects or similar tools"],
        careers: ["Motion Graphics Designer", "2D Animator", "Video Graphics Artist", "VFX Assistant"]
    },

    "3d": {
        title: "3D Design",
        description: "3D designers digital objects, environments, models aur realistic visual presentations banate hain.",
        skills: ["3D modelling and lighting", "Materials and texturing", "Blender or other 3D software"],
        careers: ["3D Artist", "3D Modeler", "3D Visualizer", "Environment Artist"]
    },

    game: {
        title: "Game Design",
        description: "Game designers gameplay ideas, levels, rules, player experience aur game interfaces plan karte hain.",
        skills: ["Creative problem solving", "Game mechanics and level design", "Unity or Unreal Engine basics"],
        careers: ["Junior Game Designer", "Level Design Assistant", "Game UI Designer", "Game Tester"]
    },

    brand: {
        title: "Brand Design",
        description: "Brand designers kisi business ki visual identity ko consistent banate hain, including logo, colors and brand assets.",
        skills: ["Visual identity and typography", "Brand guidelines", "Illustrator or similar design tools"],
        careers: ["Brand Designer", "Visual Designer", "Logo Designer", "Creative Assistant"]
    }
};

const departmentSelect = document.getElementById("departmentSelect");
const showDepartment = document.getElementById("showDepartment");
const departmentTitle = document.getElementById("departmentTitle");
const departmentDescription = document.getElementById("departmentDescription");
const departmentSkills = document.getElementById("departmentSkills");
const departmentCareers = document.getElementById("departmentCareers");
const departmentCards = document.querySelectorAll(".department-card");

function showDetails(departmentKey) {
    const department = departments[departmentKey];

    if (!department) {
        return;
    }

    departmentSelect.value = departmentKey;
    departmentTitle.textContent = department.title;
    departmentDescription.textContent = department.description;

    departmentSkills.replaceChildren();
    departmentCareers.replaceChildren();

    department.skills.forEach(function(skill) {
        const item = document.createElement("li");
        item.textContent = skill;
        departmentSkills.appendChild(item);
    });

    department.careers.forEach(function(career) {
        const item = document.createElement("li");
        item.textContent = career;
        departmentCareers.appendChild(item);
    });

    departmentCards.forEach(function(card) {
        card.classList.toggle(
            "active",
            card.dataset.department === departmentKey
        );
    });
}

showDepartment.addEventListener("click", function() {
    showDetails(departmentSelect.value);
});

departmentCards.forEach(function(card) {
    card.addEventListener("click", function() {
        showDetails(card.dataset.department);

        document.getElementById("departmentDetails").scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    });
});

// Show the default department when the page loads.
showDetails("graphic");

// Application preparation checklist.
// This demo does not send applications or save personal information.
const designForm = document.getElementById("designForm");
const applicationResult = document.getElementById("applicationResult");

designForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const qualification = document.getElementById("qualification").value;
    const applicationType = document.getElementById("applicationType").value;
    const departmentKey = document.getElementById("formDepartment").value;

    if (!name || !qualification || !applicationType || !departments[departmentKey]) {
        applicationResult.classList.add("show");
        applicationResult.textContent = "Please fill in all required fields.";
        return;
    }

    const department = departments[departmentKey];

    let checklist = [
        "Learn the fundamentals of " + department.title + ".",
        "Create 4–6 portfolio projects relevant to this field.",
        "Prepare a resume highlighting your skills and projects.",
        "Keep your portfolio link ready.",
        "Research each company and check its eligibility requirements."
    ];

    if (applicationType === "internship") {
        checklist.push("Look for beginner-friendly internships and check their eligibility.");
        checklist.push("Prepare a short introduction about what you want to learn.");
    } else if (applicationType === "job") {
        checklist.push("Practice design tasks and explaining your design decisions.");
        checklist.push("Prepare for interviews based on the job description.");
    } else {
        checklist.push("Choose a clear service, create sample work and define project scope.");
        checklist.push("Agree on payment, deadlines and revisions before starting client work.");
    }

    applicationResult.replaceChildren();

    const heading = document.createElement("h3");
    heading.textContent = "Your Design Career Checklist, " + name;

    const intro = document.createElement("p");
    intro.textContent =
        "Field: " + department.title +
        " | Qualification: " + qualification +
        " | Goal: " + applicationType;

    const list = document.createElement("ul");

    checklist.forEach(function(task) {
        const item = document.createElement("li");
        item.textContent = task;
        list.appendChild(item);
    });

    const note = document.createElement("p");
    note.className = "note";
    note.textContent =
        "This is a preparation guide, not a job or internship application confirmation.";

    applicationResult.append(heading, intro, list, note);
    applicationResult.classList.add("show");

    applicationResult.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

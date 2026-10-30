const careerForm = document.getElementById("careerForm");
const results = document.getElementById("results");

const careers = {
  medical: {
    name: "Medical & Healthcare",
    description: "MBBS, nursing, pharmacy and allied health courses. Eligibility and entrance requirements vary."
  },
  technology: {
    name: "Technology & IT",
    description: "Software development, cybersecurity, data analytics and AI. Explore degrees, diplomas and practical skills."
  },
  government: {
    name: "Government Jobs",
    description: "Explore SSC, banking, UPSC and state-level exams. Check each post's age and qualification rules."
  },
  business: {
    name: "Business & Entrepreneurship",
    description: "Explore BBA, commerce, digital marketing, finance and starting a small business."
  },
  creative: {
    name: "Creative & Design",
    description: "Explore graphic design, UI/UX, animation, media and portfolio-based learning."
  },
  law: {
    name: "Law & Public Service",
    description: "Explore law degrees, legal careers and public-service opportunities."
  }
};

careerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const level = document.getElementById("level").value;
  const stream = document.getElementById("stream").value;
  const interest = document.getElementById("interest").value;
  const budget = document.getElementById("budget").value;
  const goal = document.getElementById("goal").value;

  const suggestions = [interest];

  if (stream === "science" && !suggestions.includes("medical")) {
    suggestions.push("medical");
  }

  if (stream === "computer" && !suggestions.includes("technology")) {
    suggestions.push("technology");
  }

  if (goal === "government" && !suggestions.includes("government")) {
    suggestions.push("government");
  }

  if (goal === "business" && !suggestions.includes("business")) {
    suggestions.push("business");
  }

  results.replaceChildren();

  const heading = document.createElement("h3");
  heading.textContent = "Your career options";
  results.appendChild(heading);

  suggestions.forEach(function (key) {
    const career = careers[key];
    if (!career) return;

    const card = document.createElement("article");
    card.className = "result-card";

    const title = document.createElement("h4");
    title.textContent = career.name;

    const description = document.createElement("p");
    description.textContent = career.description;

    card.append(title, description);
    results.appendChild(card);
  });

  const note = document.createElement("p");
  note.className = "form-note";
  note.textContent =
    `Your selections: ${level}, ${stream}, ${budget} budget, goal: ${goal}. ` +
    "Compare course fees, eligibility, entrance exams and job prospects before choosing.";
  results.appendChild(note);

  results.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelectorAll("[data-interest]").forEach(function (link) {
  link.addEventListener("click", function () {
    document.getElementById("interest").value =
      link.dataset.interest;
  });
});
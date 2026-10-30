
"use strict";

document.addEventListener("DOMContentLoaded", () => {

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  // Safe local storage
  const storage = {
    get(key) {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch {
        // Storage may be disabled.
      }
    },
    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch {
        // Storage may be disabled.
      }
    }
  };

  // 1. MOBILE NAVIGATION
  const menuBtn = $("#menuBtn");
  const nav = $("#nav");

  menuBtn.addEventListener("click", () => {
    const opened = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(opened));
  });

  $$("#nav a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });

  // 2. CAREER SEARCH AND FILTERS
  const careerCards = $$(".career-card");
  const searchInput = $("#careerSearch");
  const filterButtons = $$(".filter");
  const noResults = $("#noResults");

  let activeFilter = "all";

  function filterCareers() {
    const query = searchInput.value.toLowerCase().trim();
    let visible = 0;

    careerCards.forEach(card => {
      const matchesCategory =
        activeFilter === "all" ||
        card.dataset.category === activeFilter;

      const matchesSearch =
        (card.textContent + " " + card.dataset.search)
          .toLowerCase()
          .includes(query);

      card.hidden = !(matchesCategory && matchesSearch);

      if (!card.hidden) visible++;
    });

    noResults.hidden = visible > 0;
  }

  searchInput.addEventListener("input", filterCareers);

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;

      filterButtons.forEach(item => {
        const selected = item === button;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });

      filterCareers();
    });

    button.setAttribute(
      "aria-pressed",
      String(button.classList.contains("active"))
    );
  });

  // 3. COMPLETE CAREER ROADMAP DATABASE
  const roadmaps = {

    ml: {
      title: "Machine Learning Engineer",
      stages: [
        ["Python Programming",
          "Learn variables, data types, loops, functions, OOP and Python libraries.",
          "4–6 weeks"],

        ["Mathematics & Statistics",
          "Study linear algebra, probability, statistics, calculus and optimization.",
          "6–10 weeks"],

        ["Data Analysis",
          "Learn NumPy, Pandas, data cleaning and data visualization.",
          "4–6 weeks"],

        ["Machine Learning Algorithms",
          "Understand regression, classification, clustering, decision trees and ensemble methods.",
          "8–10 weeks"],

        ["Model Training & Evaluation",
          "Learn feature engineering, model validation, overfitting and performance metrics.",
          "4–6 weeks"],

        ["Deployment & Projects",
          "Build end-to-end ML projects and deploy models using APIs or Streamlit.",
          "6–8 weeks"]
      ]
    },

    ai: {
      title: "Artificial Intelligence Engineer",
      stages: [
        ["Programming Foundations",
          "Learn Python, OOP, data structures and algorithms.",
          "4–6 weeks"],

        ["Mathematics & Logic",
          "Study probability, statistics, linear algebra and computational logic.",
          "6–8 weeks"],

        ["AI Fundamentals",
          "Understand intelligent agents, search algorithms, knowledge representation and reasoning.",
          "4–6 weeks"],

        ["Machine Learning",
          "Study supervised learning, unsupervised learning and model evaluation.",
          "6–8 weeks"],

        ["AI Application Development",
          "Integrate AI models, APIs and automation into practical applications.",
          "6–8 weeks"],

        ["Portfolio & Deployment",
          "Create intelligent applications and prepare for AI engineering roles.",
          "6–8 weeks"]
      ]
    },

    data: {
      title: "Data Scientist",
      stages: [
        ["Python & SQL",
          "Learn Python programming, SQL queries, joins and database fundamentals.",
          "4–6 weeks"],

        ["Statistics",
          "Study probability, distributions, correlation and hypothesis testing.",
          "6–8 weeks"],

        ["Data Processing",
          "Use Pandas and NumPy to clean, transform and prepare datasets.",
          "4–6 weeks"],

        ["Visualization",
          "Learn Matplotlib, Seaborn, Power BI and data storytelling.",
          "4–6 weeks"],

        ["Predictive Analytics",
          "Apply regression, classification and machine learning models.",
          "6–10 weeks"],

        ["Real-World Projects",
          "Create analytical reports, dashboards and predictive models.",
          "6–8 weeks"]
      ]
    },

    deep: {
      title: "Deep Learning Engineer",
      stages: [
        ["Python & Mathematics",
          "Master Python, linear algebra, calculus and probability.",
          "6–10 weeks"],

        ["Machine Learning Basics",
          "Understand regression, classification and model optimization.",
          "6–8 weeks"],

        ["Neural Networks",
          "Learn neurons, activation functions, forward propagation and backpropagation.",
          "4–6 weeks"],

        ["Deep Learning Frameworks",
          "Practise PyTorch or TensorFlow and build neural networks.",
          "6–8 weeks"],

        ["Advanced Architectures",
          "Study CNNs, RNNs, transformers and attention mechanisms.",
          "8–10 weeks"],

        ["Research & Deployment",
          "Build deep learning applications and deploy trained models.",
          "6–8 weeks"]
      ]
    },

    nlp: {
      title: "Natural Language Processing Engineer",
      stages: [
        ["Python Fundamentals",
          "Learn Python, data structures, string manipulation and regular expressions.",
          "4–6 weeks"],

        ["NLP Fundamentals",
          "Study tokenization, stemming, lemmatization and text preprocessing.",
          "4–6 weeks"],

        ["Text Processing",
          "Learn Bag of Words, TF-IDF, word embeddings and text classification.",
          "4–6 weeks"],

        ["Deep Learning for NLP",
          "Understand sequence models, attention and transformer architectures.",
          "6–8 weeks"],

        ["Large Language Models",
          "Explore LLMs, fine-tuning, evaluation and prompt engineering.",
          "6–8 weeks"],

        ["NLP Applications",
          "Build chatbots, text summarizers and document understanding applications.",
          "6–8 weeks"]
      ]
    },

    vision: {
      title: "Computer Vision Engineer",
      stages: [
        ["Python Programming",
          "Learn Python, NumPy and image handling fundamentals.",
          "4–6 weeks"],

        ["Image Processing",
          "Study pixels, filters, image transformations and OpenCV.",
          "4–6 weeks"],

        ["Machine Learning",
          "Understand classification, feature extraction and model evaluation.",
          "4–6 weeks"],

        ["Convolutional Neural Networks",
          "Learn CNN architecture and image classification.",
          "6–8 weeks"],

        ["Object Detection",
          "Explore object detection, segmentation and image recognition.",
          "6–8 weeks"],

        ["Computer Vision Projects",
          "Build practical visual AI applications and deploy them.",
          "6–8 weeks"]
      ]
    },

    genai: {
      title: "Generative AI Engineer",
      stages: [
        ["Python & APIs",
          "Learn Python, API integration, JSON and asynchronous programming.",
          "4–6 weeks"],

        ["Machine Learning Fundamentals",
          "Understand model training, evaluation and neural networks.",
          "6–8 weeks"],

        ["LLM Fundamentals",
          "Study tokens, embeddings, transformers and language model architecture.",
          "4–6 weeks"],

        ["Prompt Engineering",
          "Learn prompt design, structured outputs and model evaluation.",
          "3–4 weeks"],

        ["RAG & Vector Databases",
          "Build retrieval-augmented generation systems using document retrieval and embeddings.",
          "6–8 weeks"],

        ["AI Application Deployment",
          "Build chatbots and AI assistants and deploy them using APIs.",
          "6–8 weeks"]
      ]
    },

    mlops: {
      title: "MLOps Engineer",
      stages: [
        ["Python & Git",
          "Learn Python programming, Git and software development fundamentals.",
          "4–6 weeks"],

        ["ML Fundamentals",
          "Understand machine learning pipelines and model evaluation.",
          "4–6 weeks"],

        ["Linux & Docker",
          "Learn Linux commands, containers and Docker images.",
          "4–6 weeks"],

        ["Model Tracking",
          "Use MLflow and experiment tracking tools.",
          "4–6 weeks"],

        ["CI/CD & Cloud",
          "Study automated pipelines, cloud infrastructure and deployment.",
          "6–8 weeks"],

        ["Monitoring",
          "Build model monitoring, versioning and retraining workflows.",
          "6–8 weeks"]
      ]
    },

    analyst: {
      title: "Data Analyst",
      stages: [
        ["Excel",
          "Learn formulas, data cleaning, pivot tables and spreadsheet analysis.",
          "3–4 weeks"],

        ["SQL",
          "Practise SELECT, JOIN, GROUP BY and subqueries.",
          "4–6 weeks"],

        ["Python",
          "Learn Python fundamentals and Pandas.",
          "4–6 weeks"],

        ["Statistics",
          "Study averages, distributions, correlation and probability.",
          "4–6 weeks"],

        ["Data Visualization",
          "Build interactive dashboards using Power BI or Tableau.",
          "4–6 weeks"],

        ["Portfolio & Interviews",
          "Complete business data projects and prepare for analyst interviews.",
          "4–6 weeks"]
      ]
    },

    robotics: {
      title: "Robotics & AI Engineer",
      stages: [
        ["Programming",
          "Learn Python, C++ and computational logic.",
          "4–6 weeks"],

        ["Mathematics & Physics",
          "Study algebra, vectors, mechanics and basic control systems.",
          "6–8 weeks"],

        ["Electronics",
          "Understand sensors, motors, circuits and microcontrollers.",
          "4–6 weeks"],

        ["Robotics Fundamentals",
          "Explore kinematics, motion planning and robot control.",
          "6–8 weeks"],

        ["AI & Computer Vision",
          "Integrate perception, object detection and intelligent decision systems.",
          "6–8 weeks"],

        ["Robotics Projects",
          "Build and test robotics applications in authorized environments.",
          "8–10 weeks"]
      ]
    },

    research: {
      title: "AI Research Scientist",
      stages: [
        ["Programming & Mathematics",
          "Develop strong foundations in Python, calculus, linear algebra and probability.",
          "8–12 weeks"],

        ["Computer Science Foundations",
          "Study algorithms, data structures and computational complexity.",
          "6–8 weeks"],

        ["Machine Learning Theory",
          "Understand optimization, statistical learning and generalization.",
          "8–12 weeks"],

        ["Deep Learning Research",
          "Study neural architectures, transformers and current research methods.",
          "8–12 weeks"],

        ["Research Practice",
          "Read scientific papers, reproduce experiments and analyse results.",
          "8–12 weeks"],

        ["Advanced Research",
          "Develop novel methods and consider advanced academic qualifications.",
          "Ongoing"]
      ]
    },

    bi: {
      title: "AI Business Intelligence Specialist",
      stages: [
        ["Business Fundamentals",
          "Understand business processes, KPIs and decision-making.",
          "3–4 weeks"],

        ["Excel & SQL",
          "Learn data extraction, spreadsheet analysis and SQL.",
          "4–6 weeks"],

        ["Data Visualization",
          "Create dashboards and reports using Power BI or Tableau.",
          "4–6 weeks"],

        ["Statistics & Analytics",
          "Study descriptive statistics and predictive analytics.",
          "4–6 weeks"],

        ["Machine Learning",
          "Learn forecasting, classification and business prediction models.",
          "6–8 weeks"],

        ["Business Projects",
          "Develop intelligent dashboards and decision-support applications.",
          "6–8 weeks"]
      ]
    }
  };

  // 4. ROADMAP PROGRESS MANAGEMENT

  const roadmapTitle = $("#roadmapTitle");
  const roadmapStages = $("#roadmapStages");
  const progressBar = $("#progressBar");
  const progressText = $("#progressText");

  let currentPath = "ml";

  function getCompletedStages() {
    try {
      const data = JSON.parse(
        storage.get("ai_roadmap_" + currentPath) || "[]"
      );

      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }

  function updateRoadmapProgress() {
    const checkboxes = $$(".stage-check", roadmapStages);

    const completed = checkboxes.filter(
      checkbox => checkbox.checked
    ).length;

    const percent = checkboxes.length
      ? Math.round(completed / checkboxes.length * 100)
      : 0;

    progressBar.style.width = percent + "%";
    progressText.textContent = percent + "%";

    const saved = checkboxes
      .map((box, index) => box.checked ? index : -1)
      .filter(index => index !== -1);

    storage.set(
      "ai_roadmap_" + currentPath,
      JSON.stringify(saved)
    );
  }

  function renderRoadmap(path) {
    currentPath = roadmaps[path] ? path : "ml";

    const selected = roadmaps[currentPath];
    const completed = getCompletedStages();

    roadmapTitle.textContent = selected.title;
    roadmapStages.replaceChildren();

    selected.stages.forEach((stage, index) => {

      const article = document.createElement("article");
      article.className = "stage";

      const number = document.createElement("div");
      number.className = "stage-number";
      number.textContent = String(index + 1).padStart(2, "0");

      const content = document.createElement("div");

      const heading = document.createElement("h4");
      heading.textContent = stage[0];

      const description = document.createElement("p");
      description.textContent = stage[1];

      const duration = document.createElement("p");
      duration.className = "duration";
      duration.textContent = "Suggested duration: " + stage[2];

      content.append(heading, description, duration);

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "stage-check";
      checkbox.checked = completed.includes(index);
      checkbox.setAttribute(
        "aria-label",
        "Complete " + stage[0]
      );

      checkbox.addEventListener("change", () => {
        article.classList.toggle("done", checkbox.checked);
        updateRoadmapProgress();
      });

      article.classList.toggle("done", checkbox.checked);

      article.append(number, content, checkbox);
      roadmapStages.append(article);
    });

    updateRoadmapProgress();
  }

  // Open the selected career roadmap
  $$(".roadmap-btn").forEach(button => {
    button.addEventListener("click", () => {
      renderRoadmap(button.dataset.path);

      $("#roadmap").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  // 5. JOB READINESS CHECKLIST

  const checklist = $$("#checklist input");
  const checkCount = $("#checkCount");
  const resetButton = $("#resetProgress");

  const checklistKey = "ai_job_readiness";

  function loadChecklist() {
    try {
      const saved = JSON.parse(
        storage.get(checklistKey) || "{}"
      );

      checklist.forEach(box => {
        box.checked = saved[box.dataset.id] === true;
      });
    } catch {
      checklist.forEach(box => box.checked = false);
    }

    updateChecklist();
  }

  function updateChecklist() {
    let completed = 0;
    const saved = {};

    checklist.forEach(box => {
      saved[box.dataset.id] = box.checked;

      if (box.checked) {
        completed++;
      }
    });

    checkCount.textContent =
      completed + " / " + checklist.length + " Completed";

    storage.set(checklistKey, JSON.stringify(saved));
  }

  checklist.forEach(box => {
    box.addEventListener("change", updateChecklist);
  });

  // 6. RESET ALL PROGRESS

  resetButton.addEventListener("click", () => {

    const confirmed = confirm(
      "Are you sure you want to reset all AI learning progress?"
    );

    if (!confirmed) return;

    Object.keys(roadmaps).forEach(path => {
      storage.remove("ai_roadmap_" + path);
    });

    storage.remove(checklistKey);

    checklist.forEach(box => {
      box.checked = false;
    });

    updateChecklist();
    renderRoadmap(currentPath);
  });

  // 7. INITIALIZE PAGE
  renderRoadmap("ml");
  loadChecklist();

});

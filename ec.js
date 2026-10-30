
"use strict";

document.addEventListener("DOMContentLoaded", () => {

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  // SAFE LOCAL STORAGE
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
        // Browser storage may be disabled.
      }
    },

    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch {
        // Browser storage may be disabled.
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

  // 2. CAREER SEARCH AND FILTER

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

  // 3. CAREER ROADMAP DATABASE

  const roadmaps = {

    electronics: {
      title: "Electronics Design Engineer",
      stages: [
        ["Basic Electrical & Electronics",
          "Understand voltage, current, resistance, Ohm's law, power and basic components.",
          "4–6 weeks"],

        ["Analog Electronics",
          "Study diodes, transistors, amplifiers, operational amplifiers and analog circuits.",
          "6–8 weeks"],

        ["Digital Electronics",
          "Learn logic gates, Boolean algebra, flip-flops, counters and digital circuits.",
          "6–8 weeks"],

        ["Programming & Simulation",
          "Learn C, Python and circuit simulation using suitable engineering tools.",
          "6–8 weeks"],

        ["Circuit & PCB Design",
          "Practise schematic creation, component selection and PCB layout.",
          "6–8 weeks"],

        ["Practical Projects",
          "Build, test and document electronic circuits and hardware prototypes.",
          "8–10 weeks"]
      ]
    },

    vlsi: {
      title: "VLSI Design Engineer",
      stages: [
        ["Digital Electronics",
          "Master Boolean algebra, logic gates and sequential circuits.",
          "6–8 weeks"],

        ["Programming Foundations",
          "Learn C, Python and basic data structures.",
          "4–6 weeks"],

        ["Hardware Description Languages",
          "Study Verilog or VHDL for describing digital circuits.",
          "6–8 weeks"],

        ["Digital Design",
          "Understand RTL design, finite state machines and timing concepts.",
          "6–8 weeks"],

        ["Verification & FPGA",
          "Practise simulation, testbenches, FPGA implementation and debugging.",
          "8–10 weeks"],

        ["Advanced VLSI",
          "Explore synthesis, static timing analysis and physical design fundamentals.",
          "8–12 weeks"]
      ]
    },

    telecom: {
      title: "Telecommunication Engineer",
      stages: [
        ["Electrical & Electronics Basics",
          "Understand electronic components, circuits and electrical fundamentals.",
          "4–6 weeks"],

        ["Signals & Systems",
          "Study continuous and discrete signals, frequency and system response.",
          "6–8 weeks"],

        ["Communication Fundamentals",
          "Learn analog and digital modulation, encoding and transmission.",
          "6–8 weeks"],

        ["Wireless Communication",
          "Explore cellular systems, wireless channels and network architecture.",
          "6–8 weeks"],

        ["5G & Advanced Networks",
          "Study 5G concepts, radio access networks and introductory 6G research.",
          "6–8 weeks"],

        ["Communication Projects",
          "Build communication simulations and analyse network performance.",
          "6–8 weeks"]
      ]
    },

    embedded: {
      title: "Embedded Systems Engineer",
      stages: [
        ["C Programming",
          "Learn variables, functions, pointers, arrays and memory concepts.",
          "4–6 weeks"],

        ["Electronics Fundamentals",
          "Understand sensors, circuits, digital logic and microcontroller basics.",
          "4–6 weeks"],

        ["Microcontrollers",
          "Practise Arduino, ESP32, STM32 or other suitable development boards.",
          "6–8 weeks"],

        ["Embedded C & Interfaces",
          "Learn GPIO, UART, SPI, I2C, timers and interrupts.",
          "6–8 weeks"],

        ["RTOS Fundamentals",
          "Explore tasks, scheduling, synchronization and embedded operating systems.",
          "6–8 weeks"],

        ["Firmware Development",
          "Build and test complete embedded projects with documentation.",
          "8–10 weeks"]
      ]
    },

    signal: {
      title: "Signal Processing Engineer",
      stages: [
        ["Mathematics",
          "Study calculus, complex numbers, linear algebra and Fourier concepts.",
          "6–8 weeks"],

        ["Signals & Systems",
          "Learn signal classification, convolution and system properties.",
          "6–8 weeks"],

        ["Fourier & Laplace Transforms",
          "Understand frequency-domain analysis and transform techniques.",
          "6–8 weeks"],

        ["Digital Signal Processing",
          "Study sampling, filters, DFT, FFT and digital filtering.",
          "6–8 weeks"],

        ["Programming Tools",
          "Use MATLAB or Python for signal processing simulations.",
          "4–6 weeks"],

        ["DSP Projects",
          "Build audio processing, filtering and signal analysis applications.",
          "6–8 weeks"]
      ]
    },

    iot: {
      title: "Internet of Things Engineer",
      stages: [
        ["Programming",
          "Learn Python, C and basic embedded programming.",
          "4–6 weeks"],

        ["Electronics & Sensors",
          "Understand sensors, actuators and electronic interfaces.",
          "4–6 weeks"],

        ["Microcontrollers",
          "Work with ESP32, Arduino or other microcontroller boards.",
          "4–6 weeks"],

        ["Networking",
          "Study Wi-Fi, Bluetooth, IP addressing and communication protocols.",
          "4–6 weeks"],

        ["IoT Platforms",
          "Explore MQTT, APIs, cloud connectivity and data storage.",
          "6–8 weeks"],

        ["IoT Projects",
          "Develop smart monitoring and automation applications.",
          "6–8 weeks"]
      ]
    },

    robotics: {
      title: "Robotics & Automation Engineer",
      stages: [
        ["Programming",
          "Learn Python, C++ and basic algorithms.",
          "4–6 weeks"],

        ["Electronics & Sensors",
          "Study motors, drivers, sensors and microcontrollers.",
          "6–8 weeks"],

        ["Mechanical Fundamentals",
          "Understand motion, gears, torque and basic robot structures.",
          "4–6 weeks"],

        ["Control Systems",
          "Learn feedback systems, PID control and system modelling.",
          "6–8 weeks"],

        ["Robotics Software",
          "Explore ROS, robot simulation and navigation fundamentals.",
          "6–8 weeks"],

        ["Robotics Projects",
          "Build and test robot prototypes and automation systems.",
          "8–10 weeks"]
      ]
    },

    pcb: {
      title: "PCB Design Engineer",
      stages: [
        ["Electronics Fundamentals",
          "Understand components, circuit symbols, voltage, current and power.",
          "4–6 weeks"],

        ["Circuit Design",
          "Learn schematic design and component selection.",
          "4–6 weeks"],

        ["PCB Design Software",
          "Practise KiCad or another PCB design application.",
          "4–6 weeks"],

        ["PCB Layout",
          "Study routing, grounding, design rules and board layers.",
          "6–8 weeks"],

        ["Testing & Prototyping",
          "Learn board inspection, debugging and prototype testing.",
          "4–6 weeks"],

        ["Professional Portfolio",
          "Create PCB projects and document design decisions.",
          "6–8 weeks"]
      ]
    },

    semiconductor: {
      title: "Semiconductor Engineer",
      stages: [
        ["Physics & Mathematics",
          "Study semiconductor physics, electrical properties and mathematics.",
          "6–8 weeks"],

        ["Electronic Devices",
          "Understand PN junctions, diodes, transistors and MOSFETs.",
          "6–8 weeks"],

        ["Semiconductor Fundamentals",
          "Learn silicon, doping, crystal structures and device operation.",
          "6–8 weeks"],

        ["CMOS Technology",
          "Study CMOS circuits, fabrication steps and process fundamentals.",
          "6–8 weeks"],

        ["Fabrication & Testing",
          "Explore lithography, deposition, etching and semiconductor testing.",
          "8–10 weeks"],

        ["Advanced Semiconductor",
          "Study device characterization, reliability and manufacturing concepts.",
          "8–10 weeks"]
      ]
    },

    rf: {
      title: "RF & Microwave Engineer",
      stages: [
        ["Mathematics & Physics",
          "Study electromagnetics, calculus and complex numbers.",
          "6–8 weeks"],

        ["Electromagnetic Theory",
          "Understand electromagnetic waves, fields and propagation.",
          "6–8 weeks"],

        ["Transmission Lines",
          "Study impedance, reflection, matching and transmission line theory.",
          "6–8 weeks"],

        ["Antennas",
          "Learn antenna parameters, radiation patterns and antenna design.",
          "6–8 weeks"],

        ["RF Circuit Design",
          "Explore filters, amplifiers, mixers and microwave components.",
          "8–10 weeks"],

        ["Simulation & Testing",
          "Practise RF simulation and measurement techniques.",
          "6–8 weeks"]
      ]
    },

    control: {
      title: "Control Systems Engineer",
      stages: [
        ["Mathematics",
          "Learn calculus, differential equations and linear algebra.",
          "6–8 weeks"],

        ["Control Fundamentals",
          "Study open-loop and closed-loop control systems.",
          "4–6 weeks"],

        ["System Modelling",
          "Understand transfer functions, block diagrams and stability.",
          "6–8 weeks"],

        ["Control Techniques",
          "Learn PID control and basic controller design.",
          "6–8 weeks"],

        ["Simulation",
          "Use MATLAB and Simulink to model and simulate systems.",
          "6–8 weeks"],

        ["Industrial Applications",
          "Explore sensors, PLCs and industrial automation projects.",
          "6–8 weeks"]
      ]
    },

    verification: {
      title: "Hardware Verification Engineer",
      stages: [
        ["Digital Electronics",
          "Master logic gates, sequential circuits and timing fundamentals.",
          "6–8 weeks"],

        ["Verilog Fundamentals",
          "Learn modules, data types, operators and testbench basics.",
          "4–6 weeks"],

        ["Digital Design",
          "Study RTL architecture and finite state machines.",
          "6–8 weeks"],

        ["SystemVerilog",
          "Learn object-oriented verification concepts and testbench design.",
          "6–8 weeks"],

        ["Verification Methods",
          "Explore assertions, functional coverage and simulation debugging.",
          "8–10 weeks"],

        ["Advanced Verification",
          "Develop verification projects and understand professional workflows.",
          "8–10 weeks"]
      ]
    }
  };

  // 4. ROADMAP PROGRESS

  const roadmapTitle = $("#roadmapTitle");
  const roadmapStages = $("#roadmapStages");
  const progressBar = $("#progressBar");
  const progressText = $("#progressText");

  let currentPath = "electronics";

  function getCompletedStages() {
    try {
      const data = JSON.parse(
        storage.get("ece_roadmap_" + currentPath) || "[]"
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
      "ece_roadmap_" + currentPath,
      JSON.stringify(saved)
    );
  }

  function renderRoadmap(path) {
    currentPath = roadmaps[path] ? path : "electronics";

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

  // Select a career roadmap
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

  const checklistKey = "ece_job_readiness";

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

      if (box.checked) completed++;
    });

    checkCount.textContent =
      completed + " / " + checklist.length + " Completed";

    storage.set(checklistKey, JSON.stringify(saved));
  }

  checklist.forEach(box => {
    box.addEventListener("change", updateChecklist);
  });

  // 6. RESET PROGRESS

  resetButton.addEventListener("click", () => {

    const confirmed = confirm(
      "Are you sure you want to reset all ECE learning progress?"
    );

    if (!confirmed) return;

    Object.keys(roadmaps).forEach(path => {
      storage.remove("ece_roadmap_" + path);
    });

    storage.remove(checklistKey);

    checklist.forEach(box => {
      box.checked = false;
    });

    updateChecklist();
    renderRoadmap(currentPath);
  });

  // 7. INITIALIZE PAGE

  renderRoadmap("electronics");
  loadChecklist();

});

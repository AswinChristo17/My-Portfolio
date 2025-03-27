document.addEventListener("DOMContentLoaded", () => {
    // Set current year in footer
    document.getElementById("current-year").textContent = new Date().getFullYear()
  
    // Initialize particle background
    initParticleBackground()
  
    // Initialize typing effect
    initTypingEffect()
  
    // Initialize terminal
    initTerminal()
  
    // Initialize neural network visualization
    initNeuralNetwork()
  
    // Initialize skill orbs
    initSkillOrbs()
  
    // Initialize scroll handling
    initScrollHandling()
  
    // Initialize project cards hover effect
    initProjectCards()
  })
  
  // Particle Background
  function initParticleBackground() {
    const canvas = document.getElementById("particleCanvas")
    const ctx = canvas.getContext("2d")
  
    // Set canvas to full screen
    function resizeCanvas() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
  
    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
  
    // Create particles
    const particles = []
    const particleCount = Math.min(window.innerWidth / 10, 100) // Responsive particle count
  
    const colors = [
      "rgba(147, 51, 234, 0.7)", // purple
      "rgba(6, 182, 212, 0.7)", // cyan
      "rgba(16, 185, 129, 0.7)", // emerald
    ]
  
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }
  
    // Connect particles with lines if they are close enough
    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
  
          if (distance < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 120)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }
  
    // Animation loop
    function animate() {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
  
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].x += particles[i].speedX
        particles[i].y += particles[i].speedY
  
        // Bounce off edges
        if (particles[i].x > canvas.width || particles[i].x < 0) {
          particles[i].speedX = -particles[i].speedX
        }
  
        if (particles[i].y > canvas.height || particles[i].y < 0) {
          particles[i].speedY = -particles[i].speedY
        }
  
        // Draw particle
        ctx.beginPath()
        ctx.arc(particles[i].x, particles[i].y, particles[i].size, 0, Math.PI * 2)
        ctx.fillStyle = particles[i].color
        ctx.fill()
      }
  
      connectParticles()
    }
  
    animate()
  }
  
  // Typing Effect
  function initTypingEffect() {
    const typedTextElement = document.getElementById("typed-text")
    const fullText = "AI/ML Engineer & Deep Learning Enthusiast"
    let currentIndex = 0
    const typingSpeed = 100
  
    function typeNextCharacter() {
      if (currentIndex < fullText.length) {
        typedTextElement.textContent += fullText.charAt(currentIndex)
        currentIndex++
        setTimeout(typeNextCharacter, typingSpeed)
      }
    }
  
    typeNextCharacter()
  }
  
  // Terminal Effect
  function initTerminal() {
    const terminalTextElement = document.getElementById("terminal-text")
    const terminalCursor = document.getElementById("terminal-cursor")
  
    const terminalLines = [
      "> Aswin.currentStatus",
      '  "AI/ML Engineering Student"',
      "",
      "> Aswin.education",
      "  {",
      '    degree: "B.E CSE (AI&ML)",',
      '    institution: "Dr. Mahalingam College of Engineering and Technology",',
      "    gpa: 8.2,",
      '    year: "2023 - present"',
      "  }",
      "",
      "> Aswin.skills",
      "  [",
      '    "Machine Learning",',
      '    "Deep Learning",',
      '    "Computer Vision",',
      '    "Python",',
      '    "Generative AI",',
      '    "NLP"',
      "  ]",
      "",
      "> Aswin.objective",
      '  "I am a zealous second-year student in AI-ML with a strong foundation',
      "   in machine learning, deep learning, and real-time image processing.",
      "   With proficiency in Python and C, my practical experience includes",
      "   predictive modeling leveraging both CNNs and machine learning algorithms.",
      "   Recently I started to explore Generative AI and Large Language Models",
      "   to create intelligent systems. A team player with leadership capabilities,",
      "   I'm eager to grow and contribute to innovative ML engineering projects.\"",
      "",
      "> _",
    ]
  
    let currentLine = 0
    let currentChar = 0
  
    function typeTerminal() {
      if (currentLine >= terminalLines.length) return
  
      const line = terminalLines[currentLine]
  
      if (currentChar <= line.length) {
        terminalTextElement.textContent += line.charAt(currentChar)
        currentChar++
        setTimeout(typeTerminal, 20)
      } else {
        terminalTextElement.textContent += "\n"
        currentLine++
        currentChar = 0
        setTimeout(typeTerminal, 100)
      }
    }
  
    // Start typing
    typeTerminal()
  
    // Cursor blinking
    setInterval(() => {
      terminalCursor.style.opacity = terminalCursor.style.opacity === "0" ? "1" : "0"
    }, 500)
  }
  
  // Neural Network Visualization
  function initNeuralNetwork() {
    const canvas = document.getElementById("neuralNetworkCanvas")
    const ctx = canvas.getContext("2d")
  
    // Set canvas dimensions
    function resizeCanvas() {
      canvas.width = canvas.offsetWidth
      canvas.height = 300
    }
  
    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
  
    // Neural network structure
    const layers = [4, 8, 8, 4] // Number of neurons in each layer
    const neurons = []
  
    // Create neurons
    for (let l = 0; l < layers.length; l++) {
      const layerSize = layers[l]
      const layerX = (l + 1) * (canvas.width / (layers.length + 1))
  
      for (let n = 0; n < layerSize; n++) {
        const neuronY = ((n + 1) * canvas.height) / (layerSize + 1)
        neurons.push({
          x: layerX,
          y: neuronY,
          layer: l,
          index: n,
        })
      }
    }
  
    // Animation variables
    let pulsePhase = 0
  
    // Draw function
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
  
      // Draw connections first (so they appear behind neurons)
      for (let i = 0; i < neurons.length; i++) {
        const neuron = neurons[i]
  
        // Only draw connections from this neuron to the next layer
        if (neuron.layer < layers.length - 1) {
          // Find all neurons in the next layer
          const nextLayerNeurons = neurons.filter((n) => n.layer === neuron.layer + 1)
  
          for (const target of nextLayerNeurons) {
            // Calculate distance for pulse effect
            const dx = target.x - neuron.x
            const dy = target.y - neuron.y
            const distance = Math.sqrt(dx * dx + dy * dy)
  
            // Create pulse effect along the connection
            const pulsePosition = (pulsePhase * 2) % distance
            const pulseX = neuron.x + (dx * pulsePosition) / distance
            const pulseY = neuron.y + (dy * pulsePosition) / distance
  
            // Draw connection line
            ctx.beginPath()
            ctx.moveTo(neuron.x, neuron.y)
            ctx.lineTo(target.x, target.y)
            ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
            ctx.lineWidth = 0.5
            ctx.stroke()
  
            // Draw pulse
            if (Math.random() > 0.7) {
              // Only show some pulses to avoid overcrowding
              ctx.beginPath()
              ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2)
  
              // Gradient color based on position
              const gradient = ctx.createLinearGradient(neuron.x, neuron.y, target.x, target.y)
              gradient.addColorStop(0, "rgba(147, 51, 234, 0.8)") // purple
              gradient.addColorStop(0.5, "rgba(6, 182, 212, 0.8)") // cyan
              gradient.addColorStop(1, "rgba(16, 185, 129, 0.8)") // emerald
  
              ctx.fillStyle = gradient
              ctx.fill()
            }
          }
        }
      }
  
      // Draw neurons
      for (let i = 0; i < neurons.length; i++) {
        const neuron = neurons[i]
  
        // Neuron glow effect
        const glowRadius = 10 + Math.sin(pulsePhase + neuron.index * 0.2) * 2
  
        // Gradient for neuron
        let gradient
        if (neuron.layer === 0) {
          gradient = "rgba(147, 51, 234, 0.8)" // Input layer - purple
        } else if (neuron.layer === layers.length - 1) {
          gradient = "rgba(16, 185, 129, 0.8)" // Output layer - emerald
        } else {
          gradient = "rgba(6, 182, 212, 0.8)" // Hidden layers - cyan
        }
  
        // Draw glow
        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, glowRadius, 0, Math.PI * 2)
        ctx.fillStyle = gradient.replace("0.8", "0.2")
        ctx.fill()
  
        // Draw neuron
        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }
  
      // Update animation variables
      pulsePhase += 0.5
  
      requestAnimationFrame(draw)
    }
  
    // Start animation
    draw()
  }
  
  // Skill Orbs
  function initSkillOrbs() {
    const skillsGrid = document.querySelector(".skills-grid")
  
    const skills = [
      { name: "Machine Learning", icon: "brain", level: 90, color: "purple-cyan-gradient" },
      { name: "Deep Learning", icon: "brain", level: 85, color: "cyan-emerald-gradient" },
      { name: "Computer Vision", icon: "code", level: 80, color: "purple-cyan-gradient" },
      { name: "Python", icon: "code", level: 95, color: "cyan-emerald-gradient" },
      { name: "Generative AI", icon: "cpu", level: 75, color: "purple-cyan-gradient" },
      { name: "NLP", icon: "terminal", level: 70, color: "cyan-emerald-gradient" },
      { name: "TensorFlow", icon: "server", level: 85, color: "purple-cyan-gradient" },
      { name: "PyTorch", icon: "zap", level: 80, color: "cyan-emerald-gradient" },
    ]
  
    // Icons mapping
    const icons = {
      brain:
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M12 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16z"></path><path d="M12 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path><path d="M12 14a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path><path d="M12 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path></svg>',
      code: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
      cpu: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><path d="M15 2v2"></path><path d="M15 20v2"></path><path d="M2 15h2"></path><path d="M20 15h2"></path></svg>',
      terminal:
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>',
      server:
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>',
      zap: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',
    }
  
    // Create skill orbs
    skills.forEach((skill, index) => {
      const skillOrb = document.createElement("div")
      skillOrb.className = "skill-orb"
      skillOrb.setAttribute("data-index", index)
  
      skillOrb.innerHTML = `
        <div class="card skill-card">
          <div class="skill-progress">
            <svg class="w-full h-full" viewBox="0 0 100 100">
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                fill="none" 
                stroke="rgba(255,255,255,0.1)" 
                stroke-width="8" 
              />
              
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                fill="none" 
                stroke="url(#gradient-${index})"
                stroke-width="8" 
                stroke-linecap="round"
                stroke-dasharray="${2 * Math.PI * 40}"
                stroke-dashoffset="${2 * Math.PI * 40 * (1 - 0 / 100)}"
                transform="rotate(-90 50 50)"
                class="progress-circle"
                data-target="${skill.level}"
              />
              
              <defs>
                <linearGradient id="gradient-${index}" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="rgb(147, 51, 234)" />
                  <stop offset="100%" stop-color="rgb(6, 182, 212)" />
                </linearGradient>
              </defs>
            </svg>
            
            <div class="skill-icon">
              ${icons[skill.icon]}
            </div>
            
            <div class="skill-percentage ${skill.color}">
              <span class="percentage-value">0</span>%
            </div>
          </div>
          
          <h3 class="skill-name">${skill.name}</h3>
        </div>
        
        <div class="skill-glow ${skill.color}"></div>
      `
  
      skillsGrid.appendChild(skillOrb)
    })
  
    // Animate skill progress
    setTimeout(() => {
      const progressCircles = document.querySelectorAll(".progress-circle")
      const percentageValues = document.querySelectorAll(".percentage-value")
  
      progressCircles.forEach((circle, index) => {
        const target = Number.parseInt(circle.getAttribute("data-target"))
        let current = 0
  
        const interval = setInterval(() => {
          if (current >= target) {
            clearInterval(interval)
            return
          }
  
          current += 1
          percentageValues[index].textContent = current
  
          const circumference = 2 * Math.PI * 40
          const offset = circumference * (1 - current / 100)
          circle.setAttribute("stroke-dashoffset", offset)
        }, 20)
      })
    }, 500)
  }
  
  // Scroll Handling
  function initScrollHandling() {
    const header = document.getElementById("header")
    const navLinks = document.querySelectorAll(".nav-link")
    const sections = document.querySelectorAll("section")
  
    let lastScrollY = 0
  
    function handleScroll() {
      const scrollY = window.scrollY
  
      // Hide/show navbar based on scroll direction
      if (scrollY > lastScrollY && scrollY > 100) {
        header.style.transform = "translateY(-100%)"
      } else {
        header.style.transform = "translateY(0)"
      }
      lastScrollY = scrollY
  
      // Determine active section
      let activeSection = ""
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 200
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute("id")
  
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          activeSection = sectionId
        }
      })
  
      // Update active nav link
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("data-section") === activeSection) {
          link.classList.add("active")
        }
      })
    }
  
    window.addEventListener("scroll", handleScroll)
  
    // Smooth scrolling for nav links
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("data-section")
        const targetSection = document.getElementById(targetId)
  
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href").substring(1)
        const targetElement = document.getElementById(targetId)
  
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: "smooth",
          })
        }
      })
    })
  }


  // Project Cards Hover Effect
  function initProjectCards() {
    const projectCards = document.querySelectorAll(".project-card")
  
    projectCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.querySelector(".project-accent").style.transform = "scale(1.5)"
      })
  
      card.addEventListener("mouseleave", function () {
        this.querySelector(".project-accent").style.transform = "scale(1)"
      })
    })
  }
  
  

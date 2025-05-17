// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Set current year in footer
    document.getElementById("current-year").textContent = new Date().getFullYear()
  
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
    
    // Initialize responsive behavior
    initResponsive()
    
    // Initialize subtle animations for shapes
    initSubtleAnimations()
})
  
// Responsive behavior
function initResponsive() {
    // Debounce function to limit execution frequency
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Check if device is mobile
    function isMobile() {
        return window.innerWidth < 768;
    }
    
    // Handle responsive adjustments on resize
    const handleResize = debounce(function() {
        // Adjust terminal height for small screens
        const terminal = document.querySelector('.terminal-content');
        if (terminal) {
            if (window.innerHeight < 700) {
                terminal.style.height = '250px';
            } else {
                terminal.style.height = '400px';
            }
        }
        
        // Adjust neural network for small screens
        const neuralCanvas = document.getElementById('neuralNetworkCanvas');
        if (neuralCanvas) {
            if (isMobile()) {
                neuralCanvas.height = 200;
            } else {
                neuralCanvas.height = 300;
            }
            // Force redraw of neural network if it exists
            if (typeof drawNeuralNetwork === 'function') {
                drawNeuralNetwork();
            }
        }
    }, 250);
    
    // Listen for resize events
    window.addEventListener('resize', handleResize);
    
    // Call once on init
    handleResize();
}

// Subtle animations for background shapes
function initSubtleAnimations() {
    const shapes = document.querySelectorAll('.shape');
    
    // Slightly adjust shape positions on mouse move for parallax effect
    document.addEventListener('mousemove', debounce(function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const depth = 0.05 * (index + 1);
            const moveX = (mouseX - 0.5) * depth * 100;
            const moveY = (mouseY - 0.5) * depth * 100;
            
            shape.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${index * 5}deg) scale(${1 + index * 0.05})`;
        });
    }, 10));
    
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
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
    const terminalContent = document.getElementById("terminal-content")
    const aboutSection = document.getElementById("about")
  
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
    let typeInterval
  
    function typeTerminal() {
      if (currentLine >= terminalLines.length) return
  
      const line = terminalLines[currentLine]
  
      if (currentChar <= line.length) {
        terminalTextElement.textContent = buildTerminalText()
        currentChar++
        typeInterval = setTimeout(typeTerminal, 20)
        
        // Scroll to bottom to follow text
        terminalContent.scrollTop = terminalContent.scrollHeight
      } else {
        currentLine++
        currentChar = 0
        terminalTextElement.textContent = buildTerminalText()
        typeInterval = setTimeout(typeTerminal, 100)
        
        // Scroll to bottom to follow text
        terminalContent.scrollTop = terminalContent.scrollHeight
      }
    }
    
    // Helper function to build terminal text
    function buildTerminalText() {
      let content = ""
      
      // Add all completed lines
      for (let i = 0; i < currentLine; i++) {
        content += terminalLines[i] + "\n"
      }
      
      // Add the current line up to the current character
      if (currentLine < terminalLines.length) {
        content += terminalLines[currentLine].substring(0, currentChar)
      }
      
      return content
    }
  
    function resetAndStartTerminal() {
      // Clear any existing intervals
      clearTimeout(typeInterval)
      
      // Reset terminal state
      currentLine = 0
      currentChar = 0
      
      // Clear terminal text
      terminalTextElement.textContent = ""
      
      // Start typing again
      typeTerminal()
    }
    
    // Start terminal on load
    resetAndStartTerminal()
    
    // Set up Intersection Observer to detect when about section is visible
    const terminalObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Reset and restart the terminal when the about section comes into view
          resetAndStartTerminal()
        }
      })
    }, { threshold: 0.1 })
    
    // Observe the about section
    if (aboutSection) {
      terminalObserver.observe(aboutSection)
    }
    
    // Also reset terminal when clicking the "About" navigation link
    document.querySelectorAll('.nav-link[data-section="about"]').forEach(link => {
      link.addEventListener('click', function() {
        // Small delay to ensure section is in view before restarting
        setTimeout(resetAndStartTerminal, 500)
      })
    })
}
  
// Neural Network Visualization
function initNeuralNetwork() {
    const canvas = document.getElementById("neuralNetworkCanvas")
    const ctx = canvas.getContext("2d")
  
    // Set canvas dimensions
    function resizeCanvas() {
      canvas.width = canvas.offsetWidth
      canvas.height = window.innerWidth < 768 ? 200 : 300
    }
  
    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
  
    // Neural network structure - increased complexity
    const layers = [5, 10, 12, 10, 5] // More layers and neurons for a deeper network
    let neurons = []
    let connections = []
    let mouseX = 0
    let mouseY = 0
    let activeNeuron = null
    
    function initializeNeurons() {
        neurons = [];
        connections = [];
        
        // Create neurons
        for (let l = 0; l < layers.length; l++) {
            const layerSize = layers[l]
            const layerX = (l + 1) * (canvas.width / (layers.length + 1))
      
            for (let n = 0; n < layerSize; n++) {
                const neuronY = ((n + 1) * canvas.height) / (layerSize + 1)
                const neuron = {
                    x: layerX,
                    y: neuronY,
                    layer: l,
                    index: n,
                    radius: 4,  // Base radius
                    hovered: false,
                    pulsePhase: Math.random() * Math.PI * 2, // Random starting phase
                    color: l % 3  // Color based on layer
                };
                neurons.push(neuron);
            }
        }
        
        // Create connections between neurons in adjacent layers
        for (let i = 0; i < neurons.length; i++) {
            const neuron = neurons[i];
            if (neuron.layer < layers.length - 1) {
                // Connect to all neurons in the next layer
                const nextLayerNeurons = neurons.filter(n => n.layer === neuron.layer + 1);
                
                for (let j = 0; j < nextLayerNeurons.length; j++) {
                    const targetNeuron = nextLayerNeurons[j];
                    const weight = Math.random() * 0.8 + 0.2; // Random weight between 0.2 and 1.0
                    
                    connections.push({
                        source: neuron,
                        target: targetNeuron,
                        weight: weight,
                        pulseSpeed: 0.3 + Math.random() * 0.7, // Random speed
                        pulsePosition: Math.random(), // Random starting position
                        pulseActive: Math.random() > 0.3, // 70% of connections are active initially
                        hovered: false
                    });
                }
            }
        }
    }
    
    initializeNeurons();
  
    // Animation variables
    let pulsePhase = 0;
    let lastFrameTime = 0;
    
    // Colors with increased vibrancy
    const colors = [
        {
            main: "rgba(147, 51, 234, 1)",      // Purple
            pulse: "rgba(147, 51, 234, 0.8)",
            glow: "rgba(147, 51, 234, 0.4)",
            connection: "rgba(147, 51, 234, 0.15)"
        },
        {
            main: "rgba(6, 182, 212, 1)",       // Cyan
            pulse: "rgba(6, 182, 212, 0.8)",
            glow: "rgba(6, 182, 212, 0.4)",
            connection: "rgba(6, 182, 212, 0.15)"
        },
        {
            main: "rgba(16, 185, 129, 1)",      // Emerald
            pulse: "rgba(16, 185, 129, 0.8)",
            glow: "rgba(16, 185, 129, 0.4)",
            connection: "rgba(16, 185, 129, 0.15)"
        }
    ];
  
    // Draw function with enhanced effects
    function drawNeuralNetwork() {
        if (!ctx) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Create gradient background for canvas
        const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        bgGradient.addColorStop(0, "rgba(10, 10, 15, 0)");
        bgGradient.addColorStop(0.5, "rgba(10, 10, 15, 0.03)");
        bgGradient.addColorStop(1, "rgba(10, 10, 15, 0)");
        
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections first (so they appear behind neurons)
        connections.forEach(connection => {
            const { source, target, weight, pulsePosition, pulseActive, hovered } = connection;
            const colorSet = colors[source.color];
            
            // Calculate gradient points
            const gradientX = source.x + (target.x - source.x) * pulsePosition;
            const gradientY = source.y + (target.y - source.y) * pulsePosition;
            
            // Calculate distance for line thickness
            const dx = target.x - source.x;
            const dy = target.y - source.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Draw connection with thickness based on weight
            ctx.beginPath();
            ctx.strokeStyle = connection.hovered ? 
                colorSet.main.replace("1)", "0.4)") : 
                colorSet.connection;
            ctx.lineWidth = connection.hovered ? 2 : weight * 1.5;
            ctx.moveTo(source.x, source.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();
            
            // Only draw pulse on active connections
            if (pulseActive) {
                // Draw moving pulse with glow
                ctx.beginPath();
                const pulseRadius = connection.hovered ? 4 : 2.5;
                ctx.arc(gradientX, gradientY, pulseRadius, 0, Math.PI * 2);
                
                // Add glow effect to pulse
                const pulseGradient = ctx.createRadialGradient(
                    gradientX, gradientY, 0,
                    gradientX, gradientY, pulseRadius * 2
                );
                pulseGradient.addColorStop(0, colorSet.pulse);
                pulseGradient.addColorStop(1, "rgba(0,0,0,0)");
                
                ctx.fillStyle = colorSet.pulse;
                ctx.fill();
                
                // Add a subtle trail to pulses
                ctx.beginPath();
                const trailX = source.x + (target.x - source.x) * (pulsePosition - 0.05);
                const trailY = source.y + (target.y - source.y) * (pulsePosition - 0.05);
                ctx.arc(trailX, trailY, pulseRadius * 0.6, 0, Math.PI * 2);
                ctx.fillStyle = colorSet.pulse.replace("0.8", "0.4");
                ctx.fill();
            }
        });
      
        // Draw neurons with enhanced effects
        neurons.forEach(neuron => {
            const { x, y, radius, hovered, pulsePhase, color } = neuron;
            const colorSet = colors[color];
            
            // Dynamic radius with pulsing effect
            const pulseFactor = Math.sin(pulsePhase) * 0.2 + 1;
            const effectiveRadius = hovered ? radius * 1.8 : radius * pulseFactor;
            
            // Draw neuron glow (larger for hovered)
            const glowRadius = hovered ? effectiveRadius * 2.5 : effectiveRadius * 2;
            const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
            glowGradient.addColorStop(0, colorSet.glow);
            glowGradient.addColorStop(1, "rgba(0,0,0,0)");
            
            ctx.beginPath();
            ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
            ctx.fillStyle = glowGradient;
            ctx.fill();
            
            // Draw neuron with gradient fill
            const neuronGradient = ctx.createRadialGradient(
                x - radius/3, y - radius/3, 0,
                x, y, effectiveRadius
            );
            neuronGradient.addColorStop(0, "#ffffff");
            neuronGradient.addColorStop(0.3, colorSet.main);
            neuronGradient.addColorStop(1, colorSet.main.replace("1)", "0.7)"));
            
            ctx.beginPath();
            ctx.arc(x, y, effectiveRadius, 0, Math.PI * 2);
            ctx.fillStyle = neuronGradient;
            ctx.fill();
            
            // Add highlight dot to give 3D effect
            ctx.beginPath();
            ctx.arc(x - effectiveRadius/3, y - effectiveRadius/3, effectiveRadius/4, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.fill();
        });
    }
    
    // Update function for animation
    function updateNetwork(timestamp) {
        // Calculate delta time for smooth animation regardless of frame rate
        const deltaTime = timestamp - lastFrameTime;
        lastFrameTime = timestamp;
        const timeScale = deltaTime / 16.67; // Normalize to ~60fps
        
        // Update pulse phase for neurons
        neurons.forEach(neuron => {
            neuron.pulsePhase += 0.02 * timeScale;
            if (neuron.pulsePhase > Math.PI * 2) {
                neuron.pulsePhase -= Math.PI * 2;
            }
        });
        
        // Update pulse positions
        connections.forEach(connection => {
            if (connection.pulseActive) {
                connection.pulsePosition += 0.004 * connection.pulseSpeed * timeScale;
                if (connection.pulsePosition > 1) {
                    connection.pulsePosition = 0;
                    // Randomly deactivate some connections to create natural flow
                    connection.pulseActive = Math.random() > 0.1;
                }
            } else if (Math.random() < 0.001 * timeScale) {
                // Randomly activate inactive connections
                connection.pulseActive = true;
            }
        });
    }
    
    // Expose the draw function globally
    window.drawNeuralNetwork = drawNeuralNetwork;
  
    // Handle mouse interaction
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        
        // Check if mouse is over any neuron
        let hoveredNeuron = false;
        neurons.forEach(neuron => {
            const dx = neuron.x - mouseX;
            const dy = neuron.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Larger hover area than visual size
            neuron.hovered = distance < 15;
            if (neuron.hovered) {
                hoveredNeuron = true;
            }
        });
        
        // If no neuron is hovered, check connections
        if (!hoveredNeuron) {
            connections.forEach(connection => {
                // Check if mouse is near the connection line
                const { source, target } = connection;
                const A = mouseY - source.y;
                const B = source.x - mouseX;
                const C = source.x * (source.y - target.y) + source.y * (target.x - source.x);
                
                // Distance from point to line
                const distance = Math.abs(A * target.x + B * target.y + C) / 
                                Math.sqrt(A * A + B * B);
                                
                // Check if the point is within the line segment
                const dotProduct = ((mouseX - source.x) * (target.x - source.x) + 
                                   (mouseY - source.y) * (target.y - source.y));
                const squaredLength = Math.pow(target.x - source.x, 2) + 
                                     Math.pow(target.y - source.y, 2);
                                     
                connection.hovered = (distance < 8) && 
                                    (dotProduct >= 0) && 
                                    (dotProduct <= squaredLength);
                                    
                // Activate connection on hover
                if (connection.hovered) {
                    connection.pulseActive = true;
                }
            });
        }
    });
    
    // Handle clicks on the network
    canvas.addEventListener('click', (e) => {
        // Find clicked neuron
        const clickedNeuron = neurons.find(neuron => neuron.hovered);
        
        if (clickedNeuron) {
            // Activate connections from this neuron
            connections.forEach(connection => {
                if (connection.source === clickedNeuron || connection.target === clickedNeuron) {
                    connection.pulseActive = true;
                    // Reset pulse position if it's the source
                    if (connection.source === clickedNeuron) {
                        connection.pulsePosition = 0;
                    }
                }
            });
            
            // Visual effect for clicked neuron
            clickedNeuron.radius = 6;
            setTimeout(() => {
                clickedNeuron.radius = 4;
            }, 300);
        }
    });
    
    // Leave canvas event
    canvas.addEventListener('mouseleave', () => {
        neurons.forEach(neuron => {
            neuron.hovered = false;
        });
        connections.forEach(connection => {
            connection.hovered = false;
        });
    });
  
    // Animation loop with timestamp
    function animate(timestamp) {
        requestAnimationFrame(animate);
        updateNetwork(timestamp);
        drawNeuralNetwork();
    }
  
    // Start animation
    animate(0);
    
    // Handle resize to redraw neurons
    window.addEventListener("resize", () => {
        resizeCanvas();
        initializeNeurons();
    });
}
  
// Skill Orbs
function initSkillOrbs() {
    const skillsGrid = document.querySelector(".skills-grid")
    // Get existing skill orb elements
    const existingOrbs = document.querySelectorAll(".skill-orb")
  
    const skills = [
      { name: "Machine Learning", icon: "brain", level: 90, color: "purple-cyan-gradient" },
      { name: "Deep Learning", icon: "brain", level: 85, color: "cyan-emerald-gradient" },
      { name: "Computer Vision", icon: "code", level: 80, color: "purple-cyan-gradient" },
      { name: "Python", icon: "code", level: 95, color: "cyan-emerald-gradient" },
      { name: "Generative AI", icon: "cpu", level: 75, color: "purple-cyan-gradient" },
      { name: "NLP", icon: "terminal", level: 70, color: "cyan-emerald-gradient" },
      { name: "TensorFlow", icon: "server", level: 85, color: "purple-cyan-gradient" },
      { name: "PyTorch", icon: "zap", level: 80, color: "cyan-emerald-gradient" },
      { name: "SQL", icon: "database", level: 65, color: "purple-cyan-gradient" },
      { name: "Java", icon: "coffee", level: 70, color: "cyan-emerald-gradient" },
      { name: "Flask", icon: "server", level: 68, color: "purple-cyan-gradient" },
      { name: "Git", icon: "git-branch", level: 75, color: "cyan-emerald-gradient" }
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
      database: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>',
      coffee: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>',
      'git-branch': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></svg>'
    }
  
    // First, clear all existing skill orbs to ensure clean state
    existingOrbs.forEach(orb => {
      if (orb && orb.parentNode) {
        orb.parentNode.removeChild(orb);
      }
    });
  
    // Populate skill orbs
    skills.forEach((skill, index) => {
      // Create a fresh orb for each skill
      const skillOrb = document.createElement("div");
      skillOrb.className = "skill-orb";
      skillOrb.setAttribute("data-index", index);
  
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
      `;
      
      skillsGrid.appendChild(skillOrb);
    })

    // Animate skill progress with intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // When the skills section is visible, start the animation
          animateSkills();
          // Disconnect the observer after animation starts
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });
    
    // Observe the skills grid
    if (skillsGrid) {
      observer.observe(skillsGrid);
    }
    
    function animateSkills() {
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
    }
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
    
    // Add scroll reveal animation
    const revealElements = document.querySelectorAll('.card, .project-card, .education-card, .timeline-item');
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Once revealed, no need to observe anymore
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
      element.classList.add('reveal-element');
      revealObserver.observe(element);
    });
}
  
// Project Cards Hover Effect
function initProjectCards() {
    const projectCards = document.querySelectorAll(".project-card")
  
    projectCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.querySelector(".project-accent").style.transform = "scale(1.5)";
        this.style.transform = "translateY(-10px)";
        this.style.zIndex = "10";
      })
  
      card.addEventListener("mouseleave", function () {
        this.querySelector(".project-accent").style.transform = "scale(1)";
        this.style.transform = "translateY(0)";
        setTimeout(() => {
          this.style.zIndex = "1";
        }, 300);
      })
    })
}
  
  
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import styles from "./index.module.css";

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Typewriter State
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Typewriter Words
  const words = ["Web Experiences", "Scalable Systems", "Robust APIs", "Next.js Apps"];

  const getTechBadgeClass = (tech) => {
    const lower = tech.toLowerCase();
    if (lower.includes('react') || lower.includes('next') || lower.includes('css')) return styles.badgeBlue;
    if (lower.includes('node') || lower.includes('mongo') || lower.includes('express')) return styles.badgeGreen;
    if (lower.includes('socket') || lower.includes('docker')) return styles.badgePurple;
    if (lower.includes('js') || lower.includes('html')) return styles.badgeYellow;
    return '';
  };

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000); // Pause before deleting
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500); // Pause before starting new word
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, words]);

  // Matrix Rain Canvas
  const canvasRef = useRef(null);

  // Constellation / Network Particle Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const particleCount = Math.min(Math.floor(window.innerWidth / 20), 80); // Increased density
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8, // Faster movement
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 1.5 + 0.5, // Slightly larger variation
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear screen

      // Draw Particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(99, 102, 241, 0.4)"; // Faint Indigo
        ctx.fill();

        // Draw Connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          const maxDist = 70; // Reduced connection range

          if (dist < maxDist) {
            ctx.beginPath();
            // Higher opacity multiplier (0.6) for sharpness, but thinner line
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.6 * (1 - dist / maxDist)})`;
            ctx.lineWidth = 0.8; // Thinner for sharpness
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Run Code Interaction
  const [runOutput, setRunOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = () => {
    setIsRunning(true);
    setRunOutput(null);
    setTimeout(() => {
      setRunOutput("Ready to join your team!");
      setIsRunning(false);
    }, 1500);
  };

  const codeWindowRef = useRef(null);

  useEffect(() => {
    if (runOutput && codeWindowRef.current) {
      codeWindowRef.current.scrollTo({
        top: codeWindowRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [runOutput]);

  // Projects Scroll Logic
  const projectsRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);

  const handleScrollDots = () => {
    if (projectsRef.current) {
      const { scrollLeft, clientWidth } = projectsRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveProject(index);
    }
  };

  useEffect(() => {
    const el = projectsRef.current;
    if (el) {
      el.addEventListener('scroll', handleScrollDots);
    }
    return () => {
      if (el) el.removeEventListener('scroll', handleScrollDots);
    };
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  // Back to Top and Scroll Reveal State
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShowBackToTop(true);
      else setShowBackToTop(false);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.revealVisible);
        }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll(`.${styles.reveal}`);
    hiddenElements.forEach((el) => observer.observe(el));

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  return (
    <div className={styles.hero}>
      <Head>
        <title>Preetham Nandyala | Full-Stack Developer</title>
        <meta name="description" content="Portfolio of Preetham Nandyala, a Full-Stack Developer specializing in real-time systems, MERN stack, and scalable web architecture." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Background Decor (Matrix Canvas) */}
      <canvas ref={canvasRef} className={styles.bgDecor} />

      {/* Back to Top Button */}
      <button
        className={`${styles.backToTop} ${showBackToTop ? styles.backToTopVisible : ''}`}
        onClick={scrollToTop}
        aria-label="Back to Top"
      >
        ↑
      </button>

      {/* Navigation */}
      <header className={styles.nav}>
        <div className={styles.navBrand}>
          <span className={styles.logoText}>Nandyala Preetham</span>
        </div>

        <button
          className={styles.menuBtn}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>

        <div className={`${styles.navActions} ${mobileMenuOpen ? styles.navActionsOpen : ""}`}>
          <a href="#home" onClick={(e) => scrollToSection(e, "home")} className={styles.navLink}>
            Home
          </a>
          <a href="#about" onClick={(e) => scrollToSection(e, "about")} className={styles.navLink}>
            About
          </a>
          <a href="#projects" onClick={(e) => scrollToSection(e, "projects")} className={styles.navLink}>
            Projects
          </a>

          <a href="#architecture" onClick={(e) => scrollToSection(e, "architecture")} className={styles.navLink}>
            Architecture
          </a>
          <a href="#contact" onClick={(e) => scrollToSection(e, "contact")} className={styles.navLink}>
            Contact
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Architecting <br />
              <span className={styles.titleHighlight}>{text}</span>
              <span className={styles.cursor}>|</span>
            </h1>
            <p className={styles.heroSubtitle}>
              I build pixel-perfect frontends backed by robust, scalable APIs. <br />
              Bridging the gap between design and system architecture.
            </p>
            <div className={styles.badges}>
              <span className={styles.badge}>Status: Available for Hire</span>
              <span className={styles.badge}>Focus: MERN Stack & Next.js</span>
            </div>
            <div className={styles.heroActions}>
              <a href="/resume.pdf" target="_blank" className={styles.heroBtnPrimary}>Resume</a>
              <a href="#projects" onClick={(e) => scrollToSection(e, "projects")} className={styles.heroBtnSecondary}>Work</a>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.codeWindow} ref={codeWindowRef}>
              <div className={styles.windowHeader}>
                <span className={styles.dotRed}></span>
                <span className={styles.dotYellow}></span>
                <span className={styles.dotGreen}></span>
                <button className={styles.runBtn} onClick={handleRunCode}>
                  {isRunning ? "..." : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px' }}>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Run
                    </>
                  )}
                </button>
              </div>
              <div className={styles.codeBlock}>
                <div className={styles.line}>
                  <span className={styles.k}>const</span> <span className={styles.f}>FullStackDev</span> <span className={styles.o}>=</span> <span className={styles.p}>{"{"}</span>
                </div>
                <div className={styles.line}>
                  <span className={styles.p}>  </span><span className={styles.k}>name</span>{": "}<span className={styles.s}>"Preetham"</span>{","}
                </div>
                <div className={styles.line}>
                  <span className={styles.p}>  </span><span className={styles.k}>stack</span>{": "}<span className={styles.p}>{"{"}</span>
                </div>
                <div className={styles.line}>
                  <span className={styles.p}>    </span><span className={styles.k}>frontend</span>{": "}<span className={styles.p}>{"["}</span><span className={styles.s}>"React"</span>{", "}<span className={styles.s}>"Next.js"</span>{", "}<span className={styles.s}>"JavaScript"</span><span className={styles.p}>{"],"}</span>
                </div>
                <div className={styles.line}>
                  <span className={styles.p}>    </span><span className={styles.k}>backend</span>{": "}<span className={styles.p}>{"["}</span><span className={styles.s}>"Node"</span>{", "}<span className={styles.s}>"Express"</span>{", "}<span className={styles.s}>"Socket.IO"</span><span className={styles.p}>{"],"}</span>
                </div>
                <div className={styles.line}>
                  <span className={styles.p}>    </span><span className={styles.k}>database</span>{": "}<span className={styles.s}>"MongoDB"</span>
                </div>
                <div className={styles.line}>
                  <span className={styles.p}>  </span><span className={styles.p}>{"},"}</span>
                </div>
                <div className={styles.line}>
                  <span className={styles.p}>  </span><span className={styles.f}>build</span>{": "}<span className={styles.k}>()</span> <span className={styles.o}>=&gt;</span> <span className={styles.s}>"Scalable Systems 🚀"</span>
                </div>
                <div className={styles.line}>
                  <span className={styles.p}>{"}"}</span>;
                </div>
              </div>
              {/* Output Console */}
              {runOutput && (
                <div className={styles.consoleOutput}>
                  <span>&gt; Executing build...</span><br />
                  <span>&gt; <span className={styles.consoleSuccess}>{runOutput.replace("🚀", "")}</span></span>
                </div>
              )}
            </div>
          </div>
        </div >
      </section >

      {/* About Section */}
      < section id="about" className={styles.aboutSection} >
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>About Me</h2>

          <div className={styles.aboutGrid}>
            <div className={styles.aboutContent}>
              <p className={styles.paragraph}>
                I am a Full-Stack Developer who thrives on complex problem-solving. I don't just write code; I design systems that are efficient, secure, and easy to maintain.
              </p>
              <p className={styles.paragraph}>
                From crafting interactive UIs with <strong>React</strong> to engineering high-performance APIs with <strong>Node.js</strong>, I handle the entire development lifecycle with precision.
              </p>
            </div>

            <div className={styles.buildSideCard}>
              <h4 className={styles.buildSideCardTitle}>My Philosophy</h4>
              <p className={styles.buildSideCardText}>
                "Clean code, modular architecture, and user-centric design."
              </p>
              <p className={styles.buildSideCardText}>
                I build applications that scale today and adapt for tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section >

      {/* Projects Section */}
      < section id="projects" className={styles.projectsSection} >
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Featured Projects</h2>

          <div className={styles.projectsWrapper}>
            <div className={styles.projectsGrid} ref={projectsRef}>
              {/* ProConnect */}
              <div className={styles.projectCard}>
                <div className={styles.projectHeader}>
                  <h3 className={styles.projectTitle}>ProConnect</h3>
                  <span className={styles.statusBadge}>Live</span>
                </div>
                <div className={styles.projectDesc}>
                  <p>Full-stack networking platform with authentication, user profiles, posts, and connection management.</p>
<p >Implemented real-time one-to-one messaging using Socket.IO for instant communication.</p>
<p >Built scalable REST APIs and optimized MongoDB queries for performance and data consistency.</p>
</div>
                <div className={styles.techStack}>
                  <span className={`${styles.techBadge} ${getTechBadgeClass('Next.js')}`}>Next.js</span>
                  <span className={`${styles.techBadge} ${getTechBadgeClass('Node.js')}`}>Node.js</span>
                  <span className={`${styles.techBadge} ${getTechBadgeClass('Socket.IO')}`}>Socket.IO</span>
                  <span className={`${styles.techBadge} ${getTechBadgeClass('MongoDB')}`}>MongoDB</span>
                  <span className={`${styles.techBadge} ${getTechBadgeClass('Next.js')}`}>Redux</span>

                </div>
                <div className={styles.projectFeatures}>
                  <p className={styles.projectFeature}>✓ JWT Authentication</p>
                  <p className={styles.projectFeature}>✓ Real-time Communication</p>
                </div>
                <div className={styles.projectActions}>
                  <a href="https://github.com/preetham-nandyala" target="_blank" className={styles.actionBtn}>GitHub</a>
                  <a href="https://pro-connect-kappa.vercel.app/dashboard" className={styles.actionBtnOutline}>Live Demo</a>
                </div>
              </div>

              {/* RTL Vault */}
              <div className={styles.projectCard}>
                <div className={styles.projectHeader}>
                  <h3 className={styles.projectTitle}>RTL Vault</h3>
                  <span className={styles.statusBadge}>v2.0</span>
                </div>
                <div className={styles.projectDesc}>
                  <p>Web-based platform for writing and executing Verilog (RTL) code in an online environment.</p>
                  <p>Implemented role-based access control (RBAC) to manage user permissions and secure access.</p>
                  <p>Built backend services to handle code submission, execution, and result processing reliably.</p>
                </div>
                <div className={styles.techStack}>
                  <span className={`${styles.techBadge} ${getTechBadgeClass('Next.js')}`}>Next.js</span>
                  <span className={`${styles.techBadge} ${getTechBadgeClass('Express.js')}`}>Express.js</span>
                  <span className={`${styles.techBadge} ${styles.badgeBlue}`}>Monaco</span>
                  <span className={`${styles.techBadge} ${getTechBadgeClass('Docker')}`}>Docker</span>
                </div>
                <div className={styles.projectFeatures}>
                  <p className={styles.projectFeature}>✓ RBAC System</p>
                  <p className={styles.projectFeature}>✓ Secure Code Execution</p>
                </div>
                <div className={styles.projectActions}>
                  <a href="https://github.com/preetham-nandyala/RTL-Vault" target="_blank" className={styles.actionBtn}>GitHub</a>
                  <a href="#" className={styles.actionBtnOutline}>Live Demo</a>
                </div>
              </div>

              <div className={styles.projectCard}>
                <div className={styles.projectHeader}>
                  <h3 className={styles.projectTitle}>SkillForge</h3>
                  <span className={styles.statusBadge}>v1.0</span>
                </div>
                <div className={styles.projectDesc}>
                  <p>SkillForge is a web-based platform for learning aptitude and programming concepts.</p>
                  <p>It offers structured study material with timed, difficulty-based, section-wise assessments.</p>
                  <p>The platform tracks user progress, test attempts, and performance with admin-managed controls.</p>
                </div>
                <div className={styles.techStack}>
                  <span className={`${styles.techBadge} ${getTechBadgeClass('Next.js')}`}>Next.js</span>
                  <span className={`${styles.techBadge} ${getTechBadgeClass('Express.js')}`}>Express.js</span>
                  <span className={`${styles.techBadge} ${styles.badgeBlue}`}>Monaco</span>
                  <span className={`${styles.techBadge} ${getTechBadgeClass('Docker')}`}>React.js</span>
                </div>
                <div className={styles.projectFeatures}>
                  <p className={styles.projectFeature}>✓ Learning & Assessments</p>
                  <p className={styles.projectFeature}>✓ Timed Tests</p>
                </div>
                <div className={styles.projectActions}>
                  <a href="https://github.com/preetham-nandyala/Skill-Forge" target="_blank" className={styles.actionBtn}>GitHub</a>
                  <a href="#" className={styles.actionBtnOutline}>Live Demo</a>
                </div>
              </div>

              {/* Simon Says */}
              {/* <div className={styles.projectCard}>
                <div className={styles.projectHeader}>
                  <h3 className={styles.projectTitle}>Simon Says</h3>
                  <span className={styles.statusBadge}>Game</span>
                </div>
                <p className={styles.projectDesc}>Browser-based interactive logic game. Features complex state management without external frameworks.</p>
                <div className={styles.techStack}>
                  <span className={`${styles.techBadge} ${getTechBadgeClass('HTML')}`}>HTML</span>
                  <span className={`${styles.techBadge} ${getTechBadgeClass('CSS')}`}>CSS</span>
                  <span className={`${styles.techBadge} ${getTechBadgeClass('JavaScript')}`}>JavaScript</span>
                </div>
                <div className={styles.projectFeatures}>
                  <p className={styles.projectFeature}>✓ Pure DOM Manipulation</p>
                  <p className={styles.projectFeature}>✓ Zero Dependencies</p>
                </div>
                <div className={styles.projectActions}>
                  <a href="https://github.com/preetham-nandyala" target="_blank" className={styles.actionBtn}>GitHub</a>
                  <a href="#" className={styles.actionBtnOutline}>Play Now</a>
                </div>
              </div> */}
            </div>
            <div className={styles.paginationDots}>
              {[0, 1, 2].map((idx) => (
                <span
                  key={idx}
                  className={`${styles.dot} ${activeProject === idx ? styles.dotActive : ''}`}
                  onClick={() => {
                    if (projectsRef.current) {
                      projectsRef.current.scrollTo({
                        left: idx * projectsRef.current.clientWidth,
                        behavior: 'smooth'
                      });
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>





      {/* Architecture Section - formerly Request/Response Cycle */}
      <section id="architecture" className={styles.systemMapSection}>
        <div className={styles.sectionContent}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>System Architecture</h2>
            <p className={styles.flowDescription}>
              My full-stack ecosystem: From user interaction to database persistence.
            </p>
          </div>

          <div className={styles.systemMapContainer}>

            {/* 1. The Paths & Flow Light */}
            <svg className={styles.systemSvg} viewBox="0 0 1000 500">
              <defs>
                <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
                  <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* DevOps Paths (Dashed, Static) */}
              <path d="M 500 120 L 500 220" stroke="#475569" strokeWidth="2" strokeDasharray="6,6" />
              <path d="M 500 120 L 150 120 L 150 220" stroke="#475569" strokeWidth="2" strokeDasharray="6,6" fill="none" />
              <path d="M 500 120 L 850 120 L 850 220" stroke="#475569" strokeWidth="2" strokeDasharray="6,6" fill="none" />

              {/* Main Data Flow Path (Client -> Auth -> Server -> DB) */}
              <path id="mainFlow" d="M 150 280 L 350 280 L 600 280 L 850 280" stroke="#1e293b" strokeWidth="4" fill="none" />

              {/* The "Flow Light" - Moving Packet */}
              <motion.circle r="6" fill="#38bdf8" filter="url(#glow)">
                <motion.animateMotion
                  repeatCount="indefinite"
                  duration="4s"
                  ease="linear"
                  path="M 150 280 L 350 280 L 600 280 L 850 280"
                />
              </motion.circle>

              {/* Return Flow (DB -> Client) - Faint */}
              <motion.circle r="4" fill="#4ade80" opacity="0.5">
                <motion.animateMotion
                  repeatCount="indefinite"
                  duration="4s"
                  ease="linear"
                  begin="2s"
                  path="M 850 280 L 600 280 L 350 280 L 150 280"
                />
              </motion.circle>
            </svg>

            {/* NODES - Absolute Positioning for Perfect Alignment */}

            {/* 1. Client Node */}
            <motion.div
              className={styles.systemNode}
              style={{ top: '220px', left: '60px' }}
              animate={{
                boxShadow: ["0 0 0px rgba(56,189,248,0)", "0 0 20px rgba(56,189,248,0.5)", "0 0 0px rgba(56,189,248,0)"],
                borderColor: ["rgba(255,255,255,0.1)", "rgba(56,189,248,0.8)", "rgba(255,255,255,0.1)"]
              }}
              transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 0.2], delay: 0 }}
            >
              <div className={styles.sysIcon} style={{ color: '#38bdf8' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <div className={styles.sysTitle}>Client Side</div>
              <div className={styles.sysTech}>
                <span className={styles.sysTag}>React</span>
                <span className={styles.sysTag}>Next.js</span>
                <span className={styles.sysTag}>Tailwind</span>
              </div>
            </motion.div>

            {/* 2. Security Node */}
            <motion.div
              className={styles.systemNode}
              style={{ top: '220px', left: '280px', width: '140px' }}
              animate={{
                boxShadow: ["0 0 0px rgba(251,191,36,0)", "0 0 20px rgba(251,191,36,0.5)", "0 0 0px rgba(251,191,36,0)"],
                borderColor: ["rgba(255,255,255,0.1)", "rgba(251,191,36,0.8)", "rgba(255,255,255,0.1)"]
              }}
              transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 0.2], delay: 1.1 }} // ~1/3 of path
            >
              <div className={styles.sysIcon} style={{ fontSize: '1.5rem', color: '#fbbf24' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className={styles.sysTitle} style={{ fontSize: '0.9rem' }}>Security</div>
              <div className={styles.sysTech}>
                <span className={styles.sysTag}>JWT</span>
                <span className={styles.sysTag}>OAuth</span>
              </div>
            </motion.div>

            {/* 3. Server Node */}
            <motion.div
              className={styles.systemNode}
              style={{ top: '220px', left: '510px' }}
              animate={{
                boxShadow: ["0 0 0px rgba(139,92,246,0)", "0 0 20px rgba(139,92,246,0.5)", "0 0 0px rgba(139,92,246,0)"],
                borderColor: ["rgba(255,255,255,0.1)", "rgba(139,92,246,0.8)", "rgba(255,255,255,0.1)"]
              }}
              transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 0.2], delay: 2.3 }} // ~2/3 of path
            >
              <div className={styles.sysIcon} style={{ color: '#8b5cf6' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                  <line x1="6" y1="6" x2="6.01" y2="6" />
                  <line x1="6" y1="18" x2="6.01" y2="18" />
                </svg>
              </div>
              <div className={styles.sysTitle}>API Server</div>
              <div className={styles.sysTech}>
                <span className={styles.sysTag}>Node.js</span>
                <span className={styles.sysTag}>Express</span>
                <span className={styles.sysTag}>Socket.IO</span>
              </div>
            </motion.div>

            {/* 4. DB Node */}
            <motion.div
              className={styles.systemNode}
              style={{ top: '220px', left: '760px' }}
              animate={{
                boxShadow: ["0 0 0px rgba(74,222,128,0)", "0 0 20px rgba(74,222,128,0.5)", "0 0 0px rgba(74,222,128,0)"],
                borderColor: ["rgba(255,255,255,0.1)", "rgba(74,222,128,0.8)", "rgba(255,255,255,0.1)"]
              }}
              transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 0.2], delay: 3.5 }} // End of path
            >
              <div className={styles.sysIcon} style={{ color: '#22c55e' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                </svg>
              </div>
              <div className={styles.sysTitle}>Database</div>
              <div className={styles.sysTech}>
                <span className={styles.sysTag}>MongoDB</span>
                <span className={styles.sysTag}>Redis</span>
              </div>
            </motion.div>

            {/* 5. DevOps Node (Top Center) */}
            <motion.div
              className={styles.systemNode}
              style={{ top: '20px', left: '410px' }}
              whileHover={{ scale: 1.05 }}
            >
              <div className={styles.sysIcon} style={{ color: '#f43f5e' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.2 7.8l-7.7 7.7a3.5 3.5 0 0 1-4.95 0 3.5 3.5 0 0 1 0-4.95l7.7-7.7" />
                  <path d="M16.7 11.3l-7.7 7.7a3.5 3.5 0 0 1-4.95 0 3.5 3.5 0 0 1 0-4.95l7.7-7.7" />
                </svg>
              </div>
              <div className={styles.sysTitle}>CI/CD Pipeline</div>
              <div className={styles.sysTech}>
                <span className={styles.sysTag}>GitHub</span>
                <span className={styles.sysTag}>Docker</span>
                <span className={styles.sysTag}>Vercel</span>
              </div>
            </motion.div>


          </div>
        </div >
      </section >

      {/* CTA Section */}
      < section id="contact" className={styles.ctaSection} >
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Build Something Great?</h2>
          <p className={styles.ctaSubtitle}>Let's discuss your next project</p>
          <a href="mailto:nandyala.preetham755@gmail.com" className={styles.ctaButton}>
            Get in Touch
          </a>
        </div>
      </section >

      {/* Footer */}
      < footer className={styles.footer} >
        <div className={styles.footerContent}>
          <div className={styles.footerMain}>
            <div className={styles.footerSection}>
              <h3>Preetham</h3>
              <p>Full-stack developer focused on building scalable, secure systems.</p>
            </div>

            <div className={styles.footerLinks}>
              <div className={styles.footerColumn}>
                <h4>Connect</h4>
                <a href="https://github.com/preetham-nandyala" target="_blank" className={styles.footerLink}>
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/preetham-nandyala-531660193" target="_blank" className={styles.footerLink}>
                  LinkedIn
                </a>
                <a href="mailto:nandyala.preetham755@gmail.com" className={styles.footerLink}>
                  Email
                </a>
              </div>

              <div className={styles.footerColumn}>
                <h4>Quick Links</h4>
                <a href="#home" className={styles.footerLink}>Home</a>
                <a href="#about" className={styles.footerLink}>About</a>
                <a href="#projects" className={styles.footerLink}>Projects</a>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>© {new Date().getFullYear()} Preetham Nandyala. All rights reserved.</p>
          </div>
        </div>
      </footer >
    </div >
  );
}
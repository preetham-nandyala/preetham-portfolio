import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import styles from "./index.module.css";

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Typewriter State
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = ["Web Experiences", "Scalable Systems", "Robust APIs", "Next.js Apps"];

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
      const particleCount = Math.min(Math.floor(window.innerWidth / 15), 100); // Responsive count
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3, // Slow movement
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
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
          const maxDist = 120;

          if (dist < maxDist) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.15 * (1 - dist / maxDist)})`; // Fading Purple Line
            ctx.lineWidth = 1;
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
      setRunOutput("Ready to join your team! 🚀");
      setIsRunning(false);
    }, 1500);
  };

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

  const getTechBadgeClass = (tech) => {
    const lower = tech.toLowerCase();
    if (lower.includes('react') || lower.includes('next') || lower.includes('css')) return styles.badgeBlue;
    if (lower.includes('node') || lower.includes('mongo') || lower.includes('express')) return styles.badgeGreen;
    if (lower.includes('socket') || lower.includes('docker')) return styles.badgePurple;
    if (lower.includes('js') || lower.includes('html')) return styles.badgeYellow;
    return '';
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
          <a href="#skills" onClick={(e) => scrollToSection(e, "skills")} className={styles.navLink}>
            Skills
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
            <div className={styles.codeWindow}>
              <div className={styles.windowHeader}>
                <span className={styles.dotRed}></span>
                <span className={styles.dotYellow}></span>
                <span className={styles.dotGreen}></span>
                <button className={styles.runBtn} onClick={handleRunCode}>
                  {isRunning ? "..." : "▶ Run"}
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
                  <span className={styles.p}>    </span><span className={styles.k}>frontend</span>{": "}<span className={styles.p}>{"["}</span><span className={styles.s}>"React"</span>{", "}<span className={styles.s}>"Next.js"</span>{", "}<span className={styles.s}>"Tailwind"</span><span className={styles.p}>{"],"}</span>
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
                  <span>&gt; <span className={styles.consoleSuccess}>{runOutput}</span></span>
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

          <div className={styles.projectsGrid}>
            {/* ProConnect */}
            <div className={styles.projectCard}>
              <div className={styles.projectHeader}>
                <h3 className={styles.projectTitle}>ProConnect</h3>
                <span className={styles.statusBadge}>Live</span>
              </div>
              <p className={styles.projectDesc}>
                Real-time professional networking platform with authenticated users, socket-based communication, and media sharing.
              </p>
              <div className={styles.techStack}>
                <span className={`${styles.techBadge} ${getTechBadgeClass('Next.js')}`}>Next.js</span>
                <span className={`${styles.techBadge} ${getTechBadgeClass('Node.js')}`}>Node.js</span>
                <span className={`${styles.techBadge} ${getTechBadgeClass('Socket.IO')}`}>Socket.IO</span>
                <span className={`${styles.techBadge} ${getTechBadgeClass('MongoDB')}`}>MongoDB</span>
              </div>
              <div className={styles.projectFeatures}>
                <p className={styles.projectFeature}>✓ JWT Authentication</p>
                <p className={styles.projectFeature}>✓ Real-time Communication</p>
              </div>
              <div className={styles.projectActions}>
                <a href="https://github.com/preetham-nandyala" target="_blank" className={styles.actionBtn}>GitHub</a>
                <a href="#" className={styles.actionBtnOutline}>Live Demo</a>
              </div>
            </div>

            {/* RTL Vault */}
            <div className={styles.projectCard}>
              <div className={styles.projectHeader}>
                <h3 className={styles.projectTitle}>RTL Vault</h3>
                <span className={styles.statusBadge}>v2.0</span>
              </div>
              <p className={styles.projectDesc}>
                Role-based learning platform with separate admin and user experiences, integrated code editor, and modular architecture.
              </p>
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
                <a href="https://github.com/preetham-nandyala" target="_blank" className={styles.actionBtn}>GitHub</a>
                <a href="#" className={styles.actionBtnOutline}>Live Demo</a>
              </div>
            </div>

            {/* Simon Says */}
            <div className={styles.projectCard}>
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
            </div>
          </div>
        </div>
      </section >

      {/* Skills Section */}
      < section id="skills" className={styles.skillsSection} >
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Technical Skills</h2>

          <div className={styles.skillsGrid}>
            <div className={styles.skillColumn}>
              <div className={styles.skillHeader}>
                <span className={styles.skillIcon}>⚙️</span>
                <h3 className={styles.skillTitle}>Backend</h3>
              </div>
              <ul className={styles.skillList}>
                <li className={styles.skillListItem}>Node.js & Express.js</li>
                <li className={styles.skillListItem}>MongoDB & Mongoose</li>
                <li className={styles.skillListItem}>RESTful APIs</li>
                <li className={styles.skillListItem}>JWT & RBAC</li>
                <li className={styles.skillListItem}>Socket.IO</li>
              </ul>
            </div>

            <div className={styles.skillColumn}>
              <div className={styles.skillHeader}>
                <span className={styles.skillIcon}>🎨</span>
                <h3 className={styles.skillTitle}>Frontend</h3>
              </div>
              <ul className={styles.skillList}>
                <li className={styles.skillListItem}>React & Next.js</li>
                <li className={styles.skillListItem}>JavaScript (ES6+)</li>
                <li className={styles.skillListItem}>HTML5 & Accessibility</li>
                <li className={styles.skillListItem}>Tailwind CSS</li>
                <li className={styles.skillListItem}>Responsive Design</li>
              </ul>
            </div>

            <div className={styles.skillColumn}>
              <div className={styles.skillHeader}>
                <span className={styles.skillIcon}>🛠️</span>
                <h3 className={styles.skillTitle}>Tools & Practices</h3>
              </div>
              <ul className={styles.skillList}>
                <li className={styles.skillListItem}>Git & Version Control</li>
                <li className={styles.skillListItem}>Postman & API Testing</li>
                <li className={styles.skillListItem}>Docker</li>
                <li className={styles.skillListItem}>Cloudinary</li>
                <li className={styles.skillListItem}>Linux</li>
              </ul>
            </div>
          </div>

          <div className={styles.additionalSkills}>
            <h4 className={styles.additionalSkillsTitle}>Also Familiar With</h4>
            <div className={styles.skillTags}>
              <span className={styles.skillTag}>Redis</span>
              <span className={styles.skillTag}>WebSockets</span>
              <span className={styles.skillTag}>CI/CD</span>
              <span className={styles.skillTag}>Environment Config</span>
            </div>
          </div>
        </div>
      </section >

      {/* CTA Section */}
      < section id="contact" className={styles.ctaSection} >
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Build Something Great?</h2>
          <p className={styles.ctaSubtitle}>Let's discuss your next project</p>
          <a href="mailto:nanadyala.preetham755@gmail.com" className={styles.ctaButton}>
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
                <a href="mailto:nanadyala.preetham755@gmail.com" className={styles.footerLink}>
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
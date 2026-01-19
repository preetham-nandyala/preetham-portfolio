import Head from "next/head";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import styles from "./index.module.css";
import axios from "axios";


/* ===== Motion Presets ===== */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};



export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
  e.preventDefault();
  if (loading) return;

  setLoading(true);

  try {
    await axios.post("/api/contact", { name, email, message });
    alert("Message sent successfully!");
    setName(""); setEmail(""); setMessage("");
  } catch (err) {
    alert("Failed to send message");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <Head>
        <title>Preetham | Creative Web Developer</title>
        <meta
          name="description"
          content="Creative full stack developer portfolio with modern UI and polished UX."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* NAVBAR */}
      <nav className={styles.nav}>
        <div className={styles.logo}>Nandyala Preetham</div>

        <button
          className={styles.menuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <div className={styles.navLinksWrapper}>
          {mounted && (
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  className={styles.navLinks}
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: reduceMotion ? 0 : 0.25 }}
                >
                  <a href="#home" onClick={closeMenu}>Home</a>
                  <a href="#about" onClick={closeMenu}>About</a>
                  <a href="#projects" onClick={closeMenu}>Projects</a>
                  <a href="#skills" onClick={closeMenu}>Skills</a>
                  <a href="#resume" onClick={closeMenu}>Resume</a>
                  <a href="#contact" onClick={closeMenu}>Contact</a>
                </motion.div>
              )}
            </AnimatePresence>
          )}
          
          <div className={styles.socialLinks}>
            <a 
              href="https://github.com/preetham-nandyala" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className={styles.socialIcon}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/preetham-nandyala-531660193" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className={styles.socialIcon}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a 
              href="mailto:nanadyala.preetham755@gmail.com"
              aria-label="Email"
              className={styles.socialIcon}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>
          </div>
        </div>
      </nav>

      <main className={styles.app}>
        {/* HERO */}
        <motion.section
          id="home"
          className={styles.section}
          variants={fadeUp}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          transition={{ duration: reduceMotion ? 0 : 0.8 }}
        >
          <div className={styles.heroGrid}>
            <div>
              <h1 className={styles.headingXL}>
                Building <span className={styles.heroAccent}>Scalable</span> Web Systems
              </h1>
              <p className={styles.heroDescription}>
                Full-stack developer focused on backend architecture,
                APIs, and clean, maintainable interfaces.
              </p>

              <div className={styles.badges}>
                <span>MERN Stack</span>
                <span>Backend-Focused</span>
                <span>System Thinker</span>
              </div>
            </div>

            <motion.img
              src="/dummy.png"
              alt="Preetham's profile"
              className={styles.heroImage}
              whileHover={reduceMotion ? {} : { scale: 1.03 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.section>

        {/* ABOUT */}
        <motion.section
          id="about"
          className={styles.section}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: reduceMotion ? 0 : 0.6 }}
        >
          <div className={styles.aboutGrid}>
            <img
              src="/dummy.png"
              alt="About Preetham"
              className={`${styles.aboutImage} ${styles.hideOnMobile}`}
            />

            <div>
          <div className={styles.skillsHeader}>
              <h2 className={styles.sectionHeading}>About Me</h2>
              </div>
              <p className={styles.paragraph}>
                I approach development by understanding the problem first,
                designing the system architecture, and writing clean,
                reliable code.
              </p>
              <p className={styles.paragraph}>
                I enjoy backend logic, APIs, and building applications
                that work end-to-end in real-world environments.
              </p>
            </div>
          </div>
        </motion.section>

        {/* PROJECTS */}
        <motion.section
          id="projects"
          className={styles.section}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.6 }}
        >
          <div className={styles.skillsHeader}>
          <h2 className={styles.sectionHeading}>Projects</h2>
          </div>

          <div className={styles.projectGrid}>
            {[
              { 
                name: "ProConnect", 
                desc: "Professional networking platform with real-time features",
                tech: ["Node.js", "Express", "MongoDB", "Socket.IO", "JWT"],
                github: "https://github.com/preetham-nandyala",
                highlights: [
                  "Real-time communication layer using Socket.IO for live notifications",
                  "JWT-based authentication securing API routes",
                  "Scalable MongoDB schemas for users, connections, and interactions",
                  "RESTful APIs for profiles, connections, and activity flows"
                ]
              },
              { 
                name: "RTL Vault", 
                desc: "Learning & code evaluation platform with RBAC",
                tech: ["Node.js", "Express", "MongoDB", "JWT", "RBAC", "Docker"],
                github: "https://github.com/preetham-nandyala",
                highlights: [
                  "Role-based access control (RBAC) for secure permission handling",
                  "Structured code evaluation workflow with predictable execution",
                  "Docker containerization for environment consistency",
                  "System design focused on maintainable backend architecture"
                ]
              },
              { 
                name: "Simon Says", 
                desc: "Browser-based interactive logic game",
                tech: ["HTML", "CSS", "JavaScript"],
                github: "https://github.com/preetham-nandyala",
                highlights: [
                  "Pure JavaScript with DOM manipulation",
                  "Event-driven state handling for game progression",
                  "Clean logic flow and user interaction design"
                ]
              }
            ].map((project) => (
              <motion.div
                key={project.name}
                className={styles.projectCard}
                whileHover={reduceMotion ? {} : { y: -8 }}
                whileTap={reduceMotion ? {} : { scale: 0.97 }}
                onClick={() => setActiveProject(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveProject(project);
                  }
                }}
              >
                <h3 className={styles.projectTitle}>{project.name}</h3>
                <p className={styles.projectDescription}>{project.desc}</p>
                <div className={styles.techStack}>
                  {project.tech.slice(0, 3).map((tech) => (
                    <span key={tech} className={styles.techBadge}>{tech}</span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className={styles.techBadge}>+{project.tech.length - 3}</span>
                  )}
                </div>
                <span className={styles.projectCTA}>View details →</span>
              </motion.div>
            ))}

            <div className={styles.projectSideCard}>
              <h4 className={styles.sideCardTitle}>What I Build</h4>
              <p className={styles.sideCardText}>
                Scalable APIs, predictable logic, and maintainable systems.
              </p>
            </div>
          </div>
        </motion.section>

        {/* SKILLS */}
        <motion.section
          id="skills"
          className={styles.section}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.6 }}
        >
          <div className={styles.skillsHeader}>
            <h2 className={styles.sectionHeading}>Technical Skills</h2>
            <p className={styles.skillsSubheading}>
              Full-stack development with a strong focus on backend architecture and system design
            </p>
          </div>

          <motion.div
            className={styles.skillsMatrix}
            variants={reduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Backend Development",
                icon: "⚙️",
                color: "#6366f1",
                items: [
                  "Node.js & Express.js",
                  "MongoDB & Data Modeling",
                  "REST API Design",
                  "JWT & Authentication",
                  "Socket.IO (Real-time)",
                  "Docker & Containerization",
                ],
              },
              {
                title: "Frontend Development",
                icon: "🎨",
                color: "#ec4899",
                items: [
                  "React & Next.js",
                  "JavaScript (ES6+)",
                  "Responsive Design",
                  "CSS & Tailwind",
                  "HTML5 & Accessibility",
                ],
              },
              {
                title: "Tools & Practices",
                icon: "🛠️",
                color: "#10b981",
                items: [
                  "Git & Version Control",
                  "RBAC & Security",
                  "System Architecture",
                  "API Documentation",
                  "Agile Development",
                ],
              },
            ].map((col) => (
              <motion.div
                key={col.title}
                className={styles.skillColumn}
                variants={reduceMotion ? {} : staggerItem}
                style={{ '--accent-color': col.color }}
              >
                <div className={styles.skillHeader}>
                  <span className={styles.skillIcon}>{col.icon}</span>
                  <h3 className={styles.skillTitle}>{col.title}</h3>
                </div>
                <ul className={styles.skillList}>
                  {col.items.map((item) => (
                    <li key={item}>
                      <div className={styles.skillItem}>
                        <span className={styles.skillName}>{item}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Skills Tags */}
          <div className={styles.additionalSkills}>
            <h4 className={styles.additionalSkillsTitle}>Also Familiar With</h4>
            <div className={styles.skillTags}>
              {["TypeScript", "PostgreSQL", "Redis", "WebSockets", "CI/CD", "Postman", "VS Code", "Linux"].map((skill) => (
                <span key={skill} className={styles.skillTag}>{skill}</span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* RESUME */}
        <motion.section
          id="resume"
          className={styles.section}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.6 }}
        >
          <div className={styles.skillsHeader}>
          <h2 className={styles.sectionHeading}>Resume</h2>
          </div>
          <p className={styles.paragraphCenter}>
            A brief overview of my experience and background.
          </p>

          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.resumeBtn}
            whileHover={reduceMotion ? {} : { scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            View / Download Resume
          </motion.a>
        </motion.section>

        {/* CONTACT */}
        <motion.section
          id="contact"
          className={styles.section}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.6 }}
        >
          <div className={styles.contactContainer}>
            <div className={styles.contactHeader}>
              <h2 className={styles.sectionHeading}>Let's Connect</h2>
              <p className={styles.contactDescription}>
                Have a project in mind or want to discuss opportunities? 
                I'm always open to interesting conversations and collaborations.
              </p>
            </div>

            <div className={styles.contactGrid}>
              {/* Contact Form */}
              <div className={styles.contactFormWrapper}>
                <h3 className={styles.contactFormTitle}>Send a Message</h3>
                <form className={styles.contactForm} onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.formLabel}>Name</label>
                    <input 
                      id="name"
                      type="text"
                      placeholder="Your Name" 
                      required 
                      aria-label="Your name"
                      className={styles.formInput}
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.formLabel}>Email</label>
                    <input 
                      id="email"
                      type="email" 
                      placeholder="your.email@example.com" 
                      required 
                      aria-label="Your email"
                      className={styles.formInput}
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}

                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message" className={styles.formLabel}>Message</label>
                    <textarea 
                      id="message"
                      placeholder="Tell me about your project or just say hi..." 
                      rows="5" 
                      required 
                      aria-label="Your message"
                      className={styles.formTextarea}
                      value={message}
                      onChange={(e)=>setMessage(e.target.value)}

                    />
                  </div>

                  <button type="submit" className={styles.formSubmitBtn} disabled={loading}>
                    <span>{loading ? "Sending..." : "Send Message"}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </form>
              </div>

              {/* Contact Info Cards */}
              <div className={styles.contactInfoWrapper}>
                <h3 className={styles.contactInfoTitle}>Get in Touch</h3>
                
                <div className={styles.contactCards}>
                  <a 
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=nanadyala.preetham755@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contactCard}
                  >
                    <div className={styles.contactCardIcon} style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </div>
                    <div className={styles.contactCardContent}>
                      <h4 className={styles.contactCardTitle}>Email</h4>
                      <p className={styles.contactCardText}>nanadyala.preetham755@gmail.com</p>
                    </div>
                  </a>

                  <a 
                    href="https://www.linkedin.com/in/preetham-nandyala-531660193"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contactCard}
                  >
                    <div className={styles.contactCardIcon} style={{ background: 'rgba(37, 99, 235, 0.1)' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#2563eb">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </div>
                    <div className={styles.contactCardContent}>
                      <h4 className={styles.contactCardTitle}>LinkedIn</h4>
                      <p className={styles.contactCardText}>Connect professionally</p>
                    </div>
                  </a>

                  <a 
                    href="https://github.com/preetham-nandyala"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contactCard}
                  >
                    <div className={styles.contactCardIcon} style={{ background: 'rgba(15, 23, 42, 0.1)' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#0f172a">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                    <div className={styles.contactCardContent}>
                      <h4 className={styles.contactCardTitle}>GitHub</h4>
                      <p className={styles.contactCardText}>Check out my code</p>
                    </div>
                  </a>
                </div>

                <div className={styles.availabilityBadge}>
                  <span className={styles.availabilityDot}></span>
                  <span>Available for opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FOOTER */}
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <p>© {new Date().getFullYear()} Preetham Nandyala. All rights reserved.</p>
            <div className={styles.footerLinks}>
              <a 
                href="https://github.com/preetham-nandyala" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <span className={styles.footerDivider}>•</span>
              <a 
                href="https://www.linkedin.com/in/preetham-nandyala-531660193" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <span className={styles.footerDivider}>•</span>
              <a href="mailto:nanadyala.preetham755@gmail.com">
                Email
              </a>
            </div>
          </div>
        </footer>
      </main>

      {/* PROJECT MODAL */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              className={styles.modal}
              initial={reduceMotion ? false : { scale: 0.92, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={reduceMotion ? false : { scale: 0.92, y: 40, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 id="modal-title" className={styles.modalTitle}>{activeProject.name}</h3>
              <p className={styles.modalSubtitle}>{activeProject.desc}</p>
              
              <div className={styles.modalSection}>
                <h4 className={styles.modalSectionTitle}>Tech Stack</h4>
                <div className={styles.modalTechStack}>
                  {activeProject.tech.map((tech) => (
                    <span key={tech} className={styles.modalTechBadge}>{tech}</span>
                  ))}
                </div>
              </div>

              <div className={styles.modalSection}>
                <h4 className={styles.modalSectionTitle}>Key Features</h4>
                <ul className={styles.modalList}>
                  {activeProject.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.modalActions}>
                <a 
                  href={activeProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.modalLinkBtn}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View on GitHub
                </a>
                <button 
                  className={styles.modalCloseBtn}
                  onClick={() => setActiveProject(null)}
                  aria-label="Close modal"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
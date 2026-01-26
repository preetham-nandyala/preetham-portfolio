import { useState } from "react";
import styles from "./index.module.css";

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.hero}>
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
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Building <span className={styles.titleHighlight}>Scalable</span> Web Systems
          </h1>
          <p className={styles.heroSubtitle}>
            Full-stack developer specializing in real-time applications, secure APIs, and role-based systems.
          </p>
          <div className={styles.badges}>
            <span className={styles.badge}>Real-time Systems</span>
            <span className={styles.badge}>Backend-Focused</span>
            <span className={styles.badge}>MERN Stack</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={styles.aboutSection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>About Me</h2>
          
          <div className={styles.aboutGrid}>
            <div className={styles.aboutContent}>
              <p className={styles.paragraph}>
                I approach development by understanding the problem first, designing the system architecture, and writing clean, reliable code.
              </p>
              <p className={styles.paragraph}>
                I enjoy backend logic, APIs, and building applications that work end-to-end in real-world environments.
              </p>
              
            </div>

            <div className={styles.buildSideCard}>
              <h4 className={styles.buildSideCardTitle}>What I Build</h4>
              <p className={styles.buildSideCardText}>
                Scalable APIs, predictable logic, and maintainable systems.
              </p>
              <div className={styles.resumeContainer}>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.resumeLink}>
                  View Resume
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={styles.projectsSection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
          
          <div className={styles.projectsGrid}>
            {/* ProConnect */}
            <div className={styles.projectCard}>
              <h3 className={styles.projectTitle}>ProConnect</h3>
              <p className={styles.projectDesc}>
                Real-time professional networking platform with authenticated users, socket-based communication, and media sharing.
              </p>
              <div className={styles.techStack}>
                <span className={styles.techBadge}>Next.js</span>
                <span className={styles.techBadge}>Node.js</span>
                <span className={styles.techBadge}>Socket.IO</span>
                <span className={styles.techBadge}>MongoDB</span>
              </div>
              <p className={styles.projectFeature}>✓ JWT Authentication</p>
              <p className={styles.projectFeature}>✓ Real-time Communication</p>
              <p className={styles.projectFeature}>✓ Media Management</p>
            </div>

            {/* RTL Vault */}
            <div className={styles.projectCard}>
              <h3 className={styles.projectTitle}>RTL Vault</h3>
              <p className={styles.projectDesc}>
                Role-based learning platform with separate admin and user experiences, integrated code editor, and modular architecture.
              </p>
              <div className={styles.techStack}>
                <span className={styles.techBadge}>Next.js</span>
                <span className={styles.techBadge}>Express.js</span>
                <span className={styles.techBadge}>Monaco Editor</span>
                <span className={styles.techBadge}>Docker</span>
              </div>
              <p className={styles.projectFeature}>✓ RBAC System</p>
              <p className={styles.projectFeature}>✓ Admin Dashboard</p>
              <p className={styles.projectFeature}>✓ Code Editor</p>
            </div>

            {/* Simon Says */}
            <div className={styles.projectCard}>
              <h3 className={styles.projectTitle}>Simon Says</h3>
              <p className={styles.projectDesc}>Browser-based interactive logic game</p>
              <div className={styles.techStack}>
                <span className={styles.techBadge}>HTML</span>
                <span className={styles.techBadge}>CSS</span>
                <span className={styles.techBadge}>JavaScript</span>
              </div>
              <p className={styles.projectFeature}>✓ Pure JavaScript DOM manipulation</p>
              <p className={styles.projectFeature}>✓ Event-driven state handling</p>
              <p className={styles.projectFeature}>✓ Clean logic flow</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={styles.skillsSection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Technical Skills</h2>
          <p className={styles.skillsSubheading}>
            Full-stack expertise with emphasis on backend APIs, real-time systems, and secure architecture
          </p>

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
      </section>

      {/* CTA Section */}
      <section id="contact" className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Build Something Great?</h2>
          <p className={styles.ctaSubtitle}>Let's discuss your next project</p>
          <a href="mailto:nanadyala.preetham755@gmail.com" className={styles.ctaButton}>
            Get in Touch
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerMain}>
            <div className={styles.footerSection}>
              <h3>Preetham</h3>
              <p>Full-stack developer focused on building scalable, secure systems.</p>
            </div>

            <div className={styles.footerLinks}>
              <div className={styles.footerColumn}>
                <h4>Connect</h4>
                <a href="https://github.com/preetham-nandyala" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/preetham-nandyala-531660193" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
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
      </footer>
    </div>
  );
}
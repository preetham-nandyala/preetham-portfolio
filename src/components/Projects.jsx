import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
// import styles from "./Projects.module.css";

const projectsData = [
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
];

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

export default function Projects() {
    const [activeProject, setActiveProject] = useState(null);
    const reduceMotion = useReducedMotion();

    return (
        <>
            <motion.section
                id="projects"
                className={styles.section}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: reduceMotion ? 0 : 0.6 }}
            >
                <div className={styles.projectsHeader}>
                    <h2 className={styles.sectionHeading}>Projects</h2>
                </div>

                <div className={styles.projectGrid}>
                    {projectsData.map((project) => (
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
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
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
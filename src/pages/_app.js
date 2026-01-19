import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/router";
import "../styles/globals.css";

const pageVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={router.route}
        variants={pageVariants}
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        exit="exit"
        transition={{
          duration: reduceMotion ? 0 : 0.35,
          ease: "easeOut",
        }}
      >
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  );
}

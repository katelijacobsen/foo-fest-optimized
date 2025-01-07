"use client";

import { motion } from "framer-motion";

export default function Template({ children }) {
  return (
    <motion.div initial={{ y: "30vh", opacity: 0 }} animate={{ y: "0", opacity: 1 }} exit={{ y: "-30vh", opacity: 0 }} transition={{ duration: 0.5 }}>
      {children}
    </motion.div>
  );
}

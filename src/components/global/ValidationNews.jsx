import { motion } from "framer-motion";

const validationNews = () => {
  return (
    <motion.div animate={{ y: -100 }} transition={{ type: "spring", bounce: 0.8, duration: 1.2 }} className="absolute bg-green-500 p-6 rounded top-60 ">
      <p>Tillykke du er tilmeldt nyhedsbrevet</p>
    </motion.div>
  );
};

export default validationNews;

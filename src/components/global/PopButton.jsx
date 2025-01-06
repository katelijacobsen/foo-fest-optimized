import { useState } from "react";
import { motion } from "motion/react";
import { TbMailPlus } from "react-icons/tb";

import PopupNewsletter from "@/components/global/PopupNewslettter";
const PopButton = () => {
  const [modalOpen, setModalOpen] = useState(true);
  // her er den lukket
  const close = () => setModalOpen(false);
  // her er den åben
  const open = () => setModalOpen(true);
  return (
    <>
      <motion.button onClick={() => (modalOpen ? close() : open())} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className=" border-2 border-customWhite p-5 rounded-full  left-[90%] absolute bottom-2 z-20">
        <TbMailPlus />
      </motion.button>
      {modalOpen && <PopupNewsletter setModalOpen={setModalOpen} modalOpen={modalOpen} />}
    </>
  );
};

export default PopButton;

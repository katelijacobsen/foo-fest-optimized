"use client";
import { motion } from "motion/react";
import { useState } from "react";
import NewsletterCopy from "./NewsletterCopy";
import { IoClose } from "react-icons/io5";

const PopupNewsletter = ({ modalOpen, setModalOpen }) => {
  const close = () => setModalOpen(false);
  const dropIn = {
    // lave forskellige animations states som bruges ved animation
    // du kan også bruge dette til at lave animation som påvirkes efter hvordan man interegere med indholdet
    hidden: {
      y: "0",
      opacity: 1,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };
  return (
    <>
      {/* // <Backdrop onClick={handleClose}> */}
      {/* Dette er boksnen der har indholdet */}

      <motion.div
        className=" bg-customBlack_2 rounded-md p-5 z-30  w-max left-[75%] absolute bottom-2
        "
        // giver de forskellige varianter af din animation
        variants={dropIn}
        // Her siger du hvilke her giver du de forskllige animation state deres opgave
        initial="visible"
        animate="visible"
        exit="exit"
      >
        <button className="z-40 relative left-[95%] hover:bg-customBlack_4 rounded-sm" onClick={() => (modalOpen ? close() : open())}>
          <IoClose />
        </button>
        <h2 className=" text-2xl pb-2 text-center">Meld dig til nyhedsbrevet</h2>
        <NewsletterCopy></NewsletterCopy>
      </motion.div>
    </>
  );
};

export default PopupNewsletter;

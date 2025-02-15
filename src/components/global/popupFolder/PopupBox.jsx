"use client";
import { motion } from "motion/react";

import NewsletterCopy from "../newsletterFolder/NewsletterCopy";
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
        //    md:w-max kan bruges til at få content til at  passe  kassen
        className=" bg-customBlack_2 rounded-md p-5 z-30   w-full md:w-max absolute md:bottom-[-6.5rem]  bottom-[-8.5rem]
        "
        // giver de forskellige varianter af din animation
        variants={dropIn}
        drag
        // Her siger du hvilke her giver du de forskllige animation state deres opgave
        initial="visible"
        animate="visible"
        exit="exit"
      >
        <button className="z-40 relative left-[95%] hover:bg-customBlack_4 rounded-sm" aria-label="Luk nyhedsbrev knap" onClick={() => (modalOpen ? close() : open())}>
          <IoClose />
        </button>
        <h2 className=" text-2xl pb-2 text-center">Meld dig til nyhedsbrevet</h2>
        <NewsletterCopy></NewsletterCopy>
      </motion.div>
    </>
  );
};

export default PopupNewsletter;

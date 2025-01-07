"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

function LineUpCard({ name, logo, scene, day, start, members, bio, end, logoCredits, open, onClose, onOpen }) {
  const [modalPosition, setModalPosition] = useState(null);
  const imageUrl = logo && (logo.startsWith("https://") || logo.startsWith("http://")) ? logo : `https://spring-awesome-stream.glitch.me/logos/${logo}`;

  //variabler for hvor meget modalet skal bevæge sig på y-aksen når den bliver vist
  const modalVisibility = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: "4%", opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  };

  //find brugerens y-postion på siden
  useEffect(() => {
    if (open) {
      //brugerens scrolly-position
      const scrollY = window.scrollY || null;
      setModalPosition(scrollY); // gem positionen
    }
  }, [open]);

  return (
    <>
      <div className=" w-[350px] md:w-[400px] h-[300px] cursor-pointer" onClick={onOpen}>
        <div>
          <div className="w-full h-64">
            {imageUrl ? (
              <>
                <Image className="hover:brightness-50 transition ease-in-out duration-75 w-full h-full object-cover" quality={75} src={imageUrl} width={199} height={128} alt={`${name} logo - ${logoCredits}`} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={false} loading="lazy" />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 flex items-center justify-center transition-all duration-300">
                  <p className="text-white text-center text-3xl font-bold">{name}</p>
                </div>
              </>
            ) : (
              <span className="text-white">No image</span>
            )}
          </div>
          <div className="py-2 px-1">
            <h2 className="font-bold text-xl md:text-2xl text-white">{name}</h2>
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-30 flex justify-center items-start bg-customBlack bg-opacity-50" onClick={onClose}>
          <motion.div style={{ marginTop: `${modalPosition}px` }} variants={modalVisibility} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.5, ease: "easeInOut" }} className="bg-customBlack_5 w-[98%] md:w-[55%] max-h-[5%] md:max-h-[20%] rounded-sm ">
            <div className="relative">
              <button className="absolute top-1 right-1 m-2" alt="exit modal" onClick={onClose}>
                <RxCross2 className="bg-customBlack_5 text-customOrange h-10 w-10 md:ml-0 md:mb-8 border-solid border-[1px] border-customOrange rounded-full p-2" />
              </button>
              <Image className="w-full h-full md:h-[30rem] object-cover" quality={75} src={imageUrl} width={199} height={128} alt={`${name} logo - ${logoCredits}`} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={false} loading="lazy" />
            </div>
            <div className="p-4 grid gap-4">
              <h2 className="font-bold text-xl md:text-2xl pb-4">{name}</h2>
              <div className="flex gap-2">
                <h3 className="font-bold">Spiller:</h3>
                <p>{day}</p>
              </div>
              <div className="flex gap-2">
                <h3 className="font-bold">Scene:</h3>
                <p>{scene}</p>
              </div>
              <div className="flex gap-2">
                <h3 className="font-bold">Tidspunkt:</h3>
                <p>
                  {start} - {end}
                </p>
              </div>
              <div>
                <h3 className="font-bold">Medlemmer:</h3>
                <ul>
                  {members.map((member) => (
                    <li key={member}>{member}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold">Om bandet:</h3>
                {bio}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default LineUpCard;

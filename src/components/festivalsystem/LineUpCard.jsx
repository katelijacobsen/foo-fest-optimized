"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

function LineUpCard({ name, logo, scene, day, start, end, logoCredits }) {
  //states til at sætte state til om kortet er flipped eller ikke flipped
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  //funktion som bliver kaldt ved eventet onClick
  function handleFlip() {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  }

  //fået hjælp af chatGPT til få stillet betingelse op for billede url, ud fra instruktioner givet i opgavebeskrivelsen
  // const imageUrl = logo && (logo.startsWith("https://") || logo.startsWith("http://")) ? logo : `http://localhost:8080/logos/${logo}`;
  const imageUrl = logo && (logo.startsWith("https://") || logo.startsWith("http://")) ? logo : `https://spring-awesome-stream.glitch.me/logos/${logo}`;

  return (
    <div className="flip-card w-[350px] md:w-[400px] h-[300px] cursor-pointer" onClick={handleFlip}>
      <motion.div className="flip-card-inner w-[100%] h-[100%]" initial={false} animate={{ rotateY: isFlipped ? 180 : 360 }} transition={{ duration: 0.6, animationDirection: "normal" }} onAnimationComplete={() => setIsAnimating(false)}>
        <div className="flip-card-front w-[100%] h-[100%] bg-customBlack">
          <div className="relative w-full h-64">
            {imageUrl ? (
              <>
                <Image className="hover:brightness-50 transition ease-in-out duration-75 w-full h-full object-cover" quality={75} src={imageUrl} width={199} height={128} alt={`${name} logo - ${logoCredits}`} sizes="(min-width: 375px) 398px, 348px" priority={true} />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 flex items-center justify-center transition-all duration-300">
                  <p className="text-white text-center text-3xl font-bold">{name}</p>
                </div>
              </>
            ) : (
              <span className="text-white">No image</span>
            )}
          </div>
          <div className="py-2 px-1 ">
            <h2 className="font-bold text-xl md:text-2xl text-white">{name}</h2>
          </div>
        </div>
        <div className="flip-card-back bg-customBlack w-[100%] h-[100%] overflow-auto p-4 ">
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
        </div>
      </motion.div>
    </div>
  );
}

export default LineUpCard;

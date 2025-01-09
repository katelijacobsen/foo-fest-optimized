"use client";
import React from "react";
import Image from "next/image";

function LineUpCard({ name, logo, scene, day, start, end }) {
  const imageUrl = logo && (logo.startsWith("https://") || logo.startsWith("http://")) ? logo : `https://spring-awesome-stream.glitch.me/logos/${logo}`;

  return (
    <div className="w-[20rem] h-[15rem] lg:w-[400px] cursor-pointer bg-customBlack">
      <div className="relative w-full h-full">
        {imageUrl ? (
          <>
            <Image className="hover:brightness-50 transition ease-in-out duration-75  w-full h-full object-cover" quality={50} src={imageUrl} width={150} height={100} alt={`${name} logo`} sizes="(min-width: 375px) 398px, 348px" priority={false} loading="lazy" />
            <div className="absolute w-[10rem] lg:w-full lg:h-full inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 flex items-center justify-center transition-all duration-300">
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
  );
}

export default LineUpCard;

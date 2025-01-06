"use client";
import React from "react";
import Image from "next/image";

function LineUpCard({ name, logo, scene, day, start, members, bio, end, logoCredits, open, onClose, onOpen }) {
  //fået hjælp af chatGPT til få stillet betingelse op for billede url, ud fra instruktioner givet i opgavebeskrivelsen
  const imageUrl = logo && (logo.startsWith("https://") || logo.startsWith("http://")) ? logo : `https://spring-awesome-stream.glitch.me/logos/${logo}`;
  //kilde til modal feature (popup feature): https://www.google.com/search?q=tailwind+modal&oq=tailwind+modal&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQABiABDIHCAIQABiABDIICAMQABgWGB4yCAgEEAAYFhgeMggIBRAAGBYYHjIICAYQABgWGB4yCAgHEAAYFhgeMggICBAAGBYYHjIICAkQABgWGB7SAQkyMzkyOGowajeoAgCwAgA&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:8764ef0a,vid:dEGbXY-8YtU,st:0
  return (
    <>
      <div className="flip-card w-[350px] md:w-[400px] h-[300px] cursor-pointer " onClick={onOpen}>
        <div className="">
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
          <div className="py-2 px-1 ">
            <h2 className="font-bold text-xl md:text-2xl text-white">{name}</h2>
          </div>
        </div>
      </div>

      {/* backdrop */}
      <div onClick={onClose} className={`mt-8 fixed inset-0 flex justify-center transition-colors z-20 ${open ? "visible bg-customBlack bg-opacity-70 " : "invisible"}`}>
        {/* modal */}
        <div className={`flex flex-col gap-4 bg-customBlack_2 transition-all p-4 h-fit w-full m-2 ${open ? "scale-95" : "scale-100"} `} onClick={(e) => e.stopPropagation()}>
          <button className="absolute top-2 right-2 p-1 text-white hover:text-customOrange" onClick={onClose}>
            X
          </button>
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
                <li className="" key={member}>
                  {member}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold">Om bandet:</h3>
            {bio}
          </div>
        </div>
      </div>
    </>
  );
}

export default LineUpCard;

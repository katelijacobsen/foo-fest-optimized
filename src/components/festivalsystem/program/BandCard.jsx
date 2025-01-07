"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

function BandCard({ name, genre, start, end, slug, day, logo, width, logoCredits }) {
  //fået hjælp af chatGPT til få stillet betingelse op for billede url, ud fra instruktioner givet i opgavebeskrivelsen
  const imageUrl = logo && (logo.startsWith("https://") || logo.startsWith("http://")) ? logo : `https://spring-awesome-stream.glitch.me/logos/${logo}`;

  return (
    <Link href={`/program/${slug}`} key={slug} className={`hover:scale-[1.02] transition-all duration-500 cursor-pointer ${width}`}>
      <div className="relative w-full h-64">
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
      <div className="pt-2 px-1">
        <h2 className="font-bold text-xl bg-gradient-to-r from-customPink via-customRed to-customOrange bg-clip-text text-transparent">{name}</h2>
        <p className="text-customWhite_4">{genre.toUpperCase()}</p>
        <div className="flex gap-1 items-end">
          <p className="text-md">
            {start} - {end}
          </p>
          <p>{day}</p>
        </div>
      </div>
    </Link>
  );
}

export default BandCard;

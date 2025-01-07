"use client";
import Image from "next/image";
import { Caesar_Dressing } from "next/font/google";
import BackButton from "@/components/festivalsystem/singleband/button/BackButton";
import { motion } from "framer-motion";

const ceasarDressing = Caesar_Dressing({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const SingleBand = ({ band }) => {
  const { name, genre, bio, logo } = band;

  //fået hjælp af chatGPT til få stillet betingelse op for billede url, ud fra instruktioner givet i opgavebeskrivelsen
  const imageUrl = logo && (logo.startsWith("https://") || logo.startsWith("http://")) ? logo : `https://spring-awesome-stream.glitch.me/logos/${logo}`;

  return (
    <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} animate={{ y: -40 }}>
      <section className="my-40 md:px-4 md:mt-48 max-w-screen-xl mx-auto">
        <BackButton aria_label_text="back to previous page" />
        <div className="grid md:grid-cols-[1fr_1fr] max-w-screen-xl mx-auto md:gap-10">
          <div>
            <Image className="row-start-1 row-end-4 col-span-full justify-self-center" src={imageUrl} alt={name} width={700} height={700} />
          </div>
          <div className="grid gap-4 md:gap-0 py-4 px-2 md:py-0">
            <h2 className={`${ceasarDressing.className} font-bold bg-gradient-to-bl from-customPink to-customOrange bg-clip-text text-transparent text-4xl md:text-6xl`}>{name.toUpperCase()}</h2>
            <div className="">
              <h2 className="font-bold text-xl">Medlemmer: </h2>
              <ul>
                {band.members.map((member) => (
                  <li className="text-lg" key={member}>
                    {member}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-1 items-center">
              <h2 className="font-bold text-xl">Genre:</h2>
              <p className="text-lg">{genre}</p>
            </div>
            <div>
              <h2 className="font-bold text-xl">Beskrivelse:</h2>
              <p className="text-lg">{bio}</p>
            </div>
          </div>
        </div>
      </section>
    </motion.section>
  );
};

export default SingleBand;

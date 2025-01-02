"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

//komponenter
import BandCard from "../program/band/BandCard";
import Headline from "../../global/Headline";
import PrimaryButton from "@/components/global/buttonFolder/PrimaryButton";

//ikoner
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import MusicRune from "@/img/svg/music_rune.svg";

//font
import { Caesar_Dressing } from "next/font/google";

const ceasarDressing = Caesar_Dressing({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const ProgramForCurrentDay = ({ mergedArray }) => {
  const [currentDay, setCurrentDay] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  //useRef bruges til knapper til scrollcontainer, da vi ønsker at ændre DOM'en elementet (scrollcontaineren) direkte
  const scrollContainerRef1 = useRef(null);
  const scrollContainerRef2 = useRef(null);
  const scrollContainerRef3 = useRef(null);

  // useEffect bruges her, så hver gang siden indlæses, så vises de artister der spiller den pågældende ugedag, så der ikke bare er en blank side
  useEffect(() => {
    const today = new Date().toLocaleDateString("en", { weekday: "short" }).toLowerCase();
    setCurrentDay(today);

    if (mergedArray) {
      setIsLoading(false);
    }
  }, [mergedArray]);

  //Fået hjælp af tutorer til at tilpasse filtrering
  // Funktionen starter med at filtrerer ud fra scene og dag
  //Sorterer herefter "bands" ud fra sammenlignign af starttidspunkterne
  const sortedByTime = (scene) => {
    return mergedArray
      .filter((band) => band.scene === scene && band.day === currentDay)
      .sort((a, b) => {
        const aTime = new Date(`1970-01-01T${a.eventInfo.start}`);
        const bTime = new Date(`1970-01-01T${b.eventInfo.start}`);

        return aTime.getTime() - bTime.getTime();
      });
  };

  return (
    <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} animate={{ y: -40 }}>
      <section className="py-[10vh] px-4 max-w-screen-xl mx-auto">
        <div>
          <Headline width={45} height={45} src={MusicRune} size="text-5xl md:text-6xl" text="DAGENS PROGRAM" />
        </div>
        <div>
          <div className="py-6">
            <h1 className={`pb-4 text-3xl md:text-5xl`}>Midgard</h1>
            <div className="overflow-x-auto" ref={scrollContainerRef1}>
              <div className="flex gap-4">
                {sortedByTime("Midgard").map((band) => (
                  <BandCard slug={band.slug} src={band.logo} key={band.name} name={band.name} genre={band.genre} start={band.eventInfo.start} end={band.eventInfo.end} day={band.day} logo={band.logo} logoCredits={band.logoCredits} scene={band.scene} width="min-w-72" />
                ))}
              </div>
            </div>
            <div className="flex gap-4 justify-end mt-4">
              <button className="" onClick={() => (scrollContainerRef1.current.scrollLeft -= 200)}>
                <FaArrowLeft aria-label="Left" className="text-customOrange w-[1.5rem] h-[1.5rem]" />
              </button>
              <button className="" onClick={() => (scrollContainerRef1.current.scrollLeft += 200)}>
                <FaArrowRight aria-label="Right" className="text-customOrange w-[1.5rem] h-[1.5rem]" />
              </button>
            </div>
          </div>
          <div className="py-6">
            <h1 className={` pb-4 text-3xl md:text-5xl`}>Vanaheim</h1>
            <div className="overflow-x-auto" ref={scrollContainerRef2}>
              <div className="flex gap-4">
                {sortedByTime("Vanaheim").map((band) => (
                  <BandCard slug={band.slug} src={band.logo} key={band.name} name={band.name} genre={band.genre} start={band.eventInfo.start} end={band.eventInfo.end} day={band.day} logo={band.logo} logoCredits={band.logoCredits} scene={band.scene} width="min-w-72" />
                ))}
              </div>
            </div>
            <div className="flex gap-4 justify-end mt-4">
              <button className="" onClick={() => (scrollContainerRef2.current.scrollLeft -= 200)}>
                <FaArrowLeft aria-label="Left" className="text-customOrange w-[1.5rem] h-[1.5rem]" />
              </button>
              <button className="" onClick={() => (scrollContainerRef2.current.scrollLeft += 200)}>
                <FaArrowRight aria-label="Right" className="text-customOrange w-[1.5rem] h-[1.5rem]" />
              </button>
            </div>
          </div>
          <div className="py-6">
            <h1 className={` pb-4 text-3xl md:text-5xl`}>Jotunheim</h1>
            <div className="overflow-x-auto" ref={scrollContainerRef3}>
              <div className="flex gap-4">
                {sortedByTime("Jotunheim").map((band) => (
                  <BandCard slug={band.slug} src={band.logo} key={band.name} name={band.name} genre={band.genre} start={band.eventInfo.start} end={band.eventInfo.end} day={band.day} logo={band.logo} logoCredits={band.logoCredits} scene={band.scene} width="min-w-72" />
                ))}
              </div>
            </div>
            <div className="flex gap-4 justify-end mt-4">
              <button aria-label="Left" onClick={() => (scrollContainerRef3.current.scrollLeft -= 200)}>
                <FaArrowLeft className="text-customOrange w-[1.5rem] h-[1.5rem]" />
              </button>
              <button aria-label="Right" onClick={() => (scrollContainerRef3.current.scrollLeft += 200)}>
                <FaArrowRight className="text-customOrange w-[1.5rem] h-[1.5rem]" />
              </button>
            </div>
          </div>
        </div>
        <div className="grid place-content-center pt-8">
          <Link href="/program">
            <PrimaryButton aria_label_text="View program for whole week" color="bg-gradient-to-r from-[#ec2783] from-12% via-[#d82023] via-46% to-[#ec4d08] to-87%" buttonContent="Se hele ugens program" />
          </Link>
        </div>
      </section>
    </motion.section>
  );
};

export default ProgramForCurrentDay;

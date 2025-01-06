"use client";
import { useState, useEffect } from "react";
import LineUpCard from "@/components/festivalsystem/LineUpCard";
import { motion } from "framer-motion";
import Headline from "@/components/global/Headline";
import LineUpRune from "@/img/svg/lineup_rune.svg";

const LineUpList = ({ mergedData }) => {
  //statevariabel med væriden mergedData (fra props) - setBands bruges til at opdatere state
  const [bands, setBands] = useState(mergedData);
  const [searchBand, setSearchBand] = useState(""); // Søgetekst

  useEffect(() => {
    const filteredBands = mergedData.sort().filter((band) => band.name.toLowerCase().includes(searchBand.toLowerCase())); // Filtrering
    setBands(filteredBands);
  }, [searchBand, mergedData]);

  // // Sortér bands alfabetisk efter navn
  // useEffect(() => {
  //   //variabel for mergedData bliver kopieret [...mergedData] og sorteres alfabetisk efter name
  //   const sortedBandsAlphabetic = [...mergedData].sort((a, b) => a.name.localeCompare(b.name));
  //   //statevariablen bliver opdateret med den alfabitisk sorterede liste af bands
  //   setBands(sortedBandsAlphabetic);
  //   //useEffect hooket vil køre når mergedData ændrer sig - så i tilfælde af, at datasættet opdateres vil hooket sortere bands igen
  // }, [mergedData]);

  return (
    <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} animate={{ y: -40 }}>
      <section className="max-w-screen-xl mx-auto px-2 py-[10vh] ">
        <div className="max-w-screen-xl mx-auto mb-3 pl-4">
          <Headline src={LineUpRune} text="2025 LINEUP" size="text-5xl md:text-6xl" width={45} height={45} />
        </div>
        <div className="grid py-6 md:pb-12">
          <form className="md:w-[30rem] md:justify-self-center">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"></label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-white border border-solid border-customOrange rounded-sm bg-customBlack focus:ring-customOrange focus:border-customOrange" placeholder="Søg efter bandnavn..." value={searchBand} onChange={(e) => setSearchBand(e.target.value)} />
            </div>
          </form>
        </div>
        <ul className="flex flex-wrap gap-8 justify-center items-center">
          {bands.map((band, index) => (
            <li key={index}>
              <LineUpCard key={index} slug={band.slug} logo={band.logo} name={band.name} day={band.day} start={band.eventInfo.start} end={band.eventInfo.end} scene={band.scene} />
            </li>
          ))}
        </ul>
      </section>
    </motion.section>
  );
};

export default LineUpList;

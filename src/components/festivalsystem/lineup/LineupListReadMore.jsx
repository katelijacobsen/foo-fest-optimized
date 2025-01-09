"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Headline from "@/components/global/Headline";
import LineupRune from "@/img/svg/lineup_rune.svg";
import PrimaryButton from "@/components/global/buttonFolder/PrimaryButton";

const LineupListReadMore = ({ initialLineup }) => {
  //statevariabel sat til initialLineup (fra props)
  const [bands, setBands] = useState(initialLineup);
  //statevariabel som er sat til false pr. default - state ændres ved event onClick, hvor false ændres til true
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} animate={{ y: -40 }}>
      <section className="py-[10vh] place-content-center max-w-screen-xl mx-auto p-4 grid">
        <div className="pb-6">
          <Headline src={LineupRune} width={45} height={45} size="text-5xl md:text-6xl" text="LINEUP" />
        </div>
        <ul className="flex flex-wrap justify-center items-center gap-4 pt-6">
          {/* Bruger metoden .slice(), da vi kun vil vise de første 15 navne af datasættet */}
          {bands.slice(0, 15).map((band, index) => (
            <li key={band.slug} className={index < 20 ? "text-2xl lg:text-5xl lg:leading-[3.5rem] transition ease-in-out hover:bg-gradient-to-r hover:from-customPink hover:via-customRed hover:to-customOrange hover:bg-clip-text hover:text-transparent hover:scale-105" : index < 30 ? "text-2xl lg:text-3xl transition ease-in-out hover:bg-gradient-to-r hover:from-customPink hover:to-customOrange hover:bg-clip-text hover:text-transparent hover:scale-105" : "text-lg lg:text-xl transition ease-in-out hover:bg-gradient-to-r hover:from-customPink hover:via-customRed hover:to-customOrange hover:bg-clip-text hover:text-transparent hover:scale-105"}>
              <Link href={`/program/${band.slug}`} key={band.slug}>
                {band.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* Brug af onClick event til "View more"-funktion */}
        <button type="text" className="font-bold text-xl bg-gradient-to-r from-customPink via-customRed to-customOrange bg-clip-text text-transparent pt-4" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "" : "Vis flere..."}
        </button>
        {isExpanded && (
          <ul className="flex flex-wrap justify-center items-center gap-4">
            {/* Vi viser de næste ti bands i datasættet */}
            {bands.slice(15, 25).map((band, index) => (
              <li
                key={band.slug}
                className={
                  index < 50 ? "text-xl lg:text-2xl transition ease-in-out hover:bg-gradient-to-r hover:from-customPink hover:via-customRed hover:to-customOrange hover:bg-clip-text hover:text-transparent hover:scale-105" : index < 60 ? "text-lg lg:text-xl transition ease-in-out hover:bg-gradient-to-r hover:from-customPink hover:to-customOrange hover:bg-clip-text hover:text-transparent hover:scale-105" : index < 70 ? "text-base lg:text-md transition ease-in-out hover:bg-gradient-to- hover:from-customPink hover:via-customRed hover:to-customOrange hover:bg-clip-text hover:text-transparent hover:scale-105" : "text-sm lg:text-md transition ease-in-out hover:bg-gradient-to-r hover:from-customPink hover:via-customRed hover:to-customOrange hover:bg-clip-text hover:text-transparent hover:scale-105"
                }
              >
                <Link href={`/program/${band.slug}`} key={band.slug}>
                  {band.name}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="grid place-content-center pt-8">
          <Link href="/lineup">
            <PrimaryButton type="text" aria_label_text="View the full lineup" color="bg-gradient-to-r from-[#ec2783] from-12% via-[#d82023] via-46% to-[#ec4d08] to-87%" buttonContent="Se det fulde lineup" />
          </Link>
        </div>
      </section>
    </motion.section>
  );
};

export default LineupListReadMore;

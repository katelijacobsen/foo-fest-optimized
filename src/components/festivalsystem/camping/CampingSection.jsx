"use client";

import Image from "next/image";
import CampingMap from "@/img/svg/camping_map.svg";
import Headline from "@/components/global/Headline";
import CampingRune from "@/img/svg/camping_rune.svg";
import Link from "next/link";
import PrimaryButton from "@/components/global/buttonFolder/PrimaryButton";
import { motion } from "framer-motion";

const Camping = ({ text }) => {
  return (
    <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} animate={{ y: -40 }}>
      <section className="py-[10vh] px-4 grid place-content-center md:grid-cols-2 gap-4 max-w-screen-xl mx-auto items-start">
        <div>
          <Headline src={CampingRune} width={45} height={45} size="text-5xl md:text-6xl" text="CAMPING" />
          <p className="pt-6 text-base md:text-lg">{text}</p>
          <div className="inline-block pt-6 pb-3">
            <Link href="/camping">
              <PrimaryButton aria_label_text="Læs mere" color="bg-gradient-to-r from-[#ec2783] from-12% via-[#d82023] via-46% to-[#ec4d08] to-87%" buttonContent="Læs mere" />
            </Link>
          </div>
        </div>
        <Image className="justify-self-center" src={CampingMap} alt="illustration af campingpladser" width={650} height={650} />
      </section>
    </motion.section>
  );
};

export default Camping;

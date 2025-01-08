"use client";
import { motion, useInView } from "framer-motion";
import * as React from "react";
import { Caesar_Dressing } from "next/font/google";
import MyMarquee from "@/components/festivalsystem/marquee/MyMarquee";
import { FaArrowDown } from "react-icons/fa6";

const ceasarDressing = Caesar_Dressing({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const HeroSection = ({ text }) => {
  //https://ui.indie-starter.dev/docs/text-animation
  const splittedText = text.split("");

  const pullupVariant = {
    initial: { y: 8, opacity: 0 },
    animate: (index) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: index * 0.05,
      },
    }),
  };

  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section>
      <div className="grid place-content-center h-[80vh] md:h-[90vh]">
        <div className="flex justify-center items-center leading-0">
          {/* https://ui.indie-starter.dev/docs/text-animation */}
          {splittedText.map((current, index) => (
            <motion.div aria-label="FooFest" key={index} ref={ref} variants={pullupVariant} initial="initial" animate={isInView ? "animate" : ""} custom={index} className={`${ceasarDressing.className} text-[26vw] md:text-[18vw] leading-tight`}>
              {current === " " ? <span aria-label="hidden"></span> : current}
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} animate={{ y: 10 }}>
          <div className="px-4">
            <h2 className={`${ceasarDressing.className} text-center leading-tight bg-gradient-to-bl from-customPink to-customOrange bg-clip-text text-transparent text-[16vw] md:text-[10vw]`}>FESTIVAL</h2>
          </div>
        </motion.div>
        {/* <div className="grid place-content-center mt-16">
          <FaArrowDown className="text-customOrange w-8 h-8 md:w-10 md:h-10 animate-bounce" />
        </div> */}
      </div>
      <div>
        <MyMarquee />
      </div>
    </section>
  );
};

export default HeroSection;

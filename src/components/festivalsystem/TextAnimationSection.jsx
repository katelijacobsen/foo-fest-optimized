"use client";
import { useScroll, useTransform, motion } from "framer-motion";

const TestSection = () => {
  //https://motion.dev/docs/react-use-scroll
  const { scrollYProgress } = useScroll();

  //https://motion.dev/docs/react-use-transform
  // Her defineres translateX for hver linje baseret på scrollYProgress
  const translateXA = useTransform(scrollYProgress, [0, 1], [0, 320]); // Linje A bevæger sig 320px mod højre
  const translateXB = useTransform(scrollYProgress, [0, 1], [0, -70]); // Linje Bigger bevæger sig -70px mod venstre
  const translateXC = useTransform(scrollYProgress, [0, 1], [0, 200]); // Linje Context bevæger sig 200px mod højre

  return (
    <section className="relative pt-[28vw] pb-[30vw] md:pt-[20vw] md:pb-[25vw] overflow-hidden">
      <div className="leading-none uppercase text-[13vw] md:text-[12vw] flex items-end flex-col">
        <motion.span
          className="pr-[70vw] md:pr-[30vw] bg-gradient-to-r from-customPink via-customRed to-customOrange bg-clip-text text-transparent"
          style={{
            x: translateXA,
          }}
        >
          FESTIVALEN
        </motion.span>

        <motion.span
          className="pr-[0vw] md:pr-[10vw] opacity-80 bg-gradient-to-r from-customPink via-customRed to-customOrange bg-clip-text text-transparent"
          style={{
            x: translateXB,
          }}
        >
          DER ALDRIG
        </motion.span>

        <motion.span
          className="pr-[70vw] md:pr-[40vw] opacity-60 bg-gradient-to-r from-customPink via-customRed to-customOrange bg-clip-text text-transparent"
          style={{
            x: translateXC,
          }}
        >
          ENDER
        </motion.span>
      </div>
    </section>
  );
};

export default TestSection;

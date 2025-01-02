"use client";
import Accordion from "@/components/festivalsystem/accordion/Accordion";
import Headline from "@/components/global/Headline";
import CampingRune from "@/img/svg/camping_rune.svg";
import { motion } from "framer-motion";

const Camping = () => {
  return (
    <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} animate={{ y: -40 }}>
      <section className="px-4 max-w-screen-xl mx-auto py-[12vh]">
        <div className="grid gap-4 my-14">
          <div className="max-w-[35rem]">
            <Headline src={CampingRune} width={45} height={45} size="text-4xl md:text-6xl" text="CAMPING" />
            <p className="pt-4">Det bedste ved at campere tæt på festivalpladsen er, at grænserne mellem lejrens intimitet og koncertens ekstase næsten forsvinder. Du kan starte din dag med stille toner fra en lut ved lejrbålet og slutte den med hæsblæsende headbanging foran scenen. Camping og musik bliver to sider af samme oplevelse.</p>
          </div>
          <div className="py-6 md:py-11 w-full mx-auto">
            <h2 className="font-bold text-xl md:text-3xl ">Ofte stillede spørgsmål</h2>
            <Accordion questionOne="Hvor rene er camping pladserne?" answerOne="De reneste campingpladser du har set. Vi går meget op i at stille skraldespnade til rådighed og der er frivillige, som løbende rydder op på pladserne." questionTwo="Hvor tæt på ligger toilletterne?" answerTwo="Der er mange toiletfaciliteter på festivalen, så du skal ikke være nervøs for, at der ligger toiletter i dit område." questionThree="Hvor mange telte kan der være på én plads?" answerThree="Det er meget forskelligt i forhold til, hvor stor pladsen er." questionFour="Bliver der ryddet op efter mig?" answerFour="Vi opfordrer til, at du selv står for din oprydning." MobileTextSize="text-lg" DesktoptextSize="text-2xl" />
          </div>
        </div>
      </section>
    </motion.section>
  );
};

export default Camping;

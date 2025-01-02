"use client";
import PrimaryButton from "@/components/global/buttonFolder/PrimaryButton";
import Link from "next/link";
import Headline from "@/components/global/Headline";
import VolunteerRune from "@/img/svg/volunteer_rune.svg";
import { motion } from "framer-motion";

const Volunteer = () => {
  return (
    <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} animate={{ y: -40 }}>
      <section className="py-[10vh] px-4 grid place-content-center">
        <div className="max-w-screen-md mx-auto">
          <div className="grid place-content-center">
            <Headline src={VolunteerRune} width={45} height={45} size="text-5xl md:text-6xl" text="BLIV FRIVILLIG" />
          </div>
          <p className="py-4 text-base text-center md:text-lg">Er du vild med rockmusik og vil være en del af noget episk? Foo Fest søger frivillige til at hjælpe med alt fra bar og madboder til backstage og festivalstemning! Som tak for din indsats får du ratis billet til festivalen, et kig bag kulisserne og en oplevelse for livet med nye venner og masser af god musik!</p>
        </div>
        <div className="grid place-content-center pt-4">
          <Link href="/volunteer">
            <PrimaryButton aria_label_text="Read more" color="bg-gradient-to-r from-[#ec2783] from-12% via-[#d82023] via-46% to-[#ec4d08] to-87%" buttonContent="Læs mere" />
          </Link>
        </div>
      </section>
    </motion.section>
  );
};

export default Volunteer;

import Tickets from "@/img/svg/tickets_illustration.svg";
import Image from "next/image";
import PrimaryButton from "@/components/global/buttonFolder/PrimaryButton";
import Link from "next/link";
import { Caesar_Dressing } from "next/font/google";

const ceasarDressing = Caesar_Dressing({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const TicketsSection = () => {
  return (
    <section className="py-[10vh] grid place-content-center max-w-screen-xl mx-auto px-4">
      <h2 className={`${ceasarDressing.className} text-center uppercase text-[8vw] md:text-[4vw] pb-5`}>Billetsalget er i gang.</h2>
      <div className="grid gap-4 ">
        {/* https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images */}
        <Image className="justify-self-center" srcSet={`${Tickets} 320w, ${Tickets} 680w, ${Tickets} 960w, ${Tickets} 1980w`} src={Tickets} alt="billetter" />
        <div className="justify-self-center">
          <p className="text-center text-xl md:text-2xl md:max-w-[45rem]">På Foo Fest kan du vælge mellem en almindelig billet eller opgradere til en VIP-oplevelse, der giver dig den ultimative luksus og komfort under festivalen. Forkæl dig selv med noget ekstra og gør din festival uforglemmelig!</p>
        </div>
        <div className="justify-self-center pt-4">
          <Link href="/tickets">
            <PrimaryButton type="button" aria_label_text="Buy tickets" color="bg-gradient-to-r from-[#ec2783] from-12% via-[#d82023] via-46% to-[#ec4d08] to-87%" buttonContent="Køb billetter" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TicketsSection;

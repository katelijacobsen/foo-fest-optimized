import Accordion from "@/components/festivalsystem/Accordion";
import Headline from "@/components/global/Headline";
import CampingRune from "@/img/svg/camping_rune.svg";
import CampingMap from "@/img/svg/camping_map.svg";
import Image from "next/image";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import VolunteerRune from "@/img/svg/volunteer_rune.svg";

export default async function Page() {
  return (
    <>
      <Header />
      <main>
        <section className="p-4 max-w-screen-xl mx-auto mt-8 md:mt-12">
          <div className="grid gap-4 md:grid-cols-2 my-14">
            <div>
              <Headline src={CampingRune} width={45} height={45} size="text-4xl md:text-6xl" text="CAMPING" />
              <p className="pt-4">Det bedste ved at campere tæt på festivalpladsen er, at grænserne mellem lejrens intimitet og koncertens ekstase næsten forsvinder. Du kan starte din dag med stille toner fra en lut ved lejrbålet og slutte den med hæsblæsende headbanging foran scenen. Camping og musik bliver to sider af samme oplevelse – lige så uadskillelige som Odin og hans ravne.</p>
              <div className="py-6 md:py-11 max-w-[40rem] mx-auto">
                <h2 className="font-bold text-xl md:text-2xl pb-4">Ofte stillede spørgsmål</h2>
                <Accordion questionOne="Hvor rene er camping pladserne?" textOne="De reneste campingpladser du har set. Vi går meget op i at stille skraldespnade til rådighed og der er frivillige, som løbende rydder op på pladserne." questionTwo="Hvor tæt på ligger toilletterne?" textTwo="Der er mange toiletfaciliteter på festivalen, så du skal ikke være nervøs for, at der ligger toiletter i dit område." questionThree="Hvor mange telte kan der være på én plads?" textThree="Det er meget forskelligt i forhold til, hvor stor pladsen er." questionFour="Bliver der ryddet op efter mig?" textFour="Vi opfordrer til, at du selv står for din oprydning." />
              </div>
            </div>
            <Image className="place-self-center" src={CampingMap} alt="billede af camping områder" width={500} height={500} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

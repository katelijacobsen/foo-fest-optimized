import Header from "@/components/global/Header";
import LineUpList from "@/components/festivalsystem/lineup/LineUpList";
import Footer from "@/components/global/Footer";
import { fetchBands } from "@/lib/supabase";
import { fetchSchedule } from "@/lib/supabase";

export default async function Page() {
  // Ved hjælp af await bliver alle tre API'er kaldt, og resultaterne gemmes i variablerne bands, schedule og events.
  // Dette gør data tilgængelig til videre behandling i koden.
  const bands = await fetchBands();
  const schedule = await fetchSchedule();

  //Fået hjælp af tutorer til at merge datasæt
  // scenes og days er arrays, der bruges som hjælp til at strukturere dataene.
  // scenes repræsenterer de forskellige koncertscener.
  // days repræsenterer ugens dage.
  const scenes = ["Midgard", "Vanaheim", "Jotunheim"];
  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

  // bands.map gennemgår alle bands én efter én og skaber en ny array (mergedData), hvor hvert band kombineres med relevant information fra schedule.
  const mergedData = bands.map((band) => {
    // const mergedBand = { ...band }; laver en ny kopi af bandets data for at tilføje ekstra information senere uden at ændre den originale.
    const mergedBand = { ...band };
    // scenes.forEach og days.forEach itererer over hver kombination af scener og dage for at finde ud af, om bandet optræder på den scene på den dag.
    scenes.forEach((scene) => {
      days.forEach((day) => {
        // Tjekker, om bandets navn (band.name) findes i tidsplanen for en given scene og dag.
        // Hvis der findes et match, gemmes event-oplysningerne i eventInfo.
        if (schedule[scene][day].find((item) => item.act === band.name)) {
          const eventInfo = schedule[scene][day].find((item) => item.act === band.name);
          // Hvis der findes et match, tilføjes tre egenskaber til mergedBand:
          // eventInfo: Detaljer om bandets optræden.
          // scene: Scenen, hvor bandet spiller.
          // day: Dagen, hvor bandet spiller.
          mergedBand.eventInfo = eventInfo;
          mergedBand.scene = scene;
          mergedBand.day = day;
        }
      });
    });
    // Efter alle scener og dage er gennemgået, returneres det opdaterede band-objekt, som indeholder både de originale data og de nye oplysninger.
    return mergedBand;
  });

  return (
    <>
      <Header />
      <main className="my-24">
        <LineUpList mergedData={mergedData} />
      </main>
      <Footer />
    </>
  );
}

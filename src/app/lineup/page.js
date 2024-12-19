import Header from "@/components/global/Header";
import LineUpList from "@/components/festivalsystem/LineUpList";
import Footer from "@/components/global/Footer";

export default async function Page() {
  // fetch datasæt med endpoint /bands
  const fetchBands = async () => {
    let response = await fetch("https://spring-awesome-stream.glitch.me/bands");
    let data = await response.json();
    return data;
  };

  // fetch datasæt med endpoint /schedule
  const fetchSchedule = async () => {
    let response = await fetch("https://spring-awesome-stream.glitch.me/schedule");
    let data = await response.json();
    return data;
  };

  //Fået hjælp af tutorer til at merge datasæt
  // Ved hjælp af await bliver alle tre API'er kaldt, og resultaterne gemmes i variablerne bands, schedule og events.
  // Dette gør data tilgængelig til videre behandling i koden.
  const bands = await fetchBands();
  const schedule = await fetchSchedule();

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

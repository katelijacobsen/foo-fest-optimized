import SingleBand from "@/components/festivalsystem/SingleBand";
import Footer from "@/components/global/Footer";

const Band = async ({ params }) => {
  const slug = (await params).slug;
  // let response = await fetch(`http://localhost:8080/bands/${slug}`);
  let response = await fetch(`https://spring-awesome-stream.glitch.me/bands/${slug}`);
  let data = await response.json();

  return (
    <>
      <main>
        <SingleBand band={data} />
      </main>
      <Footer />
    </>
  );
};

export default Band;

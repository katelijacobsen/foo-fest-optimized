import Header from "@/components/global/Header";
import SingleBand from "@/components/festivalsystem/program/band/SingleBand";
import { getBandBySlug } from "@/lib/supabase";
import Footer from "@/components/global/Footer";

const Band = async ({ params }) => {
  const { slug } = await params;
  const data = await getBandBySlug(slug);

  return (
    <>
      <Header />
      <main>
        <SingleBand band={data} />
      </main>
      <Footer />
    </>
  );
};

export default Band;

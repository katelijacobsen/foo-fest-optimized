import SingleBand from "@/components/festivalsystem/singleband/SingleBand";
import Footer from "@/components/global/Footer";
import { getBandBySlug } from "@/lib/supabase";

const Band = async ({ params }) => {
  const { slug } = await params;
  const data = await getBandBySlug(slug);

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

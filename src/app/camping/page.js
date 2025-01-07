import Header from "@/components/global/Header";
import Camping from "@/components/festivalsystem/camping/Camping";
import Footer from "@/components/global/Footer";

export default async function Page() {
  return (
    <>
      <Header />
      <main>
        <Camping />
      </main>
      <Footer />
    </>
  );
}

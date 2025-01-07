import Header from "@/components/global/Header";
import Volunteer from "@/components/festivalsystem/volunteer/Volunteer";
import Footer from "@/components/global/Footer";

export default async function Page() {
  return (
    <>
      <Header />
      <main>
        <Volunteer />
      </main>
      <Footer />
    </>
  );
}

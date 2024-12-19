import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Caesar_Dressing } from "next/font/google";

const ceasarDressing = Caesar_Dressing({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function PaymentConfirmed({ state }) {
  // sætter vores svg til false så den er skjult i starten.
  const [startDraw, setStartDraw] = useState(false);

  // sætter vores false til true ( fra hidden til visible)
  useEffect(() => {
    setStartDraw(true);
  }, []);

  // Animationens properties: hvordan den skal skjules og blive vist.
  // laver en funktion der hedder visibel og definere derfra vores properties (måden den skal animeres på)
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: () => {
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { type: "spring", bounce: 0, duration: 1.3, delay: 0.5 },
        },
      };
    },
  };
  // total beløb. Vi laver her en constant der beregner prisen sammen for brugeren køb.
  // Nedenunder mapper vi vores 'filstruktur' til billetterne (single & vip).
  // For telt, campsite & greenCamping, er det ikke nødvendigt.
  const sumCart = state.tickets.single * 799 + state.tickets.vip * 1299 + state.tents.twoPeople * 299 + state.tents.threePeople * 399 + (state.tents.greenCamping ? 249 : 0) + (state.campsite ? 99 : 0);

  return (
    <motion.form
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: [0, 0.71, 0.2, 1.01], delay: 0.5 }}
      className="p-6 flex flex-col items-center justify-center rounded-lg bg-gradient-to-tl from-customBlack_2 to-customBlack m-8"
    >
      <h2 className={`${ceasarDressing.className} text-2xl md:text-4xl text-center mb-6 text-white`}>ORDRE BEKRÆFTELSE</h2>
      <div className="flex justify-center items-center w-full mb-6">
        <motion.svg
          className="w-36 h-auto"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial="hidden"
          animate={startDraw ? "visible" : "hidden"} //Boolean-syntax
          stroke="#4ece69"
        >
          <motion.path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="#4ece69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" custom={0} variants={draw} />
          <motion.path
            d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 5.47087 7.33782 3"
            stroke="#4ece69"
            strokeWidth="1.5"
            strokeLinecap="round"
            custom={1} // vores cirkel har et delay på 0.2 (custom data fra framer motion)
            variants={draw}
          />
        </motion.svg>
      </div>
      <div className=" mt-6 flex flex-col items-center">
        <div>
          <table className="min-w-full text-sm md:text-base table-auto ">
            <thead className=" bg-gradient-to-bl from-customPink text-white to-customOrange">
              <tr>
                <th className="px-4 py-2 text-left">Fornavn</th>
                <th className="px-4 py-2 text-left">Efternavn</th>
                <th className="px-4 py-2 text-left">Billettype</th>
                <th className="px-4 py-2 text-end">Pris</th>
              </tr>
            </thead>
            <tbody>
              {state.guests.single.map((guest, i) => (
                <tr key={i} className="border-gray-600 border-l border-r border-b">
                  <td className="px-4 py-2">{guest.firstName}</td>
                  <td className="px-4 py-2">{guest.lastName}</td>
                  <td className="px-4 py-2">Enkel billet</td>
                  <td className="px-4 py-2">799 DKK</td>
                </tr>
              ))}
              {state.guests.vip.map((guest, i) => (
                <tr className="border-gray-600 border-l border-r border-b" key={i}>
                  <td className="px-4 py-2">{guest.firstName}</td>
                  <td className="px-4 py-2">{guest.lastName}</td>
                  <td className="px-4 py-2">VIP Billet</td>
                  <td className="px-4 py-2">1299 DKK</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className=" mt-6">
            <table className="min-w-full text-sm md:text-base table-auto">
              <thead className="bg-gradient-to-bl from-customPink text-white to-customOrange">
                {state.campsite && (
                  <tr>
                    <th className="px-4 py-2 text-left ">Camp</th>
                    <th className="px-4 py-2 text-end">Pris</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {state.campsite && (
                  <tr className="border-gray-600 border-l border-r border-b">
                    <td className="px-4 py-2">{state.campsite}</td>
                    <td className="text-end px-4 py-2"> - </td>
                  </tr>
                )}
                <tr className="border-gray-600 border-l border-r border-b">
                  <td className="px-4 py-2 text-left">Grøn Camping{state.tents.greenCamping ? "" : ""}</td>
                  <td className="px-4 py-2 text-end">{state.tents.greenCamping ? "299DKK" : ""}</td>
                </tr>
                <tr className="border-gray-600 border-l border-r border-b">
                  {state.tents.twoPeople > 0 && <td className="px-4 py-2 text-left">{state.tents.twoPeople} x To Personers Telte</td>}
                  {state.tents.twoPeople > 0 && <td className="px-4 py-2 text-end">{state.tents.twoPeople * 299} DKK</td>}
                </tr>
                <tr className="border-gray-600 border-l border-r border-b">
                  {state.tents.threePeople > 0 && <td className="px-4 py-2 text-left">{state.tents.threePeople} x Tre Personers Telte</td>}
                  {state.tents.threePeople > 0 && <td className="px-4 py-2 text-end">{state.tents.threePeople * 399} DKK</td>}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="flex mt-6 text-xl text-end font-bold text-white">Total: {sumCart} DKK</p>
          <p className="flex mt-6 text-xs text-end text-gray-300">inkl. 99DKK bookinggebyr</p>
        </div>

        <Link className="font-bold px-8 py-2 my-8 text-xl bg-gradient-to-bl from-customPink text-white to-customOrange" href="/">
          Tilbage til Forsiden
        </Link>
      </div>
    </motion.form>
  );
}

//thead gruppere indholdet af tabellet
// tr står for table row
// th står for table header
// td står fortable table data

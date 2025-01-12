import { motion } from "framer-motion"; // Import motion from Framer Motion
import Card from "./Card";
import { Caesar_Dressing } from "next/font/google";

const ceasarDressing = Caesar_Dressing({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function ChooseTicket({ cart, formAction }) {
  // const [count2, setCount2] = useState(0);
  const totalTickets = cart.tickets.single + cart.tickets.vip;

  return (
    <motion.form
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative z-10 bg-customBlack_5 border border-customBlack_2 rounded-lg m-4 grid grid-rows-[auto_auto_1fr] grid-cols-1 sm:grid-cols-2 gap-4 sm:w-full "
    >
      <h2 className={`${ceasarDressing.className} text-left text-xl col-span-1 sm:col-span-2  sm:text-3xl m-8 `}>VÆLG VENLIGST EN TYPE BILLET</h2>
      <motion.div className="flex flex-col items-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 200 }}>
        <Card
          // setCount2={setCount2}
          ticketType="single"
          formAction={formAction}
          title="ENKEL BILLET"
          price="799"
          valuta="DKK"
          header="text-white"
        />
      </motion.div>
      <motion.div className="flex flex-col items-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }}>
        <Card
          // setCount2={setCount2}
          ticketType="vip"
          formAction={formAction}
          title="VIP BILLET"
          onlyVip="Meet-and-greet med artister"
          price="1299"
          valuta="DKK"
          border={`border-gradient`}
        />
      </motion.div>
      <div className="col-span-1 sm:col-span-2 flex justify-end">
        <button
          type="submit"
          formAction={formAction}
          disabled={totalTickets === 0}
          className={`text-lg font-bold py-2 px-6 rounded-sm m-8 sm:text-xl sm:px-8 w-full sm:w-auto ${totalTickets === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-bl from-customPink to-customOrange text-white"}`}
        >
          Næste
        </button>
      </div>
    </motion.form>
  );
}

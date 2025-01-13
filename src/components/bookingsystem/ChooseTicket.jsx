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
    <>
    <motion.form
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative z-10 bg-customBlack_5 border border-customBlack_2 rounded-lg m-4 grid grid-cols-1 sm:grid-cols-2 gap-4 "
    >
      <div className="m-4 col-span-1 sm:col-span-2 place-self-start">
        <div className="text-center mb-6">
          <h2
            className={`${ceasarDressing.className} text-2xl sm:text-3xl text-white text-left`}
          >
            VÆLG VENLIGST EN TYPE BILLET
          </h2>
          <h3 className="font-bold text-sm sm:text-base text-gray-400 mt-2 text-left">
            DU KAN VÆLGE MAKS 10 BILLETTER PER TYPE BILLET
          </h3>
        </div>
      </div>

      <motion.div
        className="flex flex-col justify-center items-center col-span-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.5,
          type: "spring",
          stiffness: 200,
        }}
      >
        <Card
          ticketType="single"
          formAction={formAction}
          title="ENKEL BILLET"
          price="799"
          valuta="DKK"
          header="text-white"
        />
      </motion.div>

      <motion.div
        className="flex flex-col justify-center items-center col-span-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card
          ticketType="vip"
          formAction={formAction}
          title="VIP BILLET"
          onlyVip="Meet-and-greet med artister"
          price="1299"
          valuta="DKK"
          border={`absolute inset-[-1000%] animate-[spin_3s_linear_infinite] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#141415_0%,#A82023_50%,#141415_100%)] bg-[conic-gradient(from_90deg_at_50%_50%,#52525B_0%,#D4D4DA_50%,#52525B_100%)]`}
        />
      </motion.div>

      <div className="col-span-1 sm:col-span-2 flex justify-center sm:justify-end mt-4">
        <button
          type="submit"
          formAction={formAction}
          disabled={totalTickets === 0}
          aria-label="Næste knap"
          className={`text-lg font-bold py-2 px-6 rounded-sm m-8 w-full sm:w-auto ${
            totalTickets === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-bl from-customPink to-customOrange text-white"
          }`}
        >
          Næste
        </button>
      </div>
    </motion.form>
  </>
  );
}

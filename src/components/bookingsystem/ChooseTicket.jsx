import { useState } from "react";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import Card from "./Card";

export default function ChooseTicket({ cart, formAction }) {
  const [count2, setCount2] = useState(0);
  const totalTickets = cart.tickets.single + cart.tickets.vip;

  const handleBuy = (e) => {
    console.log("Buy!");
    formAction(e);
  };

  return (
    <motion.form initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="relative z-10 bg-customBlack_5 border border-customBlack_2 rounded-lg m-4 grid grid-rows-2 gap-4 w-full">
      <motion.div className="flex flex-col items-center row-span-1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, type: "spring", stiffness: 200 }}>
        <Card setCount2={setCount2} ticketType="single" formAction={formAction} title="ENKEL BILLET" price="799" valuta="DKK" header="text-white" />
      </motion.div>
      <motion.div className="flex flex-col items-center row-span-1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
        <Card
          setCount2={setCount2}
          ticketType="vip"
          formAction={formAction}
          title="VIP BILLET"
          price="1299"
          valuta="DKK"
          border={`absolute inset-[-1000%] animate-[spin_3s_linear_infinite] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#141415_0%,#A82023_50%,#141415_100%)] bg-[conic-gradient(from_90deg_at_50%_50%,#52525B_0%,#D4D4DA_50%,#52525B_100%)]`}
        />
      </motion.div>
      <div className="w-full mt-4 md:mt-0 md:w-auto row-span-2 sm:col-span-2 place-self-end md:m-4">
        <button
          type="submit"
          formAction={formAction}
          disabled={totalTickets === 0}
          className={`w-full md:w-auto text-xl font-bold py-2 my-8 text-white ${
            totalTickets === 0 ? "bg-gray-400 px-8 cursor-not-allowed rounded-sm" : "font-bold px-8 py-2 my-8 text-xl rounded-sm bg-gradient-to-bl from-customPink text-white to-customOrange"
          }`}
        >
          Næste
        </button>
      </div>
    </motion.form>
  );
}

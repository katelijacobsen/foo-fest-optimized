import Image from "next/image";
import CampingMap from "@/img/svg/camping_map.svg";
import { RxCross2 } from "react-icons/rx";
import { motion } from "framer-motion";

export default function PopupMap({ setPopupOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-opacity-50 bg-black flex justify-center items-center z-100"
    >
      <div className="relative max-w-lg w-full border border-gray-500 bg-customBlack_5 p-4 my-4 rounded-md m-8">
        <button
          type="button"
          onClick={() => setPopupOpen(false)}
          className="absolute top-2 right-4 text-slate-600 hover:underline"
          aria-label="Luk Kortet"
        >
          <RxCross2 className="bg-customBlack_5 text-customOrange h-10 w-10 md:ml-0 md:mb-8 border-solid border-[1px] border-customOrange rounded-full p-2" />
        </button>

        <h3 className="text-xl font-bold">Festivals Kort</h3>
        <Image
          src={CampingMap}
          width={500}
          height={500}
          alt="Foo Fest Festivals Kort med overblik over de forskellige campingområder"
          className="bg-black w-full h-auto"
        />
      </div>
    </motion.div>
  );
}

import { Caesar_Dressing } from "next/font/google";
import { FaBasketShopping } from "react-icons/fa6";
import { motion } from "framer-motion";
import { IoIosCloseCircle } from "react-icons/io";
import { useState } from "react";

const ceasarDressing = Caesar_Dressing({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function Cart({ cart }) {
  const [isOpen, setIsOpen] = useState(false);

  const emptyCart = cart.tickets.single === 0 && cart.tickets.vip === 0;
  const sumCart =
    cart.tickets.single * 799 +
    cart.tickets.vip * 1299 +
    cart.tents.twoPeople * 299 +
    cart.tents.threePeople * 399 +
    (cart.tents.greenCamping ? 249 : 0) +
    (cart.campsite ? 99 : 0);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 sm:px-6"
    >
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "48vh" : "6rem" }}
        className=" w-full z-50 bg-customBlack_5 fixed  bottom-0 left-0 p-4 sm:hidden rounded-t-lg overflow-hidden shadow-lg"
      >
        <div
          className=" cursor-pointer flex items-center justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h3
            className={`${ceasarDressing.className} text-3xl flex items-baseline gap-4 font-bold text-white`}
          >
            {isOpen ? (
              <IoIosCloseCircle size={48} />
            ) : (
              <FaBasketShopping size={42} className="text-white" />
            )}{" "}
            INDKØBSKURV
          </h3>
        </div>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-4"
          >
            {emptyCart ? (
              <div className="text-gray-200 text-center">
                <p>Høvding! Tilføj bytte i din kurv.</p>
              </div>
            ) : (
              <div className="text-white">
                <section>
                  <h2 className="font-bold border-b">BILLETTER</h2>
                  <ul className="mt-2 space-y-2">
                    {cart.tickets.single !== 0 && (
                      <li>
                        {cart.tickets.single}x Enkelbillet
                        {cart.tickets.single * 799} kr
                      </li>
                    )}
                    {cart.tickets.vip !== 0 && (
                      <li>
                        {cart.tickets.vip}x VIP Billet {cart.tickets.vip * 1299}
                        kr
                      </li>
                    )}
                  </ul>
                </section>
                <section>
                  {cart.campsite ? (
                    <>
                      <h2 className="font-bold border-b">CAMPSITE</h2>
                      <ul className="">
                        <li className="font-bold text-lg">{cart.campsite}</li>
                        {cart.campsite && (
                          <li className="text-xs font-normal text-gray-300">
                            <p>+99kr Booking Gebyr</p>
                          </li>
                        )}
                        {cart.tents.twoPeople !== 0 && (
                          <li>
                            <p>{cart.tents.twoPeople}x 2 Personers Telt </p>
                            <p>{cart.tents.twoPeople * 299} kr</p>
                          </li>
                        )}
                        {cart.tents.threePeople !== 0 && (
                          <li>
                            <p>{cart.tents.threePeople * 399} kr</p>
                            <p>{cart.tents.threePeople}x 3 Personers Telt </p>
                          </li>
                        )}
                        {cart.greenCamping && (
                          <li>
                            <p>Grøn Camping 249kr</p>
                          </li>
                        )}
                        
                      </ul>
                    </>
                  ) : null}
                </section>
                <section>
                  <h2 className="font-bold border-b">TOTAL</h2>
                  <p className="mt-2 font-bold text-end">{sumCart} DKK</p>
                </section>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
      <motion.aside
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="hidden sm:flex flex-col gap-4 rounded-lg bg-customBlack_5 p-6 sm:p-8 w-72"
      >
        <h3 className={`${ceasarDressing.className} text-xl sm:text-2xl`}>
          Indkøbskurv
        </h3>
        {emptyCart ? (
          <div className="flex flex-col items-center justify-center gap-2 text-gray-200">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.8  }}
            >
              <FaBasketShopping size={72} />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.8  }}
              className="text-center text-sm sm:text-base"
            >
              Høvding! Tilføj bytte i din kurv.
            </motion.p>
          </div>
        ) : (
          <>
            <section className="text-sm sm:text-base">
              <h2 className="font-bold border-b ">BILLETTER</h2>
              <ul className="mt-2 space-y-2">
                {cart.tickets.single !== 0 && (
                  <li>
                    {cart.tickets.single}x Enkelbillet
                    {cart.tickets.single * 799} kr
                  </li>
                )}
                {cart.tickets.vip !== 0 && (
                  <li>
                    {cart.tickets.vip}x VIP Billet {cart.tickets.vip * 1299} kr
                  </li>
                )}
              </ul>
            </section>

            <section className="text-sm sm:text-base">
              {cart.campsite ? (
                <div>
                  <h2 className="font-bold border-b">CAMPSITE</h2>
                  <ul className="">
                    <li className="font-bold text-lg">{cart.campsite}</li>
                    {cart.campsite && (
                      <li className="text-xs font-normal text-gray-300">
                        +99kr Booking Gebyr
                      </li>
                    )}
                    {cart.tents.twoPeople !== 0 && (
                      <li>
                        <p>{cart.tents.twoPeople}x 2 Personers Telt</p>
                        <p>{cart.tents.twoPeople * 299} kr</p>
                      </li>
                    )}
                    {cart.tents.threePeople !== 0 && (
                      <li>
                        <p>{cart.tents.threePeople}x 3 Personers Telt</p>
                        <p>{cart.tents.threePeople * 399} kr</p>
                      </li>
                    )}
                    {cart.greenCamping && <li>Grøn Camping 249kr</li>}
                  </ul>
                </div>
              ) : null}
            </section>
            <section className="text-sm sm:text-base">
              <h2 className="font-bold border-b">TOTAL</h2>
              <p className="mt-2 font-bold text-end">{sumCart} DKK</p>
            </section>
          </>
        )}
      </motion.aside>
    </motion.section>
  );
}

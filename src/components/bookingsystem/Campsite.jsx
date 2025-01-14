"use client";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "@/app/tickets/page";
import { motion } from "framer-motion";
import { FaLeaf } from "react-icons/fa6";
import { IoIosAlert } from "react-icons/io";
import { Caesar_Dressing } from "next/font/google";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import TentChoice from "./TentChoice";
import PopupMap from "./PopupMap";

const ceasarDressing = Caesar_Dressing({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function Campsite({
  state,
  formAction,
  setReservedId,
  setTimeOut,
  
}) {
  const [cart, setCart] = useContext(CartContext);
  const [twoPersonCount, setTwoPersonCount] = useState(0);
  const [threePersonCount, setThreePersonCount] = useState(0);

  const [selectedCampsite, setSelectedCampsite] = useState(undefined);
  const [antalBilletter, setAntalBilletter] = useState(0);
  const [greenCamping, setGreenCamping] = useState(false);
  const [countError, setCountError] = useState("");
  const [handleError, setHandleError] = useState("");

  const [data, setData] = useState([]);

  const [popupOpen, setPopupOpen] = useState(false);

  // skal bruges til når vi tilføjer loading https://nextjs.org/docs/pages/building-your-application/data-fetching/client-side
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // fetch("http://localhost:8080/available-spots")
    fetch("https://spring-awesome-stream.glitch.me/available-spots")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [antalBilletter]);

  const numPeople = state.tickets.single + state.tickets.vip;
  const allowUpdate = (delta) => {
    const numTents = twoPersonCount + threePersonCount;
    if (numTents + delta > numPeople) {
      setCountError("Kære Høvding.. kun et telt til en billet.");
      return false;
    }
    setCountError("");
    return true;
  };

  const updateTwoPersonTentCount = (count) => {
    const ok = allowUpdate(count > twoPersonCount ? +1 : -1);
    if (!ok) {
      return;
    }
    setCart((prev) => ({
      ...prev,
      tents: { ...prev.tents, twoPeople: count },
    }));
    setTwoPersonCount(count);
  };
  const updateThreePersonTentCount = (count) => {
    const ok = allowUpdate(count > threePersonCount ? +1 : -1);
    if (!ok) {
      return;
    }
    setCart((prev) => ({
      ...prev,
      tents: { ...prev.tents, threePeople: count },
    }));
    setThreePersonCount(count);
  };

  const updateCampsite = (campsite) => {
    setCart((prev) => {
      return {
        ...prev,
        campsite,
      };
    });
    setSelectedCampsite(campsite);
    setAntalBilletter(numPeople);
  };

  const updateGreenCamping = (e) => {
    setGreenCamping(e.target.checked);
    setCart((prev) => {
      return {
        ...prev,
        greenCamping: e.target.checked,
      };
    });
  };

  const handleNext = (formData) => {
    if (!selectedCampsite) {
      setHandleError("Vælg venligst et campingområde, før du fortsætter.");
      return;
    }

    formData.set("campsite", selectedCampsite);

    formAction(formData);
  };

  const [startTimer, setStartTimer] = useState(0);
  useEffect(() => {
    if (startTimer === 0) return;

    fetch("https://spring-awesome-stream.glitch.me/reserve-spot", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        area: selectedCampsite,
        amount: antalBilletter,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to reserve spot");
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        setReservedId(data.id); // Save the ID in state
        setTimeOut(data.timeout);
      });
  }, [startTimer]);

  return (
    <div className="flex justify-center mx-4">
      <motion.form
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className=" inline-flex flex-col flex-1 bg-gradient-to-tl border border-gray-500 bg-customBlack_5 p-4 my-4 rounded-md"
      >
        <h2 className={`${ceasarDressing.className} text-3xl text-white`}>
          HVOR VIL DU CAMPE?
        </h2>
        <h3 className="font-bold text-sm mb-4 text-gray-400">
          VÆLG VENLIGST EN LEDIG CAMPINGOMRÅDE
        </h3>
        {isLoading && (
          <div className="flex justify-center items-center">
            <span className="w-14 h-14 loader-animation "></span>
          </div>
        )}
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 text-white">
          {data.map((spot, i) => (
            <li
              onClick={() => updateCampsite(spot.area, spot.available)}
              key={i}
              className={`${
                spot.available < numPeople &&
                "bg-gray-300 text-gray-500 cursor-not-allowed hidden disabled"
              }${
                spot.area === selectedCampsite && "border-4"
              } bg-gradient-to-tl border border-gray-900 from-customBlack_2 to-customBlack p-2 rounded-md select-none cursor-pointer`}
              style={{
                borderImage:
                  spot.area === selectedCampsite
                    ? "linear-gradient(to right, #EC2783, #D82023 , #EC4D08) 1"
                    : "none",
                borderRadius: "0.375rem",
                borderWidth: spot.area === selectedCampsite ? "2px" : "1px",
              }}
            >
              <h2 className="text-2xl font-bold">{spot.area}</h2>
              <p>{spot.available} ledige pladser</p>
            </li>
          ))}
        </ul>
        <div className="my-4">
          <button
            type="button"
            onClick={() => setPopupOpen(true)}
            className="flex items-center gap-[.4em] cursor-pointer text-xs customGrey hover:underline "
          >
            {" "}
            <BsFillQuestionCircleFill className="text-lg" /> Se de forskellige
            Campingområder{" "}
          </button>
        </div>
        {popupOpen && (
          //Laver en arrow funktion/fat arrow function til vores PopupMap komponent
          // arrow function er en forkortede syntax til at definere vores boolean.
         <PopupMap setPopupOpen={setPopupOpen}/>
        )}

        <div className="flex flex-col justify-evenly gap-4">
          <section>
            <h3
              className={`${ceasarDressing.className} text-3xl text-white mt-8`}
            >
              LEJE AF TELTE
            </h3>
            <ul className="my-4 inline-flex flex-col gap-6">
              <TentChoice
                title="2 Personers Telt"
                price="299 DKK"
                count={twoPersonCount}
                setCount={updateTwoPersonTentCount}
              />
              <TentChoice
                title="3 Personers Telt"
                price="399 DKK"
                count={threePersonCount}
                setCount={updateThreePersonTentCount}
              />
            </ul>
            {countError && (
              <p
                className="text-red-500 flex items-center gap-2"
                aria-live="assertive"
              >
                <IoIosAlert size={36} /> {countError}
              </p>
            )}
          </section>
          <section>
            <h3
              className={`${ceasarDressing.className} text-3xl text-white mb-4`}
            >
              SUPPLEMENT
            </h3>

            <div className="flex items-center p-4 rounded-md bg-gradient-to-tl border border-green-800 from-black to-green-900">
              <div className="flex h-5">
                <input
                  id="helper-checkbox"
                  aria-describedby="helper-checkbox-text"
                  name="greenCamping"
                  type="checkbox"
                  checked={greenCamping}
                  className="w-6 h-6 bg-gray-100 border-gray-300 rounded-full focus:ring-green-500 dark:ring-offset-gray-800 focus:ring-2 checked:bg-green-600 checked:border-green-600"
                  onChange={updateGreenCamping}
                />
              </div>
              <div className="ms-2 text-sm">
                <label
                  htmlFor="helper-checkbox"
                  className="font-bold inline-flex gap-2 items-baseline text-xl text-white"
                >
                  Grøn Camping <FaLeaf className="text-green-400" />
                </label>
                <p
                  id="helper-checkbox-text"
                  className="text-xs font-normal customGrey"
                >
                  249kr
                </p>
                <p className="font-light text-sm customGrey w-64">
                  Perfekt til dig, der ønsker en mere miljøvenlig
                  festivaloplevelse.
                </p>
              </div>
            </div>
          </section>
        </div>
        <div className="flex flex-col items-end">
          {handleError && (
            <p
              className="text-red-500 flex items-center gap-2"
              aria-live="assertive"
            >
              <IoIosAlert size={36} />
              {handleError}
            </p>
          )}
          <button
            onClick={() => setStartTimer((prev) => prev + 1)}
            className={`${
              selectedCampsite
                ? "font-semibold py-2 rounded-sm px-8 my-8 ml-auto text-xl bg-gradient-to-bl from-customPink text-white to-customOrange text-transparent w-full sm:w-auto"
                : "bg-gray-500 rounded-sm px-8 py-2 my-8 text-xl ml-auto font-bold text-gray-300 cursor-not-allowed"
            }`}
            formAction={handleNext}
            type="submit"
          >
            Næste
          </button>
        </div>
      </motion.form>
    </div>
  );
}

import { useState, useEffect } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { Caesar_Dressing } from "next/font/google";
import { motion } from "framer-motion";
const ceasarDressing = Caesar_Dressing({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const PaymentForm = ({ formAction, reservedId, setTimeOut }) => {
  // objekter med empty strings der bliver holdt øje med i kortbetalingen.
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  // // kilde: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
  // const validateInput = (name, value) => {
  //   switch (name) {
  //     case "number":
  //       return /^\d{0,16}$/.test(value) ? "" : "Kortnummer skal være maks 16 cifre.";
  //     case "expiry":
  //       return /^\d{0,4}$/.test(value) ? "" : "Mangler udløbsdato: MMYY.";
  //     case "cvc":
  //       return /^\d{0,3}$/.test(value) ? "" : "CVC skal være maks 3 cifre.";
  //     case "name":
  //       return value.trim() !== "" ? "" : "Indtast venligst kortholders navn.";
  //     default:
  //       return "";
  //   }
  // };

  // const handleInputChange = (evt) => {
  //   const { name, value } = evt.target;
  //   const error = validateInput(name, value);

  //   setState((prev) => ({
  //     ...prev,
  //     [name]: value,
  //     errors: { ...prev.errors, [name]: error },
  //   }));
  // };

  // Noget som AI har anbefalet jeg skulle bruge, men det virkede ikke til at være best practice.
  //Funktionen kigger om den lever op til krav for betalingsfeltet.
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    // Her bliver der tilføjet betingelser for at opdatere vores state i vores Cards, som vi også har sat up som useState hook.
    // Så f.eks denne betingelse fortæller at hvis name er ens med number skal længden være maks 16.
    // setState((prev) => ({ ...prev, [name]: value })); fortæller så at det ikke må overskrives. Den opdatere så kun feltet, der bliver ændret fra brugerens input.
    // Så fordi vi har med forskellige værdier at arbejde med opdatere vi det én af gangen.
    if (name === "number" && value.length <= 16) {
      setState((prev) => ({ ...prev, [name]: value }));
    }

    // expiry date (max 4 characters, MM/YY)
    if (name === "expiry" && value.length <= 4) {
      setState((prev) => ({ ...prev, [name]: value }));
    }

    // CVC (max 3 digits)
    if (name === "cvc" && value.length <= 3) {
      setState((prev) => ({ ...prev, [name]: value }));
    }

    // For name, handle normally
    if (name === "name") {
      setState((prev) => ({ ...prev, [name]: value }));
    }
  };
  const [paymentConfirmed, setPaymentConfirmed] = useState(0);

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };


  // const dog = {
  //   type: 'mammal',
  //   legs: 4,
  //   name: "carsten"
  // };

  // const name = "type";
  // const x = {...dog, [name]: 2};



  useEffect(() => {
    if (paymentConfirmed === 0) return;

    fetch("https://spring-awesome-stream.glitch.me/fullfill-reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: reservedId,
      }),
    });

    setTimeOut(0);
  }, [paymentConfirmed]);
  return (
    <>
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className=" border border-gray-600 p-4 sm:p-8 rounded-lg bg-gradient-to-tl from-customBlack_2 to-customBlack m-4">
        <h2 className={`${ceasarDressing.className} text-2xl sm:text-3xl my-4 text-left`}>BETALINGSKORT</h2>

        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center p-4 sm:p-8 gap-4">
          <div className="flex-shrink-0">
            <Cards number={state.number} expiry={state.expiry} cvc={state.cvc} name={state.name} focused={state.focus} />
          </div>
          <form action="kortOplysninger" className="flex flex-col items-center sm:items-start gap-4 w-full sm:w-auto">
            <div className="flex flex-col gap-[.1rem] w-full">
              <label htmlFor="kortnummer" className="font-bold text-md">
                Kortnummer
              </label>
              <span className="text-gray-200 text-xs" >Indtast venligst dine 16 cifre </span>
              <input
                id="kortnummer"
                aria-label="kortnummer"
                className="p-2 rounded-md w-full text-black border-2 focus:ring focus:ring-customRed"
                name="number"
                value={state.number}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                required
                placeholder="1234 1234 1234 1234"
                type="number"
                />
              <label htmlFor="kortHolder" className="font-bold text-md">
                Kortholder
              </label>
              <span className="text-gray-200 text-xs">Fulde navn på egeren af Kortet </span>
              <input
                id="kortHolder"
                aria-label="kortHolder navn"
                className="p-2 rounded-md w-full text-black border-2 focus:ring focus:ring-customRed"
                name="name"
                value={state.name}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                required
                placeholder="Kortholder Navn"
                type="text"
                />
            </div>
            <div className="flex flex-col items-end gap-2 w-full sm:flex-row sm:gap-4">
              <div className="flex flex-col w-full">
                <label htmlFor="udløbsdato-mm/åå" className="font-bold text-md">
                  Udløbsdato
                </label>
                <span className="text-gray-200 text-xs w-38"> Indtast venligst måned og år </span>
                <input
                  id="udløbsdato-mm/åå"
                  aria-label="udløbsdato-mm/åå"
                  className="p-2 rounded-md w-full text-black border-2 focus:ring focus:ring-customRed"
                  name="expiry"
                  value={state.expiry}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  required
                  placeholder="MM/ÅÅ"
                  type="text"
                  />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="kontrolcifre" className="font-bold text-md">
                  CVC
                </label>
                <span className="text-gray-200 text-xs sm:w-30"> Indtast venligst de 3 cifre </span>
                <input
                  id="kontrolcifre"
                  aria-label="kontrolcifre"
                  className="p-2 rounded-md sm:w-16 text-black border-2 focus:ring focus:ring-customRed"
                  name="cvc"
                  value={state.cvc}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  required
                  placeholder="CVC"
                  type="number"
                />
              </div>
            </div>
            <button
              onClick={() => setPaymentConfirmed((prev) => prev + 1)}
              aria-label="Afslut og Betal"
              formAction={formAction}
              className="font-bold self-end px-8 py-2 my-8 text-xl rounded-sm bg-gradient-to-bl from-customPink text-white to-customOrange w-full sm:w-auto"
            >
              Afslut & Betal
            </button>
          </form>
        </div>
      </motion.div>
    </>
  );
};

export default PaymentForm;

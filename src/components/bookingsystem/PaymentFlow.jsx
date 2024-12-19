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

const PaymentForm = ({ formAction, router }) => {
  const [timeLeft, setTimeLeft] = useState(60 * 5 * 1000); // Her bliver der holdt øje med tiden (5min)
 // objekter med empty strings der bliver holdt øje med i kortbetalingen.
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
// useEffect hook. Hvis tiden ender på 0 vil den vise en alert for brugeren. 
// med formAction med en null bliver brugeren navigerede tilbage til starten af flowet. 
  useEffect(() => {
    if (timeLeft <= 0) {
      alert("Tiden er udløbet. du bliver stillet tilbage til billetsiden.");
      formAction(null);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1000);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, router]);

  const mins = Math.floor(timeLeft / 1000 / 60);
  const secs = Math.floor((timeLeft / 1000) % 60);

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

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className=" border border-gray-600 p-4 sm:p-8 rounded-lg bg-gradient-to-tl from-customBlack_2 to-customBlack m-4"
      >
        <p className="bg-gradient-to-bl rounded-sm from-customPink text-white to-customOrange w-full text-center text-xl sm:text-2xl font-bold">
          {mins} : {String(secs).padStart(2, "0")}
        </p>
        <h2
          className={`${ceasarDressing.className} text-2xl sm:text-3xl my-4 text-left`}
        >
          BETALINGSKORT
        </h2>

        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center p-4 sm:p-8 gap-4">
          <div className="flex-shrink-0">
            <Cards
              number={state.number}
              expiry={state.expiry}
              cvc={state.cvc}
              name={state.name}
              focused={state.focus}
            />
          </div>
          <form action="kortOplysninger" className="flex flex-col items-center sm:items-start gap-4 w-full sm:w-auto">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="kortnummer" className="font-bold text-md">
                Kortnummer
              </label>
              <input
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
              <input
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
            <div className="flex flex-col gap-2 w-full sm:flex-row sm:gap-4">
              <div className="flex flex-col w-full">
                <label htmlFor="udløbsdato" className="font-bold text-md">
                  Udløbsdato
                </label>
                <input
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
                <label htmlFor="Kontrolcifre" className="font-bold text-md">
                  CVC
                </label>
                <input
                  className="p-2 rounded-md w-full text-black border-2 focus:ring focus:ring-customRed"
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

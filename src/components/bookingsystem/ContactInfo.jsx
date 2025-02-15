"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Caesar_Dressing } from "next/font/google";

const ceasarDressing = Caesar_Dressing({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});



export default function ContactInfo({ tickets, formAction }) {
  const [isFormValid, setIsFormValid] = useState(false);

  // Det var lidt svært at forstå regex, så her blevet der brugt AI
  // På mdn er checkValidity() en metode der returnere en boolean værdi, valid /invalid.
  // Når jeg så tilføjer min funktion ned til min form ville det kigge efter som den bruger gyldige tegn (contraint validation).
  const handleInputChange = (e) => {
    // inputfelt, der  blev ændret med closest metoden, som skulle finde form (input er den del af form)
    // henter alle inputfelterne i formularen
    const inputs = e.target.closest("form").querySelectorAll("input");
    // laver en input array som går igennem hvert enkelte. checkValidity metoden checker om inputfelterne er godkendt.
    // allValid bliver sat til false fordi den ikke er
    const allValid = Array.from(inputs).every((input) => input.checkValidity());
    setIsFormValid(allValid);
  };

  //Funktionen, der ikke virkede med regex tegn :
  // kilde fra stackoverflow : https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
  // const validateEmail = (email) => {
  //   return String(email)
  //     .toLowerCase() //gør alle bogstaver små
  //     .match( // Matcher en streng eller et objekt, der kan matches imod, og returnerer et array med resultaterne af søgningen, eller null, hvis der ikke findes nogen match.
  //       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //     );

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className=" text-white rounded-lg bg-gradient-to-tl border border-gray-500 from-customBlack_2 to-customBlack p-4 relative z-0"
      onChange={handleInputChange}
    >
      <fieldset className="grid gap-6 mb-6 md:grid-cols-[auto] grid-cols-1">
        <legend className={`${ceasarDressing.className} block mb-2 text-3xl`}>
          PERSONLIG INFORMATION
        </legend>
        <div className="flex flex-wrap items-end justify-start">
          {Array.from({ length: tickets.single }, (_, i) => (
            <ContactForm
              key={i}
              i={i}
              ticketType="single"
              isRecepient={i===0}
              className="flex-grow flexbasis-[200px] min-w-[150px] "
              />
            ))}
        </div>
        <div className="flex flex-wrap items-end">
          <div className="relative z-10 group rounded-xl p-[2px] overflow-hidden ">
            {tickets.vip > 0 && <span className="border-gradient" />}
            <div className="bg-gradient-black rounded-lg">
              <div className="overflow-hidden rounded-xl flex flex-wrap items-end">
                {Array.from({ length: tickets.vip }, (_, i) => (
                  <ContactForm
                  key={i}
                  i={i}
                  ticketType="vip"
                  isRecepient={ i === 0 && tickets.single === 0}
                    className="flex-grow flexbasis-[200px] min-w-[150px] "
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </fieldset>
      <div className="flex">
        <button
          className={`${
            isFormValid
              ? "font-bold px-8 py-2 my-8 ml-auto text-xl bg-gradient-to-bl from-customPink text-white to-customOrange text-transparent"
              : "bg-gray-500 px-8 py-2 my-8 ml-auto text-xl font-bold text-gray-300 cursor-not-allowed"
          }`}
          formAction={formAction}
          type="submit"
          disabled={!isFormValid}
        >
          Næste
        </button>
      </div>
    </motion.form>
  );
}

function ContactForm({ i, ticketType, isRecepient }) {
  //Her bruger jeg staggerChildren så jeg giver hver children en lille delay-animation
  // Tilføjer i parent komponenten en variant/tilstand på children komponenterne kan arve det vider.
  // Derefter giver jeg hver children inputSpring, hvordan de skal animeres ind (har gjort det som konstant)
  const staggerInputs = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const inputSpring = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerInputs}
      className="p-2"
    >
      {/* ticketType kigger om det en single/vip og laver en conditionel rendering. Vi gav den property tidligere til Cards i ChooseTickets-komponenten. */}
      {ticketType === "single" && (
        <motion.h2 className="font-bold text-xl" variants={inputSpring}>
          Enkelt Billet
        </motion.h2>
      )}
      {ticketType === "vip" && (
        <motion.h2
          variants={inputSpring}
          className="font-bold text-xl bg-gradient-to-r from-customPink via-customRed to-customOrange bg-clip-text text-transparent"
        >
          VIP Billet
        </motion.h2>
      )}
      {isRecepient && (
        <p className="text-gray-400 text-xs">Modtager af kvittering</p>
      )}
      <motion.div className="mb-2.5" variants={inputSpring}>
        <label
          htmlFor={`${ticketType}_firstName_${i}`}
          className="block text-sm font-medium text-white"
          id="fornavn-felt"
        >
          Fornavn
        </label>
        <input aria-describedby="fornavn-felt" minLength="2" id={`${ticketType}_firstName_${i}`} name={`${ticketType}_firstName_${i}`} type="text" placeholder="Joe" autoComplete="given-name" required className="bg-gray-100 border border-gray-200 text-gray-900 text-sm rounded-md w-full p-2.5 focus:outline-none focus:ring-2 valid:[&:not(:placeholder-shown):not(:focus)]:bg-green-50 valid:[&:not(:placeholder-shown):not(:focus)]:border-green-500 valid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-green-500 invalid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:bg-red-50 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400" />
      </motion.div>

      <motion.div className="mb-2.5" variants={inputSpring}>
        <label
          htmlFor={`${ticketType}_lastName_${i}`}
          className="block text-sm font-medium text-white"
          id="efternavn-felt"
        >
          Efternavn
        </label>
        <input aria-describedby="efternavn-felt" minLength="2" id={`${ticketType}_lastName_${i}`} name={`${ticketType}_lastName_${i}`} type="text" placeholder="Doe" autoComplete="family-name" required className="bg-gray-100 border border-gray-200 text-gray-900 text-sm rounded-md w-full p-2.5 focus:outline-none focus:ring-2 valid:[&:not(:placeholder-shown):not(:focus)]:bg-green-50 valid:[&:not(:placeholder-shown):not(:focus)]:border-green-500 valid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-green-500 invalid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:bg-red-50 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400" />
      </motion.div>

      <motion.div className="mb-2.5 flex flex-col" variants={inputSpring}>
        <label htmlFor={`${ticketType}_email_${i}`}>Email</label>
        <span id="email-felt" className="text-xs text-gray-200">
          Dette felt kræver mindst et @-tegn
        </span>
        <input
          className="bg-gray-100 border border-gray-200 text-gray-900 text-sm rounded-md w-full p-2.5 focus:outline-none focus:ring-2 valid:[&:not(:placeholder-shown):not(:focus)]:bg-green-50 valid:[&:not(:placeholder-shown):not(:focus)]:border-green-500 valid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-green-500 invalid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:bg-red-50 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
          id={`${ticketType}_email_${i}`}
          name={`${ticketType}_email_${i}`}
          type="email"
          placeholder="joedoe@example.com"
          pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;"
          autoComplete="email"
          aria-describedby="email-felt"
          required
        />
      </motion.div>

      <motion.div className="mb-2.5" variants={inputSpring}>
        <label
          htmlFor={`${ticketType}_phonenumber_${i}`}
          id="telefonnummer-felt"
        >
          Mobilnummer
        </label>
        <span id="telefonnummer-felt" className="text-xs text-gray-200">
          Dette felt kræver 6-8 cifre
        </span>
        <input
          aria-describedby="telefonnummer-felt"
          id={`${ticketType}_phonenumber_${i}`}
          name={`${ticketType}_phonenumber_${i}`}
          type="tel"
          placeholder="12 34 56 78"
          autoComplete="tel"
          required
          className="bg-gray-100 border border-gray-200 text-gray-900 text-sm rounded-md w-full p-2.5 focus:outline-none focus:ring-2 valid:[&:not(:placeholder-shown):not(:focus)]:bg-green-50 valid:[&:not(:placeholder-shown):not(:focus)]:border-green-500 valid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-green-500 invalid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:bg-red-50 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
        />
      </motion.div>
    </motion.div>
  );
}

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


  return (
<motion.form
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.3 }}
  className="text-white rounded-lg bg-gradient-to-tl border border-gray-500 from-customBlack_2 to-customBlack p-4 relative z-0"
>
  <fieldset className="grid gap-6 mb-6 md:grid-cols-2">
    <legend className={`${ceasarDressing.className} block mb-2 text-3xl`}>
      PERSONLIG INFORMATION
    </legend>
    {Array.from({ length: tickets.single }, (_, i) => (
      <ContactForm key={i} i={i} ticketType="single" />
    ))}
    <div className="relative z-10 group rounded-xl inline-block p-[2px] overflow-hidden">
      {tickets.vip > 0 && (
        <span className="absolute inset-[-1000%] animate-[spin_7s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#EC2783_0%,#141415_50%,#EC2783_100%)]" />
      )}
      <div className="relative bg-gradient-to-tl from-customBlack_2 to-customBlack z-0 rounded-xl">
        <div className="rounded-xl overflow-hidden">
          {Array.from({ length: tickets.vip }, (_, i) => (
            <ContactForm key={i} i={i} ticketType="vip" />
          ))}
        </div>
      </div>
    </div>
  </fieldset>
  <div className="flex">
    <button
      className={`${
        isFormValid
          ? "font-bold px-8 py-2 my-8 ml-auto text-xl bg-gradient-to-bl from-customPink text-white to-customOrange text-transparent hover:transform"
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

function ContactForm({ i, ticketType }) {
  const [emailError, setEmailError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  //Her bruger jeg staggerChildren så jeg giver hver children en lille delay-animation
  // Tilføjer i parent komponenten en variant/tilstand på children komponenterne kan arve det vider.
  // Derefter giver jeg hver children inputSpring, hvordan de skal animeres ind (har gjort det som konstant)

  const handleEmailChange = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(e.target.value);
    setEmailError(!isValidEmail);
  };

  const handleEmptyInputChange = (e) => {
    const inputValue = e.target.value
    const invalidInput = inputValue === "" ? "Input kan ikke være tomt" : "";
    setEmptyError(invalidInput); 
  };

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

      <motion.div className="mb-2.5" variants={inputSpring}>
        <label
          htmlFor={`${ticketType}_firstName_${i}`}
          className="block text-sm font-medium text-white"
        >
          Fornavn
        </label>
        <input
          name={`${ticketType}_firstName_${i}`}
          type="text"
          placeholder="Joe"
          autoComplete="given-name"
          onChange={handleEmptyInputChange}
          required
          className={`bg-gray-100 border text-gray-900 text-sm rounded-md w-full p-2.5 focus:outline-none focus:ring-2 
            ${
              emptyError
                ? "bg-red-50 border-red-400 focus:ring-red-500"
                : "valid:bg-green-100 valid:border-green-500 focus:ring-green-500"
            }`}
        />
      </motion.div>

      <motion.div className="mb-2.5" variants={inputSpring}>
        <label
          htmlFor={`${ticketType}_lastName_${i}`}
          className="block text-sm font-medium text-white"
        >
          Efternavn
        </label>
        <input
          name={`${ticketType}_lastName_${i}`}
          type="text"
          placeholder="Doe"
          autoComplete="family-name"
          required
          className="bg-gray-100 border border-gray-200 text-gray-900 text-sm rounded-md w-full p-2.5 focus:outline-none focus:ring-2 valid:[&:not(:placeholder-shown):not(:focus)]:bg-green-50 valid:[&:not(:placeholder-shown):not(:focus)]:border-green-500 valid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-green-500 invalid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:bg-red-50 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
        />
      </motion.div>

      <motion.div className="mb-2.5" variants={inputSpring}>
        <label htmlFor={`${ticketType}_email_${i}`}>
          Email
          <p className="text-xs text-gray-200 mb-[0.3rem]">
            Dette felt kræver mindst et @-tegn
          </p>
        </label>
        <input
          className={`bg-gray-100 border text-gray-900 text-sm rounded-md w-full p-2.5 focus:outline-none focus:ring-2 
      ${
        emailError
          ? "bg-red-50 border-red-400 focus:ring-red-500"
          : "valid:bg-green-100 valid:border-green-500 focus:ring-green-500"
      }`}
          name={`${ticketType}_email_${i}`}
          type="email"
          placeholder="joedoe@example.com"
          autoComplete="email"
          onChange={handleEmailChange}
          required
        />
        {emailError && (
          <span className="text-red-500 text-xs">Ugyldig email</span>
        )}
      </motion.div>

      <motion.div className="mb-2.5" variants={inputSpring}>
        <label htmlFor={`${ticketType}_phonenumber_${i}`}>Mobilnummer</label>
        <input
          name={`${ticketType}_phonenumber_${i}`}
          type="tel"
          placeholder="12 34 56 78"
          autoComplete="tel"
          required
          className="bg-gray-100 border border-gray-200 text-gray-900 text-sm rounded-md w-full p-2.5 focus:outline-none focus:ring-2 valid:[&:not(:placeholder-shown):not(:focus)]:bg-green-100 valid:[&:not(:placeholder-shown):not(:focus)]:border-green-500 valid:[&:not(:placeholder-shown):not(:focus)]:border-2 valid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-green-500 invalid:[&:not(:placeholder-shown):not(:focus)]:focus:ring-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:bg-red-50 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
        />
      </motion.div>
    </motion.div>
  );
}

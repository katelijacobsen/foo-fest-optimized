"use client";

import { FaArrowLeft } from "react-icons/fa6";

import { useRouter } from "next/router";

function BackButton() {
  const router = useRouter();
  const { from } = router.query;

  const handleBack = () => {
    if (from === "homepage") {
      router.push("/");
    } else if (from === "program") {
      router.push("/program");
    } else {
      router.back(); // Standard tilbagefunktion
    }
  };

  return (
    <button onClick={handleBack}>
      <FaArrowLeft className="text-customOrange h-10 w-10 mb-4 ml-4 md:ml-0 md:mb-8 border-solid border-[1px] border-customOrange rounded-full p-2" />
    </button>
  );
}

export default BackButton;

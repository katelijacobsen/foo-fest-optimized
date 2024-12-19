"use client";

import { FaArrowLeft } from "react-icons/fa6";

import { useRouter } from "next/navigation";

//https://nextjs.org/docs/pages/api-reference/functions/use-router
function BackButton({ aria_label_text }) {
  const router = useRouter();

  return (
    <button aria-label={aria_label_text} type="button" onClick={() => router.back()}>
      <FaArrowLeft className="text-customOrange h-10 w-10 mb-4 ml-4 md:ml-0 md:mb-8 border-solid border-[1px] border-customOrange rounded-full p-2" />
    </button>
  );
}

export default BackButton;

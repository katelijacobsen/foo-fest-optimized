"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Caesar_Dressing } from "next/font/google";
import Image from "next/image";

import Logo from "@/img/svg/Logo.svg";
import PrimaryButton from "@/components/global/buttonFolder/PrimaryButton";

const ceasarDressing = Caesar_Dressing({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const Header = () => {
  //statevariabel isOpen er pr. default sat til false. Funktionen setIsOpen bruges til at opdatere stateværdien
  const [isOpen, setIsOpen] = useState(false);
  //https://nextjs.org/docs/app/api-reference/functions/use-pathname
  const pathname = usePathname();

  //funktion som kaldes ved event onClick. Ændrer isOpen state til true
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  //funktion isActivePage, som tager argumentet page og returnerer en boolean værdi. Den sammenligner den nuværende URL-sti (repræsenteret ved pathname) med den sti, der bliver sendt som argument (page).
  //bruges til at style link. Viser hvilken side, man aktivt er inde på
  const isActivePage = (page) => pathname === page;

  return (
    <header>
      <nav className="fixed z-30 top-0 w-full">
        <div className="flex py-2 px-4 justify-between items-center w-full list-none backdrop-blur-[2px] bg-gradient-to-b from-customBlack to-transparent">
          <Link href="/">
            <Image src={Logo} width={70} height={70} alt="foofest logo" />
          </Link>

          <ul className="hidden md:flex md:gap-6 space-x-4 justify-between items-center">
            <li className={` ${isActivePage("/program") ? "bg-gradient-to-r from-customPink via-customRed to-customOrange text-transparent bg-clip-text" : "text-white"}`}>
              <Link href="/program">Program</Link>
            </li>
            <li className={` ${isActivePage("/lineup") ? "bg-gradient-to-r from-customPink via-customRed to-customOrange text-transparent bg-clip-text" : "text-white"}`}>
              <Link href="/lineup">Line-Up</Link>
            </li>
            <li className={`${isActivePage("/camping") ? "bg-gradient-to-r from-customPink via-customRed to-customOrange text-transparent bg-clip-text" : "text-white"}`}>
              <Link href="/camping">Camping</Link>
            </li>
            <li className={` ${isActivePage("/volunteer") ? "bg-gradient-to-r from-customPink via-customRed to-customOrange text-transparent bg-clip-text" : "text-white"}`}>
              <Link href="/volunteer">Bliv Frivillig</Link>
            </li>
            <li>
              <Link href="/tickets">
                <PrimaryButton color="bg-gradient-to-r from-[#ec2783] from-12% via-[#d82023] via-46% to-[#ec4d08] to-87%" buttonContent="Køb billetter" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Burger-menu for små skærme */}
        <button onClick={handleClick} className={`md:hidden absolute text-2xl top-4 right-4 p-2 ${ceasarDressing.className} bg-gradient-to-bl from-customPink to-customOrange bg-clip-text text-transparent`}>
          Menu
        </button>

        {/* Vis tekst: "Luk menu", når burgermenu er åben */}
        {isOpen && (
          <div className="md:hidden fixed top-0 right-0 bottom-0 left-0 z-40 bg-customBlack">
            <button onClick={handleClick} className={`${ceasarDressing.className} absolute top-4 right-4 bg-gradient-to-bl from-customPink to-customOrange bg-clip-text text-transparent text-2xl`}>
              Luk menu
            </button>
            <ul className="grid place-content-center text-center h-[60vh] gap-6 mt-[8rem] ">
              <li>
                <Link className={` ${ceasarDressing.className} text-4xl  ${isActivePage("/") ? "bg-gradient-to-r from-customPink via-customRed to-customOrange text-transparent bg-clip-text" : "text-white"}`} href="/">
                  FORSIDE
                </Link>
              </li>
              <li>
                <Link className={` ${ceasarDressing.className} text-4xl ${isActivePage("/program") ? "bg-gradient-to-r from-customPink via-customRed to-customOrange text-transparent bg-clip-text" : "text-white"}`} href="/program">
                  PROGRAM
                </Link>
              </li>
              <li>
                <Link className={` ${ceasarDressing.className} text-4xl  ${isActivePage("/lineup") ? "bg-gradient-to-r from-customPink via-customRed to-customOrange text-transparent bg-clip-text" : "text-white"}`} href="/lineup">
                  LINE-UP
                </Link>
              </li>
              <li>
                <Link className={` ${ceasarDressing.className} text-4xl ${isActivePage("/camping") ? "bg-gradient-to-r from-customPink via-customRed to-customOrange text-transparent bg-clip-text" : "text-white"}`} href="/camping">
                  CAMPING
                </Link>
              </li>
              <li>
                <Link className={` ${ceasarDressing.className} text-4xl  ${isActivePage("/volunteer") ? "bg-gradient-to-r from-customPink via-customRed to-customOrange text-transparent bg-clip-text" : "text-white"}`} href="/volunteer">
                  BLIV FRIVILLIG
                </Link>
              </li>
              <button>
                <Link href="/tickets" className={` ${ceasarDressing.className} text-4xl ${isActivePage("/tickets") ? "bg-gradient-to-r from-customPink via-customRed to-customOrange text-transparent bg-clip-text" : "text-white"}`}>
                  Køb billetter
                </Link>
              </button>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

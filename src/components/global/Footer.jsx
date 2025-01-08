"use client";
import Image from "next/image";
import Logo from "@/img/svg/Logo.svg";
import Facebook from "@/img/svg/facebook_icon.svg";
import Instagram from "@/img/svg/instagram_Icon.svg";
// import Newsletter from "./Newsletter";
import Link from "next/link";
import Container from "./newsletterFolder/Timer";

const Footer = () => {
  return (
    <footer className=" bg-customBlack_5 p-2 z-50 ">
      <div className=" p-2 md:px-4 md:py-2">
        <Link href="/">
          <Image src={Logo} alt="FooFest Logo" width={100} height={100} priority />
        </Link>
      </div>
      <div className="px-4 py-8 md:p-0">
        <div className="text-customWhite grid justify-center mb-4">
          <h2 className="text-4xl mb-2">Nyhedsbrev</h2>
          <p>Tilmeld dig vores nyhedsbrev</p>
        </div>
        {/* <Newsletter /> */}
        <Container />
      </div>
      <div className="flex gap-5 flex-row-reverse p-4 md:pt-0 ">
        <a href="#" aria-label="Facebook">
          <Image src={Facebook} alt={"Facebook logo, a circle with a f inside"} width={25} height={25} priority></Image>
        </a>
        <a href="#" aria-label="Instagram">
          <Image src={Instagram} alt={"Instagram a square that looks like a camera"} width={25} height={25} priority></Image>
        </a>
      </div>
    </footer>
  );
};

export default Footer;

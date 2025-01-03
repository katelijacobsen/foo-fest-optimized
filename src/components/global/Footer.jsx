"use client";
import Image from "next/image";
import Logo from "@/img/svg/Logo.svg";
import Facebook from "@/img/svg/facebook_icon.svg";
import Instagram from "@/img/svg/instagram_Icon.svg";
// import Newsletter from "./Newsletter";
import Link from "next/link";
import Container from "./Container";

const Footer = () => {
  return (
    <div className="w-screen bg-customBlack_5 p-2 ">
      <div className=" p-2 md:px-4 md:py-2">
        <Link href="/">
          <Image src={Logo} alt="FooFest Logo" width={100} height={100} />
        </Link>
      </div>

      <div className="grid px-4 md:p-0">
        <div className="text-customWhite flex flex-col justify-center text-center mb-4">
          <h2 className="text-4xl mb-2">Nyhedsbrev</h2>
          <p>Tilmeld dig vores nyhedsbrev</p>
        </div>
        {/* <Newsletter /> */}
        <Container />
      </div>
      <div className="flex gap-5 flex-row-reverse p-4 md:pt-0 ">
        <a href="#">
          <Image src={Facebook} alt={"Facebook logo, a circle with a f inside"} width={25} height={25}></Image>
        </a>
        <a href="#">
          <Image src={Instagram} alt={"Instagram a square that looks like a camera"} width={25} height={25}></Image>
        </a>
      </div>
    </div>
  );
};

export default Footer;

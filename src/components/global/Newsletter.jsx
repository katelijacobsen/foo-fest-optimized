"use client";
import { useEffect, useState } from "react";
import { postSub } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import Button from "./buttonFolder/PrimaryButton";

const Newsletter = () => {
  const [data, setData] = useState([]);
  function postingSub(formData) {
    //   "use server";
    const data = {
      navn: formData.get("navn"),
      email: formData.get("email"),
    };
    //   await postSub(data);
    setData([data]);
    //   revalidatePath("/");
  }
  useEffect(() => {
    if (data === null) {
      return;
    }

    console.log("useEffect bliver brugt", data);
    fetch("https://acrgwzdfrmjzprvhpnuw.supabase.co/rest/v1/subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjcmd3emRmcm1qenBydmhwbnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1MzQ3OTUsImV4cCI6MjA0ODExMDc5NX0.Lh-kfAyHHAPYOS3sze8ay1u_KBWbXAR0mtgmKsVEeiU",
        Prefer: "return=representation",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        return () => console.log("date kommer vel?", data);
      });
  }, [data]);
  return (
    <form className="flex flex-col gap-5 items-center " action={postingSub}>
      <div className="flex flex-col  text-customWhite">
        <label className="font-bold" htmlFor="navn">
          Navn
        </label>
        <input className="bg-customBlack_4 p-2 min-w-72 sm:min-w-96 " autoComplete="given-name" required placeholder="Navn" type="text" id="navn" name="navn" />
      </div>
      <div className="flex flex-col  text-customWhite">
        <label className="font-bold" htmlFor="email">
          E-mail
        </label>
        <input className="bg-customBlack_4 p-2 min-w-72 sm:min-w-96" autoComplete="email" required placeholder="E-mail" type="email" id="email" name="email" />
      </div>
      <Button aria_label_text="submit" type="submit" color="bg-gradient-to-r from-[#ec2783] from-12% via-[#d82023] via-46% to-[#ec4d08] to-87%" buttonContent="Tilmeld" />
    </form>
  );
};

export default Newsletter;

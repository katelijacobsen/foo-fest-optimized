"use client";
import ChooseTicket from "@/components/bookingsystem/ChooseTicket";
import Campsite from "@/components/bookingsystem/Campsite";
import ContactInfo from "@/components/bookingsystem/ContactInfo";
import PaymentFlow from "@/components/bookingsystem/PaymentFlow";
import PaymentComfirmed from "@/components/bookingsystem/PaymentConfirmed";
import Cart from "@/components/bookingsystem/Cart";
import { createContext, useActionState } from "react";
import { Caesar_Dressing } from "next/font/google";
import { useState, useEffect } from "react";
import MyMarquee from "@/components/festivalsystem/marquee/MyMarquee";

const ceasarDressing = Caesar_Dressing({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

//=================//
// constant variabel hvor vi definere indholdet når ikke noget er blevet valgt. Variablen bruger vi til at refreshe vores
// Multistep-form (f.eks. hvis brugeren er gået over de 5min i PaymentFlow).
//=================//
const defaultState = {
  step: 0,
  tickets: {
    single: 0,
    vip: 0,
  },
  campsite: undefined,
  tents: {
    twoPeople: 0,
    threePeople: 0,
    greenCamping: false,
  },
  guests: {
    single: [],
    vip: [],
  },
  payment: {
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  },
};

export const CartContext = createContext(null);

export default function Page() {
  const [data, setData] = useState([]);

  const [reservedId, setReservedId] = useState(undefined);

  const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impna3Ntb3VoYWxzeGV6aXl0eWdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyOTU1NjEsImV4cCI6MjA0OTg3MTU2MX0.WPZoRN3URqEILGHGLXl1kdWFJCj40mQWEdPfULA1Gto";
  const url = "https://jgksmouhalsxeziytygd.supabase.co/rest/v1/personer";
  const handleStep = (prev, formData) => {
    if (formData === null) {
      return defaultState;
    }
    if (prev.step === 0) {
      return {
        ...prev,
        step: prev.step + 1,
        tickets: {
          single: +formData.get("singleTickets"),
          vip: +formData.get("vipTickets"),
        },
      };
    }
    if (prev.step === 1) {
      return {
        ...prev,
        step: prev.step + 1,
        tents: {
          twoPeople: +formData.get("twoPeople"),
          threePeople: +formData.get("threePeople"),
          greenCamping: formData.get("greenCamping"),
        },
        campsite: formData.get("campsite"),
      };
    }

    if (prev.step === 2) {
      const singleGuests = Array.from({ length: prev.tickets.single }, (_, i) => ({
        firstName: formData.get(`single_firstName_${i}`),
        lastName: formData.get(`single_lastName_${i}`),
        email: formData.get(`single_email_${i}`),
        phonenumber: formData.get(`single_phonenumber_${i}`),
      }));
      const vipGuests = Array.from({ length: prev.tickets.vip }, (_, i) => ({
        firstName: formData.get(`vip_firstName_${i}`),
        lastName: formData.get(`vip_lastName_${i}`),
        email: formData.get(`vip_email_${i}`),
        phonenumber: formData.get(`vip_phonenumber_${i}`),
      }));

      const combined = [...singleGuests, ...vipGuests];

      setData(combined);

      return {
        ...prev,
        step: prev.step + 1,
        guests: { single: singleGuests, vip: vipGuests },
      };
    }

    if (prev.step === 3) {
      return {
        ...prev,
        step: prev.step + 1,
        payment: {
          number: formData.get("number"),
          name: formData.get("name"),
          expiry: formData.get("expiry"),
          cvc: formData.get("cvc"),
        },
      };
    }
    // if (prev.step === 4) {
    //   return {
    //     ...prev,
    //     step: prev.step + 1,
    //   };
    // }
  };
  useEffect(() => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: apikey,
        Prefer: "return=representation",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        return () => console.log("date", data);
      });
  }, [data]);

  // useState til at kunne lave en global indkøbskurv på ticket site.
  const defaultCart = {
    tickets: {
      single: 0,
      vip: 0,
    },
    campsite: undefined,
    tents: {
      twoPeople: 0,
      threePeople: 0,
      greenCamping: false,
    },
  };
  // Forskellige Hooks der bliver anvendt i vores parent-komponent, så vi også kan sende dem vider til vores children (så de kan snak med hinanden)
  //===================//
  // useState-hook
  //===================//
  // cart er vores værdi vi sender vider i vores komponenter, mens setCart er vores funktion til at opdatere vores cart-variabel.
  // Vi giver vores useState hook 'defaultCart' som standartværdi (tom kurv).
  const [cart, setCart] = useState(defaultCart);
  //===================//
  // useActionState-hook
  //===================//
  // Bruger useActionState-hook til at håndtere vores data-tilstand. state er vores variabel, der bliver opdateret for hver brugeren handling
  // der sker i hver komponent.
  // F.eks. har vi givet state vider til campsite. Ligesom en filmappe struktur prøver den at finde antal af billetter vi tidliger har
  // valgt, og bruger det samme antal telte-billetter brugern må bruge.
  const [state, formAction] = useActionState(handleStep, defaultState);

  const [timeOut, setTimeOut] = useState(30);

  useEffect(() => {
    if (state.step >= 4 && timeOut <= 0) {
      setTimeOut();
    }
  }, [timeOut]);

  useEffect(() => {
    if (state.step < 3 && timeOut <= 0) {
      if (state.step > 0) {
        alert("Tiden er udløbet. Du bliver aldrig rigtig en viking :(");
        formAction(null);
      }

      return;
    }

    const timer = setInterval(() => {
      setTimeOut((prevTime) => prevTime - 1000);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeOut]);

  const mins = Math.floor(timeOut / 1000 / 60);
  const secs = Math.floor((timeOut / 1000) % 60);
  return (
    <main className="pt-24">
      <MyMarquee />
      {/* wrapper komponenter ind med createContext så det kan opdatere
      indkøbskurven. */}
      <CartContext.Provider value={[cart, setCart]}>
        <main>
          {timeOut > 0 && (
            <p className="bg-gradient-to-bl rounded-sm from-customPink text-white to-customOrange w-full text-center text-xl sm:text-2xl font-bold">
              {mins} : {String(secs).padStart(2, "0")}
            </p>
          )}

          {/* Vi giver hver children komponenter en conditional rendering og sender vores cart & formAction vider. Cart bliver ikke vist ved 4. step med !== */}
          <h1 className={`${ceasarDressing.className} mx-5 mt-10 text-6xl sm:text-6xl lg:text-6xl md:text-6xl text-white`}>BILLETTER</h1>
          <div className="flex flex-col md:flex-row justify-center">
            <section>
              {state.step === 0 && <ChooseTicket cart={cart} formAction={formAction} />}
              {state.step === 1 && <Campsite setTimeOut={setTimeOut} setReservedId={setReservedId} state={state} formAction={formAction} />}
              {state.step === 2 && <ContactInfo state={state} tickets={state.tickets} formAction={formAction} />}
              {state.step === 3 && <PaymentFlow setTimeOut={setTimeOut} reservedId={reservedId} formAction={formAction} />}
              {state.step === 4 && <PaymentComfirmed state={state} startDraw={true} />}
            </section>
            {state.step !== 4 && <Cart cart={cart} />}
          </div>
        </main>
      </CartContext.Provider>
    </main>
  );
}

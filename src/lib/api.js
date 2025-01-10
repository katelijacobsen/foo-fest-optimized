const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impna3Ntb3VoYWxzeGV6aXl0eWdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyOTU1NjEsImV4cCI6MjA0OTg3MTU2MX0.WPZoRN3URqEILGHGLXl1kdWFJCj40mQWEdPfULA1Gto";
const url = "https://jgksmouhalsxeziytygd.supabase.co/rest/v1/personer";
// laver den til en konstant så vi ikke behøver at skulle hardcode
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

//Funktion med server action PUT til at kunne reserve spot
export const reserveSpot = async (area, amount) => {
  try {
    const response = await fetch(`${url}/reserve-spot`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        area,
        amount,
      }),
    });

    if (!response.ok) {
      throw new Error("Fejl ved reservation af plads");
    }
    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


// Funktion med server action POST for at fuldføre reservationen
export const completeBooking = async (reservationId) => {
  try {
    const response = await fetch(`${url}/fullfill-reservation`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        id: reservationId,
      }),
    });

    if (!response.ok) {
      throw new Error("Fejl ved at fuldføre reservation!");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
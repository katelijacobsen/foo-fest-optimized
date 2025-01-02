const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const apikey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const headersList = {
  Accept: "application/json",
  "Content-Type": "application/json",
  apikey: apikey,
  Prefer: "return=representation",
};

async function apiFetch(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    return response.ok;
  }
  return await response.json();
}

export async function postSub(postData) {
  return apiFetch(url, {
    method: "POST",
    headers: headersList,
    body: JSON.stringify(postData),
  });
}

export async function fetchBands() {
  let response = await fetch("https://spring-awesome-stream.glitch.me/bands", {});
  let data = await response.json();
  return data;
}

export async function fetchSchedule() {
  let response = await fetch("https://spring-awesome-stream.glitch.me/schedule", {});
  let data = await response.json();
  return data;
}

export async function getBandBySlug(slug) {
  let response = await fetch(`https://spring-awesome-stream.glitch.me/bands/${slug}`, {});
  let data = await response.json();
  return data;
}

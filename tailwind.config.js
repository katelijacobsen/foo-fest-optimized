/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#141415",
        foreground: "#ffffff",
        customPink: "#EC2783",
        customRed: "#D82023",
        customOrange: "#EC4D08",
        customWhite: "#FFFFFF",
        customBlack: "#141415",
        customWhite_2: "#EFEFEF",
        customWhite_3: "#DCDCDC",
        customWhite_4: "#BDBDBD",
        customBlack_2: "#3B3B3E",
        customBlack_3: "#444546",
        customBlack_4: "#5A5B60",
        customBlack_5: "#262628",
        customBlack_6: "#383838",
      },
    },
  },
  plugins: [],
};

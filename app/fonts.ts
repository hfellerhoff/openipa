import { Open_Sans, Roboto_Slab } from "next/font/google";

export const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-open-sans",
});

export const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  style: ["normal"],
  variable: "--font-roboto-slab",
});

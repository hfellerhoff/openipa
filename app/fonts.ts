import localFont from "next/font/local";

export const openSans = localFont({
  src: [
    {
      path: "../node_modules/@fontsource-variable/open-sans/files/open-sans-latin-wght-normal.woff2",
      weight: "300 700",
      style: "normal",
    },
    {
      path: "../node_modules/@fontsource-variable/open-sans/files/open-sans-latin-wght-italic.woff2",
      weight: "300 700",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-open-sans",
});

export const robotoSlab = localFont({
  src: "../node_modules/@fontsource-variable/roboto-slab/files/roboto-slab-latin-wght-normal.woff2",
  display: "swap",
  weight: "400 700",
  style: "normal",
  variable: "--font-roboto-slab",
});

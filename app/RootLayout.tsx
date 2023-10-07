import { openSans, robotoSlab } from "./fonts";

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${robotoSlab.variable} font-sans`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        {process.env.VERCEL_ENV === "production" ? (
          <>
            <script
              async
              defer
              data-website-id="b4fd1fc9-b874-4d5d-9a70-cdd887dee842"
              src="https://umami.henryfellerhoff.com/script.js"
            ></script>
          </>
        ) : (
          <></>
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}

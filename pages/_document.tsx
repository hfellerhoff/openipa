import Document, { Html, Head, Main, NextScript } from "next/document";

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&display=swap"
            rel="stylesheet"
          />
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
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

CustomDocument.getInitialProps = (ctx) => Document.getInitialProps(ctx);

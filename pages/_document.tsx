// adjust your pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

const GA_TRACKING_ID = 'UA-159326184-1';

export default class CustomDocument extends Document {
  static getInitialProps(ctx) {
    return Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&display=swap'
            rel='stylesheet'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&display=swap'
            rel='stylesheet'
          />
          {process.env.VERCEL_ENV === 'production' ? (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              ></script>
              <script
                async
                dangerouslySetInnerHTML={{
                  __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', '${GA_TRACKING_ID}');`,
                }}
              />
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

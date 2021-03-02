// adjust your pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

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
            href='https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@700&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

import Document, { Html, Head, Main, NextScript } from 'next/document';
import { env } from '../env/server.mjs';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel='manifest' href={env.NEXT_PUBLIC_PATH + '/manifest.json'} />
          <link rel='apple-touch-icon' href='/icon.png'></link>
          <meta name='theme-color' content='#fff' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

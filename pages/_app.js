import Head from 'next/head';

import '../src/styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Fui multado ?</title>
        <meta charSet="UTF-8" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <meta
          name="description"
          content="Descubra se recebeu alguma multa passando por algum radar"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

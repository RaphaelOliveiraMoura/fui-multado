import Head from 'next/head';

import '../src/styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Será que fui multado ?</title>
        <meta charSet="UTF-8" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <meta
          name="description"
          content="Já passou no radar alguns km/h a mais e ficou na dúvida se iria ou não tomar multa ? Tire essa dúvida de forma simples usando este site"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="tr">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"/>
      </Head>
      <body className="antialiased px-2 md:px-8">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

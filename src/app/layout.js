import Head from "next/head";
import Menu from "@/components/Menu";
import ConditionalScrollPrevent from "@/components/ConditionalScrollPrevent";
import "./globals.css";

export const metadata = {
  title: "We Make Noise",
  description: "한국예술종합학교 제26회 졸업영화제",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <Head>
        <meta
          name="keywords"
          content="한국예술종합학교, 졸업영화제, 영화제, 대한극장, 한예종, 한예종 영화과, 영화, karts, film"
        />
        <meta name="description" content="한국예술종합학교 제26회 졸업영화제" />

        {/* Favicon 링크 */}
        {/* <link rel="shortcut icon" href="asset/pavicon.svg" /> */}

        {/* Open Graph meta tags */}
        <meta property="og:title" content="We Make Noise" />
        <meta property="og:image" content="img/noise.png" />
        <meta
          property="og:description"
          content="한국예술종합학교 제26회 졸업영화제"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC&family=Oi&family=Rubik+Puddles&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://use.typekit.net/uck1tni.css" />
      </Head>

      <body>
        <Menu />
        {children}

        {/* 랜딩페이지만 스크롤 방지 기능(css overscrollBehaviorY 설정으로 안돼서 JavaScript 추가) */}
        <ConditionalScrollPrevent />
      </body>
    </html>
  );
}

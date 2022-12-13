import React from "react";
import { Header } from "../components";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps}></Component>;
    </>
  );
}

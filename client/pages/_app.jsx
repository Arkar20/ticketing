import React from "react";
import { Header } from "../components";
import { axiosNext } from "../service";
export default function App({ Component, pageProps }) {
  const { currentUser } = pageProps;
  return (
    <>
      <Header currentUser={currentUser} />
      <Component {...pageProps}></Component>;
    </>
  );
}
App.getInitialProps = async (context) => {
  if (context.Component.getInitialProps) {
    context.Component.getInitialProps(context.ctx);
  }
  const response = await axiosNext(context.ctx).get("/api/users/currentuser");

  return { pageProps: { ...response.data } };
};

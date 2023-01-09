import React from "react";
import { Header } from "../components";
import { axiosNext } from "../service";
export default function App({ Component, pageProps }) {
  const { currentUser } = pageProps;

  return (
    <>
      <Header currentUser={currentUser} />
      <Component {...pageProps} currentUser={currentUser}></Component>
    </>
  );
}
App.getInitialProps = async (context) => {
  const response = await axiosNext(context.ctx).get("/api/users/currentuser");
  let pageProps = {};
  if (context.Component.getInitialProps) {
    console.log("need to call here too");
    pageProps = await context.Component.getInitialProps(
      context.ctx,
      axiosNext,
      response.data.currentUser
    );
  }

  pageProps = { ...pageProps, ...response.data };

  return { pageProps };
};

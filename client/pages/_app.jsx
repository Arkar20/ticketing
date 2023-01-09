import React from "react";
import { Header } from "../components";
import { axiosNext } from "../service";
export default function App({ Component, pageProps }) {
  const { currentUser } = pageProps;

  return (
    <>
      <Header currentUser={currentUser} />
      <Component {...pageProps}></Component>
    </>
  );
}
App.getInitialProps = async (context) => {
  const response = await axiosNext(context.ctx).get("/api/users/currentuser");
  if (context.Component.getInitialProps) {
    context.Component.getInitialProps(
      context.ctx,
      axiosNext,
      response.data.currentUser
    );
  }

  return { pageProps: { ...response.data } };
};

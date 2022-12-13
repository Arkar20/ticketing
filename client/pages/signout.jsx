import axios from "axios";
import Router from "next/router";
import { useEffect } from "react";

export default function signout() {
  useEffect(() => {
    axios.post("/api/users/signout").then((res) => {
      Router.push("/");
    });
  }, []);

  return <></>;
}

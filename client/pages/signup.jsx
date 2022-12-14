import { useState } from "react";

import { useRequest } from "../hooks";
import Router from "next/router";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { errorsUI, doRequest } = useRequest({
    url: "/api/users/signup",
    method: "post",
    onSuccess: () => {
      Router.push("/");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    doRequest({ email, password });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <input value={password} onChange={(e) => setPassword(e.target.value)} />

        <button>Signup</button>
        {errorsUI}
      </form>
    </>
  );
};
export default Signup;

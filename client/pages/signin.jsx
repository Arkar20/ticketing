import { useState } from "react";
import { useRequest } from "../hooks";
import Router from "next/router";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { doRequest, errorsUI } = useRequest({
    url: "/api/users/signin",
    method: "post",
    onSuccess: () => {
      Router.push("/");
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await doRequest({ email, password });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
      {errorsUI}
    </div>
  );
}

export default Signin;

import React from "react";
import styles from "./create.module.css";
import Head from "next/head";
import { useState } from "react";
import { axiosNext } from "../../service";
import { useRequest } from "../../hooks/";
import Router from "next/router";
export default function create() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  const { doRequest, errorsUI } = useRequest({
    url: "/api/tickets",
    method: "post",
    onSuccess: () => Router.push("/"),
  });

  const roundPrice = () => {
    setPrice((price) => parseFloat(price).toFixed(2));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    doRequest({ title, desc, price });
  };
  return (
    <>
      <Head>
        <title>Ticket Create</title>
      </Head>
      {errorsUI}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          cols="30"
          rows="10"
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        <input
          type="number"
          placeholder="enter price"
          value={price}
          onBlur={roundPrice}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button>Create</button>
      </form>
    </>
  );
}

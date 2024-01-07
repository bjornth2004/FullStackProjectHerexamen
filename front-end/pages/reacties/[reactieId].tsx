import Head from "next/head";
import { useState, useEffect } from "react";
import { Reactie } from "../../types";
import Header from "../../components/header";
import ReactieService from "../../services/ReactieService";
import styles from "../../styles/huurders.module.css";
import ReactieInfo from "../../components/reacties/ReactieInfo";
import { useRouter } from "next/router";
import React from "react";

const ReadReactieById: React.FC = () => {
  const [reactie, setReactie] = useState<Reactie>(null);

  const router = useRouter();
  const { reactieId } = router.query;

  const getReactieById = async () => {
    const [reactieResponse] = await Promise.all([
      ReactieService.getReactieById(reactieId as string),
    ]);
    const [reactiee] = await Promise.all([reactieResponse.json()]);
    setReactie(reactiee);
  };

  useEffect(() => {
    if (reactieId) getReactieById();
  }, []);

  return (
    <>
      <Head>
        <title>Reactie Info</title>
      </Head>
      <Header />
      <main className={styles.huurdersContainer}>
        <h1>Info van Huurder {reactie && reactie.reviewtekst}</h1>
        {!reactieId && <p>Loading</p>}
        <section>
          <ReactieInfo reactie={reactie}></ReactieInfo>
        </section>
      </main>
    </>
  );
};

export default ReadReactieById;

import Head from "next/head";
import { useState, useEffect } from "react";
import { Verhuurder } from "../../types";
import Header from "../../components/header";
import VerhuurderService from "../../services/VerhuurderService";
import styles from "../../styles/huurders.module.css";
import VerhuurderInfo from "../../components/verhuurders/VerhuurderInfo";
import React from "react";

import { useRouter } from "next/router";

const ReadVerhuurderById: React.FC = () => {
  const [verhuurder, setVerhuurder] = useState<Verhuurder>(null);

  const router = useRouter();
  const { verhuurderId } = router.query;

  const getVerhuurderById = async () => {
    const [verhuurderResponse] = await Promise.all([
      VerhuurderService.getVerhuurderById(verhuurderId as string),
    ]);
    const [verhuurderr] = await Promise.all([verhuurderResponse.json()]);
    setVerhuurder(verhuurderr);
  };

  useEffect(() => {
    if (verhuurderId)
      //dit betekend: Als er een huurder is
      getVerhuurderById();
  }, []); //dit betekend dat het continue wordt uitgevoerd (alsge geen parameter meegeeft)

  return (
    <>
      <Head>
        <title>Huurder Info</title>
      </Head>
      <Header />
      <main className={styles.huurdersContainer}>
        <h1>Info van Verhuurder {verhuurder && verhuurder.naam}</h1>
        {!verhuurderId && <p>Loading</p>}
        <section>
          <VerhuurderInfo verhuurder={verhuurder}></VerhuurderInfo>
        </section>
      </main>
    </>
  );
};

export default ReadVerhuurderById;

import Head from "next/head";
import { useState, useEffect } from "react";
import { Kot } from "../../types";
import Header from "../../components/header";
import KotService from "../../services/KotService";
import styles from "../../styles/huurders.module.css";
import KotInfo from "../../components/koten/KotInfo";
import { useRouter } from "next/router";
import React from "react";

const ReadKotById: React.FC = () => {
  const [kot, setKot] = useState<Kot>(null);

  const router = useRouter();
  const { kotId } = router.query;

  const getKotById = async () => {
    const [kotResponse] = await Promise.all([
      KotService.getKotById(kotId as string),
    ]);
    const [kott] = await Promise.all([kotResponse.json()]);
    setKot(kott);
  };

  useEffect(() => {
    if (kotId)
      //dit betekend: Als er een huurder is
      getKotById();
  }, []); //dit betekend dat het continue wordt uitgevoerd (alsge geen parameter meegeeft)

  return (
    <>
      <Head>
        <title>Kot Info</title>
      </Head>
      <Header />
      <main className={styles.huurdersContainer}>
        <h1>Info van Kot {kot && kot.locatie}</h1>
        {!kotId && <p>Loading</p>}
        <section>
          <KotInfo kot={kot}></KotInfo>
        </section>
      </main>
    </>
  );
};

export default ReadKotById;

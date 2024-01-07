import Head from "next/head";
import { useState, useEffect } from "react";
import { Huurder } from "../../types";
import Header from "../../components/header";
import HuurderService from "../../services/HuurderService";
import styles from "../../styles/huurders.module.css";
import HuurderInfo from "../../components/huurders/HuurderInfo";
import { useRouter } from "next/router";
import React from "react";

const ReadHuurderById: React.FC = () => {
  const [huurder, setHuurder] = useState<Huurder>(null);

  const router = useRouter();
  const { huurderId } = router.query;

  const getHuurderById = async () => {
    const [huurderResponse] = await Promise.all([
      HuurderService.getHuurderById(huurderId as string),
    ]);
    const [huurderr] = await Promise.all([huurderResponse.json()]);
    setHuurder(huurderr);
  };

  useEffect(() => {
    if (huurderId)
      //dit betekend: Als er een huurder is
      getHuurderById();
  }, []); //dit betekend dat het continue wordt uitgevoerd (alsge geen parameter meegeeft)

  return (
    <>
      <Head>
        <title>Huurder Info</title>
      </Head>
      <Header />
      <main className={styles.huurdersContainer}>
        <h1>Info van Huurder {huurder && huurder.naam}</h1>
        {!huurderId && <p>Loading</p>}
        <section>
          <HuurderInfo huurder={huurder}></HuurderInfo>
        </section>
      </main>
    </>
  );
};

export default ReadHuurderById;

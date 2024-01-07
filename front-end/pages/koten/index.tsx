import Head from "next/head";
import KotOverviewTable from "../../components/koten/KotOverviewTable";
import { useState, useEffect } from "react";
import { Kot, Verhuurder } from "../../types";
import Header from "../../components/header";
import KotService from "../../services/KotService";
import VerhuurderService from "../../services/VerhuurderService";
import React from "react";
//import styles from "../../styles/huurders.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { appWithTranslation, useTranslation } from "next-i18next";

const Koten: React.FC = () => {
  const [koten, setKoten] = useState<Array<Kot>>();
  const [verhuurders, setVerhuurders] = useState<Array<Verhuurder>>(); // Gebruik een array waar Verhuurder objecten in zitten
  const [error, setError] = useState<string>(); // Gebruik een string voor de error message

  const getKotenAndVerhuurders = async () => {
    setError(""); //errors die eventueel zitten in onze state clearen, best dat je dat doet

    const responses = await Promise.all([
      //promise all moe ik maar 1x await schrijven en wacht die op beide
      KotService.getKoten(),
      VerhuurderService.getVerhuurders(),
    ]);
    const [kotenResponse, verhuurdersResponse] = responses;
    const koten = await kotenResponse.json();
    const verhuurders = await verhuurdersResponse.json();

    if (kotenResponse.status !== 200) {
      //als status anders is dan 200 (fout)
      setError(koten.errorMessage);
      return;
    }

    setKoten(koten);
    setVerhuurders(verhuurders);
  };

  useEffect(() => {
    getKotenAndVerhuurders();
  }, []);

  return (
    <>
      <Head>
        <title>Koten</title>
      </Head>
      <Header />
      <main className={"huurdersContainer"}>
        <h1>Koten</h1>
        <section>
          {error && <div>{error}</div>}
          {koten && koten.length > 0 ? ( // If-structuur
            <KotOverviewTable
              koten={koten}
              verhuurders={verhuurders}
              className={"huurdersTable"}
            />
          ) : (
            <p>Log in om deze gegevens te zien</p>
          )}
        </section>
      </main>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "nl", ["common"])),
    },
  };
};

export default appWithTranslation(Koten);

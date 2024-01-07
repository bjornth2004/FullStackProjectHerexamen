import Head from "next/head";
import VerhuurderOverviewTable from "../../components/verhuurders/VerhuurderOverviewTable";
import { useState, useEffect } from "react";
import { Verhuurder } from "../../types";
import Header from "@components/header";
import VerhuurderService from "../../services/VerhuurderService";
import React from "react";
//import styles from "../../styles/huurders.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { appWithTranslation, useTranslation } from "next-i18next";

const Verhuurders: React.FC = () => {
  const [verhuurders, setVerhuurders] = useState<Array<Verhuurder>>(); //array waar verhuurder objecten in zitten

  const getVerhuurders = async () => {
    const response = await VerhuurderService.getVerhuurders();
    const verhuurders = await response.json();
    setVerhuurders(verhuurders);
  };

  useEffect(
    () => {
      getVerhuurders(); //eerste parameter, de code die moet worden uitgevoerd, omzetten naar array van verhuurder objecten
    },
    [] //tweede parameter, lege dependency array, wordt alleen uitgevoerd na de eerste render
  );

  return (
    <>
      <Head>
        <title>Verhuurders</title>
      </Head>
      <Header />
      <main className={"huurdersContainer"}>
        <h1>Verhuurders</h1>
        <section>
          {verhuurders && verhuurders.length > 0 ? ( //if structuur
            <VerhuurderOverviewTable
              verhuurders={verhuurders}
              className={"huurdersTable"}
            />
          ) : (
            <p> Log in om deze gegevens te zien</p>
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

export default appWithTranslation(Verhuurders);

import Head from "next/head";
import HuurderOverviewTable from "../../components/huurders/HuurderOverviewTable"; //Hier error, naast @ ook Hoofdlettergevoelig
import { useState, useEffect } from "react";
import { Huurder } from "../../types"; //hier een error, fixen door @ naar ../.. te veranderen
import Header from "../../components/header";
import HuurderService from "../../services/HuurderService"; //hier een error, fixen door @ naar ../.. te veranderen
//import styles from "../../styles/huurders.module.css";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { appWithTranslation, useTranslation } from "next-i18next";

const Huurders: React.FC = () => {
  const { t } = useTranslation();
  const [huurders, setHuurders] = useState<Array<Huurder>>(); //array waar huurder objecten in zitten

  const getHuurders = async () => {
    //async omdat we moeten wachten tot resultaat is van de back-end
    const response = await HuurderService.getHuurders(); //wachten tot resultaat van de back-end, json data terugkrijgen
    const huurderss = await response.json(); //jsond data omzetten naar array van huurder objecten
    setHuurders(huurderss);
  };

  const verwijderHuurder = async (id: number) => {
    const response = await HuurderService.verwijderHuurderById(id);
    if (response.ok) {
      setHuurders(huurders.filter((huurder) => huurder.id !== id));
    } else {
      console.error("Gefaald om de huurder te verwijderen");
    }
  };

  useEffect(
    () => {
      getHuurders(); //eerste parameter, de code die moet worden uitgevoerd, omzetten naar array van huurder objecten
    },
    [] //tweede parameter, lege dependency array, wordt alleen uitgevoerd na de eerste render
  );

  return (
    <>
      <Head>
        <title>Huurders</title>
      </Head>
      <Header />
      <main className={"huurdersContainer"}>
        <h1>{t("huurder.title")}</h1>
        <section>
          {huurders && huurders.length > 0 ? ( //if structuur
            <HuurderOverviewTable
              huurders={huurders}
              verwijderHuurder={verwijderHuurder}
              className={"huurdersTable"}
            />
          ) : (
            <p>{t("huurder.description")}</p>
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

export default appWithTranslation(Huurders);

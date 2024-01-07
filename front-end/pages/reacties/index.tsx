import Head from "next/head";
import ReactieOverviewTable from "../../components/reacties/ReactieOverviewTable";
import ReactieForm from "../../components/reacties/ReactieForm";
import { useState, useEffect } from "react";
import { Reactie } from "../../types";
import Header from "../../components/header";
import ReactieService from "../../services/ReactieService";
import React from "react";
//import styles from "../../styles/huurders.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { appWithTranslation, useTranslation } from "next-i18next";

const Reacties: React.FC = () => {
  const [reacties, setReacties] = useState<Array<Reactie>>(); // State voor reacties array

  const getReacties = async () => {
    const response = await ReactieService.getReacties();
    const reactiess = await response.json();
    setReacties(reactiess);
  };

  const postReactie = async (reactieData) => {
    const response = await ReactieService.postReactie(reactieData);
    if (response.ok) {
      // Reactie is succesvol gepost, update de lijst van reacties
      const nieuweReactie = await response.json();
      setReacties([...reacties, nieuweReactie]);
    } else {
      // Er is een fout opgetreden, handel dit af
      console.error("Fout bij het posten van de reactie");
    }
  };

  useEffect(() => {
    getReacties();
    console.log("useeffect");
  }, []);

  useEffect(() => {
    console.log(reacties);
  }, [reacties]);

  return (
    <>
      <Head>
        <title>Reacties</title>
      </Head>
      <Header />
      <main className={"huurdersContainer"}>
        <h1>Reacties</h1>
        <ReactieForm onSubmit={postReactie} />
        <section>
          {reacties && reacties.length > 0 ? ( // Controleer of er reacties zijn
            <ReactieOverviewTable
              reacties={reacties}
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

export default appWithTranslation(Reacties);

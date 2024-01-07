import React from "react";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/header";
//import styles from "../styles/Home.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { appWithTranslation, useTranslation } from "next-i18next";

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("app.title")}</title>
        <meta
          name="description"
          content="Beheer van koten, huurders en verhuurders"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/koten.png" />
      </Head>
      <Header />
      <main className={"main"}>
        <div className={"logo"}>
          <Image
            src="/images/koten.png"
            alt="Koten"
            width={150} //breedte
            height={150} //hoogte
          />
        </div>
        <h1>{t("app.welcome")}</h1>

        <div className={"description"}>
          <p>
            {t("app.description1")}
            <br />
            {t("app.description2")}
          </p>
        </div>
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

export default appWithTranslation(Home);

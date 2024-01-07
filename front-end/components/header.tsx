import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Taal from "./taal";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { appWithTranslation, useTranslation } from "next-i18next";
import Image from "next/image";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [loggedInUser, setLoggedInUser] = useState<String>(null); //hiermee kijken

  useEffect(() => {
    //ophalen van sessionStorage welke user is ingelogd
    setLoggedInUser(sessionStorage.getItem("loggedInUser"));
  }, []);

  const handleClick = () => {
    sessionStorage.clear();
    sessionStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  return (
    <header className={styles.header}>
      <nav className={"flex items-center p-4"}>
        <Link href="/" passHref>
          <span className={styles.navLink}>{t("header.home")}</span>
        </Link>
        <Link href="/huurders" passHref>
          <span className={styles.navLink}>{t("header.tenants")}</span>
        </Link>
        <Link href="/verhuurders" passHref>
          <span className={styles.navLink}>{t("header.landlords")}</span>
        </Link>
        <Link href="/koten" passHref>
          <span className={styles.navLink}>{t("header.rooms")}</span>
        </Link>
        <Link href="/reacties" passHref>
          <span className={styles.navLink}>{t("header.reactions")}</span>
        </Link>
        {!loggedInUser && ( //als loggedinuser dan link tonen
          <Link href="/login" passHref>
            <span className={styles.navLink}>{t("header.login")}</span>
          </Link>
        )}

        {loggedInUser && <div>Welcome, {loggedInUser}</div>}
        <div className="ml-8 mr-5">
          <Taal />
        </div>

        {loggedInUser && (
          <Link href="#" className={"mr-7 ml-6"} onClick={handleClick}>
            <Image
              src="/images/exit.png"
              alt="Koten"
              width={30} //breedte
              height={30} //hoogte
            />
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;

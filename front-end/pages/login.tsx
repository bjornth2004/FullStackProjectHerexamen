import React, { useState } from "react";
import Head from "next/head";
import Header from "../components/header";
//import styles from "../styles/login.module.css";
import { useRouter } from "next/router";
import { StatusMessage } from "../types/index";
import { LoginService } from "../services/LoginService";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { appWithTranslation, useTranslation } from "next-i18next";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

  const router = useRouter();

  const { t } = useTranslation();

  const clearErrors = () => {
    setEmailError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (!email.trim()) {
      setStatusMessages([{ message: "Email is required", type: "error" }]);
      result = false;
    }
    if (!password.trim()) {
      setStatusMessages([{ message: "Password is required", type: "error" }]);
      result = false;
    }

    return result;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    clearErrors();

    if (!validate()) {
      return;
    }

    const verhuurder = { email, password };
    const response = await LoginService.loginVerhuurder(verhuurder);

    if (response.status === 400) {
      setStatusMessages([
        { message: "login error, incorrect mail or password", type: "error" },
      ]);
    }

    if (response.status === 200) {
      setStatusMessages([{ message: "login.succes", type: "succes" }]);
      const verhuurder = await response.json();

      sessionStorage.setItem(
        //we steken in de sessionStorage een item met als key loggedInVerhuurder en als value een json string waar token, fullname,.. inzit
        "loggedInVerhuurder",
        JSON.stringify({
          token: verhuurder.token,
          fullname: verhuurder.fullname,
          email: verhuurder.email,
          role: verhuurder.role,
        })
      );

      setStatusMessages([
        {
          message: `Login succesful. Redirecting to homepage...`,
          type: "succes",
        },
      ]); //succes bericht

      sessionStorage.setItem("loggedInUser", email); //naam van de gebruiker opslaan in de session storage

      setTimeout(() => {
        router.push("/"); //al die redirect code enkel uitvoeren als er een succesvolle login is
      }, 2000); //pas pushen na bepaalde tijd (pushen naar homepagina na 2 seconden)
    }
  };

  const users = [
    {
      email: "janjansen@example.com",
      password: "Jan2002",
      role: "verhuurder, kan alle pages zien + zijn koten",
    },
    {
      email: "sarasmit@example.com",
      password: "SaraSmit",
      role: "verhuurder,  kan alle pages zien + zijn koten",
    },
    {
      email: "admin@example.com",
      password: "Admin2024",
      role: "admin, kan alle pages zien + alle koten van alle verhuurders",
    },
  ];

  return (
    <>
      <Head>
        <title>Login - Kot Applicatie</title>
      </Head>
      <Header />
      <main className={"main"}>
        <h2></h2>

        <form onSubmit={handleSubmit} className={"loginForm"}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)} // voor de form te laten werken
          />
          <label htmlFor="password">{t("login.password")}</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {emailError && <div className={"error"}>{emailError}</div>}
          <button type="submit" className={"loginButton"}>
            {t("login.button")}
          </button>
        </form>
        {statusMessages.map((message, index) => (
          <div
            key={index}
            className={message.type === "error" ? "error" : "successMessage"}
          >
            {message.message}
          </div>
        ))}

        <table className={"RoleContainer"}>
          <thead>
            <tr>
              <th>Email</th>
              <th>{t("loginTable.password")}</th>
              <th>{t("loginTable.role")}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default appWithTranslation(Login);

import Head from "next/head";
// import Header from "@components/header";
import {useState, useEffect } from "react"
import {Huurder} from "@types";
import Header from "@components"

const Huurders: React.FC = () => {

    return (
        <>
            <Head>
                <title></title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Huurders</h1>
                <section>
                    
                </section>
            </main>
        </>
    )
}
import Head from "next/head";
import {useState, useEffect } from "react"
import {Huurder} from "@/types";
import Header from "@/components/header"

const Huurders: React.FC = () => {
    const [huurders, setHuurders] = useState<Array<Huurder>>();
    

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
    );
};

export default Huurders
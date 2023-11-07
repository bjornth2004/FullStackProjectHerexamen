import Head from "next/head";
import {useState, useEffect } from "react"
import {Kot} from "@types";
import Header from "@components"
import KotService from '@services/KotService'

const Huurders: React.FC = () => {
    const [koten, setKoten] = useState<Array<Kot>>();
    

    return (
        <>
            <Head>
                <title></title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Koten</h1>
                <section>
                    {koten && ()}
                    <KotOverviewTable koten={koten}/>
                </section>
            </main>
        </>
    );
};

export default Huurders
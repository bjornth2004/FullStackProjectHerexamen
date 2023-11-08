import Head from "next/head";
import {useState, useEffect } from "react"
import {Kot} from "@types";
import Header from "@components"
import KotOverviewTable from "@/components/koten/KotOverviewTable";
import KotService from '@services/KotService'

const Huurders: React.FC = () => {
    const [koten, setKoten] = useState<Array<Kot>>();
    
    const getKoten = async () => {
        const response = await KotService.getAllKoten();
        const koten = await response.json()
        setKoten(koten)
    }

    useEffect(() => {
        getKoten()
    },
    []
    )

    return (
        <>
            <Head>
                <title>Koten</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>beschikbaare koten</h1>
                <section>
                    {koten && (
                        <KotOverviewTable koten={koten}/>
                    )}
                </section>
            </main>
        </>
    );
};

export default Huurders
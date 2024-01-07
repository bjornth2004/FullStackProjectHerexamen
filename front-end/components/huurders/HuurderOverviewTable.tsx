import React from "react";

import { Huurder } from "../../types"; //Dit pad gaat twee niveaus omhoog in de mappenstructuur en dan naar de 'types' map (vorige import werkt niet)
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { appWithTranslation, useTranslation } from "next-i18next";

type Props = {
  huurders: Array<Huurder>;
  verwijderHuurder: (id: number) => Promise<void>;
  className?: string; // Voeg dit toe voor de className prop
};

const HuurderOverviewTable: React.FC<Props> = ({
  huurders,
  verwijderHuurder,
  className,
}: Props) => {
  const { t } = useTranslation();

  const handleDeleteClick = (id: number) => {
    verwijderHuurder(id);
  };
  return (
    <>
      {huurders && huurders.length > 0 ? ( //als er huurders aanwezig zijn
        <table className={"huurdersTable"}>
          <thead>
            <tr>
              <th scope="col">{t("huurder.name")}</th>
              <th scope="col">{t("huurder.firstname")}</th>
              <th scope="col">{t("huurder.email")}</th>
              <th scope="col">{t("huurder.street")}</th>
              <th scope="col">{t("huurder.postalcode")}</th>
              <th scope="col">{t("huurder.telephone")}</th>
              <th scope="col">{t("verwijderen")}</th>
            </tr>
          </thead>
          <tbody>
            {huurders.map((huurder, index) => (
              <tr key={index}>
                <td>{huurder.naam}</td>

                <td>{huurder.voorNaam}</td>

                <td>{huurder.email}</td>

                <td>{huurder.straat}</td>

                <td>{huurder.postcode}</td>

                <td>{huurder.telefoon}</td>

                <td>
                  <button
                    onClick={() => handleDeleteClick(huurder.id)}
                    className="deleteButton"
                  >
                    {t("verwijderen")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>{t("huurder.login")}</p>
      )}
    </>
  );
};

export default HuurderOverviewTable;

import React from "react";
import { Kot, Verhuurder } from "../../types";

type Props = {
  koten: Array<Kot>;
  verhuurders: Array<Verhuurder>;
  className?: string;
};

const KotOverviewTable: React.FC<Props> = ({
  koten,
  verhuurders,
  className,
}: Props) => {
  return (
    <>
      {koten && koten.length > 0 ? ( // als er koten aanwezig zijn
        <table className={"huurdersTable"}>
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Actief</th>
              <th scope="col">Oppervlakte</th>
              <th scope="col">Locatie</th>
              <th scope="col">Verhuurprijs</th>
              <th scope="col">Reacties</th>
            </tr>
          </thead>
          <tbody>
            {koten.map((kot, index) => (
              <tr key={index}>
                <td>{kot.id}</td>
                <td>{kot.actief}</td>
                <td>{kot.oppervlakte}</td>
                <td>{kot.locatie}</td>
                <td>{kot.verhuurprijs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Log in om deze gegevens te zien</p>
      )}
    </>
  );
};

export default KotOverviewTable;

import React from "react";
import { Verhuurder } from "../../types";

type Props = {
  verhuurders: Array<Verhuurder>;
  className?: string;
};

const VerhuurderOverviewTable: React.FC<Props> = ({
  verhuurders,
  className,
}: Props) => {
  return (
    <>
      {verhuurders && verhuurders.length > 0 ? ( //als er verhuurders aanwezig zijn
        <table className={"huurdersTable"}>
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Naam</th>
              <th scope="col">Achternaam</th>
              <th scope="col">Iban</th>
              <th scope="col">Telefoon</th>
              <th scope="col">Email</th>
            </tr>
          </thead>

          <tbody>
            {verhuurders &&
              verhuurders.map((verhuurder, index) => (
                <tr key={index}>
                  <td>{verhuurder.id}</td>

                  <td>{verhuurder.naam}</td>

                  <td>{verhuurder.achternaam}</td>

                  <td>{verhuurder.iban}</td>

                  <td>{verhuurder.tel}</td>

                  <td>{verhuurder.email}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p> Log in om deze gegevens te zien </p>
      )}
    </>
  );
};

export default VerhuurderOverviewTable;

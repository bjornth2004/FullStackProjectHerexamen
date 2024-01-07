import React, { useEffect } from "react";
import { Reactie } from "../../types";

type Props = {
  reacties: Array<Reactie>;
  className?: string;
};

const ReactieOverviewTable: React.FC<Props> = ({
  reacties,
  className,
}: Props) => {
  useEffect(() => {
    console.log(reacties);
  }, [reacties]);
  return (
    <>
      {reacties && reacties.length > 0 ? ( // Checken of het niet leeg is
        <table className={"huurdersTable"}>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Review Tekst</th>
              <th scope="col">Score</th>
              <th scope="col">Titel</th>
            </tr>
          </thead>
          <tbody>
            {reacties.map((reactie, index) => (
              <tr key={index}>
                <td>{reactie.id}</td>
                <td>{reactie.reviewtekst}</td>
                <td>{reactie.score}</td>
                <td>{reactie.titel}</td>
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

export default ReactieOverviewTable;

import React from "react";
import { Reactie } from "../../types";

type Props = {
  reactie: Reactie;
};

const ReactieInfo: React.FC<Props> = ({ reactie }: Props) => {
  return (
    <>
      {reactie && (
        <div>
          <p>ID: {reactie.id}</p>
          <p>Review Tekst: {reactie.reviewtekst}</p>
          <p>Score: {reactie.score}</p>
          <p>Titel: {reactie.titel}</p>
        </div>
      )}
    </>
  );
};

export default ReactieInfo;

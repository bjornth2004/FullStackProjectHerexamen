import React from "react";
import { Kot } from "../../types";

type Props = {
  kot: Kot;
};

const KotInfo: React.FC<Props> = ({ kot }: Props) => {
  return (
    <>
      {kot && (
        <div>
          <p>ID: {kot.id}</p>
          <p>Actief: {kot.actief}</p>
          <p>Oppervlakte: {kot.oppervlakte}</p>
          <p>Locatie: {kot.locatie}</p>
          <p>Verhuurprijs: €{kot.verhuurprijs}</p>
          <p>Huurder ID: {kot.huurderId}</p>
          <p>Verhuurder ID: {kot.verhuurderId}</p>
        </div>
      )}
    </>
  );
};

export default KotInfo;

import React from "react";
import { Huurder } from "../../types";

type Props = {
  huurder: Huurder;
};

const HuurderInfo: React.FC<Props> = ({ huurder }: Props) => {
  return (
    <>
      {huurder && (
        <div>
          <p>{huurder.naam}</p> <p>{huurder.voorNaam}</p> <p>{huurder.email}</p>{" "}
          <p>{huurder.straat}</p> <p>{huurder.postcode}</p>{" "}
          <p>{huurder.telefoon}</p>{" "}
        </div>
      )}
    </>
  );
};

export default HuurderInfo;

import React from "react";
import { Verhuurder } from "../../types";

type Props = {
  verhuurder: Verhuurder;
};

const VerhuurderInfo: React.FC<Props> = ({ verhuurder }: Props) => {
  return (
    <>
      {verhuurder && (
        <div>
          <p>{verhuurder.id}</p> <p>{verhuurder.naam}</p>{" "}
          <p>{verhuurder.achternaam}</p> <p>{verhuurder.iban}</p>{" "}
          <p>{verhuurder.tel}</p> <p>{verhuurder.email}</p>{" "}
        </div>
      )}
    </>
  );
};

export default VerhuurderInfo;

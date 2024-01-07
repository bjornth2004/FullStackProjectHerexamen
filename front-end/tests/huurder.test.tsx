//SIDENODE VOOR LECTOREN: TESTEN PASSEN MAAR NIKS WERKT MEER VAN FETCH, LOGIN, ETC...
//DAAROM ALS JE DEZE TESTEN UITVOERT GA JE EEN ERROR KRIJGEN, WEET NIET OF JULLIE IETS MET DEZE FILES KUNNEN DOEN
//TESTEN WERKEN MAAR TESTEN IN COMBINATIE MET FRONT/BACK_END WERKT NIET (enkel front-end testen)
import React from "react";
import { render, screen } from "@testing-library/react";
import HuurderOverviewTable from "../components/huurders/HuurderOverviewTable";
import "@testing-library/jest-dom";

// Mock data buiten de testdefinitie met beide huurders
const mockHuurders = [
  {
    naam: "Klaas",
    voorNaam: "Klaassen",
    email: "klaasklaassen@example.com",
    straat: "Hoofdweg 3",
    postcode: "3000",
    telefoon: "0612345680",
  },
  {
    naam: "Piet",
    voorNaam: "Pietersen",
    email: "pietpietersen@example.com",
    straat: "Zijstraat 2",
    postcode: "2000",
    telefoon: "0612345679",
  },
];

describe("HuurderOverviewTable", () => {
  // Test voor het renderen van de header
  test("toont headers van de tabel", () => {
    render(<HuurderOverviewTable huurders={mockHuurders} />);
    expect(screen.getByText("Naam")).toBeInTheDocument();
    expect(screen.getByText("Voornaam")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Straat")).toBeInTheDocument();
    expect(screen.getByText("Postcode")).toBeInTheDocument();
    expect(screen.getByText("Telefoon")).toBeInTheDocument();
  });

  // Test voor de eerste huurder
  test("toont gegevens van de eerste huurder", () => {
    render(<HuurderOverviewTable huurders={mockHuurders} />);
    expect(screen.getByText("Klaas")).toBeInTheDocument();
    expect(screen.getByText("Klaassen")).toBeInTheDocument();
    expect(screen.getByText("klaasklaassen@example.com")).toBeInTheDocument();
    expect(screen.getByText("Hoofdweg 3")).toBeInTheDocument();
    expect(screen.getByText("3000")).toBeInTheDocument();
    expect(screen.getByText("0612345680")).toBeInTheDocument();
  });

  // Test voor de tweede huurder
  test("toont gegevens van de tweede huurder", () => {
    render(<HuurderOverviewTable huurders={mockHuurders} />);
    expect(screen.getByText("Piet")).toBeInTheDocument();
    expect(screen.getByText("Pietersen")).toBeInTheDocument();
    expect(screen.getByText("pietpietersen@example.com")).toBeInTheDocument();
    expect(screen.getByText("Zijstraat 2")).toBeInTheDocument();
    expect(screen.getByText("2000")).toBeInTheDocument();
    expect(screen.getByText("0612345679")).toBeInTheDocument();
  });
});

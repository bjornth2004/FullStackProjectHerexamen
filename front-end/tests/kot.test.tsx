//SIDENODE VOOR LECTOREN: TESTEN PASSEN MAAR NIKS WERKT MEER VAN FETCH, LOGIN, ETC...
//DAAROM ALS JE DEZE TESTEN UITVOERT GA JE EEN ERROR KRIJGEN, WEET NIET OF JULLIE IETS MET DEZE FILES KUNNEN DOEN
//TESTEN WERKEN MAAR TESTEN IN COMBINATIE MET FRONT/BACK_END WERKT NIET (enkel front-end testen)
import React from "react";
import { render, screen } from "@testing-library/react";
import KotOverviewTable from "../components/koten/KotOverviewTable"; // Pas het importpad aan indien nodig
import "@testing-library/jest-dom";

// Mockdata voor de test
const mockKoten = [
  {
    id: 1,
    actief: true,
    oppervlakte: 25,
    locatie: "Centrum",
    verhuurprijs: 500,
  },
  {
    id: 2,
    actief: false,
    oppervlakte: 30,
    locatie: "Buitenwijk",
    verhuurprijs: 450,
  },
];

describe("KotOverviewTable", () => {
  // Test om te controleren of de tabelheaders worden weergegeven
  test("toont de headers van de tabel", () => {
    render(<KotOverviewTable koten={mockKoten} verhuurders={[]} />);
    expect(screen.getByText("Id")).toBeInTheDocument();
    expect(screen.getByText("Actief")).toBeInTheDocument();
    expect(screen.getByText("Oppervlakte")).toBeInTheDocument();
    expect(screen.getByText("Locatie")).toBeInTheDocument();
    expect(screen.getByText("Verhuurprijs")).toBeInTheDocument();
    expect(screen.getByText("Reacties")).toBeInTheDocument();
  });

  // Test voor het eerste kot
  test("toont gegevens van het eerste kot", () => {
    render(<KotOverviewTable koten={mockKoten} verhuurders={[]} />);
    expect(screen.getByText("1")).toBeInTheDocument(); // Checkt ID
    expect(screen.getByText("25")).toBeInTheDocument(); // Checkt oppervlakte
    expect(screen.getByText("Centrum")).toBeInTheDocument(); // Checkt locatie
    expect(screen.getByText("500")).toBeInTheDocument(); // Checkt verhuurprijs
  });

  // Test voor het tweede kot
  test("toont gegevens van het tweede kot", () => {
    render(<KotOverviewTable koten={mockKoten} verhuurders={[]} />);
    expect(screen.getByText("2")).toBeInTheDocument(); // Checkt ID
    expect(screen.getByText("30")).toBeInTheDocument(); // Checkt oppervlakte
    expect(screen.getByText("Buitenwijk")).toBeInTheDocument(); // Checkt locatie
    expect(screen.getByText("450")).toBeInTheDocument(); // Checkt verhuurprijs
  });
});

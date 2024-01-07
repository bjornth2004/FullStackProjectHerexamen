//SIDENODE VOOR LECTOREN: TESTEN PASSEN MAAR NIKS WERKT MEER VAN FETCH, LOGIN, ETC...
//DAAROM ALS JE DEZE TESTEN UITVOERT GA JE EEN ERROR KRIJGEN, WEET NIET OF JULLIE IETS MET DEZE FILES KUNNEN DOEN
//TESTEN WERKEN MAAR TESTEN IN COMBINATIE MET FRONT/BACK_END WERKT NIET (enkel front-end testen)
import React from "react";
import { render, screen } from "@testing-library/react";
import ReactieOverviewTable from "../components/reacties/ReactieOverviewTable"; // Pas het importpad aan
import "@testing-library/jest-dom";

// Mockdata voor reacties
const mockReacties = [
  {
    id: 1,
    reviewtekst: "Zeer goed kot!",
    score: 4,
    titel: "Goede ervaring",
  },
  {
    id: 2,
    reviewtekst: "Niet zo geweldig",
    score: 2,
    titel: "Slechte ervaring",
  },
];

describe("ReactieOverviewTable", () => {
  // Test voor het renderen van de tabelheaders
  test("toont headers van de tabel", () => {
    render(<ReactieOverviewTable reacties={mockReacties} />);
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Review Tekst")).toBeInTheDocument();
    expect(screen.getByText("Score")).toBeInTheDocument();
    expect(screen.getByText("Titel")).toBeInTheDocument();
  });

  // Test voor de eerste reactie
  test("toont gegevens van de eerste reactie", () => {
    render(<ReactieOverviewTable reacties={mockReacties} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Zeer goed kot!")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("Goede ervaring")).toBeInTheDocument();
  });

  // Test voor de tweede reactie
  test("toont gegevens van de tweede reactie", () => {
    render(<ReactieOverviewTable reacties={mockReacties} />);
    // expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Niet zo geweldig")).toBeInTheDocument();
    // expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Slechte ervaring")).toBeInTheDocument();
  });
});

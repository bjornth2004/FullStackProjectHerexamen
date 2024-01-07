//SIDENODE VOOR LECTOREN: TESTEN PASSEN MAAR NIKS WERKT MEER VAN FETCH, LOGIN, ETC...
//DAAROM ALS JE DEZE TESTEN UITVOERT GA JE EEN ERROR KRIJGEN, WEET NIET OF JULLIE IETS MET DEZE FILES KUNNEN DOEN
//TESTEN WERKEN MAAR TESTEN IN COMBINATIE MET FRONT/BACK_END WERKT NIET (enkel front-end testen)
import React from "react";
import { render, screen } from "@testing-library/react";
import VerhuurderOverviewTable from "../components/verhuurders/VerhuurderOverviewTable";
import "@testing-library/jest-dom";
import { Verhuurder } from "../types/index"; // Update this path

const mockVerhuurders: Verhuurder[] = [
  {
    id: 1,
    naam: "Jan",
    achternaam: "Jansen",
    login: "janlogin",
    password: "123456",
    iban: "NL91ABNA0417164300",
    tel: 612345678,
    email: "janjansen@example.com",
  },
  {
    id: 2,
    naam: "Sara",
    achternaam: "Smit",
    login: "saralogin",
    password: "654321",
    iban: "NL91ABNA0417164301",
    tel: 698765432,
    email: "sarasmit@example.com",
  },
];

describe("VerhuurderOverviewTable", () => {
  test("toont headers van de tabel", () => {
    render(<VerhuurderOverviewTable verhuurders={mockVerhuurders} />);
    expect(screen.getByText("Id")).toBeInTheDocument();
    expect(screen.getByText("Naam")).toBeInTheDocument();
    expect(screen.getByText("Achternaam")).toBeInTheDocument();
    expect(screen.getByText("Iban")).toBeInTheDocument();
    expect(screen.getByText("Telefoon")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  test("toont gegevens van de eerste verhuurder", () => {
    render(<VerhuurderOverviewTable verhuurders={mockVerhuurders} />);
    expect(screen.getByText("Jan")).toBeInTheDocument();
    expect(screen.getByText("Jansen")).toBeInTheDocument();
    expect(screen.getByText("NL91ABNA0417164300")).toBeInTheDocument();
    expect(screen.getByText(612345678)).toBeInTheDocument();
    expect(screen.getByText("janjansen@example.com")).toBeInTheDocument();
  });

  test("toont gegevens van de tweede verhuurder", () => {
    render(<VerhuurderOverviewTable verhuurders={mockVerhuurders} />);
    expect(screen.getByText("Sara")).toBeInTheDocument();
    expect(screen.getByText("Smit")).toBeInTheDocument();
    expect(screen.getByText("NL91ABNA0417164301")).toBeInTheDocument();
    expect(screen.getByText(698765432)).toBeInTheDocument();
    expect(screen.getByText("sarasmit@example.com")).toBeInTheDocument();
  });
});

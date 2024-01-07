export type Huurder = {
  //veranderd naar Huurder en niet huurderinput anders vreemde errors in HuurderOverviewTable
  naam?: string;
  id?: number;
  voorNaam?: string;
  password?: string;
  email?: string;
  straat?: string;
  postcode?: string;
  telefoon?: string;
};

export type Verhuurder = {
  id?: number;
  naam?: string; //niet verplichte variabele (?)
  achternaam?: string;
  login?: string;
  pass?: string;
  iban?: string;
  tel?: number;
  email?: string;
  password?: string;
};

export type Kot = {
  id?: number;
  actief?: boolean;
  oppervlakte?: number;
  locatie?: string;
  verhuurprijs?: number;
  huurderId?: number;
  verhuurderId?: number;
};

export type Reactie = {
  id?: number;
  reviewtekst?: string;
  score?: number;
  titel?: string;
};

export type StatusMessage = {
  message: string;
  type: "error" | "succes";
};

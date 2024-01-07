-- CreateTable
CREATE TABLE "Huurder" (
    "id" SERIAL NOT NULL,
    "naam" TEXT NOT NULL,
    "voorNaam" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "straat" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "telefoon" TEXT NOT NULL,

    CONSTRAINT "Huurder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reactie" (
    "id" SERIAL NOT NULL,
    "reviewtekst" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "titel" TEXT NOT NULL,

    CONSTRAINT "Reactie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Verhuurder" (
    "id" SERIAL NOT NULL,
    "naam" TEXT NOT NULL,
    "achternaam" TEXT NOT NULL,
    "login" BOOLEAN NOT NULL,
    "pass" INTEGER NOT NULL,
    "iban" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Verhuurder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kot" (
    "id" SERIAL NOT NULL,
    "actief" BOOLEAN NOT NULL,
    "oppervlakte" INTEGER NOT NULL,
    "locatie" TEXT NOT NULL,
    "verhuurprijs" DOUBLE PRECISION NOT NULL,
    "verhuurderId" INTEGER NOT NULL,

    CONSTRAINT "Kot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Huurder_email_key" ON "Huurder"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Verhuurder_email_key" ON "Verhuurder"("email");

-- AddForeignKey
ALTER TABLE "Kot" ADD CONSTRAINT "Kot_verhuurderId_fkey" FOREIGN KEY ("verhuurderId") REFERENCES "Verhuurder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

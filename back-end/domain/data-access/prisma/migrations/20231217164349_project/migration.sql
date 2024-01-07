-- CreateTable
CREATE TABLE "_KotToReactie" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_KotToReactie_AB_unique" ON "_KotToReactie"("A", "B");

-- CreateIndex
CREATE INDEX "_KotToReactie_B_index" ON "_KotToReactie"("B");

-- AddForeignKey
ALTER TABLE "_KotToReactie" ADD CONSTRAINT "_KotToReactie_A_fkey" FOREIGN KEY ("A") REFERENCES "Kot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KotToReactie" ADD CONSTRAINT "_KotToReactie_B_fkey" FOREIGN KEY ("B") REFERENCES "Reactie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

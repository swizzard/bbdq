/*
  Warnings:

  - A unique constraint covering the columns `[identifier]` on the table `bot` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "bot_identifier_key" ON "bot"("identifier");

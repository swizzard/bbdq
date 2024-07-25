/*
  Warnings:

  - You are about to drop the column `author_id` on the `bot` table. All the data in the column will be lost.
  - You are about to drop the `bot_author` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updated_at` to the `bot` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bot" DROP CONSTRAINT "bot_author_id_fkey";

-- AlterTable
ALTER TABLE "bot" DROP COLUMN "author_id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "bot_author";

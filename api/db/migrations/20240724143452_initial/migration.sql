-- CreateEnum
CREATE TYPE "Schedule" AS ENUM ('EVERY_10_MINUTES', 'EVERY_30_MINUTES', 'EVERY_1_HOURS', 'EVERY_2_HOURS', 'EVERY_6_HOURS', 'EVERY_12_HOURS', 'EVERY_1_DAYS', 'EVERY_2_DAYS', 'EVERY_1_WEEKS');

-- CreateTable
CREATE TABLE "bot_author" (
    "id" TEXT NOT NULL,
    "external_auth_provider" TEXT NOT NULL DEFAULT 'auth0',
    "external_auth_id" TEXT NOT NULL,

    CONSTRAINT "bot_author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bot" (
    "id" TEXT NOT NULL,
    "author_id" TEXT,
    "grammar" TEXT NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "identifier" TEXT NOT NULL,
    "atproto_password" TEXT NOT NULL,
    "schedule" "Schedule" NOT NULL,

    CONSTRAINT "bot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bot" ADD CONSTRAINT "bot_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "bot_author"("id") ON DELETE SET NULL ON UPDATE CASCADE;

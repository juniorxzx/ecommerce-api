-- AlterTable
ALTER TABLE "products" ALTER COLUMN "stars" DROP NOT NULL,
ALTER COLUMN "stars" SET DEFAULT 1;

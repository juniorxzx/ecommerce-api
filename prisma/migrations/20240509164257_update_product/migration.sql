/*
  Warnings:

  - The `img` column on the `products` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "category" TEXT[],
DROP COLUMN "img",
ADD COLUMN     "img" TEXT[];

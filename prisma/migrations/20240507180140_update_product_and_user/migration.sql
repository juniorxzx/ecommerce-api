/*
  Warnings:

  - Added the required column `price` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfBirth` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "price" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL;

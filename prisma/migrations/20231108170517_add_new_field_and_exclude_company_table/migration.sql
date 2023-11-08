/*
  Warnings:

  - The primary key for the `cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `cart` table. All the data in the column will be lost.
  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `categories` table. All the data in the column will be lost.
  - The primary key for the `comments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `comments` table. All the data in the column will be lost.
  - The primary key for the `images_product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `images_product` table. All the data in the column will be lost.
  - The primary key for the `product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `product` table. All the data in the column will be lost.
  - The primary key for the `product_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `product_categories` table. All the data in the column will be lost.
  - The primary key for the `stock` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `stock` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `company` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[product_uuid]` on the table `stock` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `quantity` to the `cart` table without a default value. This is not possible if the table is not empty.
  - The required column `uuid` was added to the `cart` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `categories` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `user_uuid` to the `comments` table without a default value. This is not possible if the table is not empty.
  - The required column `uuid` was added to the `comments` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `images_product` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `color` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_author` to the `product` table without a default value. This is not possible if the table is not empty.
  - The required column `uuid` was added to the `product` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `product_categories` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `stock` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `user` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "ClothingSize" AS ENUM ('P', 'M', 'G', 'GG', 'XG');

-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_product_uuid_fkey";

-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_user_uuid_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_product_uuid_fkey";

-- DropForeignKey
ALTER TABLE "company" DROP CONSTRAINT "company_product_uuid_fkey";

-- DropForeignKey
ALTER TABLE "images_product" DROP CONSTRAINT "images_product_product_uuid_fkey";

-- DropForeignKey
ALTER TABLE "product_categories" DROP CONSTRAINT "product_categories_category_uuid_fkey";

-- DropForeignKey
ALTER TABLE "product_categories" DROP CONSTRAINT "product_categories_product_uuid_fkey";

-- DropForeignKey
ALTER TABLE "stock" DROP CONSTRAINT "stock_product_uuid_fkey";

-- AlterTable
ALTER TABLE "cart" DROP CONSTRAINT "cart_pkey",
DROP COLUMN "id",
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "cart_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "categories" DROP CONSTRAINT "categories_pkey",
DROP COLUMN "id",
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "comments" DROP CONSTRAINT "comments_pkey",
DROP COLUMN "id",
ADD COLUMN     "user_uuid" TEXT NOT NULL,
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "comments_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "images_product" DROP CONSTRAINT "images_product_pkey",
DROP COLUMN "id",
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "images_product_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "product" DROP CONSTRAINT "product_pkey",
DROP COLUMN "id",
ADD COLUMN     "color" VARCHAR(50) NOT NULL,
ADD COLUMN     "size" "ClothingSize" NOT NULL DEFAULT 'M',
ADD COLUMN     "theme" VARCHAR(150),
ADD COLUMN     "user_author" TEXT NOT NULL,
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "product_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "product_categories" DROP CONSTRAINT "product_categories_pkey",
DROP COLUMN "id",
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "product_categories_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "stock" DROP CONSTRAINT "stock_pkey",
DROP COLUMN "id",
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "stock_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "id",
ADD COLUMN     "isAdm" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("uuid");

-- DropTable
DROP TABLE "company";

-- CreateIndex
CREATE UNIQUE INDEX "stock_product_uuid_key" ON "stock"("product_uuid");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_user_author_fkey" FOREIGN KEY ("user_author") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_product_uuid_fkey" FOREIGN KEY ("product_uuid") REFERENCES "product"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_category_uuid_fkey" FOREIGN KEY ("category_uuid") REFERENCES "categories"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_product_uuid_fkey" FOREIGN KEY ("product_uuid") REFERENCES "product"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images_product" ADD CONSTRAINT "images_product_product_uuid_fkey" FOREIGN KEY ("product_uuid") REFERENCES "product"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_product_uuid_fkey" FOREIGN KEY ("product_uuid") REFERENCES "product"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_product_uuid_fkey" FOREIGN KEY ("product_uuid") REFERENCES "product"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

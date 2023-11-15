/*
  Warnings:

  - You are about to drop the column `color` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `theme` on the `product` table. All the data in the column will be lost.
  - Added the required column `sex` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('Masculino', 'Feminino');

-- AlterTable
ALTER TABLE "product" DROP COLUMN "color",
DROP COLUMN "size",
DROP COLUMN "theme",
ADD COLUMN     "sex" "Sex" NOT NULL;

-- DropEnum
DROP TYPE "ClothingSize";

-- CreateTable
CREATE TABLE "sizes" (
    "uuid" TEXT NOT NULL,
    "size" VARCHAR(4),

    CONSTRAINT "sizes_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "product_sizes" (
    "uuid" TEXT NOT NULL,
    "size_uuid" TEXT,
    "product_uuid" TEXT,

    CONSTRAINT "product_sizes_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "colors" (
    "uuid" TEXT NOT NULL,
    "color" VARCHAR(155),

    CONSTRAINT "colors_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "product_colors" (
    "uuid" TEXT NOT NULL,
    "color_uuid" TEXT,
    "product_uuid" TEXT,

    CONSTRAINT "product_colors_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "themes" (
    "uuid" TEXT NOT NULL,
    "theme" VARCHAR(155) NOT NULL,

    CONSTRAINT "themes_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "product_themes" (
    "uuid" TEXT NOT NULL,
    "theme_uuid" TEXT,
    "product_uuid" TEXT,

    CONSTRAINT "product_themes_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "product_sizes" ADD CONSTRAINT "product_sizes_size_uuid_fkey" FOREIGN KEY ("size_uuid") REFERENCES "sizes"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_sizes" ADD CONSTRAINT "product_sizes_product_uuid_fkey" FOREIGN KEY ("product_uuid") REFERENCES "product"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_colors" ADD CONSTRAINT "product_colors_color_uuid_fkey" FOREIGN KEY ("color_uuid") REFERENCES "colors"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_colors" ADD CONSTRAINT "product_colors_product_uuid_fkey" FOREIGN KEY ("product_uuid") REFERENCES "product"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_themes" ADD CONSTRAINT "product_themes_theme_uuid_fkey" FOREIGN KEY ("theme_uuid") REFERENCES "themes"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_themes" ADD CONSTRAINT "product_themes_product_uuid_fkey" FOREIGN KEY ("product_uuid") REFERENCES "product"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

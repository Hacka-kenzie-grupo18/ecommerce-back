/*
  Warnings:

  - Added the required column `code` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "code" VARCHAR(255) NOT NULL;

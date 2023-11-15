-- AlterTable
ALTER TABLE "user" ADD COLUMN     "passwordTokenExpiresIn" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "resetPasswordToken" VARCHAR(255);

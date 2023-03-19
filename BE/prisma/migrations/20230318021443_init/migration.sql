/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "RoleE" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "RoleE" DEFAULT 'USER';

-- DropEnum
DROP TYPE "Role";

/*
  Warnings:

  - You are about to drop the column `target_goal` on the `user_profiles` table. All the data in the column will be lost.
  - Added the required column `target_Role` to the `user_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_profiles" DROP COLUMN "target_goal",
ADD COLUMN     "target_Role" VARCHAR(20) NOT NULL;

/*
  Warnings:

  - Added the required column `observations` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Recipe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "steps" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "observations" TEXT NOT NULL,
    "timesDone" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Recipe" ("category", "createdAt", "id", "imageUrl", "name", "slug", "steps", "timesDone", "updatedAt", "userId") SELECT "category", "createdAt", "id", "imageUrl", "name", "slug", "steps", "timesDone", "updatedAt", "userId" FROM "Recipe";
DROP TABLE "Recipe";
ALTER TABLE "new_Recipe" RENAME TO "Recipe";
CREATE UNIQUE INDEX "Recipe_slug_key" ON "Recipe"("slug");
CREATE INDEX "Recipe_name_idx" ON "Recipe"("name");
CREATE INDEX "Recipe_category_idx" ON "Recipe"("category");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

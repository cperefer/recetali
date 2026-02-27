/*
  Warnings:

  - You are about to drop the column `steps` on the `Recipe` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Step" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "recipeId" INTEGER NOT NULL,
    "step" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    CONSTRAINT "Step_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TagType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RecipeToTagType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_RecipeToTagType_A_fkey" FOREIGN KEY ("A") REFERENCES "Recipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RecipeToTagType_B_fkey" FOREIGN KEY ("B") REFERENCES "TagType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Recipe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "observations" TEXT,
    "timesDone" INTEGER NOT NULL DEFAULT 0,
    "pax" INTEGER NOT NULL DEFAULT 2,
    "dificulty" TEXT NOT NULL DEFAULT 'EASY',
    "timeToDone" INTEGER NOT NULL DEFAULT 30,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Recipe" ("category", "createdAt", "dificulty", "id", "imageUrl", "name", "observations", "pax", "slug", "timeToDone", "timesDone", "updatedAt", "userId") SELECT "category", "createdAt", "dificulty", "id", "imageUrl", "name", "observations", "pax", "slug", "timeToDone", "timesDone", "updatedAt", "userId" FROM "Recipe";
DROP TABLE "Recipe";
ALTER TABLE "new_Recipe" RENAME TO "Recipe";
CREATE UNIQUE INDEX "Recipe_slug_key" ON "Recipe"("slug");
CREATE INDEX "Recipe_name_idx" ON "Recipe"("name");
CREATE INDEX "Recipe_category_idx" ON "Recipe"("category");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "TagType_name_key" ON "TagType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_RecipeToTagType_AB_unique" ON "_RecipeToTagType"("A", "B");

-- CreateIndex
CREATE INDEX "_RecipeToTagType_B_index" ON "_RecipeToTagType"("B");

-- CreateTable
CREATE TABLE "prep_plans" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "roadmap_json" JSONB NOT NULL,
    "roadmap_text" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "prep_plans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_prep_plans_user_id" ON "prep_plans"("user_id");

-- CreateTable
CREATE TABLE "user_profiles" (
    "user_id" UUID NOT NULL,
    "target_goal" VARCHAR(20) NOT NULL,
    "coding_level" VARCHAR(20) NOT NULL,
    "study_days" INTEGER NOT NULL,
    "hours_per_day" INTEGER NOT NULL,
    "focus_area" VARCHAR(20) NOT NULL,
    "weak_topics" TEXT,
    "learning_style" VARCHAR(20) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("user_id")
);

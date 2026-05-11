import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma";


export const profileRouter = Router();

profileRouter.post("/", async (req: Request, res: Response) => {
    try {
        const { userId, ...profileData } = req.body;

        if (!userId) {
        return res.status(400).json({
            error: "User ID is required",
        });
        }

        const {
        targetRole,
        codingLevel,
        studyDays,
        hoursPerDay,
        focusArea,
        weakTopics,
        learningStyle,
        } = profileData;

        if (
        !targetRole ||
        !codingLevel ||
        !studyDays ||
        !hoursPerDay ||
        !focusArea ||
        !learningStyle
        ) {
        return res.status(400).json({
            error: "Missing required fields",
        });
        }

        await prisma.user_profiles.upsert({
            where: {user_id: userId},
            update: {
                target_role: targetRole,
                coding_level: codingLevel,
                study_days: studyDays,
                hours_per_day: hoursPerDay,
                focus_area: focusArea,
                weak_topics: weakTopics || null,
                learning_style: learningStyle,
                updated_at: new Date(),
            },
            create: {
                user_id: userId,
                target_role: targetRole,
                coding_level: codingLevel,
                study_days: studyDays,
                hours_per_day: hoursPerDay,
                focus_area: focusArea,
                weak_topics: weakTopics || null,
                learning_style: learningStyle,
            },
        });
        res.json({succeed: true})
    } catch (error) {
        console.error("Error saving profile:", error);

        return res.status(500).json({
        error: "Failed to save profile",
        });
    }
});
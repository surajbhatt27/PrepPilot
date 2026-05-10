import { Router, type Request, type Response } from "express";

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

        // Save profile logic here

        return res.status(200).json({
        success: true,
        message: "Profile saved successfully",
        data: {
            userId,
            targetRole,
            codingLevel,
            studyDays,
            hoursPerDay,
            focusArea,
            weakTopics,
            learningStyle,
        },
        });
    } catch (error) {
        console.error("Error saving profile:", error);

        return res.status(500).json({
        error: "Failed to save profile",
        });
    }
});
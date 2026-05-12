import { Router, type Request, type Response } from "express";
import { prisma } from '../lib/prisma';
import { generatePrepPlan } from "../lib/ai";

export const roadmapRouter = Router();

roadmapRouter.post('/generate', async (req: Request, res: Response) => {
    try {
        const {userId} = req.body;

        if(!userId) {
            return res.status(400).json({error: "User ID is required"});
        }

        const profile = await prisma.user_profiles.findUnique({
            where: {user_id: userId},
        })

        if(!profile) {
            return res
                    .status(400)
                    .json({error: "User profile not found. Complete onboarding first."})
        }

        // We need roadmap schema
        const latestPlan = await prisma.prep_plans.findFirst({
            where: {user_id: userId},
            orderBy: {created_at: 'desc'},
            select: {version: true},
        })

        const nextVersion = latestPlan ? latestPlan.version+1 : 1;
        let roadmapJson;

        try {
            roadmapJson = await generatePrepPlan(profile);
        } catch (error) {
            console.error("AI generation failed:", error);
            return res.status(500).json({
                error: "Failed to generte Preparation plan. Please try again.",
                detail: error instanceof Error? error.message: "unknown error",
            });
        }

        const roadmapText = JSON.stringify(roadmapJson, null, 2);

        const newPlan = await prisma.prep_plans.create({
            data: {
                user_id: userId,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                roadmap_json: roadmapJson as any,
                roadmap_text: roadmapText,
                version: nextVersion,
            }
        })

        res.json({
            id: newPlan.id,
            version: newPlan.version,
            createdAt: newPlan.created_at,
        })
    } catch (error) {
        console.error("Error generating roadmap: ", error);
        res.status(500).json({error: "failed to generate plan"});
    }
})

roadmapRouter.get("/current", async (req: Request, res: Response) => {
    try {
        const userId = req.query.userId as string;
        if(!userId) {
            return res.status(400).json({error: "User ID is required"});
        }

        const roadmap = await prisma.prep_plans.findFirst({
            where: {user_id: userId},
            orderBy: {created_at: 'desc'},
        })

        if(!roadmap) {
            return res.status(404).json({error: "no roadmap found"});
        }

        res.json({
            id: roadmap.id,
            userId: roadmap.user_id,
            roadmapJson: roadmap.roadmap_json,
            roadmapText: roadmap.roadmap_text,
            version: roadmap.version,
            createdAt: roadmap.created_at
        })
    } catch (error) {
        console.log("Error fetching roadmap:", error);
        res.status(500).json({error: "Failed to fetch data"});
    }
})
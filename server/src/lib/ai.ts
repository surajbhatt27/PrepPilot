/* eslint-disable @typescript-eslint/no-explicit-any */
import OpenAI from "openai";
import dotenv from "dotenv";
import { PrepPlan, UserProfile } from "../../types";

dotenv.config();

export async function generatePrepPlan(
    profile: UserProfile | Record<string, any>,
): Promise<Omit<PrepPlan, "id" | "userId" | "version" | "createdAt">> {

    const normalizedProfile: UserProfile = {
        targetRole: profile.targetRole || "sde_intern",
        codingLevel: profile.codingLevel || "beginner",
        studyDays: profile.studyDays || 5,
        hoursPerDay: profile.hoursPerDay || 2,
        focusArea: profile.focusArea || "dsa",
        weakTopics: profile.weakTopics || null,
        learningStyle: profile.learningStyle || "balanced",
    };

    const apiKey = process.env.OPEN_ROUTER_KEY;

    if (!apiKey) {
        throw new Error("OPEN_ROUTER_KEY is not set in environment variables");
    }

    const openai = new OpenAI({
        apiKey,
        baseURL: "https://openrouter.ai/api/v1",
        defaultHeaders: {
        "HTTP-Referer": process.env.BASE_URL || "http://localhost:3001",
        "X-Title": "PrepPilot AI Planner",
        },
    });

    const prompt = buildPrompt(normalizedProfile);

    try {
        const completion = await openai.chat.completions.create({
        model: "openai/gpt-oss-120b:free",

        messages: [
            {
            role: "system",
            content:
                "You are an expert placement preparation mentor and career coach. Respond ONLY with valid minified JSON. Do not include markdown, explanations, backticks, or extra text.",
            },
            {
            role: "user",
            content: prompt,
            },
        ],

        temperature: 0.3,

        response_format: {
            type: "json_object",
        },
        });

        const content = completion.choices[0].message.content;

        if (!content) {
        console.error(
            "[AI] No content in response:",
            JSON.stringify(completion, null, 2),
        );

        throw new Error("No content in AI response");
        }

        let planData;

        try {
            const cleanedContent = content
                .replaceAll("\n", " ")
                .replaceAll("\r", " ")
                .replaceAll("\t", " ")
                .trim();

            planData = JSON.parse(cleanedContent);

        } catch (error) {
            console.error("[AI] Raw response:", content);

            throw new Error("Invalid JSON returned from AI", {
                cause: error,
            });
        }

        return formatPlanResponse(planData, normalizedProfile);
    } catch (error) {
        console.error("[AI] Error generating prep plan:", error);
        throw error;
    }
}

function formatPlanResponse(
    aiResponse: any,
    profile: UserProfile,
    ): Omit<PrepPlan, "id" | "userId" | "version" | "createdAt"> {
    const plan: Omit<
        PrepPlan,
        "id" | "userId" | "version" | "createdAt"
    > = {
        overview: {
        targetRole:
            aiResponse.overview?.targetRole ||
            `Preparation for ${profile.targetRole}`,

        studyFrequency:
            aiResponse.overview?.studyFrequency ||
            `${profile.studyDays} days per week`,

        learningStyle:
            aiResponse.overview?.learningStyle ||
            profile.learningStyle,

        focusArea:
            aiResponse.overview?.focusArea ||
            profile.focusArea,

        notes:
            aiResponse.overview?.notes ||
            "Stay consistent and revise regularly.",
        },

        weeklySchedule: (aiResponse.weeklySchedule || []).map(
        (day: any) => ({
            day: day.day || "Day",

            focus: day.focus || "Placement Preparation",

            tasks: (day.tasks || []).map((task: any) => ({
            title: task.title || "Study Task",

            type: task.type || "DSA",

            duration: task.duration || "1 hour",

            difficulty:
                task.difficulty || "medium",

            resource: task.resource,

            notes: task.notes,
            })),
        }),
        ),

        strategy:
        aiResponse.strategy ||
        "Practice consistently, revise weak topics weekly, and track progress regularly.",
    };

    return plan;
}

function buildPrompt(profile: UserProfile): string {
    const goalMap: Record<string, string> = {
        sde_intern: "to get an SDE internship",
        on_campus: "to prepare for on-campus placements",
        product_based: "to crack product-based companies",
        frontend_dev: "to become a frontend developer",
        backend_dev: "to become a backend developer",
        fullstack_dev: "to become a full stack developer",
        off_campus: "to prepare for off-campus opportunities",
        maang: "to prepare for MAANG-level companies",
        dsa_mastery: "to master Data Structures and Algorithms",
    };

    const levelMap: Record<string, string> = {
        beginner: "beginner level",
        intermediate: "intermediate level",
        advanced: "advanced level",
    };

    const focusMap: Record<string, string> = {
        dsa: "Data Structures and Algorithms",
        web_dev: "Web Development",
        aptitude: "Aptitude Preparation",
        cs_fundamentals: "Computer Science Fundamentals",
        interview_prep: "Interview Preparation",
    };

    const learningStyleMap: Record<string, string> = {
        balanced: "balanced learning",
        hands_on: "project-based learning",
        theory_first: "theory-first learning",
        practice_heavy: "practice-heavy learning",
    };

    return `Create a personalized placement preparation roadmap for a student.

        Target Goal:
        ${goalMap[profile.targetRole] || profile.targetRole}

        Coding Level:
        ${levelMap[profile.codingLevel] || profile.codingLevel}

        Study Schedule:
        ${profile.studyDays} days per week
        ${profile.hoursPerDay} hours per day

        Primary Focus Area:
        ${focusMap[profile.focusArea] || profile.focusArea}

        Preferred Learning Style:
        ${learningStyleMap[profile.learningStyle] || profile.learningStyle}

        Weak Topics:
        ${profile.weakTopics || "None specified"}

        Generate the response in this exact JSON structure:

        {
        "overview": {
            "targetRole": "goal summary",
            "studyFrequency": "X days per week",
            "learningStyle": "preferred learning style",
            "focusArea": "main focus area",
            "notes": "2-3 sentences of roadmap advice"
        },

        "weeklySchedule": [
            {
            "day": "Monday",
            "focus": "DSA Fundamentals",
            "tasks": [
                {
                "title": "Solve Array Problems",
                "type": "DSA",
                "duration": "1.5 hours",
                "difficulty": "easy",
                "resource": "LeetCode",
                "notes": "Focus on brute force and optimal approaches"
                }
            ]
            }
        ],

        "strategy": "2-3 sentences explaining long-term progression strategy"
        }

        Requirements:
        - Create exactly ${profile.studyDays} study days
        - Tasks should fit within ${profile.hoursPerDay} hours/day
        - Include DSA, development, aptitude, CS fundamentals, or interview prep where relevant
        - Difficulty should be easy, medium, or hard
        - Include useful learning resources when appropriate
        - Prioritize weak topics if mentioned
        - Make the roadmap realistic and progressive
        - Match the user's coding level
        - Keep the plan practical and placement-focused

        Return ONLY the JSON object.
`;
}
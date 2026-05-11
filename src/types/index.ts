export interface User{
    id: string;
    email: string;
    createdAt: string;
}

export interface UserProfile {
    userId: string;

    targetRole:
        | "sde_intern"
        | "on_campus"
        | "product_based"
        | "frontend_dev"
        | "backend_dev"
        | "fullstack_dev"
        | "off_campus"
        | "faang"
        | "dsa_mastery";

    codingLevel:
        | "beginner"
        | "intermediate"
        | "advanced";

    studyDays: number;

    hoursPerDay: number;

    focusArea:
        | "dsa"
        | "web_dev"
        | "aptitude"
        | "cs_fundamentals"
        | "interview_prep";

    weakTopics?: string;

    learningStyle:
        | "balanced"
        | "hands_on"
        | "theory_first"
        | "practice_heavy";

    updatedAt: string;
}
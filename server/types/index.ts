export interface UserProfile {
    targetRole: string;
    codingLevel: string;
    studyDays: number;
    hoursPerDay: number;
    focusArea: string;
    weakTopics?: string | null;
    learningStyle: string;
}

export interface PlanOverview {
    targetRole: string;
    studyFrequency: string;
    learningStyle: string;
    focusArea: string;
    notes: string;
}

export interface Task {
    title: string;
    type: string;
    duration: string;
    difficulty: "easy" | "medium" | "hard";
    resource?: string;
    notes?: string;
}

export interface DaySchedule {
    day: string;
    focus: string;
    tasks: Task[];
}

export interface PrepPlan {
    id: string;
    userId: string;
    overview: PlanOverview;
    weeklySchedule: DaySchedule[];
    strategy: string;
    version: number;
    createdAt: string;
}
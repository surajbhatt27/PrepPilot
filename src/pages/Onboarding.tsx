import { RedirectToSignIn, SignedIn } from "@neondatabase/neon-js/auth/react";
import { useAuth } from "../context/AuthContext"
import { Card } from "../components/ui/Card";
import { Select } from "../components/ui/Select";
import { useState } from "react";
import { Textarea } from "../components/ui/Textarea";
import { Button } from "../components/ui/Button";
import { ArrowRight, Loader2 } from "lucide-react";
import type { UserProfile } from "../types";
import { useNavigate } from "react-router-dom";


const goalOptions = [
    { value: "sde_intern", label: "SDE Internship" },
    { value: "on_campus", label: "On-Campus Placements" },
    { value: "product_based", label: "Product-Based Companies" },
    { value: "frontend_dev", label: "Frontend Developer" },
    { value: "backend_dev", label: "Backend Developer" },
    { value: "fullstack_dev", label: "Full Stack Developer" },
    { value: "off_campus", label: "Off-Campus Preparation" },
    { value: "faang", label: "FAANG Preparation" },
    { value: "dsa_mastery", label: "DSA Mastery" },
];

const experienceOptions = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
];

const dayOptions = [
    { value: "3", label: "3 days/week" },
    { value: "5", label: "5 days/week" },
    { value: "7", label: "Every day" },
];

const sessionOption = [
    { value: "1", label: "1 hour/day" },
    { value: "2", label: "2 hours/day" },
    { value: "4", label: "4+ hours/day" },
];

const focusOptions = [
    { value: "dsa", label: "DSA" },
    { value: "web_dev", label: "Web Development" },
    { value: "aptitude", label: "Aptitude" },
    { value: "cs_fundamentals", label: "CS Fundamentals" },
    { value: "interview_prep", label: "Interview Preparation" },
];

const learningOptions = [
    { value: "balanced", label: "Balanced Learning" },
    { value: "hands_on", label: "Project-Based Learning" },
    { value: "theory_first", label: "Theory First" },
    { value: "practice_heavy", label: "Practice Heavy" },
];

export default function Onboarding() {
    const {user, saveProfile, generatePlan} = useAuth();
    const [formData, setFormData] = useState({
        targetRole: "sde_intern",
        codingLevel: "beginner",
        studyDays: "5",
        hoursPerDay: "2",
        focusArea: "dsa",
        weakTopics: "",
        learningStyle: "balanced",
    });
    const [isGenerating, setIsGenerating] = useState(false)
    const [, setError] = useState("")
    const navigate = useNavigate()

    function updateForm(field: string, value: string) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setFormData((prev: any) => ({...prev, [field]: value}));
    }

    async function handleQuestionnaire(e: React.SubmitEvent) {
        e.preventDefault()

        const profile: Omit<UserProfile, "userId"> = {
            targetRole: formData.targetRole as UserProfile["targetRole"],

            codingLevel:
                formData.codingLevel as UserProfile["codingLevel"],

            studyDays: parseInt(formData.studyDays),

            hoursPerDay: parseInt(formData.hoursPerDay),

            focusArea:
                formData.focusArea as UserProfile["focusArea"],

            weakTopics: formData.weakTopics || undefined,

            learningStyle:
                formData.learningStyle as UserProfile["learningStyle"],

            updatedAt: new Date().toISOString(),
            };

            try {
                await saveProfile(profile);
                setIsGenerating(true)
                await generatePlan()
                navigate("/profile")
            } catch (error) {
                setError(error instanceof Error ? error.message: "Failed to save profile");
            } finally {
                setIsGenerating(false)
            }
    }

    if(!user) {
        return <RedirectToSignIn />;
    }
    return (
        <SignedIn>
            <div className="min-h-screen pt-24 pb-12 px-6">
                <div className="max-w-xl mx-auto"> 
                    {/* progress Indicator */}

                    {/* Step 1: Quetionnaire */}
                    {!isGenerating ? <Card variant="bordered">
                        <h1 className="text-2xl font-bold mb-2">Let's Build Your Prep Roadmap</h1>
                        <p className="text-muted mb-6">
                            Answer a few questions to generate your personalized placement preparation plan
                        </p>
                        <form onSubmit={handleQuestionnaire} className="space-y-5">
                            <Select 
                                id="targetRole" 
                                label="What are you preparing for?" 
                                options={goalOptions}
                                value={formData.targetRole}
                                onChange={(e) => updateForm('targetRole', e.target.value) }
                            />
                            <Select 
                                id="codingLevel" 
                                label="coding level" 
                                options={experienceOptions}
                                value={formData.codingLevel}
                                onChange={(e) => updateForm('codingLevel', e.target.value) }
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Select 
                                    id="studyDays" 
                                    label="Days per week" 
                                    options={dayOptions}
                                    value={formData.studyDays}
                                    onChange={(e) => updateForm('studyDays', e.target.value) }
                                />
                                <Select 
                                    id="hoursPerDay" 
                                    label="Hours per day" 
                                    options={sessionOption}
                                    value={formData.hoursPerDay}
                                    onChange={(e) => updateForm('hoursPerDay', e.target.value) }
                                />
                            </div>
                            <Select 
                                id="focusArea" 
                                label="Focus area" 
                                options={focusOptions}
                                value={formData.focusArea}
                                onChange={(e) => updateForm('focusArea', e.target.value) }
                            />
                            <Select 
                                id="learningStyle" 
                                label="session Length" 
                                options={learningOptions}
                                value={formData.learningStyle}
                                onChange={(e) => updateForm('learningStyle', e.target.value) }
                            />

                            <Textarea
                                id="weakTopics"
                                label="Weak topics"
                                value={formData.weakTopics}
                                onChange={(e) => updateForm("weakTopics", e.target.value)}
                                placeholder="Describe Describe your weak topics"
                                rows={3}
                            />

                            <div className="flex gap-3 pt-2">
                                <Button type="submit" className="flex-1 gap-2">
                                    Create My Prep Plan <ArrowRight className="w-4 h-4"/>
                                </Button>
                            </div>
                        </form>
                    </Card>: (
                        <Card className="text-center py-16" variant="bordered">
                            <Loader2 className="w-12 h-12 text-accent mx-auto mb-6 animate-spin"/>
                            <h1 className="text-2xl font-bold mb-2">Creating your roadmap</h1>
                            <p className="text-muted">Our AI is building your personalized preparation roadmap</p>
                        </Card>
                    )}

                    {/* Step 2: Generating */}
                </div>
            </div>
        </SignedIn>
    )
}
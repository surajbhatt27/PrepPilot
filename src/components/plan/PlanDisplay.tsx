import { BookOpen, Info } from "lucide-react";
import type { DaySchedule, Task } from "../../types";
import { Card } from "../ui/Card";

function TaskRow({
    task,
    index,
}: {
    task: Task;
    index: number;
}) {
    return (
        <tr className="border-b border-border] last:border-0">
            <td className="py-3 pr-4">
                <div className="flex items-start gap-3">
                    <span className="text-xs text-muted] w-5">
                        {index + 1}.
                    </span>

                    <div>
                        <p className="font-medium">{task.title}</p>

                        {task.notes && (
                            <p className="text-xs text-muted mt-0.5 flex items-center gap-1">
                                <Info className="w-3 h-3" />
                                {task.notes}
                            </p>
                        )}
                    </div>
                </div>
            </td>

            <td className="py-3 px-4 text-center">
                <span className="text-accent">
                    {task.type}
                </span>
            </td>

            <td className="py-3 px-4 text-center whitespace-nowrap">
                {task.duration}
            </td>

            <td className="py-3 px-4 text-center">
                <span
                    className={`px-2 py-1 rounded-lg text-xs font-medium
                    ${
                        task.difficulty === "hard"
                            ? "bg-red-500/10 text-red-400"
                            : task.difficulty === "medium"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-green-500/10 text-green-400"
                    }`}
                >
                    {task.difficulty}
                </span>
            </td>

            <td className="py-3 px-4 text-center text-muted">
                {task.resource}
            </td>
        </tr>
    );
}

function DayCard({ schedule }: { schedule: DaySchedule }) {
    return (
        <Card variant="bordered" className="overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="font-semibold text-lg">{schedule.day}</h3>
                    <p className="text-sm text-accent">{schedule.focus}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted">
                    <BookOpen className="w-4 h-4" />
                    <span>{schedule.tasks.length} tasks</span>
                </div>
            </div>

            <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-muted text-xs uppercase tracking-wider">
                            <th className="text-left py-2 pr-4 font-medium">Task</th>
                            <th className="py-2 px-4 font-medium">Type</th>
                            <th className="py-2 px-4 font-medium">Duration</th>
                            <th className="py-2 px-4 font-medium">Difficulty</th>
                            <th className="py-2 px-4 font-medium">Resource</th>
                        </tr>
                    </thead>

                    <tbody>
                        {schedule.tasks.map((exercise, index) => (
                            <TaskRow key={`${schedule.day}-task-${index}`} task={exercise} index={index} />
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}

interface PlanDisplayProps {
    weeklySchedule: DaySchedule[];
}

export function PlanDisplay({ weeklySchedule }: PlanDisplayProps) {
    return (
        <div className="space-y-6 mb-8">
            {weeklySchedule.map((schedule, key) => (
                <DayCard key={key} schedule={schedule} />
            ))}
        </div>
    );
}
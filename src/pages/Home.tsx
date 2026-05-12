import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import {
    Compass,
    Target,
    Calendar,
    Brain,
    TrendingUp,
    ArrowRight,
    Users,
    Video,
    Code2,
    MessageCircle,
    Lightbulb,
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

export default function Home() {
    const { user, isLoading } = useAuth();

    if (user && !isLoading) {
        return <Navigate to="/profile" replace />;
    }

    const features = [
        {
            icon: Brain,
            title: "Your personal AI coach",
            description: "Tell us your goals, skill level, and how much time you've got. We'll build a roadmap that actually fits your life."
        },
        {
            icon: Target,
            title: "Made for placements",
            description: "Whether it's an SDE internship, on-campus hiring, or FAANG — the plan adapts to what you're aiming for."
        },
        {
            icon: Calendar,
            title: "Fits your schedule",
            description: "2 hours a day? 5 days a week? No problem. The roadmap works around your routine, not the other way around."
        },
        {
            icon: TrendingUp,
            title: "Evolves with you",
            description: "As you get better, regenerate your plan. New version, new challenges. No stale advice."
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-6">
                        <Lightbulb className="w-4 h-4 text-accent" />
                        <span className="text-sm text-accent font-medium">Stop guessing. Start preparing.</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Your roadmap to
                        <br />
                        that dream offer
                    </h1>

                    <p className="text-xl text-muted max-w-2xl mx-auto mb-8">
                        No more "what should I study today?" Just a personalized plan
                        built around your goals, your schedule, and your level.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/auth/sign-up">
                            <Button size="lg" className="gap-2">
                                Get your free roadmap <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                        <Link to="/auth/sign-in">
                            <Button size="lg" variant="secondary">
                                Already have an account
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-16 px-6 border-t border-border">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Three steps. That's it.
                        </h2>
                        <p className="text-muted text-lg">
                            No complicated setup. No surveys that never end.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-accent">1</span>
                            </div>
                            <h3 className="font-semibold text-xl mb-2">Tell us what you're aiming for</h3>
                            <p className="text-muted">Internship? Full-time? FAANG? Just getting started? Pick your target.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-accent">2</span>
                            </div>
                            <h3 className="font-semibold text-xl mb-2">Share your schedule</h3>
                            <p className="text-muted">How many days a week? How many hours? We'll build around your life.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-accent">3</span>
                            </div>
                            <h3 className="font-semibold text-xl mb-2">Start following your plan</h3>
                            <p className="text-muted">Daily tasks, resources, and strategy. All ready. No confusion.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 px-6 bg-card/30">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, i) => {
                            const Icon = feature.icon;
                            return (
                                <Card key={i} variant="bordered" className="hover:border-accent/50 transition-colors">
                                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                                        <Icon className="w-5 h-5 text-accent" />
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                                    <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* PairUp Section */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-linear-to-r from-accent/5 to-transparent rounded-2xl border border-accent/20 overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                            <div className="flex-1 p-8 md:p-12">
                                <div className="inline-flex items-center gap-2 bg-accent/10 px-3 py-1 rounded-full mb-4">
                                    <span className="text-xs font-medium text-accent">You'll also like</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                                    PairUp <span className="text-accent">two › one</span>
                                </h2>
                                <p className="text-muted text-lg mb-4">
                                    Because practicing alone gets old.
                                </p>
                                <p className="text-muted mb-6">
                                    PairUp lets you hop on a face‑to‑face video call with another student.
                                    Solve 200+ coding questions together in a VS‑Code‑like editor.
                                    Two brains. One session. Way better than staring at a screen by yourself.
                                </p>
                                <div className="flex flex-wrap gap-3 mb-8">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Users className="w-4 h-4 text-accent" />
                                        <span>Peer to peer</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Video className="w-4 h-4 text-accent" />
                                        <span>Face to face</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Code2 className="w-4 h-4 text-accent" />
                                        <span>200+ coding questions</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <MessageCircle className="w-4 h-4 text-accent" />
                                        <span>Live editor</span>
                                    </div>
                                </div>
                                <a
                                    href="https://hireloop-pink.vercel.app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button variant="secondary" className="gap-2">
                                        Try PairUp <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </a>
                            </div>
                            <div className="flex-1 bg-accent/5 flex items-center justify-center p-8">
                                <div className="text-center">
                                    <div className="text-6xl font-bold text-accent mb-2">two</div>
                                    <div className="text-2xl text-muted mb-1">›</div>
                                    <div className="text-6xl font-bold text-accent">one</div>
                                    <p className="text-xs text-muted mt-4">Practice together. Crack together.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Simple bottom CTA */}
            <section className="py-16 px-6 border-t border-border">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">
                        Ready to stop wandering?
                    </h2>
                    <p className="text-muted mb-6">
                        Get a clear plan. Follow it. Land your offer.
                    </p>
                    <Link to="/auth/sign-up">
                        <Button size="lg">
                            Start your roadmap
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

                        {/* Brand */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Compass className="w-5 h-5 text-accent" />
                                <span className="font-semibold text-lg">PrepPilot</span>
                            </div>
                            <p className="text-sm text-muted leading-relaxed">
                                Built for students who want a clear path to their first tech job.
                            </p>
                        </div>

                        {/* Quick Links - Other Projects */}
                        <div>
                            <h4 className="font-medium mb-3">Other projects</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a
                                        href="https://hireloop-pink.vercel.app"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted hover:text-accent transition"
                                    >
                                        PairUp → two › one
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://chemora-sooty.vercel.app/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted hover:text-accent transition"
                                    >
                                        Chemora
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://surajbhatt27.github.io/CSS-Timeline/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted hover:text-accent transition"
                                    >
                                        CSS-Timeline
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Social Connect */}
                        <div>
                            <h4 className="font-medium mb-3">Connect</h4>
                            <div className="flex gap-4">
                                <a
                                    href="https://github.com/bhattsuraj27"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted hover:text-accent transition"
                                    aria-label="GitHub"
                                >
                                    <FaGithub className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://twitter.com/surj_bhtt"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted hover:text-accent transition"
                                    aria-label="Twitter"
                                >
                                    <FaX className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://linkedin.com/in/suraj-bhatt-574b0426a"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted hover:text-accent transition"
                                    aria-label="LinkedIn"
                                >
                                    <FaLinkedin className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://instagram.com/surj_bhtt"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted hover:text-accent transition"
                                    aria-label="Instagram"
                                >
                                    <FaInstagram className="w-5 h-5" />
                                </a>
                            </div>
                            <p className="text-xs text-muted mt-3">
                                Follow for updates
                            </p>
                        </div>

                        {/* Feedback */}
                        <div>
                            <h4 className="font-medium mb-3">Found a bug?</h4>
                            <p className="text-sm text-muted mb-2">
                                Let me know and I'll fix it.
                            </p>
                            <a
                                href="mailto:bhattsuraj1027@gmail.com"
                                className="text-sm text-accent hover:underline"
                            >
                                bhattsuraj1027@gmail.com
                            </a>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
                        <p className="text-xs text-muted">
                            © 2026 PrepPilot. Made by Suraj
                        </p>
                        <div className="flex gap-4 text-xs text-muted">
                            <span>No data selling</span>
                            <span>•</span>
                            <span>Just a free tool</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
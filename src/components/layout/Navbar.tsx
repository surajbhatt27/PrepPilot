import { Compass, } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../ui/Button"
import { useAuth } from "../../context/AuthContext";
import { UserButton } from "@neondatabase/neon-js/auth/react";

function Navbar() {
    const { user } = useAuth();
    return (
        <header className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link to='/' className="flex items-center gap-2 text-foreground ">
                    <Compass className="w-6 h-6 text-accent" />
                    <span className="font-semibold text-lg">PrepPilot</span>
                </Link>

                <nav>
                    {user ? (
                        <div className="flex items-center gap-3">
                            <Link to="/profile">
                                <Button variant="ghost" size="sm">
                                    My Roadmap
                                </Button>
                            </Link>

                            <UserButton size='icon'/>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link to="/auth/sign-in">
                                <Button variant="ghost" size="sm">
                                    Sign In
                                </Button>
                            </Link>

                            <Link to="/auth/sign-up">
                                <Button size="sm">
                                    Sign up
                                </Button>
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar
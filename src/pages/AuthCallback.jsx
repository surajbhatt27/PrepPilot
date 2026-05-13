import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@neondatabase/neon-js/auth/react";
import { Loader2 } from "lucide-react";

export default function AuthCallback() {
    const navigate = useNavigate();
    const { session } = useAuth();

    useEffect(() => {
        // Check if we have a session after OAuth redirect
        if (session) {
            // Successfully signed in
            navigate("/profile");
        } else {
            // Check URL for error parameters
            const params = new URLSearchParams(window.location.search);
            const error = params.get("error");
            if (error) {
                console.error("OAuth error:", error);
                navigate("/auth/sign-in?error=oauth_failed");
            }
        }
    }, [session, navigate]);

    return (
        <div className="min-h-screen pt-24 flex items-center justify-center">
            <div className="text-center">
                <Loader2 className="w-12 h-12 text-accent mx-auto mb-4 animate-spin" />
                <h2 className="text-xl font-semibold mb-2">Completing sign in...</h2>
                <p className="text-muted">Please wait while we redirect you.</p>
            </div>
        </div>
    );
}
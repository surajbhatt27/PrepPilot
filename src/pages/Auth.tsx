import { AuthView } from "@neondatabase/neon-js/auth/react";
import { useParams } from "react-router-dom";

export default function Auth() {
    const {pathname} = useParams();
    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
            <div className="w-full max-w-md">
                <AuthView path={pathname} />
            </div>
        </div>
    );
}
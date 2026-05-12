import { AuthView } from "@neondatabase/neon-js/auth/react";
import { useParams } from "react-router-dom";

export default function Auth() {
    const {pathname} = useParams();
    return (
        <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 flex items-center justify-center">
            <div className="w-full max-w-md mx-auto">
                <AuthView path={pathname} />
            </div>
        </div>
    );
}
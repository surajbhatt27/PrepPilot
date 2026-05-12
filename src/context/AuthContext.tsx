/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from "react";

import type { PrepPlan, User, UserProfile } from "../types";
import { authClient } from "../lib/auth";
import { api } from "../lib/api";

interface AuthContextType {
    user: User | null;
    roadmap: PrepPlan | null;
    isLoading: boolean;
    saveProfile: (
        profile: Omit<UserProfile, "userId" | "updatedAt">,
    ) => Promise<void>;
    generatePlan: () => Promise<void>;
    refreshData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({
    children,
}: {
  children: ReactNode;
}) {
    const [neonUser, setNeonUser] = useState<any>(null);
    const [roadmap, setRoadmap] = useState<PrepPlan | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const isRefreshingRef = useRef(false);

    const refreshData = useCallback(
        async (userId?: string) => {
        const activeUserId = userId || neonUser?.id;

        if (!activeUserId || isRefreshingRef.current)
            return;

        isRefreshingRef.current = true;

        try {
            const roadmapData =
            await api
                .getCurrentPlan(activeUserId)
                .catch(() => null);

            if (roadmapData) {
            setRoadmap({
                id: roadmapData.id,

                userId: roadmapData.userId,

                overview:
                roadmapData.roadmapJson.overview,

                weeklySchedule:
                roadmapData.roadmapJson
                    .weeklySchedule,

                strategy:
                roadmapData.roadmapJson.strategy,

                version: roadmapData.version,

                createdAt:
                roadmapData.createdAt,
            });
            } else {
            setRoadmap(null);
            }
        } catch (error) {
            console.error(
            "Error refreshing data:",
            error,
            );
        } finally {
            isRefreshingRef.current = false;
        }
        },
        [neonUser?.id],
    );

    useEffect(() => {
        async function loadUser() {
        try {
            const result =
            await authClient.getSession();

            if (result && result.data?.user) {
            setNeonUser(result.data.user);

            await refreshData(
                result.data.user.id,
            );
            } else {
            setNeonUser(null);

            setRoadmap(null);
            }
        } catch (err) {
            setNeonUser(null);

            setRoadmap(null);

            console.error(err);
        } finally {
            setIsLoading(false);
        }
        }

        loadUser();
    }, [refreshData]);

    async function saveProfile(
        profileData: Omit<
        UserProfile,
        "userId" | "updatedAt"
        >,
    ) {
        if (!neonUser) {
        throw new Error(
            "User must be authenticated to save profile",
        );
        }

        await api.saveProfile(
        neonUser.id,
        profileData,
        );

        await refreshData();
    }

    async function generatePlan() {
        if (!neonUser) {
        throw new Error(
            "User must be authenticated to generate roadmap",
        );
        }

        await api.generatePlan(neonUser.id);

        await refreshData();
    }

    return (
        <AuthContext.Provider
        value={{
            user: neonUser,

            roadmap,

            isLoading,

            saveProfile,

            generatePlan,

            refreshData: async () => {
            await refreshData();
            },
        }}
        >
        {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
        "useAuth must be used within an AuthProvider",
        );
    }

    return context;
}
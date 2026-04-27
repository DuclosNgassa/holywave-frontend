import { useSSO } from "@clerk/clerk-expo";
import { useState } from "react";
import { Alert } from "react-native";
import * as Linking from "expo-linking";

export const useSocialAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { startSSOFlow } = useSSO();

    const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple") => {
        setIsLoading(true);
        try {
            const { createdSessionId, setActive } = await startSSOFlow({ strategy, redirectUrl: Linking.createURL("/") });
            if (createdSessionId && setActive) {
                await setActive({ session: createdSessionId })
            }

        } catch (error) {
            console.log("Error in social auth", error);
            const provider = strategy === "oauth_google" ? "Google" : "Apple";
            Alert.alert("Error", `Failed to sign im. [provider=${provider}. Plaese try again]`);
        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading, handleSocialAuth }
}
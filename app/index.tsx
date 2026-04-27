import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      // ✅ Explicit route (not group)
      router.replace("/(tabs)/home");
    } else {
      router.replace("/(auth)/sign-in");
    }
  }, [isLoaded, isSignedIn]);

  return null;
}

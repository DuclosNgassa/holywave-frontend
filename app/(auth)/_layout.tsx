import { Stack, useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import { useEffect } from 'react';

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth()

  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      router.replace("/(tabs)/home");
    }
  }, [isLoaded, isSignedIn]);

  return <Stack />
}
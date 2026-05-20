import { ClerkProvider } from '@clerk/clerk-expo'
import { Stack } from "expo-router";
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import SafeScreen from '@/components/SafeScreen';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/JetBrainsMono-Medium.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  const queryClient = new QueryClient();
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return (
  <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <SafeScreen>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="(auth)" />
            </Stack>
          </SafeScreen>
        </SafeAreaProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

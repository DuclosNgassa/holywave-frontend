import React, { useEffect } from 'react'
import { Tabs, useRouter } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuth } from '@clerk/clerk-expo'
import { COLORS } from '@/constants/colors'

const TabsLayout = () => {
    const insets = useSafeAreaInsets();

    const { isLoaded, isSignedIn } = useAuth();
    const router = useRouter();
  
    useEffect(() => {
      if (!isLoaded) return;
  
      if (isSignedIn) {
        // ✅ Explicit route (not group)
        //router.replace("/(tabs)/home");
      } else {
        router.replace("/(auth)/sign-in");
      }
    }, [isLoaded, isSignedIn]);
  
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                headerTitleStyle: {
                    color: COLORS.textSecondary,
                    fontWeight: "600",
                },
                headerShadowVisible:false,
                tabBarStyle: {
                    backgroundColor: COLORS.background,
                    borderTopWidth: 1,
                    borderTopColor: COLORS.border,
                    paddingTop: 5,
                    paddingBottom: insets.bottom,
                    height: 60 + insets.bottom,
                }
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name='home' size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="post"
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name='plus-circle' size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name='heart' size={size} color={color} />,
                }}
            />
        </Tabs>
    )
}

export default TabsLayout
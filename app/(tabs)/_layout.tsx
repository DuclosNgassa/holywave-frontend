import React, { useEffect } from 'react'
import { Tabs, useRouter } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuth } from '@clerk/clerk-expo'
import { COLORS } from '@/constants/colors'

import CustomTabBar from '@/components/CustomTabBar'

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
            tabBar={props => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen name="home" />
            <Tabs.Screen name="post" />
            <Tabs.Screen name="favorites" />
        </Tabs>
    )
}

export default TabsLayout
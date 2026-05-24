import { View, Text, Image, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native'
import React from 'react'
import styles from "../../assets/styles/login.styles"
import { useSocialAuth } from '@/hooks/useSocialAuth';
import { COLORS } from '@/constants/colors.js';

const SignIn = () => {
  const { handleSocialAuth, isLoading } = useSocialAuth();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Top Illustration Section */}
      <View style={styles.topSection}>
        <Image 
          source={require("../../assets/images/holywave-start-screen.png")}
          style={styles.illustrationImage}
          resizeMode='contain' 
        />
      </View>

      {/* Content Section with Rounded Card */}
      <View style={styles.contentSection}>
        <View>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome to HolyWave</Text>
            <Text style={styles.subtitle}>Discover and share inspiring events within your community</Text>
          </View>

          <View style={styles.buttonContainer}>
            {/* Google Sign In */}
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialAuth("oauth_google")}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator color={COLORS.primary} />
              ) : (
                <View style={styles.socialButtonContent}>
                  <Image 
                    source={require("../../assets/images/google.png")}
                    style={styles.socialIcon}
                    resizeMode='contain'
                  />
                  <Text style={styles.socialButtonText}>Continue with Google</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Apple Sign In */}
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialAuth("oauth_apple")}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator color={COLORS.primary} />
              ) : (
                <View style={styles.socialButtonContent}>
                  <Image 
                    source={require("../../assets/images/apple.png")}
                    style={styles.socialIcon}
                    resizeMode='contain'
                  />
                  <Text style={styles.socialButtonText}>Continue with Apple</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer Legal Info */}
        <Text style={styles.footerText}>
          By continuing, you agree to our{" "}
          <Text style={styles.link}>Terms of Service</Text>
          {" and "}
          <Text style={styles.link}>Privacy Policy</Text>.
        </Text>
      </View>
    </View>
  )
}

export default SignIn

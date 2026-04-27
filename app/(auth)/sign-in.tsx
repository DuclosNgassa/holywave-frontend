import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from "../../assets/styles/login.styles.js"
import { useSocialAuth } from '@/hooks/useSocialAuth';
import { COLORS } from '@/constants/colors.js';

const SignIn = () => {

  const { handleSocialAuth, isLoading } = useSocialAuth();

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ justifyContent: 'space-between', flex: 1, paddingLeft: 24, paddingRight: 24 }}>
        <View style={styles.container}>
          <View style={styles.topIllustration}>
            <Image source={require("../../assets/images/auth1.png")}
              style={styles.illustrationImage}
              resizeMode='contain' />
          </View>
          <View style={styles.formLogin}>
            <TouchableOpacity
              style={styles.buttonLogin}
              onPress={() => handleSocialAuth("oauth_google")}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color={COLORS.black} />
              ) : (
                <View style={styles.buttonLoginContent}>
                  <Image source={require("../../assets/images/google.png")}
                    style={styles.buttonLoginIcon}
                    resizeMode='contain'
                  />
                  <Text>Sign in with google</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonLogin}
              onPress={() => handleSocialAuth("oauth_apple")}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color={COLORS.black} />
              ) : (
                <View style={styles.buttonLoginContent}>
                  <Image source={require("../../assets/images/apple.png")}
                    style={styles.buttonLoginIconApple}
                    resizeMode='contain'
                  />
                  <Text>Sign in with apple</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.footerText}>
            By signing up, you agree to our{" "}
            <Text style={styles.link}>Terms</Text>
            {", "}
            <Text style={styles.link}>Privacy Policy</Text>
            {", and "}
            <Text style={styles.link}>Cookie Use</Text>.
          </Text>
        </View>
      </View>
    </View>
  )
}

export default SignIn
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import styles from "../assets/styles/profile.styles";
import { useSignOut } from '@/hooks/useSignOut';
import { COLORS } from '@/constants/colors';

const SignOutButton = () => {

    const { handleSignOut } = useSignOut();
    return (
        <TouchableOpacity onPress={handleSignOut}>
            <Feather name='log-out' size={20} color={COLORS.white} />
        </TouchableOpacity>
    )
}

export default SignOutButton
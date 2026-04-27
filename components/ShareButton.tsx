import { Alert, StyleProp, TouchableOpacity, View, ViewStyle, Share } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { COLORS } from '@/constants/colors';
import * as Sharing from 'expo-sharing';
// Import the legacy API to avoid SDK 54+ deprecation crash
import * as FileSystem from 'expo-file-system/legacy';

interface ShareButtonProps {
    title: string;
    message: string;
    url: string;
    style?: StyleProp<ViewStyle>;
}

const ShareButton = ({
    title,
    message, // Text to share
    url,        // Image URI (can be remote or local file path)
    style,
}: ShareButtonProps) => {

    const shareImageAndText = async () => {
        try {
            const localUri = FileSystem.documentDirectory + title + '.jpg';

            // Step 1: Download image to local storage
            await FileSystem.downloadAsync(url, localUri);

            // Step 2: Check if sharing is available
            const available = await Sharing.isAvailableAsync();
            if (!available) {
                Alert.alert('Sharing not available', 'This device does not support sharing.');
                return;
            }

            // Step 3: Share the image
            await Sharing.shareAsync(localUri, {
                dialogTitle: message,
                mimeType: 'image/jpeg',
            });

        } catch (error) {
            console.error('Error sharing:', error);
            Alert.alert('Error', 'Something went wrong while sharing.');
        }
    };

    return (
        <TouchableOpacity onPress={shareImageAndText}>
            <View style={style}>
                <Feather name="share-2" size={18} color={COLORS.white} />
            </View>
        </TouchableOpacity>
    )
}

export default ShareButton
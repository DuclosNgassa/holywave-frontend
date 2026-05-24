import { Alert, StyleProp, TouchableOpacity, View, ViewStyle, Share as RNShare } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { COLORS } from '@/constants/colors';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

interface ShareButtonProps {
    title: string;
    text?: string;
    message?: string;
    url: string; // Remote image URL
    style?: StyleProp<ViewStyle>;
}

const getSafeFilename = (title: string) => {
    const safeTitle = title.replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    return `${safeTitle || 'post-image'}.jpg`;
};

const ShareButton = ({
    title,
    text,
    message,
    url,
    style,
}: ShareButtonProps) => {

    const shareEvent = async () => {
        try {
            const shareText = text ?? message ?? `Check out this awesome event: ${title}`;
            
            // Step 1: Check if sharing is available on the device
            const isAvailable = await Sharing.isAvailableAsync();

            if (!isAvailable) {
                // Fallback to basic text sharing if file sharing isn't available
                await RNShare.share({
                    title,
                    message: `${shareText}\n\n${url}`,
                });
                return;
            }

            // Step 2: Download the image to a local temporary file
            const localUri = `${FileSystem.cacheDirectory}${getSafeFilename(title)}`;
            
            // Check if file already exists to avoid redundant downloads
            const fileInfo = await FileSystem.getInfoAsync(localUri);
            let finalUri = localUri;

            if (!fileInfo.exists) {
                const downloadedImage = await FileSystem.downloadAsync(url, localUri);
                finalUri = downloadedImage.uri;
            }

            // Step 3: Share the local file using Expo Sharing
            // Note: Most apps will accept the text content alongside the file
            await Sharing.shareAsync(finalUri, {
                dialogTitle: title,
                mimeType: 'image/jpeg',
                UTI: 'public.jpeg', // for iOS
            });

        } catch (error) {
            console.error('Error sharing:', error);
            // Final fallback: Basic text share
            try {
                await RNShare.share({
                    message: `${title}\n${url}`,
                });
            } catch (innerError) {
                Alert.alert('Error', 'Unable to share this event.');
            }
        }
    };

    return (
        <TouchableOpacity onPress={shareEvent}>
            <View style={style}>
                <Feather name="share-2" size={18} color={COLORS.primary} />
            </View>
        </TouchableOpacity>
    )
}

export default ShareButton;

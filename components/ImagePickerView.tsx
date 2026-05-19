import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import type { GestureResponderEvent } from 'react-native';

import styles from '@/assets/styles/post.styles';
import { COLORS } from '@/constants/colors';
import { IMAGE_RESIZE_OPTIONS, ImageResizeOption } from '@/utils/imageUpload';

interface ImagePickerViewProps {
    imageUri?: string;
    onPickImage: () => void;
    onRemoveImage?: () => void;
    resizeOption?: ImageResizeOption;
    onResizeOptionChange?: (resizeOption: ImageResizeOption) => void;
}

const ImagePickerView = ({
    imageUri,
    onPickImage,
    onRemoveImage,
    resizeOption,
    onResizeOptionChange,
}: ImagePickerViewProps) => {
    const handleRemoveImage = (event: GestureResponderEvent) => {
        event.stopPropagation();
        onRemoveImage?.();
    };

    return (
        <View style={styles.imagePickerBlock}>
            <TouchableOpacity style={styles.imagePicker} onPress={onPickImage} activeOpacity={0.9}>
                {imageUri ? (
                    <View style={styles.previewImageContainer}>
                        <Image source={{ uri: imageUri }} style={styles.previewImage} resizeMode='contain' />
                        {onRemoveImage && (
                            <TouchableOpacity
                                style={styles.removeImageButton}
                                onPress={handleRemoveImage}
                                accessibilityRole='button'
                                accessibilityLabel='Remove selected image'
                            >
                                <Feather name='x' size={18} color={COLORS.white} />
                            </TouchableOpacity>
                        )}
                    </View>
                ) : (
                    <View style={styles.placeholderContainer}>
                        <Feather name='image' size={40} color={COLORS.textSecondary} />
                        <Text style={styles.placeholderText}>Tap to select an image</Text>
                    </View>
                )}
            </TouchableOpacity>
            {imageUri && resizeOption && onResizeOptionChange && (
                <View style={styles.imageResizeControls}>
                    {IMAGE_RESIZE_OPTIONS.map((option) => {
                        const isSelected = option.value === resizeOption;

                        return (
                            <TouchableOpacity
                                key={option.value}
                                style={[styles.imageResizeOption, isSelected && styles.imageResizeOptionSelected]}
                                onPress={() => onResizeOptionChange(option.value)}
                                accessibilityRole='button'
                                accessibilityState={{ selected: isSelected }}
                            >
                                <Text style={[styles.imageResizeOptionText, isSelected && styles.imageResizeOptionTextSelected]}>
                                    {option.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            )}
        </View>
    );
};

export default ImagePickerView;

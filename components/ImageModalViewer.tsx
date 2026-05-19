import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

import { COLORS } from '@/constants/colors';

interface ImageModalViewerProps {
    visible: boolean;
    uri?: string;
    onClose: () => void;
    maxZoom?: number;
}

const ImageModalViewer = ({ visible, uri, onClose, maxZoom = 4 }: ImageModalViewerProps) => {
    const { width, height } = useWindowDimensions();
    const [imageZoom, setImageZoom] = useState(1);

    useEffect(() => {
        if (visible) {
            setImageZoom(1);
        }
    }, [visible, uri]);

    const handleClose = () => {
        setImageZoom(1);
        onClose();
    };

    const zoomOut = () => {
        setImageZoom((value) => Math.max(1, Number((value - 0.5).toFixed(1))));
    };

    const zoomIn = () => {
        setImageZoom((value) => Math.min(maxZoom, Number((value + 0.5).toFixed(1))));
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType='fade'
            onRequestClose={handleClose}
        >
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={handleClose}
                    accessibilityRole='button'
                    accessibilityLabel='Close image'
                >
                    <Feather name='x' size={26} color={COLORS.white} />
                </TouchableOpacity>

                {uri && (
                    <ScrollView
                        style={styles.scroll}
                        contentContainerStyle={[
                            styles.horizontalContent,
                            { width: width * imageZoom },
                        ]}
                        horizontal
                        nestedScrollEnabled
                        showsHorizontalScrollIndicator={false}
                    >
                        <ScrollView
                            style={{ width: width * imageZoom }}
                            contentContainerStyle={[
                                styles.imageContent,
                                {
                                    width: width * imageZoom,
                                    height: height * imageZoom,
                                },
                            ]}
                            maximumZoomScale={maxZoom}
                            minimumZoomScale={1}
                            pinchGestureEnabled
                            centerContent
                            bouncesZoom
                            nestedScrollEnabled
                            showsVerticalScrollIndicator={false}
                        >
                            <Image
                                source={{ uri }}
                                style={styles.image}
                                contentFit='contain'
                            />
                        </ScrollView>
                    </ScrollView>
                )}

                <View style={styles.controls}>
                    <TouchableOpacity
                        style={[styles.controlButton, imageZoom === 1 && styles.controlButtonDisabled]}
                        onPress={zoomOut}
                        disabled={imageZoom === 1}
                        accessibilityRole='button'
                        accessibilityLabel='Zoom out'
                    >
                        <Feather name='minus' size={20} color={COLORS.white} />
                    </TouchableOpacity>
                    <Text style={styles.zoomText}>{Math.round(imageZoom * 100)}%</Text>
                    <TouchableOpacity
                        style={[styles.controlButton, imageZoom === maxZoom && styles.controlButtonDisabled]}
                        onPress={zoomIn}
                        disabled={imageZoom === maxZoom}
                        accessibilityRole='button'
                        accessibilityLabel='Zoom in'
                    >
                        <Feather name='plus' size={20} color={COLORS.white} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.96)',
    },
    scroll: {
        flex: 1,
    },
    horizontalContent: {
        alignItems: 'center',
    },
    imageContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    closeButton: {
        position: 'absolute',
        top: 48,
        right: 16,
        zIndex: 2,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    controls: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 34,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
    },
    controlButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlButtonDisabled: {
        backgroundColor: COLORS.slateGrey,
        opacity: 0.6,
    },
    zoomText: {
        minWidth: 54,
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
    },
});

export default ImageModalViewer;

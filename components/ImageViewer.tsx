import React from 'react'
import { Image } from "expo-image";
import { ScrollView, View } from 'react-native';

interface ImageViewerProps {
    uri: string;
}

const ImageViewer = ({ uri }: ImageViewerProps) => {

    return (
        <ScrollView
            maximumZoomScale={4}
            minimumZoomScale={1}
            pinchGestureEnabled
            centerContent
            bouncesZoom
        >
            <View style={{ width: '100%', height: '100%' }}>
                <Image source={{ uri }} style={{ width: '100%', height: '100%' }} contentFit='contain' />
            </View>
        </ScrollView>
    );
}

export default ImageViewer

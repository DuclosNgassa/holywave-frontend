import { View, Text, TouchableOpacity, ScrollView, Dimensions, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { nearbyCardStyles } from "@/assets/styles/home.styles";
import { ImageSize } from "@/app/models/types";
import { getOptimizedImage } from "@/utils/helper";
import { FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";
import React, { useState } from "react";

const { width } = Dimensions.get("window");

const NearByEvent = ({ events, onSelectEvent, onSelectCategory }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const onScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / (width * 0.85 + 16));
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    };

    const renderNearbyItem = ({ item }) => (
        <TouchableOpacity
            style={nearbyCardStyles.container}
            onPress={() => onSelectEvent(item.id)}
            activeOpacity={0.9}
            key={item.id}
        >
            {item.image && (
                <View style={nearbyCardStyles.imageContainer}>
                    <Image
                        source={{ uri: getOptimizedImage(item.image, ImageSize.Medium) }}
                        style={nearbyCardStyles.image}
                        contentFit="cover"
                        transition={300}
                    />
                </View>
            )}

            <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.9)"]}
                style={nearbyCardStyles.gradientOverlay}
            />

            <View style={nearbyCardStyles.cardContent}>
                <View style={nearbyCardStyles.categoryBadge}>
                    <Text style={nearbyCardStyles.categoryText}>
                        {item.categories && item.categories.length > 0 ? item.categories[0].name : "Event"}
                    </Text>
                </View>

                <View style={nearbyCardStyles.bottomInfo}>
                    <View style={nearbyCardStyles.metaRow}>
                        <Text style={nearbyCardStyles.authorName}>{item.author || "HolyWave"}</Text>
                        <MaterialCommunityIcons name="check-circle" size={14} color="#1DA1F2" />
                        <Text style={nearbyCardStyles.bullet}>•</Text>
                        <Text style={nearbyCardStyles.timeText}>Trending</Text>
                    </View>
                    <Text style={nearbyCardStyles.title} numberOfLines={2}>
                        {item.title}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ marginBottom: 20 }}>
            <View style={nearbyCardStyles.nearbySectionHeader}>
                <Text style={nearbyCardStyles.sectionTitle}>Nearby Events</Text>
            </View>

            <FlatList
                horizontal
                data={events}
                renderItem={renderNearbyItem}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                snapToInterval={width * 0.85 + 16}
                decelerationRate="fast"
                onScroll={onScroll}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingHorizontal: 8 }}
            />

            <View style={nearbyCardStyles.paginationContainer}>
                {events.slice(0, 5).map((_, index) => (
                    <View
                        key={index}
                        style={[
                            nearbyCardStyles.paginationDot,
                            index === activeIndex % 5 && nearbyCardStyles.paginationDotActive
                        ]}
                    />
                ))}
            </View>
        </View>
    );
}

export default NearByEvent
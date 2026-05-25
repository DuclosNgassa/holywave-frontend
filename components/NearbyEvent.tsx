import { View, Text, TouchableOpacity, Dimensions, type NativeScrollEvent, type NativeSyntheticEvent } from "react-native";
import { Image } from "expo-image";
import homeStyles, {nearbyCardStyles, recipeCardStyles} from "@/assets/styles/home.styles";
import { ImageSize } from "@/app/models/types";
import { getOptimizedImage } from "@/utils/helper";
import { FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import type { Post } from "@/app/models/post";
import ShareButton from "@/components/ShareButton";

const { width } = Dimensions.get("window");

type NearByEventProps = {
    events: Post[];
    onSelectEvent: (eventId: string) => void;
    onSelectCategory?: (categoryId: string, categoryName: string) => void;
};

const NearByEvent = ({ events, onSelectEvent }: NearByEventProps) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const getCategoryName = (event: Post) => {
        const [category] = event.categories ?? [];
        return typeof category === "string" ? category : category?.name ?? "Event";
    };

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / (width * 0.85 + 16));
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    };

    const renderNearbyItem = ({ item }: { item: Post }) => (
        <TouchableOpacity
            style={nearbyCardStyles.container}
            onPress={() => item.id && onSelectEvent(item.id)}
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
                        {getCategoryName(item)}
                    </Text>
                </View>

                <View style={nearbyCardStyles.bottomInfo}>

                    <View style={recipeCardStyles.footer}>
                        <View style={recipeCardStyles.feeContainer}>
                            <Text style={nearbyCardStyles.title} numberOfLines={2}>
                                {item.title}
                            </Text>
                        </View>

                        <View style={recipeCardStyles.actionsRow}>
                            <View style={homeStyles.featuredBadge}>
                            <View style={recipeCardStyles.feeContainer}>
                                <Text style={recipeCardStyles.feeText}>{item.fee ? `$${item.fee}` : 'FREE'}</Text>
                            </View>
                            </View>
                            <View style={homeStyles.featuredBadge}>

                            <ShareButton
                                title={item.title}
                                text='Check out this awesome event'
                                url={item.image}
                                style={recipeCardStyles.actionIcon}
                            />
                        </View>
                        </View>
                    </View>
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
                keyExtractor={(item) => item.id?.toString() ?? item.title}
                showsHorizontalScrollIndicator={false}
                snapToInterval={width * 0.85 + 16}
                decelerationRate="fast"
                onScroll={onScroll}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingHorizontal: 8 }}
            />

            <View style={nearbyCardStyles.paginationContainer}>
                {events.slice(0, 5).map((_, index: number) => (
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

import { View, Text, TouchableOpacity, ScrollView, Dimensions, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { nearbyCardStyles } from "@/assets/styles/home.styles";
import { ImageSize } from "@/app/models/types";
import { getOptimizedImage } from "@/utils/helper";
import { FlatList } from "react-native";


const NearByEvent = ({ events, onSelectEvent, onSelectCategory }) => {

    const renderNearbyItem = ({ item }) => (

        <View
            style={[nearbyCardStyles.container, { minWidth: 80 }]}
            key={item.id}>
            <TouchableOpacity
                onPress={() => onSelectEvent(item.id)}
                activeOpacity={0.7}>
                {item.image && (
                    <View style={nearbyCardStyles.imageContainer}>
                        <Image
                            source={{ uri: getOptimizedImage(item.image, ImageSize.Small) }}
                            style={nearbyCardStyles.image}
                            contentFit="cover"
                            transition={300}
                            recyclingKey={item.id}
                            allowDownscaling={true}
                        />
                    </View>
                )}

                {item.address && (
                    <Text style={nearbyCardStyles.address}>
                        {item.address.city}-{item.address.state}-{item.address.country}
                    </Text>
                )}
                <Text style={nearbyCardStyles.title} numberOfLines={1}>
                    {item.title}
                </Text>

            </TouchableOpacity>
        </View>
    );

    return (
        <View>
            <View style={nearbyCardStyles.nearbySectionHeader}>
                <Text style={nearbyCardStyles.sectionTitle}>Near by events</Text>
            </View>

            <FlatList
                horizontal
                data={events}
                renderItem={renderNearbyItem}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                removeClippedSubviews
                initialNumToRender={5}
                maxToRenderPerBatch={5}
                windowSize={5}
            />

        </View>
    );
}

export default NearByEvent
import { View, Text, TouchableOpacity, ScrollView, Dimensions, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { nearbyCardStyles } from "@/assets/styles/home.styles";

//const { width } = Dimensions.get('window');

const NearByEvent = ({ events, onSelectEvent, onSelectCategory }) => {

    return (
        <View>
            <View style={nearbyCardStyles.nearbySectionHeader}>
                <Text style={nearbyCardStyles.sectionTitle}>Near by events</Text>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View style={nearbyCardStyles.scrollContainer}>
                    {events.map((event) => {
                        return (
                            <View
                                style={[nearbyCardStyles.container, { minWidth: 80 }]}
                                key={event.id}>
                                <TouchableOpacity
                                    onPress={() => onSelectEvent(event.id)}
                                    activeOpacity={0.7}>
                                    <View style={nearbyCardStyles.imageContainer}>
                                        <Image
                                            source={{ uri: event.image }}
                                            style={nearbyCardStyles.image}
                                            contentFit="cover"
                                            transition={300}
                                        />
                                    </View>
                                    {event.address && (
                                        <Text style={nearbyCardStyles.address}>
                                            {event.address.city}-{event.address.state}-{event.address.country}
                                        </Text>
                                    )}
                                    <Text style={nearbyCardStyles.title} numberOfLines={1}>
                                        {event.title}
                                    </Text>

                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
}

export default NearByEvent
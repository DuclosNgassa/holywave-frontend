import styles from "@/assets/styles/favorite.styles";
import { Image } from "expo-image";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { formattedLocation, sortAscAndFormatDates } from "@/utils/formatters";
import ShareButton from "./ShareButton";



export type FavoriteProps = {
    post: any;
    onRemove: (postId: string) => void;
    showDetail: (postId: string) => void;
};


const FavoriteCard: React.FC<FavoriteProps> = ({ post, onRemove, showDetail }) => {

    return (
        <View style={styles.card}>
            <View style={styles.containerCard}>
                <View style={styles.imageContainer}>

                    <TouchableOpacity
                        onPress={() => showDetail(post.id)}
                        activeOpacity={0.8}
                    >
                        <Image
                            source={{ uri: post.image }}
                            style={styles.image}
                            contentFit="cover"
                            transition={300}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.textContainerFavorit}>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={styles.cardHeader}>
                            <View style={styles.headerText}>
                                {post.address && (
                                    <Text style={styles.address}>
                                        {post.address.city}-{post.address.state}-{post.address.country}
                                    </Text>
                                )}
                            </View>
                            <View>
                                <ShareButton
                                    title={post.title}
                                    message='Check out this awesome event'
                                    url={post.image}
                                    style={styles.shareButton}
                                />
                            </View>
                            <View style={{ width: 10 }} />
                            <View>
                                <TouchableOpacity onPress={() => onRemove(post.id)}>
                                    <FontAwesome6 name="trash" size={18} style={styles.favoritDeleteButton} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.cardTitle}>
                            <Text style={styles.title}>
                                {post.title}
                            </Text>
                            {post.eventDates && sortAscAndFormatDates(post.eventDates).map((item, index) => (
                                <Text key={index} style={styles.text}>{item.date} - {item.time} </Text>))
                            }
                        </View>
                    </View>

                    <View style={styles.footerFavorit}>
                        <View style={styles.locationRow}>
                            <View style={styles.badge}>
                                <Text style={styles.text}>
                                    {formattedLocation(post.location)}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.actionContainer}>
                            {post.fee ? (
                                <Text style={styles.feeText}>${post.fee}</Text>
                            ) : (
                                <Text style={styles.feeText}>FREE</Text>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default FavoriteCard;
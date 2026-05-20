import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Image } from "expo-image";
import { COLORS } from '@/constants/colors';
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { getOptimizedImage } from '@/utils/helper';
import { ImageSize } from '@/app/models/types';
import styles from '@/assets/styles/card.styles';

interface HorizontalPostCardProps {
    post: any;
    onPrimaryAction: (postId: string) => void;
    onSecondaryAction?: (postId: string) => void;
    onSelect: (postId: string) => void;
    primaryIcon: "heart" | "bookmark" | "pencil";
    isPrimaryActive?: boolean;
    showDelete?: boolean;
    onDelete?: (postId: string) => void;
}

const HorizontalPostCard = ({
    post,
    onPrimaryAction,
    onSecondaryAction,
    onSelect,
    primaryIcon,
    isPrimaryActive,
    showDelete,
    onDelete
}: HorizontalPostCardProps) => {

    const imageUri = getOptimizedImage(post.image, ImageSize.Small);

    const renderPrimaryIcon = () => {
        switch (primaryIcon) {
            case "heart":
                return <AntDesign name={isPrimaryActive ? "heart" : "hearto"} size={18} color={isPrimaryActive ? COLORS.favoritLiked : COLORS.textLight} />;
            case "bookmark":
                return <MaterialCommunityIcons name={isPrimaryActive ? "bookmark" : "bookmark-outline"} size={20} color={isPrimaryActive ? COLORS.primary : COLORS.textLight} />;
            case "pencil":
                return <Feather name="edit-3" size={18} color={COLORS.primary} />;
            default:
                return null;
        }
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onSelect(post.id)}
            activeOpacity={0.8}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: imageUri }}
                    style={styles.image}
                    contentFit="cover"
                    transition={200}
                />
            </View>

            <View style={styles.content}>
                {post.categories && post.categories.length > 0 && (
                    <Text style={styles.categoryText}>{post.categories[0].name}</Text>
                )}

                <Text style={styles.title} numberOfLines={2}>{post.title}</Text>

                <View style={styles.metaRow}>
                    <Text style={styles.dateText}>Feb 27, 2023</Text>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.priceText}>{post.fee ? `$${post.fee}` : 'FREE'}</Text>

                    <View style={styles.actionsRow}>
                        <TouchableOpacity 
                            onPress={() => onPrimaryAction(post.id)} 
                            style={styles.actionIcon}
                        >
                            {renderPrimaryIcon()}
                        </TouchableOpacity>

                        {showDelete && onDelete && (
                            <TouchableOpacity 
                                onPress={() => onDelete(post.id)} 
                                style={styles.actionIcon}
                            >
                                <Feather name="trash-2" size={18} color={COLORS.red} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default HorizontalPostCard;

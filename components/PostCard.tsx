import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '@/constants/colors'
import { recipeCardStyles } from "@/assets/styles/home.styles";
import { AntDesign, Feather } from '@expo/vector-icons';
import { Image } from "expo-image";
import { formatNumber } from '@/utils/formatters';
import ShareButton from './ShareButton';
import { getOptimizedImage } from '@/utils/helper';
import { ImageSize } from '@/app/models/types';

interface PostCardProps {
    post: any;
    onLike: (postId: string) => void;
    onSelectEvent: (postId: string) => void;
    isLiked?: boolean;
    imageSize: ImageSize;
}

const PostCard = ({ onLike, onSelectEvent, post, isLiked, imageSize }: PostCardProps) => {

    const newUri = getOptimizedImage(post.image, imageSize);

    return (
        <TouchableOpacity
            style={recipeCardStyles.container}
            onPress={() => onSelectEvent(post.id)}
            activeOpacity={0.8}
        >
            {post.image && (
                <View style={recipeCardStyles.imageContainer}>
                    <Image
                        source={{ uri: newUri }}
                        style={recipeCardStyles.image}
                        contentFit="cover"
                        transition={300}
                    />
                </View>
            )}

            <View style={recipeCardStyles.content}>
                {post.categories && post.categories.length > 0 && (
                    <Text style={recipeCardStyles.categoryText}>
                        {post.categories[0].name}
                    </Text>
                )}

                <Text style={recipeCardStyles.title} numberOfLines={2}>
                    {post.title}
                </Text>

                <View style={recipeCardStyles.metaRow}>
                    <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }} // Placeholder
                        style={recipeCardStyles.authorAvatar}
                    />
                    <Text style={recipeCardStyles.authorName}>{post.author || 'HolyWave'}</Text>
                    <Text style={recipeCardStyles.dot}>•</Text>
                    <Text style={recipeCardStyles.dateText}>Feb 27, 2023</Text>
                </View>

                <View style={recipeCardStyles.footer}>
                    <View style={recipeCardStyles.feeContainer}>
                        <Text style={recipeCardStyles.feeText}>{post.fee ? `$${post.fee}` : 'FREE'}</Text>
                    </View>

                    <View style={recipeCardStyles.actionsRow}>
                        <TouchableOpacity onPress={() => onLike(post.id)} style={recipeCardStyles.actionIcon}>
                            {isLiked ? (
                                <AntDesign name="heart" size={16} color={COLORS.favoritLiked} />
                            ) : (
                                <Feather name="heart" size={16} color={COLORS.favorit} />
                            )}
                            <Text style={recipeCardStyles.actionText}>{formatNumber(post.numberOfLikes || 0)}</Text>
                        </TouchableOpacity>

                        <ShareButton
                            title={post.title}
                            text='Check out this awesome event'
                            url={post.image}
                            style={recipeCardStyles.actionIcon}
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default PostCard
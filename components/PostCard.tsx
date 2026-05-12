import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '@/constants/colors'
import { recipeCardStyles } from "../assets/styles/home.styles";
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
    console.log("New Uri: ", newUri);

    return (
        <View style={recipeCardStyles.container}
        >
            <TouchableOpacity
                onPress={() => onSelectEvent(post.id)}
                activeOpacity={0.8}
            >
                {post.image && (<View style={recipeCardStyles.imageContainer}>
                    <Image
                        source={{ uri: newUri }}
                        style={recipeCardStyles.image}
                        contentFit="cover"
                        transition={300}
                        recyclingKey={post.id}
                        allowDownscaling={true}
                    />
                </View>)}
            </TouchableOpacity>

            <View style={recipeCardStyles.content}>
                {post.address && (
                    <Text style={recipeCardStyles.address}>
                        {post.address.city}-{post.address.state}-{post.address.country}
                    </Text>
                )}
                <Text style={recipeCardStyles.title} numberOfLines={2}>
                    {post.title}
                </Text>

                <View style={recipeCardStyles.footer}>
                    <View style={recipeCardStyles.feeContainer}>
                        <Feather name="dollar-sign" size={14} color={COLORS.textLight} />
                        <Text style={recipeCardStyles.feeText}>{post.fee ? post.fee : 'FREE'}</Text>
                    </View>
                    <View style={recipeCardStyles.feeContainer}>
                        <TouchableOpacity onPress={() => onLike(post.id)}>
                            <View style={recipeCardStyles.footerIconContainer}>
                                {isLiked ? (
                                    <AntDesign name="heart" size={18} color={COLORS.favoritLiked} />
                                ) : (
                                    <Feather name="heart" size={18} color={COLORS.favorit} />
                                )}
                                <Text style={recipeCardStyles.favoritIconText}>{formatNumber(post.numberOfLikes || 0)}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ width: 10 }} />
                        <ShareButton
                            title={post.title}
                            message='Check out this awesome event'
                            url={post.image}
                            style={recipeCardStyles.footerIconContainer}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

export default PostCard
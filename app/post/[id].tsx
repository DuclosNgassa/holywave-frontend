import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import LoadingSpinner from '@/components/LoadingSpinner';
import styles from '@/assets/styles/detail.styles';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
import { formattedFrequency, formattedLocation, sortAscAndFormatDates } from '@/utils/formatters';
import { useFocusEffect } from '@react-navigation/native';
import { usePost } from '@/hooks/usePost';
import { getOptimizedImage } from '@/utils/helper';
import { ImageSize } from '../models/types';
import ImageModalViewer from '@/components/ImageModalViewer';
import type { PostCategory } from '../models/post';

const PostDetailScreen = () => {
    const router = useRouter();

    const { id } = useLocalSearchParams();
    const postId = Array.isArray(id) ? id[0] : id;
    const { userId } = useAuth();
    const [isImageModalVisible, setIsImageModalVisible] = useState(false);

    const { post, isLoadingPost, errorPost, refetchPost, toggleBookmark } = usePost({ postId });

    useFocusEffect(
        useCallback(() => {
            refetchPost(); // Refetch data when the screen is focused
        }, [refetchPost])
    );

    const openImageModal = () => {
        setIsImageModalVisible(true);
    }

    const closeImageModal = () => {
        setIsImageModalVisible(false);
    }

    if (errorPost) {
        console.log(`Error while loading post. [postId=${postId}]`, errorPost)
        //TODO implement errorComponnennt
    }

    if (isLoadingPost) {
        return <LoadingSpinner message='Loading post detail...' />
    }

    const categoryNames = post.categories
        ?.map((category: PostCategory) => typeof category === "string" ? category : category.name)
        .join(' - ');

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        activeOpacity={0.95}
                        onPress={openImageModal}
                        style={styles.imageTapArea}
                    >
                        <Image
                            source={{ uri: getOptimizedImage(post.image, ImageSize.Small) }}
                            style={styles.headerImage}
                            contentFit='cover'
                        />
                    </TouchableOpacity>

                    <LinearGradient
                        colors={["transparent", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}
                        style={styles.gradientOverlay}
                        pointerEvents='none'
                    />

                    <View style={styles.floatingButtons}>
                        <TouchableOpacity
                            style={styles.floatingButton}
                            onPress={() => router.back()}
                        >
                            <Feather name='arrow-left' size={24} color={COLORS.white} />
                        </TouchableOpacity>

                        <View style={styles.rightButtons}>
                            {userId === post.userId &&
                                <TouchableOpacity
                                    style={styles.floatingButton}
                                    onPress={() => router.push(`/post/edit/${post.id}`)}
                                >
                                    <FontAwesome6
                                        name='pencil' size={18} color={COLORS.white}
                                    />
                                </TouchableOpacity>
                            }
                            <TouchableOpacity
                                style={styles.floatingButton}
                                onPress={() => postId && toggleBookmark(postId)}
                            >
                                <FontAwesome6
                                    name="bookmark"
                                    solid={post.bookmarked}
                                    size={18}
                                    color={post.bookmarked ? COLORS.primary : COLORS.white}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.titleSection}>
                        {post.categories && post.categories.length > 0 &&
                            <View style={styles.categoryBadge}>
                                <Text style={styles.categoryText}>
                                    {categoryNames}
                                </Text>
                            </View>
                        }
                        <Text style={styles.postTitle}>{post.title}</Text>
                        <Text style={styles.metaText}>Trending • 6 hours ago</Text>
                    </View>
                </View>

                <View style={styles.contentSection}>
                    {post.description && (
                        <Text style={styles.description}>{post.description}</Text>
                    )}

                    {/** EXTRA DETAILS */}
                    {post.location && (
                        <View style={styles.infoCard}>
                            <View style={styles.infoIconContainer}>
                                <FontAwesome6 name='location-dot' size={18} color={COLORS.white} />
                            </View>
                            <View style={styles.infoContent}>
                                <Text style={styles.infoLabel}>Location</Text>
                                <Text style={styles.infoValue}>{formattedLocation(post.location)}</Text>
                            </View>
                        </View>
                    )}

                    {post.frequency && (
                        <View style={styles.infoCard}>
                            <View style={styles.infoIconContainer}>
                                <Ionicons name="repeat" size={20} color={COLORS.white} />
                            </View>
                            <View style={styles.infoContent}>
                                <Text style={styles.infoLabel}>Frequency</Text>
                                <Text style={styles.infoValue}>
                                    {!post.frequency.daily && !post.frequency.weekly && !post.frequency.monthly && !post.frequency.yearly ?
                                        'Once' : formattedFrequency(post.frequency)
                                    }
                                </Text>
                            </View>
                        </View>
                    )}

                    {post.eventDates?.length > 0 && (
                        <View style={styles.infoCard}>
                            <View style={styles.infoIconContainer}>
                                <FontAwesome6 name='calendar' size={18} color={COLORS.white} />
                            </View>
                            <View style={styles.infoContent}>
                                <Text style={styles.infoLabel}>Dates</Text>
                                {sortAscAndFormatDates(post.eventDates).map((item, index) => (
                                    <Text key={index} style={styles.infoValue}>{item.date} - {item.time} </Text>))
                                }
                            </View>
                        </View>
                    )}

                    {post.address && (
                        <View style={styles.infoCard}>
                            <View style={styles.infoIconContainer}>
                                <FontAwesome6 name='map' size={18} color={COLORS.white} />
                            </View>
                            <View style={styles.infoContent}>
                                <Text style={styles.infoLabel}>Address</Text>
                                <Text style={styles.infoValue}>{post.address.street} {post.address.houseNumber}, {post.address.city}, {post.address.state} {post.address.country}</Text>
                            </View>
                        </View>
                    )}

                    {post.fee !== undefined && (
                        <View style={styles.infoCard}>
                            <View style={styles.infoIconContainer}>
                                <FontAwesome6 name='dollar-sign' size={18} color={COLORS.white} />
                            </View>
                            <View style={styles.infoContent}>
                                <Text style={styles.infoLabel}>Admission Fee</Text>
                                <Text style={styles.infoValue}>{post.fee ? `$${post.fee}` : 'FREE'}</Text>
                            </View>
                        </View>
                    )}

                    {(post.phone || post.email) && (
                        <View style={styles.infoCard}>
                            <View style={styles.infoIconContainer}>
                                <FontAwesome6 name='address-book' size={18} color={COLORS.white} />
                            </View>
                            <View style={styles.infoContent}>
                                <Text style={styles.infoLabel}>Contact</Text>
                                {post.phone && <Text style={styles.infoValue}>{post.phone}</Text>}
                                {post.email && <Text style={styles.infoValue}>{post.email}</Text>}
                            </View>
                        </View>
                    )}

                    {post.link && (
                        <View style={styles.infoCard}>
                            <View style={styles.infoIconContainer}>
                                <FontAwesome6 name='link' size={18} color={COLORS.white} />
                            </View>
                            <View style={styles.infoContent}>
                                <Text style={styles.infoLabel}>Online Link</Text>
                                <Text style={styles.infoValue}>{post.link}</Text>
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
            <ImageModalViewer
                visible={isImageModalVisible}
                uri={post.image}
                onClose={closeImageModal}
            />
        </View>
    )
}

export default PostDetailScreen

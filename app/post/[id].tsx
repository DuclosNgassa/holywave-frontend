import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import LoadingSpinner from '@/components/LoadingSpinner';
import styles from '@/assets/styles/detail.styles';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, Feather, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
import { formatNumber, formattedFrequency, formattedLocation, sortAscAndFormatDates } from '@/utils/formatters';
import { useFocusEffect } from '@react-navigation/native';
import { usePost } from '@/hooks/usePost';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import ShareButton from '@/components/ShareButton';
import { getOptimizedImage } from '@/utils/helper';
import { ImageSize } from '../models/types';

const PostDetailScreen = () => {
    const router = useRouter();
    const { currentUser } = useCurrentUser();

    const { id: postId } = useLocalSearchParams();
    const { userId } = useAuth();
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const { post, isLoadingPost, errorPost, refetchPost, toggleLike, toggleBookmark, checkIsLiked, checkIsBookmarked } = usePost({ postId });

    useFocusEffect(
        useCallback(() => {
            refetchPost(); // Refetch data when the screen is focused
        }, [refetchPost])
    );

    const handleBookmarkt = async (postId: string) => {
        setIsSaving(true);
        try {
            //TODO implement me
        } catch (error) {

        } finally {
            setIsSaving(false);
        }
    }

    if (errorPost) {
        console.log(`Error while loading post. [postId=${postId}]`, errorPost)
        //TODO implement errorComponnennt
    }

    if (isLoadingPost) {
        return <LoadingSpinner message='Loading post detail...' />
    }

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View>
                    {/**HEADER */}

                    {/** TODO  Check if post has image otherwise display default image */}
                    <View style={styles.headerContainer}>
                        <Image
                            source={{ uri: getOptimizedImage(post.image, ImageSize.Small) }}
                            style={styles.headerImage}
                            contentFit='cover'
                        />
                    </View>
                    <LinearGradient
                        colors={["transparent", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.9)"]}
                        style={styles.gradientOverlay}
                    />
                    <View style={styles.floatingButtons}>
                        <TouchableOpacity
                            style={styles.floatingButton}
                            onPress={() => router.back()}
                        >
                            <Feather
                                name='arrow-left' size={24} color={COLORS.white}
                            />
                        </TouchableOpacity>
                        {/** Only the ownner of the post can modify it */}
                        {userId === post.userId &&
                            <TouchableOpacity
                                style={[styles.floatingButton, { backgroundColor: isSaving ? COLORS.slateGrey : COLORS.primary }]}
                                onPress={() => router.push(`/post/edit/${post.id}`)}
                            >
                                <FontAwesome6
                                    name={isSaving ? 'hourglass-half' : 'pencil'} size={20} color={COLORS.white}
                                />
                            </TouchableOpacity>
                        }
                    </View>
                    {/**TITLE SECTION */}
                    <View style={styles.titleSection}>
                        {post.categories.length > 0 &&
                            <View style={styles.categoryBadge}>
                                <Text style={styles.categoryText}>{post.categories.map((category: any) => category.name).join(' - ')}</Text>
                            </View>
                        }
                        <View style={styles.titleSubSection}>
                            <View style={styles.titleSubSectionContentLeft}>
                                <Text style={styles.recipeTitle}>{post.title}</Text>
                            </View>
                            <View style={styles.titleSubSectionContentRight}>
                                <View>
                                    <TouchableOpacity onPress={() => toggleBookmark(postId)}>
                                        <LinearGradient
                                            colors={["#2A7B9B", "#57C785"]}
                                            style={styles.statIconContainer}
                                        >
                                            {post.bookmarked ? (
                                                <FontAwesome6 name="bookmark" solid size={18} color={COLORS.favoritLiked} />
                                            ) : (
                                                <FontAwesome6 name="bookmark" regular size={18} color={COLORS.white} />
                                            )}
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity style={{ marginLeft: 8 }} onPress={() => toggleLike(postId)}>
                                        <LinearGradient
                                            colors={["#2A7B9B", "#57C785"]}
                                            style={styles.statIconContainer}
                                        >
                                            {post.liked ? (
                                                <AntDesign name="heart" size={18} color={COLORS.favoritLiked} />
                                            ) : (
                                                <Feather name="heart" size={18} color={COLORS.favorit} />
                                            )}
                                            <Text style={[styles.statValue, { color: COLORS.white, paddingLeft: 5 }]}>{formatNumber(post.numberOfLikes)}</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <View style={{ marginLeft: 8 }}>
                                        <LinearGradient
                                            colors={["#2A7B9B", "#57C785"]}
                                            style={styles.statIconContainer}
                                        >
                                            <ShareButton
                                                title={post.title}
                                                message='Check out this awesome event'
                                                url={post.image}
                                                style={styles.shareButton}
                                            />
                                        </LinearGradient>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                {/** CONTENT SECTION */}
                <View style={styles.contentSection}>
                    <View style={styles.instructionsContainer}>
                        <View style={styles.instructionsTitle}>
                            <View style={styles.locationRow}>
                                {post.location &&
                                    <View style={styles.categoryBadge}>
                                        <Text style={styles.locationText}>
                                            {formattedLocation(post.location)}
                                        </Text>
                                    </View>
                                }
                                <View style={styles.categoryBadge}><Text style={styles.locationText}>{post.fee ? '$' + post.fee : 'FREE'}</Text></View>
                            </View>
                        </View>
                        <View style={styles.instructionCard}>
                            <LinearGradient
                                colors={[COLORS.primary, COLORS.primary + "CC"]}
                                style={styles.stepIndicator}
                            >
                                <Ionicons name="repeat" size={20} color={COLORS.white} />
                            </LinearGradient>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 0 }}>
                                {!post.frequency.daily && !post.frequency.weekly && !post.frequency.monthly && !post.frequency.yaerly ?
                                    (<Text style={[styles.instructionTextAddress, { justifyContent: 'center' }]}>Once</Text>) :
                                    (<Text style={styles.instructionTextAddress}>{formattedFrequency(post.frequency)}</Text>)
                                }
                            </View>
                        </View>
                        {post.eventDates?.length > 0 &&
                            <View style={styles.instructionCard}>
                                <LinearGradient
                                    colors={[COLORS.primary, COLORS.primary + "CC"]}
                                    style={styles.stepIndicator}
                                >
                                    <FontAwesome6 name='calendar' size={20} color={COLORS.white} />
                                </LinearGradient>
                                <View style={styles.instructionContent}>
                                    {sortAscAndFormatDates(post.eventDates).map((item, index) => (
                                        <Text key={index} style={styles.instructionTextAddress}>{item.date} - {item.time} </Text>))
                                    }
                                </View>
                            </View>
                        }
                        {post.address &&
                            <TouchableOpacity>
                                <View style={styles.instructionCard}>
                                    <LinearGradient
                                        colors={[COLORS.primary, COLORS.primary + "CC"]}
                                        style={styles.stepIndicator}
                                    >
                                        <FontAwesome6 name='location-dot' size={20} color={COLORS.white} />
                                    </LinearGradient>
                                    <View style={styles.instructionContent}>
                                        <Text style={styles.instructionTextAddress}>{post.address.street} {post.address.houseNumber}</Text>
                                        <Text style={styles.instructionTextAddress}>{post.address.zipCode} {post.address.city}</Text>
                                        <Text style={styles.instructionTextAddress}>{post.address.state} {post.address.country}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }
                        {post.description &&
                            <View style={styles.instructionCard}>
                                <LinearGradient
                                    colors={[COLORS.primary, COLORS.primary + "CC"]}
                                    style={styles.stepIndicator}
                                >
                                    <FontAwesome6 name='align-justify' size={20} color={COLORS.white} />
                                </LinearGradient>
                                <View style={styles.instructionContent}>
                                    <Text style={styles.instructionText}>{post.description}</Text>
                                </View>
                            </View>
                        }
                        {(post.phone || post.email) && (
                            <View style={styles.instructionCard}>
                                <LinearGradient
                                    colors={[COLORS.primary, COLORS.primary + "CC"]}
                                    style={styles.stepIndicator}
                                >
                                    <FontAwesome6 name='address-book' size={20} color={COLORS.white} />
                                </LinearGradient>
                                <View style={styles.instructionContent}>
                                    {post.phone && <Text style={styles.instructionTextAddress}>{post.phone}</Text>}
                                    {post.email && <Text style={styles.instructionTextAddress}>{post.email}</Text>}
                                </View>
                            </View>
                        )}

                        {(post.link) && (
                            <View style={styles.instructionCard}>
                                <LinearGradient
                                    colors={[COLORS.primary, COLORS.primary + "CC"]}
                                    style={styles.stepIndicator}
                                >
                                    <FontAwesome6 name='link' size={20} color={COLORS.white} />
                                </LinearGradient>
                                <View style={styles.instructionContent}>
                                    <Text style={styles.instructionTextAddress}>For online participation</Text>
                                    {post.link && <Text style={styles.instructionTextAddress}>{post.link}</Text>}
                                </View>
                            </View>
                        )}

                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default PostDetailScreen
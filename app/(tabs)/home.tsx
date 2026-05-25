import { View, Text, TextInput, RefreshControl, ActivityIndicator } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useUserSync } from '@/hooks/useUserSync';
import { Feather } from '@expo/vector-icons';
import styles, {nearbyCardStyles} from '@/assets/styles/home.styles';
import { COLORS } from '@/constants/colors.js';
import CategoryFilter from '@/components/CategoryFilter';
import { usePost } from '@/hooks/usePost';
import { useCategory } from '@/hooks/useCategory';
import PostCard from '@/components/PostCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import NearByEvent from '@/components/NearbyEvent';
import { router, useFocusEffect } from 'expo-router';
import { useNearbyPost } from '@/hooks/useNearbyPost';
import { FlashList } from "@shopify/flash-list";
import { ImageSize } from '../models/types';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@clerk/clerk-expo';

const HomeScreen = () => {
  useUserSync();
  const { userId, isLoaded: isAuthLoaded } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [searchParam, setSearchParam] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categoryParam, setCategoryParam] = useState<string>("");

  const { categoriesData } = useCategory();

  const postParams = useMemo(() => ({
    searchParam: debouncedSearch,
    categoryParam,
  }), [debouncedSearch, categoryParam]);

  const { 
    posts, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    isLoadingPosts, 
    refetchPosts,
    toggleLike 
  } = usePost({ categoryParam: postParams.categoryParam, searchParam: postParams.searchParam });

  const { nearbyPosts, refetch: refetchNearbyPosts } = useNearbyPost({ userId: userId ?? undefined });

  const handleCategorySelect = (categoryId: string, categoryName: string) => {
    if (selectedCategory === categoryId) { // unselect
      setSelectedCategory("");
      setCategoryParam("");
    } else {
      setSelectedCategory(categoryId);
      setCategoryParam(categoryId);
      console.log("Category selected: ", categoryId, categoryName);
    }
  }

  const onSelectEvent = async (eventId: string) => {
    router.push(`/post/${eventId}`);
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchPosts(), refetchNearbyPosts()]);
    setRefreshing(false);
  }

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await Promise.all([
          refetchPosts(),
          refetchNearbyPosts(),
        ]);
      };
      fetchData();
    }, [refetchPosts, refetchNearbyPosts])
  );

  // Refetch every time user types a character (debounced)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchParam);
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchParam]);

  // Show a basic loader only until auth state is loaded
  if (!isAuthLoaded) {
    return <LoadingSpinner message="Authenticating..." />;
  }

  // Session guard
  if (!userId) {
    router.replace("/(auth)/sign-in");
    return null;
  }

  // Main UI shell renders immediately once userId is available
  // Main posts will show a loading spinner if they are empty
  if (isLoadingPosts && !refreshing && posts.length === 0) {
    return <LoadingSpinner message="Loading events..." />;
  }

  return (
    <View style={styles.container}>
      {/** SEARCH SECTION (Fixed) */}
      <View style={styles.formGroup}>
        <View style={styles.inputContainer}>
          <Feather
            name='search'
            size={20}
            color={COLORS.textLight}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder='Search an event'
            placeholderTextColor="#A0A0A0"
            value={searchParam}
            onChangeText={setSearchParam}
          />
        </View>
      </View>

      {/** CATEGORIES SECTION (Fixed) */}
      {categoriesData && categoriesData.length > 0 && (
        <View style={{ marginBottom: 8 }}>
          <CategoryFilter
            categories={categoriesData}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        </View>
      )}

      {/** MAIN SCROLLABLE CONTENT */}
      <View style={{ flex: 1 }}>
        <FlashList
          data={posts}
          ListHeaderComponent={
            <View>
              {/** Nearby events section inside the list header so it scrolls */}
              {nearbyPosts && nearbyPosts.length > 0 && (
                <View style={{ marginBottom: 12 }}>
                  <NearByEvent
                    events={nearbyPosts}
                    onSelectEvent={onSelectEvent}
                  />
                </View>
              )}
              {/** Section title for the main list */}
              <Text style={[nearbyCardStyles.sectionTitle, { marginBottom: 12, marginLeft: 12 }]}>
                All Events
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <PostCard
              onSelectEvent={onSelectEvent}
              post={item}
              onLike={toggleLike}
              isLiked={item.liked}
              imageSize={ImageSize.Small}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={1}
          contentContainerStyle={[styles.recipesGrid, { paddingBottom: 120, paddingHorizontal: 4 }]}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.3}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={COLORS.primary}
            />
          }
          ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Feather name='calendar' size={64} color={COLORS.textLight} />
              <Text style={styles.emptyTitle}>No events found</Text>
              <Text style={styles.emptyDescription}>Be the first to post an event</Text>
            </View>
          }
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator
                color={COLORS.primary}
                size="small"
                style={{ marginBottom: 5 }}
              />
            ) : null
          }
        />
        
        {/** Fade effect at the very bottom of the screen */}
        <LinearGradient
          colors={['rgba(248, 249, 250, 0)', 'rgba(248, 249, 250, 0.8)', 'rgba(248, 249, 250, 1)']}
          style={styles.listFadeOverlay}
          pointerEvents="none"
        />
      </View>
    </View>
  );
};

export default HomeScreen;

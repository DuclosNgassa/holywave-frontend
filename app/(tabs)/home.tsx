import { View, Text, TouchableOpacity, TextInput, RefreshControl, ActivityIndicator } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useUserSync } from '@/hooks/useUserSync';
import { Feather } from '@expo/vector-icons';
import styles from '@/assets/styles/home.styles.js';
import { COLORS } from '@/constants/colors.js';
import CategoryFilter from '@/components/CategoryFilter';
import { usePost } from '@/hooks/usePost';
import { useCategory } from '@/hooks/useCategory';
import PostCard from '@/components/PostCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import NearByEvent from '@/components/NearbyEvent';
import { router, useFocusEffect } from 'expo-router';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useNearbyPost } from '@/hooks/useNearbyPost';
import { FlashList } from "@shopify/flash-list";
import { ImageSize } from '../models/types';

const HomeScreen = () => {
  useUserSync();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [refreshing, setRefreshing] = useState(false);

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

  const [searchParam, setSearchParam] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categoryParam, setCategoryParam] = useState<string>("");

  const { categoriesData, isLoadingCategories, errorCategories } = useCategory();
  const { currentUser } = useCurrentUser();
  const postParams = useMemo(() => ({
    searchParam: debouncedSearch,
    categoryParam,
  }), [debouncedSearch, categoryParam]);

  const { posts, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching, isRefetching, isLoadingPosts, errorPosts, refetchPosts, toggleLike, checkIsLiked } = usePost({ categoryParam:postParams.categoryParam, searchParam: postParams.searchParam });
  const { nearbyPosts, isLoading, error: errorNearbyPost, refetch: refetchNearbyPosts } = useNearbyPost();

  if (isLoadingCategories) {
  }
  if (errorCategories) {
    console.log("Error: ", errorCategories);
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchPosts();
    setRefreshing(false);
  }

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchData = async () => {
        await Promise.all([
          refetchPosts(), // Refetch data when the screen is focused
          refetchNearbyPosts(),
        ]);
      };

      fetchData();

      return () => {
        isActive = false;
      };
    }, [refetchPosts, refetchNearbyPosts])
  );

  // Refetch every time user types a character (debounced)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchParam);
      console.log(debouncedSearch)
      console.log("postParams: ", postParams);
    }, 400);
  
    return () => clearTimeout(timeout);
  }, [searchParam]);

  if (isLoadingPosts && !refreshing) {
    return <LoadingSpinner message="Loading events..." />;
  }

  if (errorPosts) {
    console.log(`Error while loading posts.`, errorPosts)
    //TODO implement errorComponnennt
  }

  return (
    <View style={styles.container}>
      {/** SEARCH SECTION */}
      <View style={styles.formGroup}>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => { }}
            style={styles.searchFieldInputContainer} >
            <Feather
              name='search'
              size={20}
              color={COLORS.textSecondary}
              style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder='Search an event'
              placeholderTextColor={COLORS.placeholderText}
              value={searchParam}
              onChangeText={setSearchParam}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/** CATEGORIES SECTION */}
      {categoriesData?.length > 0 && (
        <View style={{ marginBottom: 8 }}>
          <CategoryFilter
            categories={categoriesData}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        </View>
      )}
      <View style={{ flex: 1 }}>
        {/** Near by events */}
        {nearbyPosts.length > 0 && (
          <View>
            <NearByEvent
              events={nearbyPosts}
              onSelectCategory={handleCategorySelect}
              onSelectEvent={onSelectEvent}
            />
          </View>
        )}

        {/** Events section */}
        <View style={styles.recipesSection}>
          <FlashList
            data={posts}
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
            numColumns={2}
            contentContainerStyle={styles.recipesGrid}
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
                //colors={COLORS.primary} for Android
                tintColor={COLORS.primary}
              />
            }
            ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
            ListEmptyComponent={<View style={styles.emptyState}>
              <Feather name='calendar' size={64} color={COLORS.textLight} />
              <Text style={styles.emptyTitle}>No events found</Text>
              <Text style={styles.emptyDescription}>Be the first to post an event</Text>
            </View>}
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
        </View>
      </View>
    </View>
  )
}

export default HomeScreen
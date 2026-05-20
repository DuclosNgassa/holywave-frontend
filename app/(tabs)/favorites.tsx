import React, { useCallback, useState } from 'react';
import { RefreshControl, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import styles from '@/assets/styles/favorite.styles';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { usePost } from '@/hooks/usePost';
import LoadingSpinner from '@/components/LoadingSpinner';
import { FontAwesome6 } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
import { router, useFocusEffect } from 'expo-router';
import SignOutButton from '@/components/SignOutButton';
import HorizontalPostCard from '@/components/HorizontalPostCard';
import {useSafeAreaInsets} from "react-native-safe-area-context";

const FavoritesScreen = () => {
  const insets = useSafeAreaInsets();

  const [refreshing, setRefreshing] = useState(false);
  const { currentUser } = useCurrentUser();
  const { 
    postsUser, 
    postsLiked, 
    postsBookmarked, 
    toggleLike, 
    toggleBookmark, 
    refetchPostsUser, 
    refetchPostsLiked, 
    refetchPostsBookmarked, 
    isLoadingPostsUser, 
    isLoadingPostLiked, 
    isLoadingBookmarked, 
    deletePost 
  } = usePost({ userId: currentUser?.id });

  const [favoritSelected, setFavoritSelected] = useState(true);
  const [bookMarkSelected, setBookMarkSelected] = useState(false);
  const [myEventsSelected, setMyEventsSelected] = useState(false);

  const onSelectTab = (selected: string) => {
    setFavoritSelected(selected === "favorit");
    setBookMarkSelected(selected === "bookmark");
    setMyEventsSelected(selected === "my_events");
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      refetchPostsLiked(),
      refetchPostsBookmarked(),
      refetchPostsUser()
    ]);
    setRefreshing(false);
  }

  const showDetail = (postId: string) => {
    router.push(`/post/${postId}`);
  }

  const onEdit = (postId: string) => {
    router.push(`/post/edit/${postId}`);
  }

  const onDelete = (postId: string) => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deletePost(postId),
      },
    ]);
  };

  useFocusEffect(
    useCallback(() => {
      Promise.all([
        refetchPostsLiked(),
        refetchPostsBookmarked(),
        refetchPostsUser()
      ]);
    }, [refetchPostsLiked, refetchPostsBookmarked, refetchPostsUser])
  );

  if (isLoadingPostsUser && isLoadingPostLiked && isLoadingBookmarked && !refreshing) {
    return <LoadingSpinner message="Loading events..." />;
  }

  return (
    <View style={styles.container}>
      {/* HEADER SECTION - Modern Segmented Control */}
      <View style={styles.sectionHeader}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={[styles.tabButton, favoritSelected ? styles.tabActive : styles.tabInActive]} 
            onPress={() => onSelectTab("favorit")}
          >
            <Text style={[styles.buttonText, favoritSelected && styles.buttonTextActive]}>Favorites</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, bookMarkSelected ? styles.tabActive : styles.tabInActive]} 
            onPress={() => onSelectTab("bookmark")}
          >
            <Text style={[styles.buttonText, bookMarkSelected && styles.buttonTextActive]}>Bookmark</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, myEventsSelected ? styles.tabActive : styles.tabInActive]} 
            onPress={() => onSelectTab("my_events")}
          >
            <Text style={[styles.buttonText, myEventsSelected && styles.buttonTextActive]}>My Events</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* FAVORITES SECTION */}
      {favoritSelected && (
        <View style={{ flex: 1 }}>
          <FlatList
            data={postsLiked}
            renderItem={({ item }) => (
              <HorizontalPostCard
                post={item}
                onPrimaryAction={toggleLike}
                onSelect={showDetail}
                primaryIcon="heart"
                isPrimaryActive={true}
              />
            )}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />
            }
            keyExtractor={(item) => item?.id.toString()}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <FontAwesome6 name='calendar' size={64} color={COLORS.textLight} />
                <Text style={styles.emptyTitle}>No favorite events yet</Text>
                <Text style={styles.emptyDescription}>Just press the 🩷 icon on an event to like it</Text>
              </View>
            }
          />
        </View>
      )}

      {/* BOOKMARK SECTION */}
      {bookMarkSelected && (
        <View style={{ flex: 1 }}>
          <FlatList
            data={postsBookmarked}
            renderItem={({ item }) => (
              <HorizontalPostCard
                post={item}
                onPrimaryAction={toggleBookmark}
                onSelect={showDetail}
                primaryIcon="bookmark"
                isPrimaryActive={true}
              />
            )}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />
            }
            keyExtractor={(item) => item?.id.toString()}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <FontAwesome6 name='bookmark' regular size={64} color={COLORS.textLight} />
                <Text style={styles.emptyTitle}>No bookmarked events yet</Text>
                <Text style={styles.emptyDescription}>Just press the bookmark icon on an event to save it</Text>
              </View>
            }
          />
        </View>
      )}

      {/* MY EVENTS SECTION */}
      {myEventsSelected && (
        <View style={{ flex: 1 }}>
          <FlatList
            data={postsUser}
            renderItem={({ item }) => (
              <HorizontalPostCard
                post={item}
                onPrimaryAction={onEdit}
                onSelect={showDetail}
                primaryIcon="pencil"
                showDelete={true}
                onDelete={onDelete}
              />
            )}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />
            }
            keyExtractor={(item) => item?.id.toString()}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <FontAwesome6 name='calendar' regular size={64} color={COLORS.textLight} />
                <Text style={styles.emptyTitle}>No Events yet</Text>
                <Text style={styles.emptyDescription}>Simply create an event with the post button</Text>
              </View>
            }
          />
        </View>
      )}

      {/* FLOATING LOGOUT BUTTON (RED FAB) */}
      <View style={[styles.logoutFAB, { bottom: insets.bottom + 15 }]}>
        <SignOutButton />
      </View>
    </View>
  );
};

export default FavoritesScreen;

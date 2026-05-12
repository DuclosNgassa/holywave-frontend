import React, { useCallback, useState } from 'react';
import { RefreshControl, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import styles from '@/assets/styles/favorite.styles';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { usePost } from '@/hooks/usePost';
import LoadingSpinner from '@/components/LoadingSpinner';
import { FontAwesome6 } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
import { router, useFocusEffect } from 'expo-router';
import MyEventCard from '@/components/MyEventCard';
import BookmarkCard from '@/components/BookmarkCard';
import FavoriteCard from '@/components/FavoriteCard';
import SignOutButton from '@/components/SignOutButton';

const FavoritesScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { currentUser } = useCurrentUser();
  const { postsUser, postsLiked, postsBookmarked, toggleLike, toggleBookmark, refetchPostsUser, refetchPostsLiked, refetchPostsBookmarked, isLoadingPostsUser, isLoadingPostLiked, isLoadingBookmarked, errorPostsUser, deletePost } = usePost({ userId: currentUser?.id });

  const [favoritSelected, setFavoritSelected] = useState(true);
  const [bookMarkSelected, setBookMarkSelected] = useState(false);
  const [myEventsSelected, setMyEventsSelected] = useState(false);

  const onSelectTab = (selected: string) => {
    if (selected === "favorit") {
      setFavoritSelected(true);
      setBookMarkSelected(false);
      setMyEventsSelected(false);
    } else if (selected === "bookmark") {
      setBookMarkSelected(true);
      setFavoritSelected(false);
      setMyEventsSelected(false);
    } else if (selected === "my_events") {
      setMyEventsSelected(true);
      setBookMarkSelected(false);
      setFavoritSelected(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      refetchPostsLiked(),
      refetchPostsBookmarked(),
    ])
    setRefreshing(false);
  }

  const onRefreshMyEvents = async () => {
    setRefreshing(true);
    await refetchPostsUser();
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
        refetchPostsLiked(), // Refetch data when the screen is focused
        refetchPostsBookmarked(),
        refetchPostsUser()
      ])
    }, [refetchPostsLiked, refetchPostsBookmarked, refetchPostsUser])
  );

  if (isLoadingPostsUser && isLoadingPostLiked && isLoadingBookmarked && !refreshing) {
    return <LoadingSpinner message="Loading events..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.header}>
          <TouchableOpacity style={favoritSelected ? styles.tabActive : styles.tabInActive} onPress={() => onSelectTab("favorit")}>
            <Text style={styles.buttonText}>Favorits</Text>
          </TouchableOpacity>
          <TouchableOpacity style={bookMarkSelected ? styles.tabActive : styles.tabInActive} onPress={() => onSelectTab("bookmark")}>
            <Text style={styles.buttonText}>Bookmark</Text>
          </TouchableOpacity>
          <TouchableOpacity style={myEventsSelected ? styles.tabActive : styles.tabInActive} onPress={() => onSelectTab("my_events")}>
            <Text style={styles.buttonText}>My Events</Text>
          </TouchableOpacity>
          <View style={{ width: 50 }} />
          <TouchableOpacity style={ styles.tabLogout}>
              <SignOutButton />
          </TouchableOpacity>
        </View>
      </View>
      {/* Favorits  section */}
      {favoritSelected &&
        <View style={{ flex: 1, }}>
          <FlatList
            data={postsLiked}
            renderItem={({ item }) => (
              <FavoriteCard
                post={item}
                onRemove={toggleLike}
                showDetail={showDetail}
              />
            )}
            //ItemSeparatorComponent={() => <HorizontalLine/>}
            contentContainerStyle={{ gap: 5 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={COLORS.primary} />
            }
            keyExtractor={(item) => item?.id.toString()}
            ListEmptyComponent={<View style={styles.emptyState}>
              <FontAwesome6 name='calendar' size={64} color={COLORS.textLight} />
              <Text style={styles.emptyTitle}>No favorite events yet</Text>
              <Text style={styles.emptyDescription}>Just press the 🩷 icon on an event to like it and put it to your favorites</Text>
            </View>}
          />
        </View>
      }
      {/* bookmarks  section */}
      {bookMarkSelected &&
        <View style={{ flex: 1, }}>
          <FlatList
            data={postsBookmarked}
            renderItem={({ item }) => (
              <BookmarkCard
                post={item}
                onBookmark={toggleBookmark}
                showDetail={showDetail}
              />
            )}
            contentContainerStyle={{ gap: 5 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={COLORS.primary} />
            }
            keyExtractor={(item) => item?.id.toString()}
            ListEmptyComponent={<View style={styles.emptyState}>
              <FontAwesome6 name='bookmark' regular size={64} color={COLORS.textLight} />
              <Text style={styles.emptyTitle}>No favorite events yet</Text>
              <Text style={styles.emptyDescription}>Just press the bookmark icon on an event to like it and put it to your favorites</Text>
            </View>}
          />
        </View>
      }
      {/* myEvents  section */}
      {myEventsSelected &&
        <View style={{ flex: 1, }}>
          <FlatList
            data={postsUser}
            renderItem={({ item }) => (
              <MyEventCard
                post={item}
                onDelete={onDelete}
                onEdit={onEdit}
                showDetail={showDetail}
              />
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefreshMyEvents}
                tintColor={COLORS.primary} />
            }
            contentContainerStyle={{ gap: 5 }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item?.id.toString()}
            ListEmptyComponent={<View style={styles.emptyState}>
              <FontAwesome6 name='bookmark' regular size={64} color={COLORS.textLight} />
              <Text style={styles.emptyTitle}>No Events yet</Text>
              <Text style={styles.emptyDescription}>Simply create an event with the post button on the navigation bar on the bottom of your screen</Text>
            </View>}
          />
        </View>
      }
    </View>
  );
};

export default FavoritesScreen;

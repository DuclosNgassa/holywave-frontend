import { postApi, useApiClient } from "@/utils/api"
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

export const usePost = ({
  userId,
  postId,
  searchParam = "",
  categoryParam = "",
}: {
  userId?: string;
  postId?: string;
  searchParam?: string;
  categoryParam?: string;
}) => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  console.log("SearchParam in usePost: ", searchParam, categoryParam)
  /**
   * 🔥 POSTS (INFINITE QUERY)
   */
  const {
    data,
    isLoading: isLoadingPosts,
    error: errorPosts,
    refetch: refetchPosts,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isRefetching,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["posts", searchParam, categoryParam],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      postApi.getPosts(api, pageParam, searchParam, categoryParam),
    getNextPageParam: (lastPage) => lastPage?.data?.nextPage ?? undefined,
    staleTime: 1000 * 30, // ⏱ prevents aggressive refetching
    keepPreviousData: true, // 👈 smooth UX when filters change
  });

  /**
   * 👤 USER POSTS
   */
  const {
    data: postsUser,
    isLoading: isLoadingPostsUser,
    error: errorPostsUser,
    refetch: refetchPostsUser,
  } = useQuery({
    queryKey: ["userPosts", userId],
    queryFn: () => postApi.getPostByUserId(api, userId),
    enabled: !!userId,
    select: (res) => res.data,
  });

  /**
   * 📄 SINGLE POST
   */
  const {
    data: post,
    isLoading: isLoadingPost,
    error: errorPost,
    refetch: refetchPost,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => postApi.getPostById(api, postId),
    enabled: !!postId,
    select: (res) => res.data,
  });

  /**
   * ❤️ LIKED POSTS
   */
  const {
    data: postsLiked,
    isLoading: isLoadingPostLiked,
    error: errorPostsLiked,
    refetch: refetchPostsLiked,
  } = useQuery({
    queryKey: ["userLikedPosts", userId],
    queryFn: () => postApi.getUserLikedPosts(api, userId),
    enabled: !!userId,
    select: (res) => res.data,
  });

  /**
   * 🔖 BOOKMARKED POSTS
   */
  const {
    data: postsBookmarked,
    isLoading: isLoadingBookmarked,
    error: errorPostsBookmarked,
    refetch: refetchPostsBookmarked,
  } = useQuery({
    queryKey: ["userBookmarkedPosts", userId],
    queryFn: () => postApi.getUserBookmarkedPosts(api, userId),
    enabled: !!userId,
    select: (res) => res.data,
  });

  /**
   * ❤️ LIKE MUTATION
   */
  const likePostMutation = useMutation({
    mutationFn: (postId: string) => postApi.likePost(api, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (q) => q.queryKey[0] === "posts",
      });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["userLikedPosts", userId] });
    },
    onError: (error: any) => {
      console.log("Like error:", error?.message);
      Alert.alert("Error", "Failed to like/unlike event.");
    },
  });

  /**
   * 🔖 BOOKMARK MUTATION
   */
  const bookmarkPostMutation = useMutation({
    mutationFn: (postId: string) => postApi.bookmarkPost(api, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (q) => q.queryKey[0] === "posts",
      });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({
        queryKey: ["userBookmarkedPosts", userId],
      });
    },
    onError: (error: any) => {
      console.log("Bookmark error:", error?.message);
      Alert.alert("Error", "Failed to bookmark event.");
    },
  });

  /**
   * 🗑 DELETE MUTATION
   */
  const deletePostMutation = useMutation({
    mutationFn: (postId: string) => postApi.deletePost(api, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (q) => q.queryKey[0] === "posts",
      });
      queryClient.invalidateQueries({ queryKey: ["userPosts", userId] });
      queryClient.invalidateQueries({
        queryKey: ["userBookmarkedPosts", userId],
      });
    },
  });

  /**
   * 🧠 HELPERS
   */
  const checkIsLiked = (postLikes: string[], currentUser: any) =>
    currentUser && postLikes.includes(currentUser.id);

  const checkIsBookmarked = (postBookmarks: string[], currentUser: any) =>
    currentUser && postBookmarks.includes(currentUser.id);

  /**
   * 🚀 RETURN
   */
  return {
    posts: data?.pages.flatMap((p) => p.data.posts) || [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetchPosts,
    isFetching,
    isRefetching,
    isLoadingPosts,
    errorPosts,

    postsUser,
    isLoadingPostsUser,
    errorPostsUser,
    refetchPostsUser,

    post,
    isLoadingPost,
    errorPost,
    refetchPost,

    postsLiked: postsLiked || [],
    errorPostsLiked,
    refetchPostsLiked,
    isLoadingPostLiked,

    postsBookmarked,
    isLoadingBookmarked,
    errorPostsBookmarked,
    refetchPostsBookmarked,

    toggleLike: likePostMutation.mutate,
    toggleBookmark: bookmarkPostMutation.mutate,
    deletePost: deletePostMutation.mutate,

    checkIsLiked,
    checkIsBookmarked,
  };
};

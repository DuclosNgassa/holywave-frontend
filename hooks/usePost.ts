import { postApi, useApiClient } from "@/utils/api"
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";


export const usePost = ({ userId, postId, searchParam, categoryParam }: { userId?: string, postId?: string, searchParam?: string, categoryParam?: string }) => {
    const api = useApiClient();
    const queryClient = useQueryClient();

    const fetchPosts = async (param: any, searchParam: string, categoryParam: string) => {
//        console.log("param: ", param);
  //      console.log("searchParam: ", searchParam);
    //    console.log("categoryParam: ", categoryParam);

        const result = await postApi.getPosts(api, param.pageParam, searchParam, categoryParam);
        //console.log("Post result: ", JSON.stringify(result.data.posts));
        return result;
    }

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
        queryKey: ["posts"],
        initialPageParam: 1,
        queryFn: (param) => fetchPosts(param, searchParam, categoryParam),
        getNextPageParam: (lastPage, pages) => {
            return lastPage.data.nextPage;
        },
    });

    const {
        data: postsUser,
        isLoading: isLoadingPostsUser,
        error: errorPostsUser,
        refetch: refetchPostsUser,
    } = useQuery({
        queryKey: ["userPosts", userId],
        queryFn: () => postApi.getPostByUserId(api, userId),
        enabled: !!userId,
        select: (response) => response.data
    });

    const {
        data: post,
        isLoading: isLoadingPost,
        error: errorPost,
        refetch: refetchPost,
    } = useQuery({
        queryKey: ["post", postId],
        queryFn: () => postApi.getPostById(api, postId),
        enabled: !!postId,
        select: (response) => response.data,
    });

    const {
        data: postsLiked,
        isLoading: isLoadingPostLiked,
        error: errorPostsLiked,
        refetch: refetchPostsLiked,
    } = useQuery({
        queryKey: ["userLikedPosts", userId],
        queryFn: () => postApi.getUserLikedPosts(api, userId),
        enabled: !!userId,
        select: (response) => response.data,
    });

    const {
        data: postsBookmarked,
        isLoading: isLoadingBookmarked,
        error: errorPostsBookmarked,
        refetch: refetchPostsBookmarked,
    } = useQuery({
        queryKey: ["userBookmarkedPosts", userId],
        queryFn: () => postApi.getUserBookmarkedPosts(api, userId),
        enabled: !!userId,
        select: (response) => response.data,
    });

    const likePostMutationFunction = async (postId: string) => {
        console.log(`Like/unlike event. [eventId=${postId}]`);
        return postApi.likePost(api, postId);
    };

    const likePostMutation = useMutation({
        mutationFn: likePostMutationFunction,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["post", postId] });
            queryClient.invalidateQueries({ queryKey: ["userLikedPosts", userId] });
            console.log("Successfully like/unlike event. ");
        },
        onError: (error) => {
            console.log("Failed to like/unlike event. ", error.message);
            Alert.alert("Error", "Failed to like/unlike event. Please try again");
        }
    });

    const bookmarkPostMutationFunction = async (postId: string) => {
        console.log(`Bookmark/unbookmark event. [eventId=${postId}]`);
        return postApi.bookmarkPost(api, postId);
    };

    const bookmarkPostMutation = useMutation({
        mutationFn: bookmarkPostMutationFunction,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["post", postId] });
            queryClient.invalidateQueries({ queryKey: ["userBookmarkedPosts", userId] });
            console.log("Successfully bookmark/unbookmark event. ");
        },
        onError: (error) => {
            console.log("Failed to bookmark/unbookmark event. ", error.message);
            Alert.alert("Error", "Failed to bookmark/unbookmark event. Please try again");
        }
    });

    const deletePostMutation = useMutation({
        mutationFn: (postId: string) => postApi.deletePost(api, postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["userBookmarkedPosts", userId] });
            queryClient.invalidateQueries({ queryKey: ["userPosts", userId] });
        },
    });

    const checkIsLiked = (postLikes: string[], currentUser: any) => {
        const isLiked = currentUser && postLikes.includes(currentUser.id);
        return isLiked;
    };

    const checkIsBookmarked = (postBookmarks: string[], currentUser: any) => {
        const isBookmarked = currentUser && postBookmarks.includes(currentUser.id);
        return isBookmarked;
    };

    return {
        posts: data?.pages.flatMap((page) => page.data.posts) || [],
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

        postsLiked: postsLiked || [],
        errorPostsLiked,
        refetchPostsLiked,
        isLoadingPostLiked,

        postsBookmarked,
        isLoadingBookmarked,
        errorPostsBookmarked,
        refetchPostsBookmarked,
        checkIsBookmarked,

        toggleLike: (postId: string) => likePostMutation.mutate(postId),
        toggleBookmark: (postId: string) => bookmarkPostMutation.mutate(postId),
        deletePost: (postId: string) => deletePostMutation.mutate(postId),
        refetchPost,
        checkIsLiked,
    }

}
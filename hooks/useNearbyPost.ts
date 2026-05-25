import {postApi, useApiClient} from "@/utils/api"
import {useQuery} from "@tanstack/react-query";
import useLocation from "./useLocation";


export const useNearbyPost = ({ userId }: { userId?: string } = {}) => {
    const api = useApiClient();
    const { userGeocodedAddress } = useLocation();

    const {
        data: posts,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["nearbyPosts", userId], // Include userId in queryKey for cache isolation
        queryFn: () => postApi.getNearbyPosts(
            api, userGeocodedAddress?.country,
            userGeocodedAddress?.region,
            userGeocodedAddress?.postalCode,
            userGeocodedAddress?.city
        ),
        enabled: !!userGeocodedAddress && !!userId, // Only run if we have location AND a user
        select: (response) => response.data.posts
    });

    return {
        nearbyPosts: posts || [],
        isLoading,
        error,
        refetch
    }

}
import { postApi, useApiClient } from "@/utils/api"
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useLocation from "./useLocation";


export const useNearbyPost = () => {
    const api = useApiClient();
    const queryClient = useQueryClient();
    const { longitude, latitude, userGeocodedAddress, errorMsg } = useLocation();
    //console.log("User location in home is: ", userGeocodedAddress);

    const {
        data: posts,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["nearbyPosts"],
        queryFn: () => postApi.getNearbyPosts(
            api, userGeocodedAddress?.country,
            userGeocodedAddress?.region,
            userGeocodedAddress?.postalCode,
            userGeocodedAddress?.city
        ),
        enabled: !!userGeocodedAddress,
        select: (response) => response.data.posts
    });

    return {
        nearbyPosts: posts || [],
        isLoading,
        error,
        refetch
    }

}
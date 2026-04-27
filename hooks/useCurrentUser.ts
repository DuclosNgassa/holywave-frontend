import { useQuery } from "@tanstack/react-query";
import { useApiClient, userApi } from "../utils/api";

export const useCurrentUser = () => {
    const api = useApiClient();

    const {
        data: currentUser,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["authUser"],
        queryFn: () => userApi.getCurrentUser(api),
        select: (response) => {
            //console.log("Current user: ", response.data);
            return response.data},
    });

    return { currentUser, isLoading, error, refetch };
};
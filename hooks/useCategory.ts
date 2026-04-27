import { categoryApi, useApiClient } from "@/utils/api"
import { useQuery } from "@tanstack/react-query";


export const useCategory = () => {
    const api = useApiClient();

    const fetchCategories = async () => {

        const result = await categoryApi.getCategories(api);
        console.log("Categories: ", result.data);

        return result;
    }

    const {
        data: categoriesData,
        error,
        isLoading
    } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetchCategories(),
        select: (response) => response.data || [],
    });

    return {
        categoriesData,
        errorCategories: error,
        isLoadingCategories: isLoading
    }
}
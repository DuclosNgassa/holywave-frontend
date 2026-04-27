import axios, { AxiosInstance } from "axios";
import { useAuth } from "@clerk/clerk-expo";
import { Post } from "@/app/models/post";

//const API_BASE_URL = "http://localhost:5001/api";
const API_BASE_URL = "http://localhost:8080/api/v1";

//const API_BASE_URL = "http://13.60.71.213:8080/api/v1"; // AWS

export const createApiClient = (getToken: (options?: any) => Promise<string | null>): AxiosInstance => {
    const api = axios.create({ baseURL: API_BASE_URL });

    api.interceptors.request.use(async (config) => {
        const token = await getToken({ template: "long_lived" });
        //const token = await getToken();
        if (token) {
            console.log("Token: ", token);
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return api;
};

export const useApiClient = (): AxiosInstance => {
    const { getToken } = useAuth();
    return createApiClient(getToken);
};

export const userApi = {
    syncUser: (api: AxiosInstance) => api.post("/users"),
    getCurrentUser: (api: AxiosInstance) => api.get("/users/me"),
    updateProfile: (api: AxiosInstance, data: any) => api.put("/users", data),
};

export const categoryApi = {
    getCategories: (api: AxiosInstance) => api.get("/categories"),
    getCategory: (api: AxiosInstance, categoryId: string) => api.get(`/categories/${categoryId}`),
};

export const postApi = {

    uploadImage: (api: AxiosInstance, formData: FormData) => api.post(`/posts/upload-image`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        },
    ),

    savePost: (api: AxiosInstance, post: Post) => api.post(`/posts`, post),

    getPosts: (api: AxiosInstance, pageParam: number, searchParam: string, categoryParam: string) => api.get(`/posts?page=${pageParam}&searchParam=${searchParam}&categories=${categoryParam}`),

    searchPosts: (api: AxiosInstance, searchParam: string) => api.get(`/posts?searchParam=${searchParam}`),

    getNearbyPosts: (api: AxiosInstance, country?: string | undefined | null, state?: string | undefined | null, zipcode?: string | undefined | null, city?: string | undefined | null) => {
        if (!country) {
            country = "Germany";
        }
        if (!state) {
            state = "NRW";
        }
        if (!zipcode && !city) {
            return api.get(`/posts?country=${country}&state=${state}`);
        }
        if (!zipcode && city) {
            return api.get(`/posts?country=${country}&state=${state}&city=${city}`);
        }
        if (zipcode && !city) {
            return api.get(`/posts?country=${country}&state=${state}&zipcode=${zipcode}`);
        }
        return api.get(`/posts?country=${country}&state=${state}&zipcode=${zipcode}&city=${city}`);
    },

    getPostById: (api: AxiosInstance, postId: string) => api.get(`/posts/${postId}`),

    getUserLikedPosts: (api: AxiosInstance, userId: string) => api.get(`/users/${userId}/likes`),

    getUserBookmarkedPosts: (api: AxiosInstance, userId: string) => api.get(`/users/${userId}/bookmarks`),

    getPostByUserId: (api: AxiosInstance, userId: string) => api.get(`/posts/user/${userId}`),

    likePost: (api: AxiosInstance, postId: string) => api.post(`/posts/${postId}/like/toggle`),

    bookmarkPost: (api: AxiosInstance, postId: string) => api.post(`/posts/${postId}/bookmark/toggle`),

    updatePost: (api: AxiosInstance, post: Post) => api.
        put(`/posts`, post),

    deletePost: (api: AxiosInstance, postId: string) => api.delete(`/posts/${postId}`),
}
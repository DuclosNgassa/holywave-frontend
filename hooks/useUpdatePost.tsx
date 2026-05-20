import { Address, Frequency, Location, UploadImageResponse } from "@/app/models/types";
import { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import type { ImagePickerAsset } from 'expo-image-picker';
import { useMutation } from "@tanstack/react-query";
import { Post, PostCategory } from "@/app/models/post";
import { postApi, useApiClient } from "@/utils/api";
import { useRouter } from "expo-router";
import { usePost } from "./usePost";
import { compressImageForUpload, DEFAULT_IMAGE_RESIZE_OPTION, ImageResizeOption } from "@/utils/imageUpload";


export const useUpdatePost = (postId: string) => {
    const router = useRouter();
    const api = useApiClient();
    const { post, isLoadingPost, errorPost } = usePost({postId});

    /** UseState */
    const [title, setTitle] = useState("");
    const [categories, setCategories] = useState<string[]>([]);
    const [imageUri, setImageUri] = useState<string>("");
    const [imageAsset, setImageAsset] = useState<ImagePickerAsset | null>(null);
    const [imageResizeOption, setImageResizeOption] = useState<ImageResizeOption>(DEFAULT_IMAGE_RESIZE_OPTION);
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState<Location>({
        online: false,
        onsite: true,
    });
    const [address, setAddress] = useState<Address>({
        street: "",
        houseNumber: "",
        zipCode: "",
        city: "",
        state: "",
        country: "",
    });
    const [link, setLink] = useState("");
    const [eventDates, setEventDates] = useState<Date[]>([]);
    const [frequency, setFrequency] = useState<Frequency>({
        daily: false,
        weekly: false,
        monthly: false,
        yearly: false,
    });
    const [description, setDescription] = useState("");
    const [fee, setFee] = useState<string | undefined>(undefined);
    const [paidEvent, setPaidEvent] = useState("free");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!post) return;

        setTitle(post.title ?? "");
        setCategories(
            (post.categories ?? []).map((category: PostCategory) =>
                typeof category === "string" ? category : category.id
            )
        );
        setImageUri(post.image ?? "");
        setImageAsset(null);
        setImageResizeOption(DEFAULT_IMAGE_RESIZE_OPTION);
        setPhone(post.phone ?? "");
        setEmail(post.email ?? "");
        setLocation({
            online: post.location?.online ?? false,
            onsite: post.location?.onsite ?? true,
        });
        setAddress({
            street: post.address?.street ?? "",
            houseNumber: post.address?.houseNumber ?? "",
            zipCode: post.address?.zipCode ?? "",
            city: post.address?.city ?? "",
            state: post.address?.state ?? "",
            country: post.address?.country ?? "",
        });
        setLink(post.link ?? "");
        setEventDates((post.eventDates ?? []).map((eventDate: string) => new Date(eventDate)));
        setFrequency({
            daily: post.frequency?.daily ?? false,
            weekly: post.frequency?.weekly ?? false,
            monthly: post.frequency?.monthly ?? false,
            yearly: post.frequency?.yearly ?? false,
        });
        setDescription(post.description ?? "");
        setFee(post.fee?.toString());
        setPaidEvent(post.fee ? "paid" : "free");
    }, [post]);

    /** Methods */
    const handleLocationChange = (key: keyof Location) => {
        setLocation((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleFrequencyChange = (key: keyof Frequency) => {
        setFrequency((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handlePaidEventChange = (value: string) => {
        setPaidEvent(value);
        if (value === 'free') {
            setFee("");
        }
    }

    const pickImage = async () => {
        try {
            // request permission if needed
            if (Platform.OS !== "web") {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert("Permission denied", "We need camera role permission to upload an image");
                    return;
                }
            }
            // launch image library
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: 'images',
                allowsEditing: false,
                quality: 1,
                base64: false,
            })

            if (!result.canceled) {
                const selectedAsset = result.assets[0];
                setImageUri(selectedAsset.uri);
                setImageAsset(selectedAsset);
            }
        } catch (error) {
            console.log("Error picking image", error);
            Alert.alert("Error", "There was a problem selecting your image");
        }
    }

    // Define the delay function
    const delay = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));

    const handleEventDatesChange = (dates: Date[]) => {
        // const newEventDates = dates.map(date => date.value.toJSON());
        setEventDates(dates);
        console.log('Updated event dates:', dates);
    };

    const handleAddressChange = (address: {
        country: "Germany",
        city: "",
        street: "",
        houseNumber: "",
        zipCode: "",
        state: "",
    }) => {
        console.log("Address final2: ", address);
        setAddress(address);
    }

    const resetForm = () => {
        setTitle("");
        setImageUri("");
        setImageAsset(null);
        setImageResizeOption(DEFAULT_IMAGE_RESIZE_OPTION);
        setPhone("");
        setEmail("");
        setLocation({
            online: false,
            onsite: true,
        });
        setAddress({
            street: "",
            houseNumber: "",
            zipCode: "",
            city: "",
            state: "",
            country: ""
        });
        setLink("");
        setDescription("");
        setFee("");
        setFrequency({
            daily: false,
            weekly: false,
            monthly: false,
            yearly: false,
        });
        setCategories([]);
        setPaidEvent("free");
        setLoading(false);
    }

    const uploadImage = async (
        imageUri: string
    ): Promise<UploadImageResponse> => {
        const formData = new FormData();

        const uriParts = imageUri.split(".");
        const fileType = uriParts[uriParts.length - 1].toLocaleLowerCase();

        const mimeTypeMap: Record<string, string> = {
            png: "image/png",
            gif: "image/gif",
            webp: "image/webp",
        };

        const mimeType = mimeTypeMap[fileType] || "image/jpeg";

        formData.append("image", {
            uri: imageUri,
            name: `image.${fileType}`,
            type: mimeType
        } as any);

        const response = await postApi.uploadImage(api, formData);
        return response.data;
    };

    const savePost = async (postData: Post) => {
        const response = await postApi.updatePost(api, postData);
        return response.data;
    };

    const uploadImageMutation = useMutation({
        mutationFn: uploadImage,
        onSuccess: (response) => {
            console.log("Successfully upload image. imageUrl: ", response.url);
        },
        onError: (error) => {
            console.log("Failed to upload image. ", error.message);
            Alert.alert("Error", "Failed to upload image. Please try again");
            setLoading(false);
        }
    });

    const updatePostMutation = useMutation({
        mutationFn: savePost,
        onSuccess: () => {
            resetForm();
            Alert.alert("Success", "Post updated successfully");
            router.back();
        },
        onError: (error) => {
            console.log("Failed to update post. ", error.message);
            Alert.alert("Error", "Failed to update Post. Please try again");
            setLoading(false);
        }
    });

    const updatePost = async () => {
        //TODO extend the validation on other fields
        setLoading(true);
        await delay(1000); // Wait for 1 second
        if (!title.trim() && !imageUri) {
            Alert.alert("Error", "Please provide a title and an image to your post");
            setLoading(false);
            return;
        }
        const newEventDates = eventDates.map(eventDate => eventDate.toJSON());

        const postData: Post = {
            id:postId,
            title,
            categories,
            phone,
            email,
            location,
            address,
            link,
            eventDates: newEventDates,
            frequency,
            description,
            fee: fee ? Number(fee): undefined,
        };
        console.log("*******Postdata to update");
        console.log("Postdata: ", postData);
        
        if (imageUri) {
            const imageUriForUpload = imageAsset ? await compressImageForUpload(imageAsset, imageResizeOption) : imageUri;
            const uploadResult = await uploadImageMutation.mutateAsync(imageUriForUpload);
            postData.image = uploadResult.url;
        }

        await updatePostMutation.mutateAsync(postData);
        setLoading(false);
    };

    return {
        title, setTitle,
        categories, setCategories,
        imageUri, setImageUri,
        imageResizeOption, setImageResizeOption,
        phone, setPhone,
        email, setEmail,
        location, setLocation,
        address, setAddress,
        link, setLink,
        eventDates, setEventDates,
        frequency, setFrequency,
        description, setDescription,
        fee, setFee,
        paidEvent, setPaidEvent,
        loading, setLoading,
        isLoadingPost,
        errorPost,
        isCreating: updatePostMutation.isPending,
        removeImage: () => {
            setImageUri("");
            setImageAsset(null);
            setImageResizeOption(DEFAULT_IMAGE_RESIZE_OPTION);
        },
        pickImage,
        handleLocationChange,
        handleFrequencyChange,
        handlePaidEventChange,
        handleEventDatesChange,
        handleAddressChange,
        updatePost,
    };
};

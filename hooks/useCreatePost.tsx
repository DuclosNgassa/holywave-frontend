import { Address, Frequency, Location, UploadImageResponse } from "@/app/models/types";
import { useState } from "react";
import { Alert, Platform } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import type { ImagePickerAsset } from 'expo-image-picker';
import { useMutation } from "@tanstack/react-query";
import { Post } from "@/app/models/post";
import { postApi, useApiClient } from "@/utils/api";
import { compressImageForUpload, DEFAULT_IMAGE_RESIZE_OPTION, ImageResizeOption } from "@/utils/imageUpload";


export const useCreatePost = () => {
    const api = useApiClient();
    const [postId, setPostId] = useState("");
    /** UseState */
    const [title, setTitle] = useState("");
    const [categories, setCategories] = useState([]);;
    const [imageUri, setImageUri] = useState<string>("");
    const [imageAsset, setImageAsset] = useState<ImagePickerAsset | null>(null);
    const [imageResizeOption, setImageResizeOption] = useState<ImageResizeOption>(DEFAULT_IMAGE_RESIZE_OPTION);
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState<Location>({
        online: false,
        onsite: true
    });
    const [address, setAddress] = useState<Address>({
        street: "",
        houseNumber: "",
        zipCode: "",
        city: "",
        state: "",
        country: "Germany",
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
            setFee(undefined);
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
            onsite: true
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
        setFee(undefined);
        setFrequency({
            daily: false,
            weekly: false,
            monthly: false,
            yearly: false,
        });
        setCategories([]);
        setPaidEvent("free");
        setEventDates([]);
        setLoading(false);
    }

    //const queryClient = useQueryClient();

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
        });

        const response = await postApi.uploadImage(api, formData);
        return response.data;
    };

    const savePost = async (postData: Post) => {
        const response = await postApi.savePost(api, postData);
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

    const createPostMutation = useMutation({
        mutationFn: savePost,
        onSuccess: (postCreated) => {
            resetForm();
            Alert.alert("Success", "Post created successfully");
            console.log("New post created postId: ", postCreated.id);
        },
        onError: (error) => {
            console.log("Failed to create post. ", error.message);
            Alert.alert("Error", "Failed to create Post");
            setLoading(false);
        }
    });

    const createPost = async () => {
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
        console.log("*******Postdata before mutation function: ");
        console.log("Postdata: ", postData);

        if (imageUri) {
            const compressedImageUri = await compressImageForUpload(
                imageAsset ?? { uri: imageUri, width: 0, height: 0 },
                imageResizeOption
            );
            const uploadResult = await uploadImageMutation.mutateAsync(compressedImageUri);
            postData.image = uploadResult.url;
        }

        await createPostMutation.mutateAsync(postData);

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
        isCreating: createPostMutation.isPending,
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
        createPost,
    };
};

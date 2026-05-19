import * as ImageManipulator from 'expo-image-manipulator';
import type { ImagePickerAsset } from 'expo-image-picker';

const UPLOAD_IMAGE_QUALITY = 0.82;

export type ImageResizeOption = 'small' | 'medium' | 'large' | 'original';

export const IMAGE_RESIZE_OPTIONS: {
    label: string;
    value: ImageResizeOption;
    maxDimension?: number;
}[] = [
    { label: 'Small', value: 'small', maxDimension: 960 },
    { label: 'Medium', value: 'medium', maxDimension: 1600 },
    { label: 'Large', value: 'large', maxDimension: 2400 },
    { label: 'Original', value: 'original' },
];

export const DEFAULT_IMAGE_RESIZE_OPTION: ImageResizeOption = 'medium';

export const compressImageForUpload = async (
    asset: ImagePickerAsset,
    resizeOption: ImageResizeOption = DEFAULT_IMAGE_RESIZE_OPTION
): Promise<string> => {
    const selectedResizeOption = IMAGE_RESIZE_OPTIONS.find((option) => option.value === resizeOption);
    const resizeAction = getResizeAction(asset.width, asset.height, selectedResizeOption?.maxDimension);

    const result = await ImageManipulator.manipulateAsync(
        asset.uri,
        resizeAction ? [resizeAction] : [],
        {
            compress: UPLOAD_IMAGE_QUALITY,
            format: ImageManipulator.SaveFormat.JPEG,
        }
    );

    return result.uri;
};

const getResizeAction = (width?: number, height?: number, maxDimension?: number) => {
    if (!width || !height || !maxDimension) {
        return undefined;
    }

    const largestSide = Math.max(width, height);
    if (largestSide <= maxDimension) {
        return undefined;
    }

    if (width >= height) {
        return { resize: { width: maxDimension } };
    }

    return { resize: { height: maxDimension } };
};

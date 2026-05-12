
export type Location = {
    online: boolean;
    onsite: boolean;
};

export type Frequency = {
    daily: boolean;
    weekly: boolean;
    monthly: boolean;
    yearly: boolean;
};

export type Address = {
    country: string,
    city: string,
    street: string,
    houseNumber: string,
    zipCode: string,
    state: string,
}

export type AddressProps = {
    address?: Address;
    onChange?: (address: any) => void;
};

export type EventDateType = {
    id: string;
    value: Date;
};

export type EventDateListProps = {
    eventDates?: Date[]; // default = empty
    onChange?: (dates: Date[]) => void; // optional callback to parent
};

export interface User {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    profilePicture?: string;
}

export type UploadImageResponse = {
    url: string;
};

export enum ImageSize {
    Small = "SMALL",
    Medium = "MEDIUM",
    Big = "BIG",
 };
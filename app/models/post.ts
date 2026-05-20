import { Address, Frequency, Location } from "./types"

export type PostCategory = string | {
    id: string;
    name: string;
};

export type Post = {
    id?: string,
    title: string,
    categories: PostCategory[],
    image?: string,
    phone?: string,
    email?: string,
    location: Location,
    address?: Address,
    link?: string,
    eventDates: string[],
    frequency: Frequency,
    description: string,
    fee?: number,
    liked?: boolean,
    numberOfLikes?: number,
    bookmarked?: boolean,
    comments?: string[]
    userId?: string,
    author?: string,
};

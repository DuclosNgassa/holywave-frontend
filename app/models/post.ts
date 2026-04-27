import { Address, Frequency, Location } from "./types"

type imageType = {
    uri: string,
    name: string,
    type: string,
};

export type Post = {
    id: string,
    title: string,
    categories: string[],
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
import { Frequency, Location } from "@/app/models/types";

type FormattedDateTime = {
    date: string;
    time: string;
};

export const formatDateTimeIntl = (isoString: string): FormattedDateTime | undefined => {
    try {
        const d = new Date(isoString);

        const formattedDate = new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).format(d).replace(/\//g, '-');

        const formattedTime = new Intl.DateTimeFormat('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }).format(d);
        return { date: formattedDate, time: formattedTime };
    } catch (error) {
        console.log("isoString", isoString);
        console.log(error);
    }

};

export const sortAscAndFormatDates = (arr: string[]): FormattedDateTime[] => {
    return [...arr]
        .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
        .reduce<FormattedDateTime[]>((dates, iso) => {
            try {
                const d = new Date(iso);
                const date = new Intl.DateTimeFormat('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                }).format(d).replace(/\//g, '-');
                const time = new Intl.DateTimeFormat('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                }).format(d);
                dates.push({ date, time });
            } catch (error) {
                console.log(iso);
                console.log(error);
            }
            return dates;
        }, []);
};

// Format a number to a shorter format (e.g., 1000 -> 1K)
export const formatNumber = (num: number): string => {
    if (num >= 1000) return Math.floor(num / 1000) + "K";
    return num.toString();
};


export const formattedFrequency = (frequency: Frequency): string => {
    return Object.entries(frequency).filter(([key]) => key !== 'id').filter(([_, value]) => value).map(([key]) => key.charAt(0).toUpperCase() + key.slice(1)).join(' / ')
}

export const formattedLocation = (location: Location): string => {
    return Object.entries(location).filter(([key]) => key !== 'id').filter(([_, value]) => value).map(([key]) => key.charAt(0).toUpperCase() + key.slice(1)).join(' / ')
}

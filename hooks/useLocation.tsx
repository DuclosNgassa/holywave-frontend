import { useCallback, useEffect, useState } from 'react'
import * as Location from 'expo-location';
import type { LocationGeocodedAddress, LocationObject } from 'expo-location';

const useLocation = () => {
    const [errorMsg, setErrorMsg] = useState("");
    const [longitude, setLongitude] = useState<number | undefined>(undefined);
    const [latitude, setLatitude] = useState<number | undefined>(undefined);
    const [userGeocodedAddress, setUserGeocodedAddress] = useState<LocationGeocodedAddress | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);

    const updateLocation = useCallback(async (location: LocationObject) => {
        const { latitude, longitude } = location.coords;

        setLatitude(latitude);
        setLongitude(longitude);

        try {
            const [geocodedAddress] = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            });

            if (geocodedAddress) {
                setUserGeocodedAddress(geocodedAddress);
            }
        } catch (error) {
            console.warn('Could not reverse geocode current location:', error);
            setErrorMsg('We found your location, but could not resolve your address.');
        }
    }, []);

    const getUserLocation = useCallback(async () => {
        if (isLoading) return;
        
        setIsLoading(true);
        setErrorMsg("");

        try {
            // 1. Check if location services are enabled
            const isLocationEnabled = await Location.hasServicesEnabledAsync();
            if (!isLocationEnabled) {
                setErrorMsg("Location services are disabled on your device.");
                setIsLoading(false);
                return;
            }

            // 2. Request permissions
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied.');
                setIsLoading(false);
                return;
            }

            // 3. Try to get last known position first (fastest)
            let location = await Location.getLastKnownPositionAsync({
                maxAge: 300_000, // 5 minutes
            });

            // 4. If no last known position, try to get current position with timeout
            if (!location) {
                try {
                    location = await Location.getCurrentPositionAsync({
                        accuracy: Location.Accuracy.Balanced,
                        timeInterval: 5000, // Hint for Android
                    });
                } catch (currentError) {
                    console.warn('getCurrentPositionAsync failed, retrying with Lowest accuracy:', currentError);
                    // Final attempt with lowest accuracy and no timeout
                    location = await Location.getCurrentPositionAsync({
                        accuracy: Location.Accuracy.Lowest,
                    });
                }
            }

            if (location) {
                await updateLocation(location);
            } else {
                setErrorMsg('Unable to determine your location at this time.');
            }
        } catch (error) {
            console.error('Fatal location error:', error);
            setErrorMsg('A problem occurred while accessing your location.');
        } finally {
            setIsLoading(false);
        }
    }, [updateLocation, isLoading]);

    useEffect(() => {
        getUserLocation();
    }, []); // Only run once on mount

    return { latitude, longitude, errorMsg, userGeocodedAddress, isLoading, refetchLocation: getUserLocation };
}

export default useLocation;

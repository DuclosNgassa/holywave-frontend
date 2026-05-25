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
            // Silently warn for geocoding errors - location coordinates are still valid
            console.warn('Location found, but reverse geocoding failed.', error);
            setErrorMsg('Location found, but address could not be resolved.');
        }
    }, []);

    const getUserLocation = useCallback(async () => {
        if (isLoading) return;
        
        setIsLoading(true);
        setErrorMsg("");

        try {
            // 1. Pre-checks: Services and Permissions
            const isLocationEnabled = await Location.hasServicesEnabledAsync();
            if (!isLocationEnabled) {
                setErrorMsg("Location services are disabled.");
                setIsLoading(false);
                return;
            }

            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Location permission denied.');
                setIsLoading(false);
                return;
            }

            // 2. Multi-stage location retrieval strategy
            let location: LocationObject | null;

            // Stage A: Get Last Known (Instant fallback)
            location = await Location.getLastKnownPositionAsync({
                maxAge: 600_000, // 10 minutes is acceptable for "Nearby"
            });

            // Stage B: Attempt fresh balanced fix if no last known
            if (!location) {
                try {
                    // Try with balanced accuracy first
                    location = await Location.getCurrentPositionAsync({
                        accuracy: Location.Accuracy.Balanced,
                    });
                } catch (e) {
                    // Stage C: Final attempt with lowest accuracy (e.g. Cell Tower only)
                    // This often resolves the 'kCLErrorDomain error 0'
                    console.warn(e);
                    try {
                        location = await Location.getCurrentPositionAsync({
                            accuracy: Location.Accuracy.Lowest,
                        });
                    } catch (finalError) {
                        // All attempts failed
                        console.warn(finalError);
                        location = null;
                    }
                }
            }

            if (location) {
                await updateLocation(location);
            } else {
                setErrorMsg('Could not determine location (Weak GPS).');
            }
        } catch (error) {
            // Catch-all for unexpected system errors - No more console.error to avoid spam
            console.warn('Non-fatal location error occurred.', error);
            setErrorMsg('Unable to access location data right now.');
        } finally {
            setIsLoading(false);
        }
    }, [updateLocation, isLoading]);

    useEffect(() => {
        getUserLocation();
    }, []); 

    return { latitude, longitude, errorMsg, userGeocodedAddress, isLoading, refetchLocation: getUserLocation };
}

export default useLocation;

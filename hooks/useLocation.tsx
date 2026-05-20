import { useCallback, useEffect, useState } from 'react'
import * as Location from 'expo-location';
import type { LocationGeocodedAddress, LocationObject } from 'expo-location';

const useLocation = () => {
    const [errorMsg, setErrorMsg] = useState("");
    const [longitude, setLongitude] = useState<number | undefined>(undefined);
    const [latitude, setLatitude] = useState<number | undefined>(undefined);
    const [userGeocodedAddress, setUserGeocodedAddress] = useState<LocationGeocodedAddress|undefined>(undefined);
    
    const updateLocation = useCallback(async ({ coords }: LocationObject) => {
        const { latitude, longitude } = coords;

        setLatitude(latitude);
        setLongitude(longitude);

        try {
            const [geocodedAddress] = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            });

            setUserGeocodedAddress(geocodedAddress);
        } catch (error) {
            console.warn('Could not reverse geocode current location', error);
            setErrorMsg('We found your location, but could not resolve your address.');
        }
    }, []);

    const getUserLocation = useCallback(async () => {
        setErrorMsg("");

        try {
            const isLocationEnabled = await Location.hasServicesEnabledAsync();

            if (!isLocationEnabled) {
                setErrorMsg("Location services are turned off.");
                return;
            }

            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMsg('Permission to access location was not granted.');
                return;
            }

            const location =
                await Location.getLastKnownPositionAsync({
                    maxAge: 60_000,
                    requiredAccuracy: 500,
                }) ?? await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Balanced,
                });

            updateLocation(location);
        } catch (error) {
            console.warn('Could not obtain current location', error);
            setErrorMsg('We could not determine your current location right now.');
        }
    }, [updateLocation]);

    useEffect(() => {
        getUserLocation();
    }, [getUserLocation]);

    return { latitude, longitude, errorMsg, userGeocodedAddress};
}

export default useLocation

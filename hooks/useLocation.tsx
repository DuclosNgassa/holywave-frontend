import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import { UserLocation } from '@/types/userLocation';
import { LocationGeocodedAddress } from 'expo-location';

const useLocation = () => {
    const [errorMsg, setErrorMsg] = useState("");
    const [longitude, setLongitude] = useState<number | undefined>(undefined);
    const [latitude, setLatitude] = useState<number | undefined>(undefined);
    const [userGeocodedAddress, setUserGeocodedAddress] = useState<LocationGeocodedAddress|undefined>(undefined);
    
    const getUserLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            setErrorMsg('Permission to location was ot granted');
            return;
        }

        let { coords } = await Location.getCurrentPositionAsync();
        if (coords) {
            const { latitude, longitude } = coords;
            //console.log("lat and long are: ", latitude, longitude);
            setLatitude(latitude);
            setLongitude(longitude);
            let geocodedAddress = await Location.reverseGeocodeAsync({
                latitude,
                longitude
            });

            setUserGeocodedAddress(geocodedAddress[0]);
        }
    };

    useEffect(() => {
        getUserLocation();
    }, []);

    return { latitude, longitude, errorMsg, userGeocodedAddress};
}

export default useLocation
import { Address, AddressProps } from "@/app/models/types";
import styles from "@/assets/styles/post.styles";
import { COLORS } from "@/constants/colors";
import React, { useState } from "react";
import { View, TextInput } from "react-native";
import CountryPicker from 'react-native-country-picker-modal'
import type { Country, CountryCode } from 'react-native-country-picker-modal';

const emptyAddress: Address = {
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zipCode: "",
    state: "",
};


const AddressComponent: React.FC<AddressProps> = ({ address, onChange }) => {
    const currentAddress = address ?? emptyAddress;

    const [countryCode, setCountryCode] = useState<CountryCode>('DE')
    const changeAddress = (key: keyof Address, value: string) => {

        const updatedAddress = ({ ...currentAddress, [key]: value });
        onChange?.(updatedAddress);
    };

    const onSelect = (country: Country) => {
        setCountryCode(country.cca2)
        changeAddress('country', String(country.name));
    }

    const withCountryNameButton = false;
    const withFlag = true;
    const withEmoji = true;
    const withFilter = true;
    const withAlphaFilter = false;
    const withCallingCode = false;

    return (
        <>
            <View style={{ flexDirection: 'row', gap: '10', marginTop: 8 }}>
                <View style={{ flex: 5 }}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder='Street'
                            placeholderTextColor={COLORS.placeholderText}
                            value={currentAddress.street}
                            onChangeText={(value) => changeAddress("street", value)}
                        />
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder='Nr.'
                            placeholderTextColor={COLORS.placeholderText}
                            value={currentAddress.houseNumber}
                            onChangeText={(value) => changeAddress("houseNumber", value)}
                        />
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', gap: '10', marginTop: 8 }}>
                <View style={{ flex: 1 }}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder='ZipCode'
                            placeholderTextColor={COLORS.placeholderText}
                            value={currentAddress.zipCode}
                            onChangeText={(value) => changeAddress("zipCode", value)}
                        />
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder='City'
                            placeholderTextColor={COLORS.placeholderText}
                            value={currentAddress.city}
                            onChangeText={(value) => changeAddress("city", value)}
                        />
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', gap: '10', marginTop: 8 }}>
                <View style={{ flex: 1 }}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder='State'
                            placeholderTextColor={COLORS.placeholderText}
                            value={currentAddress.state}
                            onChangeText={(value) => changeAddress("state", value)}
                        />
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={styles.inputContainer}>
                        <CountryPicker
                            {...{
                                countryCode,
                                withFilter,
                                withFlag,
                                withCountryNameButton,
                                withAlphaFilter,
                                withCallingCode,
                                withEmoji,
                                onSelect,
                            }}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Germany'
                            placeholderTextColor={COLORS.placeholderText}
                            value={currentAddress.country}
                        />
                    </View>
                </View>
            </View>
        </>
    );
}

export default AddressComponent;

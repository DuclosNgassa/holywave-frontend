import { Address, AddressProps } from "@/app/models/types";
import styles from "@/assets/styles/post.styles";
import { COLORS } from "@/constants/colors";
import React, { useState } from "react";
import { View, TextInput } from "react-native";
import CountryPicker from 'react-native-country-picker-modal'


const AddressComponent: React.FC<AddressProps> = ({ address, onChange }) => {

    const [countryCode, setCountryCode] = useState('DE')
    const changeAddress = (key: keyof Address, value: string) => {

        const updatedAddress = ({ ...address, [key]: value });
        onChange?.(updatedAddress);
    };

    const onSelect = (country) => {
        setCountryCode(country.cca2)
        changeAddress('country', country.name);
    }

    const [withCountryNameButton, setWithCountryNameButton] = useState<boolean>(
        false,
    )
    const [withFlag, setWithFlag] = useState<boolean>(true)
    const [withEmoji, setWithEmoji] = useState<boolean>(true)
    const [withFilter, setWithFilter] = useState<boolean>(true)
    const [withAlphaFilter, setWithAlphaFilter] = useState<boolean>(false)
    const [withCallingCode, setWithCallingCode] = useState<boolean>(false)

    return (
        <>
            <View style={{ flexDirection: 'row', gap: '10', marginTop: 8 }}>
                <View style={{ flex: 5 }}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder='Street'
                            placeholderTextColor={COLORS.placeholderText}
                            value={address.street}
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
                            value={address.houseNumber}
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
                            value={address.zipCode}
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
                            value={address.city}
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
                            value={address.state}
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
                            value={address.country}
                        />
                    </View>
                </View>
            </View>
        </>
    );
}

export default AddressComponent;
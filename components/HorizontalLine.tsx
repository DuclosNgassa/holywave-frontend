import { View, StyleSheet } from 'react-native'
import React from 'react'

const HorizontalLine = () => {
    return (
        <View style={{ marginVertical: 5 }}>
            <View style={styles.container}>
                <View style={styles.line} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: '100%',
    },
});

export default HorizontalLine
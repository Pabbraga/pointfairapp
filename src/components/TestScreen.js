import React, { useState, useEffect } from 'react';
import { 
    View, 
    Image, 
    SafeAreaView, 
    TouchableOpacity,
    Text, 
    FlatList, 
    ActivityIndicator, 
    Alert,
    StyleSheet
} from 'react-native';
import {
    BannerAd,
    BannerAdSize,
    TestIds,
    } from "react-native-google-mobile-ads";
const adUnitID = __DEV__
? TestIds.BANNER
: "ca-app-pub-2293837588242630/4933067094";

export default function TestScreen() {
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.bannerContainer}>
                <BannerAd
                    unitId={adUnitID}
                    size={BannerAdSize.FULL_BANNER}
                    requestOptions={{ requestNonPersonalizedAdsOnly: true }}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bannerContainer: {
        padding: 10,
        backgroundColor: 'red'
    }
})
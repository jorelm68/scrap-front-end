import { View, Text, TouchableOpacity } from 'react-native-ui-lib';
import React, { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import { useNavigation, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../data/styles';
import { scrapSaveScrap } from '../data/api';
import { Alert } from 'react-native';

const SaveScrap = () => {
    const { user, scrap, setScrap, setIsSaving, setShowButtons } = useContext(AppContext);
    const navigation = useNavigation();
    const router = useRouter();

    useEffect(() => {
        const updateHeaderRightIcon = () => {
            navigation.setOptions({
                headerRight: () => (
                    <TouchableOpacity onPress={async () => {
                        router.push('/loading');
                        const response = await scrapSaveScrap(scrap);
                        if (!response.success) {
                            Alert.alert('Error', response.error);
                        }
                        setScrap((prevScrap) => ({
                            ...prevScrap,
                            author: user,
                        }));
                        setIsSaving(false);
                    }}>
                        <Ionicons name='checkmark' color={colors.success} size={32} />
                    </TouchableOpacity>
                ),
                headerLeft: () => ( // Corrected headerLeft configuration
                    <TouchableOpacity onPress={() => {
                        console.log('got here')
                        setScrap({
                            author: user,
                        });
                        setIsSaving(false);
                        while (router.canGoBack()) {
                            router.back()
                        }
                        router.push('/camera')
                        setShowButtons(true)
                    }}>
                        <Ionicons name='close' color={colors.error} size={32} />
                    </TouchableOpacity>
                ), // Don't forget the closing parenthesis for headerLeft
            });
        };
        updateHeaderRightIcon();
    }, [navigation]);

    console.log(scrap);
    return (
        <View>
            <Text>SaveScrap</Text>
        </View>
    );
};

export default SaveScrap;

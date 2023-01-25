import { Platform, ToastAndroid } from "react-native";

export const failed = () => {

    if (Platform.OS === 'android') {
        ToastAndroid.show('API Query has failed. Please try again in a little bit.', ToastAndroid.SHORT);
    }
}

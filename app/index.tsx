import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import AppNavigator from "../src/navigation/AppNavigator";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Alert } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function index() {
  useEffect(() => {
    async function requestPermissions() {
      if (Device.isDevice) {
        const { status } = await Notifications.getPermissionsAsync();
        let finalStatus = status;
        if (status !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          Alert.alert("Permission for notifications not granted!");
        }
      }
    }
    requestPermissions();
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

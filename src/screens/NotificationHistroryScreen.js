import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

export default function NotificationHistoryScreen() {
  const [logs, setLogs] = useState([]);

  const loadLogs = async () => {
    const stored = await AsyncStorage.getItem("notificationLogs");
    if (stored) setLogs(JSON.parse(stored));
  };

  const saveNotification = async (notification) => {
    const newLog = {
      title: notification?.request?.content?.title || "No title",
      body: notification?.request?.content?.body || "No body",
      time: new Date().toLocaleString(),
    };

    const stored = await AsyncStorage.getItem("notificationLogs");
    const updatedLogs = stored ? JSON.parse(stored) : [];
    updatedLogs.unshift(newLog);

    await AsyncStorage.setItem("notificationLogs", JSON.stringify(updatedLogs));
    setLogs(updatedLogs);
  };

  useEffect(() => {
    loadLogs();

    const foregroundSub = Notifications.addNotificationReceivedListener((notification) => {
      saveNotification(notification);
    })
    const responseSub = Notifications.addNotificationResponseReceivedListener((response) => {
    saveNotification(response.notification);
    })

    return () => {
      foregroundSub.remove();
      responseSub.remove()
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notification History</Text>
      {logs.length === 0 ? (
        <Text style={styles.empty}>No notifications yet</Text>
      ) : (
        <FlatList
          data={logs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.body}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  empty: { fontSize: 16, color: "gray", textAlign: "center", marginTop: 50 },
  card: {
    backgroundColor: "#F1F1F1",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: { fontWeight: "bold", fontSize: 16, marginBottom: 4 },
  time: { fontSize: 12, color: "gray", marginTop: 4 },
});

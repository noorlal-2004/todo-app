import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import AddTaskScreen from "../screens/AddTaskScreen";
import NotificationHistoryScreen from "../screens/NotificationHistroryScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={26}
              color={focused ? "#6C63FF" : "gray"}
            />
          ),
        }}
      />

      <Tab.Screen
        name="AddTask"
        component={AddTaskScreen}
        options={{
          tabBarIcon: () => (
            <View style={styles.addButton}>
              <Ionicons name="add" size={32} color="white" />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={NotificationHistoryScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "notifications" : "notifications-outline"}
              size={26}
              color={focused ? "#6C63FF" : "gray"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 15,
    left: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 20,
    height: 70,
    elevation: 5,
  },
  addButton: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: "#6C63FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    elevation: 5,
  },
});

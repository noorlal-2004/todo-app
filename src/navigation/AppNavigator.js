import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import BottomTabNavigator from "./BottomTabNavigator";
import TaskDetailScreen from "../screens/TaskDetailScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationIndependentTree>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: "#6C63FF" }, headerTintColor: "#fff" }}>
        <Stack.Screen name="ToDo" component={BottomTabNavigator} />
        <Stack.Screen name="TaskDetail" component={TaskDetailScreen} options={{ title: "Task Details" }} />
      </Stack.Navigator>
    </NavigationContainer>
    </NavigationIndependentTree>
  );
}

import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import TaskItem from "../components/TaskItem";

export default function HomeScreen({ navigation }) {
  const tasks = useSelector((state) => state.tasks);
  const pendingTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Tasks</Text>

      <Text style={styles.section}>Pending</Text>
      <FlatList
        data={pendingTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onPress={() => navigation.navigate("TaskDetail", { id: item.id })}
          />
        )}
      />

      <Text style={styles.section}>Completed</Text>
      <FlatList
        data={completedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onPress={() => navigation.navigate("TaskDetail", { id: item.id })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F9F9F9" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#333" },
  section: { fontSize: 18, fontWeight: "600", marginTop: 15, marginBottom: 8 },
});

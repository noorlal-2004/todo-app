import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { toggleTask, deleteTask } from "../redux/taskSlice";

export default function TaskDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const task = useSelector((state) => state.tasks.find((t) => t.id === id));
  const dispatch = useDispatch();

  if (!task) return <Text style={{ padding: 20 }}>Task not found</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.category}>Category: {task.category}</Text>
      <Text>Status: {task.completed ? "Completed" : "Pending"}</Text>
      {task.reminderTime && (
        <Text>Reminder: {new Date(task.reminderTime).toLocaleString()}</Text>
      )}

      <TouchableOpacity style={styles.btn} onPress={() => dispatch(toggleTask(task.id))}>
        <Text style={styles.btnText}>
          {task.completed ? "Mark as Pending" : "Mark as Completed"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: "red" }]}
        onPress={() => {
          dispatch(deleteTask(task.id));
          navigation.goBack();
        }}
      >
        <Text style={styles.btnText}>Delete Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  category: { fontSize: 16, color: "gray", marginBottom: 20 },
  btn: {
    backgroundColor: "#6C63FF",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  btnText: { color: "white", fontWeight: "bold" },
});

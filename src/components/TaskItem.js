import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TaskItem({ task, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.category}>{task.category}</Text>
        {task.reminderTime && (
          <Text style={styles.reminder}>
            {new Date(task.reminderTime).toLocaleTimeString()}
          </Text>
        )}
      </View>
        <Ionicons
          name={task.completed ? "checkmark-circle" : "ellipse-outline"}
          size={24}
          color={task.completed ? "#6C63FF" : "gray"}
        />    
        
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 16, fontWeight: "bold" },
  category: { fontSize: 14, color: "gray" },
  reminder: { fontSize: 12, color: "#6C63FF" },
});

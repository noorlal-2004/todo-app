import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Notifications from "expo-notifications";

export default function AddTaskScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Work");
  const [reminderTime, setReminderTime] = useState(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const dispatch = useDispatch();

  const scheduleReminder = async (reminderTimeString) => {
    if (!reminderTimeString) return;

    const reminderDate = new Date(reminderTimeString);

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Task Reminder",
          body: title || "You have a task due!",
        },
        trigger: { type: "date", date: reminderDate }, 
      });
      console.log("Notification scheduled for:", reminderDate);
    } catch (err) {
      console.log("Error scheduling notification:", err);
    }
  };

  const handleSave = () => {
    if (title.trim()) {
      const reminderTimeString = reminderTime ? reminderTime.toISOString() : null;

      dispatch(addTask({ title, category, reminderTime: reminderTimeString }));

      if (reminderTimeString) {
        scheduleReminder(reminderTimeString);
        Alert.alert("Reminder set!", `Task will remind you at ${new Date(reminderTimeString).toLocaleString()}`);
      }

      navigation.goBack();
    } else {
      Alert.alert("Task title is required!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Task</Text>

      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Category (Work, Personal, Study)"
        value={category}
        onChangeText={setCategory}
      />

      <TouchableOpacity style={styles.reminderBtn} onPress={() => setDatePickerVisible(true)}>
        <Text style={styles.reminderText}>
          {reminderTime
            ? `Reminder: ${reminderTime.toLocaleDateString()} ${reminderTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}`
            : "Set Reminder"}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime" 
        onConfirm={(date) => {
          setReminderTime(date);
          setDatePickerVisible(false);
        }}
        onCancel={() => setDatePickerVisible(false)}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  reminderBtn: {
    backgroundColor: "#EDE7FF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  reminderText: { color: "#6C63FF", fontWeight: "500" },
  saveBtn: {
    backgroundColor: "#6C63FF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveText: { color: "white", fontWeight: "bold" },
});

import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push({
        id: Date.now().toString(),
        title: action.payload.title,
        category: action.payload.category,
        completed: false,
        reminderTime: action.payload.reminderTime || null, 
        notificationId: action.payload.notificationId || null,
      });
    },
    toggleTask: (state, action) => {
      const task = state.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    deleteTask: (state, action) => {
      return state.filter((t) => t.id !== action.payload);
    },
    setReminder: (state, action) => {
      const { id, reminderTime = null, notificationId = null } = action.payload;
      const task = state.find((t) => t.id === id);
      if (task) {
        task.reminderTime = reminderTime;
        task.notificationId = notificationId;
      }
    },
    clearNotificationId: (state, action) => {
      const task = state.find((t) => t.id === action.payload);
      if (task) task.notificationId = null;
    },
  },
});

export const { addTask, toggleTask, deleteTask, setReminder, clearNotificationId } = taskSlice.actions;
export default taskSlice.reducer;

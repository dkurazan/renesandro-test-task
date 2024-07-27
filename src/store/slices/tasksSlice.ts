import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

export type Task = {
  id: string;
  name: string;
  dimension: '1x1' | '9x16' | '16x9';
  templateId: 'mwpswxcudtwxb' | '0xdoscyowl50c';
  text: string;
  ammount: string;
  genType: 'cyclic' | 'random';
  images: { name: string; url: string }[];
};

const initialState: Task[] = [];

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<string>) => {
      const newState = state.filter((task) => task.id !== action.payload);

      return newState;
    },
  },
});

export const { addTask, removeTask } = tasksSlice.actions;
export const selectCount = (state: RootState) => state.tasks;
export default tasksSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ImageLayer = {
  id: string;
  image?: string;
  dimension?: '1x1' | '9x16' | '16x9';
  style?: string;
  manual_prompts?: string;
  gen_per_ref?: number;
  flow?: string;
};

export type LayersObject = {
  taskId: string;
  images: ImageLayer[];
};

type AddDataPayload = {
  taskId: string;
  imageId: string;
  key: string;
  value: string;
};

const initialState: LayersObject[] = [];

export const tasksSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    addImageData(state, action: PayloadAction<AddDataPayload>) {
      // finding index of "LayersObject" object
      const taskIndex = state.findIndex(
        (task) => task.taskId === action.payload.taskId,
      );

      // checking if there is object with such index in the state
      if (taskIndex >= 0) {
        // finding index of "ImageLayer" object
        const imageIndex = state[taskIndex].images.findIndex(
          (image) => image.id === action.payload.imageId,
        );

        // checking if there is object with such index in the array
        if (imageIndex >= 0) {
          // adding passed value to the "ImageLayer" object

          state[taskIndex].images[imageIndex] = {
            ...state[taskIndex].images[imageIndex],
            [action.payload.key]: action.payload.value,
          };
        } else {
          // creating "ImageLayer" object
          state[taskIndex].images = [
            ...state[taskIndex].images,
            {
              id: action.payload.imageId,
              [action.payload.key]: action.payload.value,
            },
          ];
        }
      } else {
        // creating of "LayersObject" object
        state.push({
          taskId: action.payload.taskId,
          images: [
            {
              id: action.payload.imageId,
              [action.payload.key]: action.payload.value,
            },
          ],
        });
      }
    },
    resetImagesData: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.taskId !== action.payload);
    },
  },
});

export const { addImageData, resetImagesData } = tasksSlice.actions;
export default tasksSlice.reducer;

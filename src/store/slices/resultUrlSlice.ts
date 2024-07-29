import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

type StateType = {
  id: string;
  url: string;
}[];

type Payload = {
  id: string;
  name: string;
  dimension: string;
};

const initialState: StateType = [];

export const tasksSlice = createSlice({
  name: 'resulUrls',
  initialState,
  reducers: {
    saveCreoGeneration: (state, action: PayloadAction<Payload>) => {
      const url = `https://testapi-jvqis72guq-lm.a.run.app/test_vidro/${action.payload.name}_${action.payload.dimension}/format_validation`;

      state.push({
        id: action.payload.id,
        url,
      });
    },
    removeCreoGeneration: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { saveCreoGeneration, removeCreoGeneration } = tasksSlice.actions;
export default tasksSlice.reducer;

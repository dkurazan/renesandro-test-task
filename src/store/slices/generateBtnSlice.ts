import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

type StateType = {
  id: string;
  isBtnDisabled: boolean;
}[];

const initialState: StateType = [];

export const tasksSlice = createSlice({
  name: 'generateBtn',
  initialState,
  reducers: {
    addBtnObject: (state, action: PayloadAction<string>) => {
      state.push({
        id: action.payload,
        isBtnDisabled: true
      })
    },
    removeBtnObject: (state, action: PayloadAction<string>) => {
      return state.filter(item => item.id !== action.payload)
    },
    enableButton: (state, action: PayloadAction<string>) => {
      state.map((item) =>
        item.id === action.payload
          ? (item.isBtnDisabled = false)
          : item.isBtnDisabled,
      );
    },
  },
});

export const { addBtnObject, removeBtnObject, enableButton } = tasksSlice.actions;
export default tasksSlice.reducer;

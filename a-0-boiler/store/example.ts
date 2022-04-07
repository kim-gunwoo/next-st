import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExampleState } from "../types/reduxState";

//* 초기 상태
const initialState: ExampleState = {
  isExample: false,
};

const example = createSlice({
  name: "examlele",
  initialState,
  reducers: {
    //* isexamle 변경하기
    setIsExMode(state, action: PayloadAction<boolean>) {
      state.isExample = action.payload;
    },
  },
});

export const exampleAction = { ...example.actions };

export default example;

import { configureStore } from "@reduxjs/toolkit";
import memosSlice from "./memosSlice";

export const store = configureStore({
  reducer: {
    memosSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import { configureStore } from "@reduxjs/toolkit";
import designsReducer from "./designsSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    designs: designsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

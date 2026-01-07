import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: hoaNotificationStateType = {
  type: null,
  message: "",
};

export const hoaNotificationSlice = createSlice({
  name: "hoaNotification",
  initialState,
  reducers: {
    setNotification: (
      state,
      { payload }: PayloadAction<hoaNotificationStateType>
    ) => {
      return (state = payload);
    },
  },
});

const {
  reducer,
  actions: { setNotification },
  name,
} = hoaNotificationSlice;

export default reducer;

export { name, setNotification };

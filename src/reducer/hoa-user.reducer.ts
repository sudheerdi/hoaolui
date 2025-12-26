import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: userLoginResponseType = {
  token: "",
  user: {
    firstName: "",
    lastName: "",
    emailId: "",
    id: "",
    memberships: [
      {
        role: "",
        communityName: "",
        membershipId: "",
        communityId: "",
      },
    ],
    status: "",
  },
};

export const hoaUserSlice = createSlice({
  name: "hoaUser",
  initialState,
  reducers: {
    setUserProfile: (state, { payload }: PayloadAction<any>) => {
      return (state = payload);
    },
  },
});

const {
  reducer,
  actions: { setUserProfile },
  name,
} = hoaUserSlice;

export default reducer;

export { name, setUserProfile };

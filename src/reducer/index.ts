import hoaUserReducer from "./hoa-user.reducer";
import { hoaUserRegisterApi, hoaUserLoginApi } from "../services";

const reducer = {
  hoaUser: hoaUserReducer,
  [hoaUserRegisterApi.reducerPath]: hoaUserRegisterApi.reducer,
  [hoaUserLoginApi.reducerPath]: hoaUserLoginApi.reducer,
};

export default reducer;

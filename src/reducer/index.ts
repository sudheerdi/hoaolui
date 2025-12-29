import hoaUserReducer from "./hoa-user.reducer";
import {
  hoaUserRegisterApi,
  hoaUserLoginApi,
  hoaUnitsBulkUploadApi,
  hoaViolationsApi,
  hoaUserSearchApi,
} from "../services";

const reducer = {
  hoaUser: hoaUserReducer,
  [hoaUserRegisterApi.reducerPath]: hoaUserRegisterApi.reducer,
  [hoaUserLoginApi.reducerPath]: hoaUserLoginApi.reducer,
  [hoaUnitsBulkUploadApi.reducerPath]: hoaUnitsBulkUploadApi.reducer,
  [hoaViolationsApi.reducerPath]: hoaViolationsApi.reducer,
  [hoaUserSearchApi.reducerPath]: hoaUserSearchApi.reducer,
};

export default reducer;

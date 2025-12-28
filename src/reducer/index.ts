import hoaUserReducer from "./hoa-user.reducer";
import {
  hoaUserRegisterApi,
  hoaUserLoginApi,
  hoaUnitsBulkUploadApi,
  hoaViolationDefaultsApi,
} from "../services";

const reducer = {
  hoaUser: hoaUserReducer,
  [hoaUserRegisterApi.reducerPath]: hoaUserRegisterApi.reducer,
  [hoaUserLoginApi.reducerPath]: hoaUserLoginApi.reducer,
  [hoaUnitsBulkUploadApi.reducerPath]: hoaUnitsBulkUploadApi.reducer,
  [hoaViolationDefaultsApi.reducerPath]: hoaViolationDefaultsApi.reducer,
};

export default reducer;

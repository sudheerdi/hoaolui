import hoaUserReducer from "./hoa-user.reducer";
import hoaNotificationReducer from "./hoa-notificatio.reducer";
import {
  hoaUserRegisterApi,
  hoaUserLoginApi,
  hoaUnitsBulkUploadApi,
  hoaViolationsApi,
  hoaUserSearchApi,
} from "../services";

const reducer = {
  hoaUser: hoaUserReducer,
  hoaNotification: hoaNotificationReducer,
  [hoaUserRegisterApi.reducerPath]: hoaUserRegisterApi.reducer,
  [hoaUserLoginApi.reducerPath]: hoaUserLoginApi.reducer,
  [hoaUnitsBulkUploadApi.reducerPath]: hoaUnitsBulkUploadApi.reducer,
  [hoaViolationsApi.reducerPath]: hoaViolationsApi.reducer,
  [hoaUserSearchApi.reducerPath]: hoaUserSearchApi.reducer,
};

export default reducer;

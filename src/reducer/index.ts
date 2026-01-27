import hoaUserReducer from "./hoa-user.reducer";
import hoaNotificationReducer from "./hoa-notificatio.reducer";
import {
  hoaUserRegisterApi,
  hoaUserLoginApi,
  hoaViolationsApi,
  hoaUserSearchApi,
  hoaUnitsApi,
  hoaPollsApi,
  hoaDocumentsApi,
} from "../services";

const reducer = {
  hoaUser: hoaUserReducer,
  hoaNotification: hoaNotificationReducer,
  [hoaUserRegisterApi.reducerPath]: hoaUserRegisterApi.reducer,
  [hoaUserLoginApi.reducerPath]: hoaUserLoginApi.reducer,
  [hoaViolationsApi.reducerPath]: hoaViolationsApi.reducer,
  [hoaUserSearchApi.reducerPath]: hoaUserSearchApi.reducer,
  [hoaUnitsApi.reducerPath]: hoaUnitsApi.reducer,
  [hoaPollsApi.reducerPath]: hoaPollsApi.reducer,
  [hoaDocumentsApi.reducerPath]: hoaDocumentsApi.reducer,
};

export default reducer;

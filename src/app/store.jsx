import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "../features/users/userSlice";
import userAuthReducer from "../features/auth/authSliceUser";
import adminAuthReducer from "../features/auth/authSliceAdmin";
import { apiSlice } from "../features/api/apiSlice";
import { apiSliceAdmin } from "../features/api/adminApiSlice";

export default configureStore({
  reducer: {
    users: usersReducer,
    authUser: userAuthReducer,
    authAdmin: adminAuthReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [apiSliceAdmin.reducerPath]: apiSliceAdmin.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      apiSlice.middleware,
      apiSliceAdmin.middleware,
    ]),
  devTools: true,
});

import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";


const BASE_URL = import.meta.env.VITE_BASE_URL;

export const apiSliceAdmin = createApi({
  reducerPath: "AdminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers, { getState, endpoint }) => {
      // console.log(getState());
      const token = getState()?.authAdmin?.token || null;
      if (token) {
        return headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: [],
  endpoints: () => ({}),
});

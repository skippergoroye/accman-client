import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";




const BASE_URL = import.meta.env.VITE_BASE_URL;

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers, { getState, endpoint }) => {
      const token = getState()?.authUser?.token || null;
      if (token) {
        return headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["Users"],
  endpoints: () => ({}),
});

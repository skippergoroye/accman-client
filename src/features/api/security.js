import { toastError, toastSuccess } from "../../components/Toast";
import parseError from "../../lib/ParseError";
import { apiSlice } from "./apiSlice";

export const securityApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (userId) => {
        return ({
          url: `/api/user/${userId.userId}/password`,
          method: "PUT",
          body: userId.theData,
          async onQueryStarted(arg, { queryFulfilled, dispatch }) {
            try {
              const result = await queryFulfilled;
              return result;
            } catch (err) {
              const { errorMessage } = parseError(err);
              toastError(errorMessage);
            }
          },
        });
      },
    }),
  }),
});

export const { useChangePasswordMutation } = securityApiSlice;

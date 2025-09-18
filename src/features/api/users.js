import { toastError, toastSuccess } from "../../components/Toast";
import parseError from "../../lib/ParseError";
import { setUsers } from "../users/userSlice";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (values) => ({
        url: "/auth/login/user",
        method: "POST",
        body: values,
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            const result = await queryFulfilled;
            return result;
          } catch (err) {
            const { errorMessage } = parseError(err);
            toastError(errorMessage);
          }
        },
      }),
    }),

    signup: builder.mutation({
      query: (values) => ({
        url: "/auth/register/user",
        method: "POST",
        body: values,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (values) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: values,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (values) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: values,
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ id, body }) => ({
        url: `/auth/reset-new-password/${id}`,
        method: "POST",
        body: body,
      }),
    }),

    addFund: builder.mutation({
      query: (values) => ({
        url: `/dashboard/add-funds`,
        method: "POST",
        body: values,
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            const result = await queryFulfilled;
            toastSuccess("Funding request submitted successfully");
          } catch (error) {
            const { errorMessage } = parseError(err);
            toastError(errorMessage);
          }
        },
      }),
    }),

    getUserTransactions: builder.query({
      query: (userId) => `/dashboard/find/user/${userId}`,
    }),

    updateUser: builder.mutation({
      query: ({ id, updatedUser }) => ({
        url: `/api/user/${id}`,
        method: "PUT",
        body: updatedUser,
      }),
    }),
    getSingleUserById: builder.query({
      query: (id) => `/api/user/find/${id}`,
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/user/${id}`,
        method: "DELETE",
      }),
    }),

    getTransactionsUserId: builder.query({
      query: (userId, tranId) => `/api/transaction/${userId}/${tranId}`,
      providesTags: ["Users"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          return result;
        } catch (err) {
          const { errorMessage } = parseError(err);
          toastError(errorMessage);
        }
      },
    }),
    getBalance: builder.query({
      query: (id) => `/dashboard/balance`,
      providesTags: ["Users"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          return result;
        } catch (err) {
          const { errorMessage } = parseError(err);
          toastError(errorMessage);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useGetSingleUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useLoginUserMutation,
  useSignupMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useAddFundMutation,
  useGetTransactionsUserIdQuery,
  useGetUserTransactionsQuery,
  useLazyGetTransactionsUserIdQuery,
  useLazyGetUserTransactionsQuery,
  useGetBalanceQuery,
  useResetPasswordMutation,
} = usersApiSlice;

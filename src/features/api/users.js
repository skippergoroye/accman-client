import { toastError, toastSuccess } from "../../components/Toast";
import parseError from "../../lib/ParseError";
import { setUsers } from "../users/userSlice";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (values) => ({
        url: "/api/auth/login/user",
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
        url: "/api/auth/register/user",
        method: "POST",
        body: values,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (values) => ({
        url: "/api/auth/forgot-password",
        method: "POST",
        body: values,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (values) => ({
        url: "/api/auth/verify-otp",
        method: "POST",
        body: values,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `/api/auth/reset-new-password/${data.valTwo}`,
        method: "PUT",
        body: {
          newPassword: data.valOne,
        },
      }),
    }),
    addFund: builder.mutation({
      query: (values) => ({
        url: `/api/fund/add`,
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
      query: (id) => `/api/transaction/find/user/${id}`,
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
      query: (id) => `/api/user/balance`,
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

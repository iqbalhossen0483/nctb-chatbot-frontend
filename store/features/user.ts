import { config } from "@/config/config";
import { redirect } from "next/navigation";
import { api } from "../baseQuery";
import { removeToken, setLoading, setUser } from "../slices/user";

const userSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/auth/me",
      providesTags: ["user"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          dispatch(setLoading(true));
          const { data } = await queryFulfilled;
          dispatch(setUser(data.data));
        } catch (error: any) {
          dispatch(removeToken());
          console.log(error);
          redirect("/auth/signin");
        } finally {
          dispatch(setLoading(false));
        }
      },
    }),
    getAllUsers: builder.query({
      query: ({ page }) => `/user/all?page=${page}&limit=${config.dataLimit}`,
      providesTags: ["all-user"],
    }),
    updateUserStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/user/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["all-user"],
    }),

    updateUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `/user/${id}/role`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: ["all-user"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetAllUsersQuery,
  useUpdateUserStatusMutation,
  useUpdateUserRoleMutation,
} = userSlice;

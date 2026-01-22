import { config } from "@/config/config";
import { api } from "../baseQuery";

const projectSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: ({ page }) =>
        `/project/all?page=${page}&limit=${config.dataLimit}`,
      providesTags: ["projects"],
    }),

    createProject: builder.mutation({
      query: (data) => ({
        url: "/project/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["projects"],
    }),

    updateProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `/project/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["projects"],
    }),

    softDeleteProject: builder.mutation({
      query: (id) => ({
        url: `/project/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["projects"],
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useSoftDeleteProjectMutation,
} = projectSlice;

import { BASE_URL } from "@/constants/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/`,
    prepareHeaders: async (headers) => {
      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),
  tagTypes: ["todoApi"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (props) => {
        const params = new URLSearchParams();
        if (props?.start) {
          params.append("_start", props.start);
        }
        if (props?.limit) {
          params.append("_limit", props.limit);
        }
        return {
          url: `todos`,
          params: params,
          method: "GET",
        };
      },
      providesTags: ["todoApi"],
    }),
    getAllTodos: builder.query({
      query: () => {
        return {
          url: `todos`,
          method: "GET",
        };
      },
      providesTags: ["todoApi"],
    }),
    createTodo: builder.mutation({
      query: (props) => {
        const body = {
          userId: props.userId,
          title: props.title,
          completed:props.completed
        };
        return {
          url: `todos`,
          method: "POST",
          body:body,
        };
      },
      invalidatesTags:['todoApi']
    }),
  }),
});

export const { useGetTodosQuery, useGetAllTodosQuery, useCreateTodoMutation } = todoApi;

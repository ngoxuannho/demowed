import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSolutionBuilderHost } from "typescript";

interface Products {
  id?: number;
  [key: string]: any;
}

export const sneakersApi = createApi({
  reducerPath: "sneakersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://v1-sneakers.p.rapidapi.com/v1/",
    prepareHeaders: (headers) => {
      headers.set("x-rapidapi-host", "v1-sneakers.p.rapidapi.com");
      headers.set(
        "x-rapidapi-key",
        "ea80876145msh0844454fe1acc10p13b266jsn983d72e26d24"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Products, void>({
      query: () => "sneakers?limit=12",
    }),

    getProduct: builder.query({
      query: (id) => `sneakers/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = sneakersApi;

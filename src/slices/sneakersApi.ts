import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSolutionBuilderHost } from "typescript";

interface Products {
  id?: number;
  name?: string;
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
        "c338755b18msh8541266c1b5500bp100e4djsn82e0e447776d"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Products, void>({
      query: () => "sneakers?limit=12",
    }),
    getByName: builder.query({
      query: (name:string) => `sneakers?limit=12&name=${name}`
    }),
    getProduct: builder.query({
      query: (id) => `sneakers/${id}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useLazyGetProductsQuery,
  useGetByNameQuery,
  useLazyGetByNameQuery,
} = sneakersApi;

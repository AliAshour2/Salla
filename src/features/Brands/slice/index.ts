import { TBrand } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAllBrandsThunk } from "../thunk";

interface IBrandsState {
  brands: TBrand[];
  loading: boolean;
  error: string | null;
}

const initialState: IBrandsState = {
  brands: [],
  loading: false,
  error: null,
};

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    // You can add additional reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetAllBrandsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        GetAllBrandsThunk.fulfilled,
        (state, action: PayloadAction<TBrand[]>) => {
          state.loading = false;
          state.brands = action.payload;
        }
      )
      .addCase(GetAllBrandsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Assuming handleError returns a string
      });
  },
});

export const { reducer: brandsReducer } = brandsSlice;

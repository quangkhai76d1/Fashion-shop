import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

const ProductModalSilce = createSlice({
  name: "productModal",
  initialState,
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
    remove: (state) => {
      state.value = null;
    },
  },
});

export const { set, remove } = ProductModalSilce.actions;

export default ProductModalSilce.reducer;

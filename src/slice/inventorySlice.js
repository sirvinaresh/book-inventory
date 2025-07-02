import { createSlice } from "@reduxjs/toolkit";

export const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    value: JSON.parse(localStorage.getItem("book")) || [],
  },
  reducers: {
    add: (state, actions) => {
      const record = [...state.value, actions.payload];
      state.value = record;
      localStorage.setItem("book", JSON.stringify(record));
    },
    remove: (state, actions) => {
      const record = state.value.filter((ele, i) => i !== actions.payload);
      state.value = record;
      localStorage.setItem("book", JSON.stringify(record));
    },
    update: (state, actions) => {
      state.value[actions.payload.edit] = actions.payload.value;
    },
  },
});

export const { add, remove, update } = inventorySlice.actions;

export default inventorySlice.reducer;

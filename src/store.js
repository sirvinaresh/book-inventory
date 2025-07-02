import { configureStore } from "@reduxjs/toolkit";
import inventorySlice from "./slice/inventorySlice";

export default configureStore({
  reducer: {
    inventory: inventorySlice,
  },
});

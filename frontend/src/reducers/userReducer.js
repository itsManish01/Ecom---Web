import { createReducer } from "@reduxjs/toolkit";

const initialState = { 
  user : {}
 };

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("increment", (state, action) => {
      state.value++;
    })
    
});

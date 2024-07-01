import { createSlice, } from '@reduxjs/toolkit';

const documentSlice = createSlice({
  name: 'document',
  initialState: {
    content: null,
  },
  reducers: {
    setContent: (state, action) => {
        state.content = action.payload
    }
  }
});

export const { setContent } = documentSlice.actions;
export default documentSlice.reducer;

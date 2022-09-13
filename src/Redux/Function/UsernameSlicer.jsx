import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const userManager = createSlice({
  name: 'username',
  initialState,
  reducers: {
    setUsername: (state, action)=>{
        state.value = action.payload
    }
  }
})
// Action creators are generated for each case reducer function
export const { setUsername} = userManager.actions;
export default userManager.reducer
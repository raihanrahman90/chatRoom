import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const authManager = createSlice({
  name: 'token',
  initialState,
  reducers: {
    getToken: (state) => {
      state.value += 1
    },
    storeToken: (state,action) => {
      state.value = action.payload
    },
  },
})
export const userManager = createSlice({
  name: 'username',
  value: '',
  reducers: {
    setUsername: (state, action)=>{
        state.value = action.payload
    }
  }
})
// Action creators are generated for each case reducer function
export const { getToken, storeToken } = authManager.actions;
export const { setUsername} = userManager.actions;
export 
export default authManager.reducer
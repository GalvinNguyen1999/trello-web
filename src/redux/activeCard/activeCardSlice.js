import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentActiveCard: null
}

export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  // Reducers: Nơi xử lý dự liệu đồng bộ
  reducers: {
    updateCurrentActiveCard: (state, action) => {
      state.currentActiveCard = action.payload
    },
    clearCurrentActiveCard: (state) => {
      state.currentActiveCard = null
    }
  },
  extraReducers: (builder) => {}
})

export const { updateCurrentActiveCard, clearCurrentActiveCard } = activeCardSlice.actions

// Selector
export const selectCurrentActiveCard = (state) => state.activeCard.currentActiveCard

export const activeCardReducer = activeCardSlice.reducer
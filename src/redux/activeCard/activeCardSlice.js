import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentActiveCard: null,
  isShowModalActiveCard: false
}

export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  // Reducers: Nơi xử lý dự liệu đồng bộ
  reducers: {
    updateCurrentActiveCard: (state, action) => {
      state.currentActiveCard = action.payload
    },
    clearAndHideModalCurrentActiveCard: (state) => {
      state.currentActiveCard = null
      state.isShowModalActiveCard = false
    },
    showModalActiveCard: (state) => {
      state.isShowModalActiveCard = true
    },
  },
  extraReducers: (builder) => {}
})

export const {
  updateCurrentActiveCard,
  clearAndHideModalCurrentActiveCard,
  showModalActiveCard
} = activeCardSlice.actions

// Selector
export const selectCurrentActiveCard = (state) => state.activeCard.currentActiveCard
export const selectIsShowModalActiveCard = (state) => state.activeCard.isShowModalActiveCard

export const activeCardReducer = activeCardSlice.reducer
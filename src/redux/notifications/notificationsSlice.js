import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

const initialState = {
  currentNotifications: []
}

// Acions async thunk
export const fetchInvitationsAPI = createAsyncThunk(
  'notifications/fetchInvitationsAPI',
  async () => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/invitations`)
    return response.data
  }
)

export const updateBoardInvitationAPI = createAsyncThunk(
  'notifications/updateBoardInvitationAPI',
  async ({ invitationId, status }) => {
    const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/invitations/board/${invitationId}`, { status })
    return response.data
  }
)

/* Slice */
export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  // Reducers: Nơi xử lý dự liệu đồng bộ
  reducers: {
    clearCurrentNotifications: (state) => {
      state.currentNotifications = []
    },
    updateCurrentNotifications: (state, action) => {
      state.currentNotifications = action.payload
    },
    addNotification: (state, action) => {
      // Thêm thông báo mới vào đầu mảng
      state.currentNotifications.unshift(action.payload)
    },
  },
  // Extra reducers: Nơi xử lý dự liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchInvitationsAPI.fulfilled, (state, action) => {
      const incomingNotifications = action.payload
      // Đảo ngược thứ tự của các thông báo
      state.currentNotifications = Array.isArray(incomingNotifications) ? incomingNotifications.reverse() : []
    })
    builder.addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
      const incomingNotification = action.payload
      const getInvitation = state.currentNotifications.find(i => i._id === incomingNotification._id)
      getInvitation.boardInvitation = incomingNotification.boardInvitation
    })
  }
})

// Actions
export const {
  updateCurrentNotifications
} = notificationsSlice.actions

// Selector
export const selectCurrentNotifications = (state) => state.notifications.currentNotifications

// Reducer
export const notificationsReducer = notificationsSlice.reducer

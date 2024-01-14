import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

/* APIs Board */
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return response.data
}

export const updateBoardDetailsAPI = async (boardId, boardData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, boardData)
  return response.data
}

/* APIs Columns */
export const createNewColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return response.data
}

export const updateColumnDetailsAPI = async (columnId, columnData) => {
  const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, columnData)
  return response.data
}

/* APIs Columns */
export const createNewCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}

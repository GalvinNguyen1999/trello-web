import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'

// import { mockData } from '~/apis/mock-data'
import {
  fetchBoardDetailsAPI,
  createNewColumnAPI,
  createNewCardAPI,
  updateBoardDetailsAPI
} from '~/apis/index'

const Board = () => {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '65a215706b8948401c354667'
    fetchBoardDetailsAPI(boardId).then(board => {
      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        }
      })

      setBoard(board)
    })
  }, [])

  /* API Columns */
  const createNewColumn = async (newColumnData) => {
    const newColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    newColumn.cards = [generatePlaceholderCard(newColumn)]
    newColumn.cardOrderIds = [generatePlaceholderCard(newColumn)._id]

    const newBoard = { ...board }
    newBoard.columns.push(newColumn)
    newBoard.columnOrderIds.push(newColumn._id)
    setBoard(newBoard)
  }

  /* API Cards */
  const createNewCard = async (newCardData) => {
    const newCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })

    const newBoard = { ...board }
    const updateColumn = newBoard.columns.find(column => column._id === newCard.columnId)
    if (updateColumn) {
      updateColumn.cards.push(newCard)
      updateColumn.cardOrderIds.push(newCard._id)
    }
    setBoard(newBoard)
  }

  const moveColumn = async (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    await updateBoardDetailsAPI(board._id, { columnOrderIds: dndOrderedColumnsIds })
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumn={moveColumn}
      />
    </Container>
  )
}

export default Board

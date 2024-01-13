import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

// import { mockData } from '~/apis/mock-data'
import { fetchBoardDetailsAPI, createNewColumnAPI, createNewCardAPI } from '~/apis/index'

const Board = () => {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '65a215706b8948401c354667'
    fetchBoardDetailsAPI(boardId).then(board => {
      setBoard(board)
    })
  }, [])

  /* API Columns */
  const createNewColumn = async (newColumnData) => {
    const newColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })
  }

  /* API Cards */
  const createNewCard = async (newCardData) => {
    const cardData = {
      ...newCardData,
      boardId: board._id
    }
    const newCard = await createNewCardAPI(cardData)
    return newCard
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
      />
    </Container>
  )
}

export default Board

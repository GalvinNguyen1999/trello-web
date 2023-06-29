import Box from '@mui/material/Box'
import ListColums from './ListColumns/ListColums'

const BoardContent = () => {

  return (
    <Box
      sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#344953' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trelloCustom.boardContentHeight,
        p: '10px 0'
      }}
    >
      <ListColums />
    </Box>
  )
}

export default BoardContent

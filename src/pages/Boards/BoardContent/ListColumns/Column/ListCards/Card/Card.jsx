import { Card as MuiICard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupsIcon from '@mui/icons-material/Groups'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const Card = ({ temporaryHideMedia }) => {
  if (temporaryHideMedia) {
    return (
      <MuiICard sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'
      }}>
        <CardContent sx={{
          p: 1.5,
          '&:last-child': { p: 1.5 }
        }}>
          <Typography>Senior</Typography>
        </CardContent>
      </MuiICard>
    )
  }

  return (
    <MuiICard sx={{
      cursor: 'pointer',
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
      overflow: 'unset'
    }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        title="green iguana"
      />
      <CardContent sx={{
        p: 1.5,
        '&:last-child': { p: 1.5 }
      }}>
        <Typography>Internship frontend developer</Typography>
      </CardContent>
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        <Button startIcon={<GroupsIcon />}>20</Button>
        <Button startIcon={<CommentIcon />}>15</Button>
        <Button startIcon={<AttachmentIcon />}>10</Button>
      </CardActions>
    </MuiICard>
  )
}

export default Card

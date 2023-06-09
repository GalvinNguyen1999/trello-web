import { Card as MuiICard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupsIcon from '@mui/icons-material/Groups'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const Card = ({ card }) => {
  const shouldShowCardActions = () => {
    return !!card?.memberIds.length || !!card?.comments.length || !!card?.attachments.length
  }

  return (
    <MuiICard sx={{
      cursor: 'pointer',
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
      overflow: 'unset'
    }}>
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover} />}
      <CardContent sx={{
        p: 1.5,
        '&:last-child': { p: 1.5 }
      }}>
        <Typography>{card?.title}</Typography>
      </CardContent>

      {/* Card Actions */}
      {shouldShowCardActions() &&
        <CardActions sx={{ p: '0 4px 8px 4px' }}>
          {/* Member */}
          {!!card?.memberIds.length &&
            <Button startIcon={<GroupsIcon />}>
              {card?.memberIds.length}
            </Button>
          }

          {/* Comment */}
          {!!card?.comments.length &&
            <Button startIcon={<CommentIcon />}>
              {card?.comments.length}
            </Button>
          }

          {/* Attachment */}
          {!!card?.attachments.length &&
            <Button startIcon={<AttachmentIcon />}>
              {card?.attachments.length}
            </Button>
          }
        </CardActions>
      }
    </MuiICard>
  )
}

export default Card

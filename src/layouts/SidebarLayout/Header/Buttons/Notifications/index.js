import {
  alpha,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  Popover,
  Tooltip,
  Typography
} from '@mui/material';
import { useRef, useState } from 'react';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import { styled } from '@mui/material/styles';
import ArticleIcon from '@mui/icons-material/Article';
import { formatDistance, subDays } from 'date-fns';
const { LATEST_NEWS } = require('src/consts/global.js');

const NotificationsBadge = styled(Badge)(
  ({ theme }) => `
    
    .MuiBadge-badge {
        background-color: ${alpha(theme.palette.error.main, 0.1)};
        color: ${theme.palette.error.main};
        min-width: 16px; 
        height: 16px;
        padding: 0;

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 0 1px ${alpha(theme.palette.error.main, 0.3)};
            content: "";
        }
    }
`
);

function HeaderNotifications() {
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip arrow title="Latest News">
        <IconButton color="primary" ref={ref} onClick={handleOpen}>
          <NotificationsBadge
            badgeContent={Object.keys(LATEST_NEWS).length}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <ArticleIcon />
          </NotificationsBadge>
        </IconButton>
      </Tooltip>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        sx={{
          maxWidth: 500
        }}
      >
        <Box
          sx={{ p: 2 }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5">Lastest News</Typography>
        </Box>
        <Divider />

        <List sx={{ p: 0 }}>
        {
          Object.keys(LATEST_NEWS).map((postId, key) => {
            const post = LATEST_NEWS[postId];
            return (
              <>
                <ListItem
                  key={key}
                  sx={{
                    p: 2,
                    minWidth: 350,
                    maxHeight: 500,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ width: '100%' }}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography sx={{ fontWeight: 'bold' }}>
                        {post.title}
                      </Typography>

                      <Typography variant="caption" sx={{ textTransform: 'none' }}>
                        {post.date}
                      </Typography>
                    </Box>

                    <Typography component="span" variant="body2" color="text.secondary">
                      {post.content}
                    </Typography>

                  </Box>

                  { post.link ? 
                    <Box sx={{ width: '100%', mt: 2 }}>
                      <Button variant="contained" color="primary" fullWidth size='small' href={post.link}>
                        {post.link_title}
                      </Button>
                    </Box>
                    : null
                  }

                </ListItem>
                <Divider />
              </>
            );
          })
        }

        </List>
      </Popover>
    </>
  );
}

export default HeaderNotifications;

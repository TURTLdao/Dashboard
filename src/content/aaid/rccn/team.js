import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  Grid,
  Button
} from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function Team() {
  const feed = [
    {
      name: 'Jayjay',
      jobtitle: 'Team',
      avatar: 'https://pbs.twimg.com/profile_images/1620889492864503809/vD7CbzFV_400x400.jpg',
      twitter: 'https://twitter.com/jayjaynft4'
    },
    {
      name: 'Muratcan',
      jobtitle: 'Team',
      avatar: 'https://pbs.twimg.com/profile_images/1561005246897438723/cuBpCK29_400x400.jpg',
      twitter: 'https://twitter.com/Legenhacker'
    },
  ];

  return (
    <Card>
      <CardHeader title="Team" />
      <Divider />
      <Box p={2}>
        <Grid container spacing={0}>
          {feed.map((_feed) => (
            <Grid key={_feed.name} item xs={12} sm={6} lg={4}>
              <Box p={3} display="flex" alignItems="flex-start">
                <Avatar src={_feed.avatar} />
                <Box pl={2}>
                  <Typography variant="h4" gutterBottom>
                    {_feed.name}
                  </Typography>
                  <Typography variant="subtitle2" color="text.primary" sx={{ pb: 2 }}>
                    {_feed.jobtitle}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    href={_feed.twitter}
                    target='_blank'
                    startIcon={<AddTwoToneIcon />
                    }
                  >
                    Follow
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Card>
  );
}

export default Team;

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
      name: 'Nathan Kenpai',
      jobtitle: 'Founder',
      avatar: 'https://pbs.twimg.com/profile_images/1653692525218242560/5i3HzF1U_400x400.jpg',
      twitter: 'https://twitter.com/LopezKanapi'
    },
    {
      name: 'Fishbowlian',
      jobtitle: 'Froggie Intern',
      avatar: 'https://pbs.twimg.com/profile_images/1652823043440529409/pk0SN_QU_400x400.jpg',
      twitter: 'https://twitter.com/_Fishbowlian'
    },
    {
      name: 'Donatello - TurtleDAO',
      jobtitle: 'Froggie Intern',
      avatar: 'https://cdn.discordapp.com/avatars/479276363262590976/de863fa3bbff2c2bb156f9ae27690925.webp?size=128',
      twitter: 'https://twitter.com/_TurtleDAO'
    },
    {
      name: 'Vent',
      jobtitle: 'Discord Moderator',
      avatar: 'https://pbs.twimg.com/profile_images/1661334891856797696/0XHUl68A_400x400.jpg',
      twitter: 'https://twitter.com/therealvent'
    },
    {
      name: 'Shilliam BD Shanter',
      jobtitle: 'Discord Moderator',
      avatar: 'https://pbs.twimg.com/profile_images/1661559342385053697/WViqcf5m_400x400.jpg',
      twitter: 'https://twitter.com/DeFi_Naut'
    }
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

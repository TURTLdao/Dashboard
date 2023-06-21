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
        name: 'MacroMan',
        jobtitle: 'Team',
        avatar: 'https://pbs.twimg.com/profile_images/1651374226173984768/Fyfkxh7R_400x400.jpg',
        twitter: 'https://twitter.com/ThaMacroMan'
      },
      {
        name: 'Bave',
        jobtitle: 'Team',
        avatar: 'https://pbs.twimg.com/profile_images/1662607664524697603/bGC1unjw_400x400.png',
        twitter: 'https://twitter.com/BaveCrypto'
      },
      {
        name: 'McHosky',
        jobtitle: 'Team',
        avatar: 'https://pbs.twimg.com/profile_images/1595073915855855618/RTXfAaqf_400x400.jpg',
        twitter: 'https://twitter.com/themchosky'
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
  
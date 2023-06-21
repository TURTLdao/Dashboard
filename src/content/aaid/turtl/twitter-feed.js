import {
    Typography,
    Card,
    CardHeader,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListSubheader,
    ListItemText,
    Avatar,
    useTheme,
    styled
  } from '@mui/material';
  import { TwitterTimelineEmbed } from 'react-twitter-embed';
  
  const ListWrapper = styled(List)(
    () => `
        .MuiListItem-root {
          border-radius: 0;
          margin: 0;
        }
  `
  );
  
  function TwitterFeed() {
    const theme = useTheme();
  
    return (
      <Card sx={{ height: '100%' }}>
        <CardHeader title="Twitter Feed" />
        <Divider />
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName={'_turtledao'}
          theme='dark'
          options={{
            height: 500,
          }}
        /> 
      </Card>
    );
  }
  
  export default TwitterFeed;
  
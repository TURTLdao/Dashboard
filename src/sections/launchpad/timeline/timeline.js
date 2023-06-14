import * as React from 'react';

import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';

import { Scrollbar } from 'src/components/scrollbar';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { styled } from '@mui/material/styles';

export default function CustomizedTimeline() {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#4CAF50"
      }
    }
  });
  const ticker = '$TURTL'
  const bg = 'https://raw.githubusercontent.com/TURTLdao/TURTL-images/main/dao-bg.svg';

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{
        border: "2px solid #4CAF50",
        backgroundImage: `url(${bg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
  }}>
    <CardHeader
      sx={{ color: 'primary.main' }}
      title={ticker + " Timeline"}
      action={(
        <div>
        </div>
      )}
    />
    <Scrollbar
    sx={{
      height: 500,
      '& .simplebar-content': {
        height: '100%'
      },
      '& .simplebar-scrollbar:before': {
        background: 'neutral.400'
      }
    }}
  >
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
            
          }}
        >
    <Timeline position="alternate">

    <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          color="primary.main"
        >
          8<sub>th</sub> May 2023
        </TimelineOppositeContent>

        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot  >
            <img src='/token-images/froggie.png' style={{maxWidth: 40}}/>
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>

        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span" sx={{ color: 'primary.main'}}>
            $FROGGIE Meme Creator and Official Website 
          </Typography>
          <Typography variant="body2"  sx={{ color: 'white'}}>TurtleDAO initially created a fun meme creating website for Froggie Koin, then went on and built the current website they still use to this day.</Typography>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
          color="primary.main"
        >
          26<sub>th</sub> May 2023
        </TimelineOppositeContent>

        <TimelineSeparator>
          <TimelineConnector />

          <TimelineDot >
            <img src='/token-images/turtl.png' style={{maxWidth: 40}}/>
          </TimelineDot>

          <TimelineConnector />
        </TimelineSeparator>

        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span" sx={{ color: 'primary.main'}}>
            Beta AAID Dashboard
          </Typography>
          <Typography variant="body2"  sx={{ color: 'white'}}>TurtleDAO launches its AAID Dashboard for public use.</Typography>
        </TimelineContent>
      </TimelineItem>
      

      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          color="primary.main"
        >
          29<sub>th</sub> May 2023
        </TimelineOppositeContent>

        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot >
            <img src='https://github.com/TURTLdao/TURTL-images/blob/main/frog-kond.png?raw=true' style={{maxWidth: 40}}/>
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>

        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span" sx={{ color: 'primary.main'}}>
            $FROGGIE, $KONDA & $CATSKY
          </Typography>
          <Typography variant="body2"  sx={{ color: 'white'}}>TurtleDAO has fully implented Froggie Koin, AdaKonda Coin and Catsky Coin into its AAID dashboard.</Typography>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
          color="primary.main"
        >
          TBA - 2023
        </TimelineOppositeContent>

        <TimelineSeparator>
          <TimelineConnector />

          <TimelineDot >
            <img src='/token-images/froggie.png' style={{maxWidth: 40}}/>
          </TimelineDot>

          <TimelineConnector />
        </TimelineSeparator>

        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span" sx={{ color: 'primary.main'}}>
            Froggie Koin NFT Collection
          </Typography>
          <Typography variant="body2"  sx={{ color: 'white'}}>To help raise liquidity for Froggie Koin, TurtleDAO created the artwork for the NFT collection.</Typography>
        </TimelineContent>
      </TimelineItem>
    


    </Timeline>
    </Box>
    </CardContent>
    </Scrollbar>
    </Card>
    </ThemeProvider>
  );
}
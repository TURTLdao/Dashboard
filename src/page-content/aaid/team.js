import { Box, Typography, Card, CardHeader, Divider, Avatar,
  Button, styled, useTheme
} from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function Team({ info }) {
  const theme = useTheme();

  return (
    <Card>
      <CardHeader title="Team" />

      <Divider />
      {
  info.team && typeof info.team === 'object' && Object.entries(info.team).length > 0 &&
  Object.entries(info.team).map(([key, team], index) => {

        return (
          <>
          <Box px={2} py={2} display="flex" alignItems="flex-start">
            <Avatar variant='rounded' src={team[1]} />
            <Box pl={2} flex={1}>
              <Box display="flex">
                <Box pr={8} sx={{ maxWidth: 150, minWidth: 150}}>
                  <Typography
                    gutterBottom
                    variant="caption"
                    sx={{ fontSize: `${theme.typography.pxToRem(12)}`, minWidth: 110 }}
                  >
                    {team[3]}
                  </Typography>

                  <Typography variant="h4">
                    {team[0]}
                  </Typography>

                </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    href={team[2]}
                    target='_blank'
                    startIcon={<AddTwoToneIcon />}
                    sx={{ my: 1 }}
                  >
                    Follow
                  </Button>
              </Box>
            </Box>
          </Box>
          <Divider/>
          </>
        );})
      }
    </Card>
  );
}

export default Team;

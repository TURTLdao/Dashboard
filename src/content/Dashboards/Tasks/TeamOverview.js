import {
  Box,
  Grid,
  Typography,
  Avatar,
  Badge,
  Tooltip,
  useTheme,
  LinearProgress,
  styled
} from '@mui/material';
import { formatDistance, subDays, subMinutes, subHours } from 'date-fns';
import Text from 'src/components/Text';

const DotLegend = styled('span')(
  ({ theme }) => `
    border-radius: 22px;
    width: ${theme.spacing(1.5)};
    height: ${theme.spacing(1.5)};
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
    border: ${theme.colors.alpha.white[100]} solid 2px;
`
);

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);

const LinearProgressWrapper = styled(LinearProgress)(
  ({ theme }) => `
        flex-grow: 1;
        height: 10px;
        
        &.MuiLinearProgress-root {
          background-color: ${theme.colors.alpha.black[10]};
        }
        
        .MuiLinearProgress-bar {
          border-radius: ${theme.general.borderRadiusXl};
        }
`
);

function TeamOverview() {
  const theme = useTheme();

  return (
    <Grid container spacing={2}>
      <Grid item xs={8} md={3}>
        <Box>
          <Box display="flex" alignItems="center" pb={3}>
            <Badge
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              overlap="circular"
            >
              <AvatarWrapper
                alt="Remy Sharp"
                src="https://www.turtle-dao.com/token-images/froggie.png"
              />
            </Badge>
            <Box
              sx={{
                ml: 1.5
              }}
            >
              <Typography variant="h4" noWrap gutterBottom>
                Froggie Koin
              </Typography>
              <Typography variant="subtitle2" noWrap>
                $FROGGIE
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={8} md={3}>
        <Box>
          <Box display="flex" alignItems="center" pb={3}>
            <Badge
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              overlap="circular"
            >
              <AvatarWrapper
                alt="Ann Saris"
                src="https://www.turtle-dao.com/token-images/konda.png"
              />
            </Badge>
            <Box
              sx={{
                ml: 1.5
              }}
            >
              <Typography variant="h4" noWrap gutterBottom>
                AnaKonda Coin
              </Typography>
              <Typography variant="subtitle2" noWrap>
                $KONDA
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={8} md={3}>
        <Box>
          <Box display="flex" alignItems="center" pb={3}>
            <Badge
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              overlap="circular"
            >
              <AvatarWrapper
                alt="James Stanton"
                src="https://www.turtle-dao.com/token-images/catsky.png"
              />
            </Badge>
            <Box
              sx={{
                ml: 1.5
              }}
            >
              <Typography variant="h4" noWrap gutterBottom>
                Catsky Token
              </Typography>
              <Typography variant="subtitle2" noWrap>
                $CATSKY
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={8} md={3}>
        <Box>
          <Box display="flex" alignItems="center" pb={3}>
            <Badge
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              overlap="circular"
            >
              <AvatarWrapper
                alt="James Stanton"
                src="https://www.turtle-dao.com/token-images/rccn.png"
              />
            </Badge>
            <Box
              sx={{
                ml: 1.5
              }}
            >
              <Typography variant="h4" noWrap gutterBottom>
                Racoons Club
              </Typography>
              <Typography variant="subtitle2" noWrap>
                $RCCN
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default TeamOverview;

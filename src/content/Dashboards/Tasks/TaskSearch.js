import { useRef, useState } from 'react';
import { Button, Card, Grid, Box, FormControl, CardActions, Typography,
  Divider, OutlinedInput, Chip, InputAdornment, styled, useTheme
} from '@mui/material';
import { formatDistance, subMonths, subDays } from 'date-fns';
import TodayTwoToneIcon from '@mui/icons-material/TodayTwoTone';
import Link from 'src/components/Link';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
    padding-right: ${theme.spacing(0.7)}
`
);

function TaskSearch() {
  const theme = useTheme();

  const handleDelete = () => {};

  const handleClick = () => {};

  const periods = [
    {
      value: 'popular',
      text: 'Most popular'
    },
    {
      value: 'recent',
      text: 'Recent tasks'
    },
    {
      value: 'updated',
      text: 'Latest updated tasks'
    },
    {
      value: 'oldest',
      text: 'Oldest tasks first'
    }
  ];

  const actionRef1 = useRef(null);
  const [openPeriod, setOpenMenuPeriod] = useState(false);
  const [period, setPeriod] = useState(periods[0].text);

  return (
    <>
    {/*
      <FormControl variant="outlined" fullWidth>
        <OutlinedInputWrapper
          type="text"
          placeholder="Search terms here..."
          endAdornment={
            <InputAdornment position="end">
              <Button variant="contained" size="small">
                Search
              </Button>
            </InputAdornment>
          }
          startAdornment={
            <InputAdornment position="start">
              <SearchTwoToneIcon />
            </InputAdornment>
          }
        />
      </FormControl>
        */}
      <Box
        py={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card
            variant="outlined"
            sx={{
              p: 3,
              background: `${theme.colors.alpha.black[5]}`
            }}
          >
            <Link href="#" variant="h3" color="text.primary">
              Turtle Token
            </Link>
            <Box
              sx={{
                py: 2
              }}
            >
              <Chip
                sx={{
                  mr: 0.5
                }}
                size="small"
                label="Audit"
                color="secondary"
                onClick={handleClick}
              />
              <Chip
                sx={{
                  mr: 0.5
                }}
                size="small"
                label="Token"
                color="secondary"
                onClick={handleClick}
              />
              <Chip
                sx={{
                  mr: 0.5
                }}
                size="small"
                label="Utility"
                color="secondary"
                onClick={handleClick}
              />
            </Box>
            <Typography
              sx={{
                pb: 2
              }}
              color="text.secondary"
            >
              <i>You're lying to yourself if you say you don't like turtles.</i><br/>
              Inspiring trust in TurtleDAO verified projects. Step into a future where transparency and accountability reign supreme, propelling you towards success and unyielding confidence.
            </Typography>
            <Button href="/aaid/turtl" size="small" variant="contained">
              View Project
            </Button>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            variant="outlined"
            sx={{
              p: 3,
              background: `${theme.colors.alpha.black[5]}`
            }}
          >
            <Link href="#" variant="h3" color="text.primary">
              Froggie Koin
            </Link>
            <Box
              sx={{
                py: 2
              }}
            >
              <Chip
                sx={{
                  mr: 0.5
                }}
                size="small"
                label="Meme"
                color="secondary"
                onClick={handleClick}
              />
              <Chip
                sx={{
                  mr: 0.5
                }}
                size="small"
                label="Token"
                color="secondary"
                onClick={handleClick}
              />
            </Box>
            <Typography
              sx={{
                pb: 2
              }}
              color="text.secondary"
            >
             <i>Froggie is here for everyone. Froggie is the new wave. Join us in the pond.</i><br/>
             Froggies are life, Froggies are love and we want Froggies to stay.
            </Typography>
            <Button href="/aaid/froggie" size="small" variant="contained">
              View Project
            </Button>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            variant="outlined"
            sx={{
              p: 3,
              background: `${theme.colors.alpha.black[5]}`
            }}
          >
            <Link href="#" variant="h3" color="text.primary">
              AdaKonda Coin
            </Link>
            <Box
              sx={{
                py: 2
              }}
            >
              <Chip
                sx={{
                  mr: 0.5
                }}
                size="small"
                label="Meme"
                color="secondary"
                onClick={handleClick}
              />
              <Chip
                sx={{
                  mr: 0.5
                }}
                size="small"
                label="Token"
                color="secondary"
                onClick={handleClick}
              />
            </Box>
            <Typography
              sx={{
                pb: 2
              }}
              color="text.secondary"
            >
              <i>The sh*t coin that cares!</i> <br/>
              Our mission is both simple and effective: we find an NFT or a token, munch on it and spit it back out to the community.
              This concept is called ”FEED the KONDA”.
            </Typography>
            <Button href="/aaid/konda" size="small" variant="contained">
              View Project
            </Button>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            variant="outlined"
            sx={{
              p: 3,
              background: `${theme.colors.alpha.black[5]}`
            }}
          >
            <Link href="#" variant="h3" color="text.primary">
              Catsky Token
            </Link>
            <Box
              sx={{
                py: 2
              }}
            >
              <Chip
                sx={{
                  mr: 0.5
                }}
                size="small"
                label="Meme"
                color="secondary"
                onClick={handleClick}
              />
              <Chip
                sx={{
                  mr: 0.5
                }}
                size="small"
                label="Token"
                color="secondary"
                onClick={handleClick}
              />
            </Box>
            <Typography
              sx={{
                pb: 2
              }}
              color="text.secondary"
            >
              <i>Believers in Cardano.</i><br/>
              Catsky Token is more than just a token; its a mission to make a substantial impact in the crypto world. With continuous development, Catsky offers unique NFT airdrops to its holders, fostering a community driven by creativity and innovation.
              Dive into the thrilling and engaging crypto journey that Catsky Token provides.
            </Typography>
            <Button href="/aaid/catsky" size="small" variant="contained">
              View Project
            </Button>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            variant="outlined"
            sx={{
              p: 3,
              background: `${theme.colors.alpha.black[5]}`
            }}
          >
            <Link href="#" variant="h3" color="text.primary">
              Racoons Club
            </Link>
            <Box
              sx={{
                py: 2
              }}
            >
              <Chip
                sx={{
                  mr: 0.5
                }}
                size="small"
                label="Meme"
                color="secondary"
                onClick={handleClick}
              />
              <Chip
                sx={{
                  mr: 0.5
                }}
                size="small"
                label="Token"
                color="secondary"
                onClick={handleClick}
              />
              <Chip
                sx={{
                  mr: 0.5
                }}
                size="small"
                label="Gaming"
                color="secondary"
                onClick={handleClick}
              />
            </Box>
            <Typography
              sx={{
                pb: 2
              }}
              color="text.secondary"
            >
              <i>The first 3D/VR Website in Cardano.</i><br/>
              Racoons Club are building an educational platform in multichain Cardano & Polygon
            </Typography>
            <Button href="/aaid/rccn" size="small" variant="contained">
              View Project
            </Button>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default TaskSearch;

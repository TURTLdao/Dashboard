import { Button, Card, Grid, Box, Typography, OutlinedInput, Chip, styled, useTheme
} from '@mui/material';
import Link from 'src/components/Link';


function ListedProjects() {
  const theme = useTheme();

  const handleClick = () => {};

  return (
    <>
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
            <Link href="/aaid/turtl" variant="h3" color="text.primary">
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
            <Link href="/aaid/froggie" variant="h3" color="text.primary">
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
            <Button passHref href="/aaid/froggie" size="small" variant="contained">
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
            <Link href="/aaid/konda" variant="h3" color="text.primary">
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
            <Button passHref href="/aaid/konda" size="small" variant="contained">
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
            <Link href="/aaid/catsky" variant="h3" color="text.primary">
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
            <Button passHref href="/aaid/catsky" size="small" variant="contained">
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
            <Link href="/aaid/rccn" variant="h3" color="text.primary">
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
            <Button passHref href="/aaid/rccn" size="small" variant="contained">
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
            <Link href="/aaid/tortol" variant="h3" color="text.primary">
              Tortol
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
                label="NFT"
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
             The Turtle Syndicate - an exciting new NFT project that brings the magic of the Turtle verse to life in the world of Cardano.
             $TORTOL is the native asset for this NFT project.
            </Typography>
            <Button passHref href="/aaid/tortol" size="small" variant="contained">
              View Project
            </Button>
          </Card>
        </Grid>

      </Grid>
    </>
  );
}

export default ListedProjects;

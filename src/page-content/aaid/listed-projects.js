import { Button, Card, Grid, Box, Typography, OutlinedInput, Chip, styled, useTheme, Avatar, Divider
} from '@mui/material';
import Link from 'src/components/Link';

const { DAO_SUPPORTED_ITEMS } = require('src/dao/dao-object.js');

function ListedProjects() {
  const theme = useTheme();


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
      { Object.entries(DAO_SUPPORTED_ITEMS)
        .filter(([key, project]) => project.policy.length > 0)
        .map(([key, project], index) => {

        return (
          <Grid item xs={12} md={4}>
            <Card
              variant="outlined"
              sx={{
                p: 3,
                background: `${theme.colors.alpha.black[5]}`
              }}
            >
              <div align='center'>
                <Avatar src={project.logo} variant='rounded' sx={{ mb: 1 }}/>
                <Link href="/aaid/turtl" variant="h3" color="text.primary" >
                  {project.token_name}
                </Link>

                <Typography
                  variant='subtitle2'
                  color="text.secondary"
                >
                  {project.ticker}
                </Typography>

                <Typography
                  sx={{
                    pb: 2, mt: 1
                  }}
                  color="text.secondary"
                  variant='caption'
                >
                  {project.slogan}
                </Typography>

                <Divider sx={{ maxWidth: '30%', my: 1}}/>

                { project.type.map((type) => (
                  <Chip
                    sx={{
                      mr: 0.5, mb: 1
                    }}
                    size="small"
                    label={type}
                    color="secondary"
                  /> ))
                }

                <Typography
                  sx={{
                    pb: 2, mt: 1
                  }}
                  color="text.secondary"
                >
                  {project.desc}
                </Typography>

                <Button size='small' fullWidth variant='outlined' href={project.aaid_link}>
                  View Project
                </Button>
              </div>
            </Card>
          </Grid>
          );
        })
      }
  
      </Grid>
    </>
  );
}

export default ListedProjects;

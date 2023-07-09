import { Button, CardHeader, Box, Grid, Typography, Avatar, IconButton, useTheme,
  Divider, Chip
} from '@mui/material';
import PropTypes from 'prop-types';
import PushPinIcon from '@mui/icons-material/PushPin';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';

const { DAO_SUPPORTED_ITEMS } = require('src/dao/dao-object.js');

function StarredProjects({ froggie_price, catsky_price }) {
  const theme = useTheme();

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pb: 3
        }}
      >
        <Typography variant="h3">
          <StarTwoToneIcon fontSize="small" sx={{ color: 'yellow', mr: 1 }} />
          Supported TurtleDAO Projects
        </Typography>
        <Box>
          <Button variant="outlined">
            View all projects
          </Button>
        </Box>
      </Box>

      <Grid container spacing={4}>

      {
      Object.entries(DAO_SUPPORTED_ITEMS)
      .filter(([key, project]) => project.starred === true)
      .map(([key, project], index) => {

        return (
          <Grid item xs={12} md={4} >
            <Box>
              <CardHeader
                avatar={
                  <Avatar src={project.logo} variant='rounded' />
                }
                action={
                  <PushPinIcon/>
                }
                title={project.token_name}
                titleTypographyProps={{
                  variant: 'h5',
                  color: 'textPrimary'
                }}
              />

              <Typography align='center' variant='subtitle2'>
                {project.slogan}
              </Typography>

              <div align='center'>
                <Divider sx={{ mb: 1, mt: 1, maxWidth: '40%' }}/>
              </div>

              <div align='center'>
              {
                project.type.map((type) => (
                  <Chip
                    sx={{
                      mr: 0.5, my: 1
                    }}
                    size="small"
                    label={type}
                    color="secondary"
                  />
                ))
              }
              </div>

              <Typography align='center'>
                {project.desc}
              </Typography>

              <Divider sx={{ my: 1 }}/>
              {
                index === 0 ?
                  <Typography align='center'>
                    ₳ 0.0000000000
                  </Typography>
                : null
              }
              {
                index === 1 ? 
                <Typography align='center'>
                  ₳ {froggie_price}
                </Typography>
                : null
              }

              {
                index === 2 ? 
                <Typography align='center'>
                  ₳ {catsky_price}
                </Typography>
                : null
              }

              {
                index === 0 ?
                <div align='center'>
                  <Button size="small" variant='contained' sx={{ mt: 2, width: '80%'}} disabled>
                    Explore
                  </Button>
                </div>
                :
                <div align='center'>
                  <Button href={project.aaid_link} size="small" variant='contained' sx={{ mt: 2, width: '80%'}}>
                    Explore
                  </Button>
                </div>
              }

            </Box>
          </Grid>
        );})
      }

      </Grid>
    </>
  );
}

StarredProjects.propTypes = {
  froggie_price: PropTypes.number,
  catsky_price: PropTypes.number,
};

export default StarredProjects;

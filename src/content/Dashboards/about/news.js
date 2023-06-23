import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import { useState } from 'react';

import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  SvgIcon
} from '@mui/material';
import Footer from 'src/components/Footer';
import CardActions from '@mui/material/CardActions';
import { styled } from '@mui/material/styles';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PushPinIcon from '@mui/icons-material/PushPin';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

function Cards() {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Platform News"/>
              <Divider />
              <CardContent>
                <Card sx={{ minWidth: 275 }}>
                  <CardHeader action={
                    <div>
                      <SvgIcon>
                        <PushPinIcon/>
                      </SvgIcon>
                    </div>
                  } />
                  <CardContent>
                    <div align='center'>
                      <Typography
                        color="text.secondary"
                        gutterBottom
                        variant='h3'
                        align='center'
                      >
                        Platform Progress
                      </Typography>

                      <Typography
                        color="text.secondary"
                        align='center'
                        sx={{ maxWidth: '75%' }}
                      >
                        Kindly keep in mind that this platform is currently in its beta stage,
                        which means that there might be occasional glitches or issues.
                        However, these will only be temporary as we continuously work behind
                        the scenes to update and enhance the platform.<br/>
                      </Typography>

                      <Typography
                        color="text.secondary"
                        align='center'
                        sx={{ maxWidth: '50%', mt: 2 }}
                      >
                        At present, the TurtleDAO Platform is powered by <b>JPG.store</b>, <b>CNFT Tools</b>, 
                        <b> Blockfrost</b>, and <b>TapTools</b>. We also have plans to integrate additional
                        services in the future. These enhancements will include features that
                        allow us to provide comprehensive wallet information, including token
                        and NFT prices, as well as the ability to track token and NFT sales
                        through filtered transactions using policy IDs. These examples are
                        just a glimpse of the exciting developments we have in store.
                      </Typography>

                      
                    </div>
                  </CardContent>
                  <CardActions>
                    <Typography
                        color="text.secondary"
                        align='center'
                        sx={{ mt: 2 }}
                      >
                        v1.5a
                      </Typography>
                  </CardActions>
                </Card>
              </CardContent>
            </Card>
          </Grid>
{/*
          <Grid item xs={12}>
            <Card>
              <CardHeader title="TurtleDAO News" />
              <Divider />
              <CardContent>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>

                  </CardContent>
                  <CardActions>

                  </CardActions>
                </Card>
              </CardContent>
            </Card>
          </Grid>
*/}
        </Grid>
    </>
  );
}

Cards.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Cards;
import PropTypes from 'prop-types';
import { Box, Typography, Card, Tooltip, Avatar,
  CardMedia, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';

const AvatarWrapper = styled(Card)(
  ({ theme }) => `
    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};
    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;
    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`);

const ProfileCover = ({ user }) => {
  return (
    <>
      <Box display="flex" mb={3}>

        <Tooltip arrow placement="top" title="Go back">
          <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>

        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            Racoons Club
          </Typography>
          <Typography variant="subtitle2">
            The first 3D/VR Website in Cardano
          </Typography>
        </Box>
      </Box>

      <CardCover>
        <CardMedia image={'https://raw.githubusercontent.com/TURTLdao/TURTL-images/main/dao-bg.svg'} />
      </CardCover>

      <AvatarWrapper>
        <Avatar variant="rounded" alt={user.name} src={'/token-images/rccn.png'} />
      </AvatarWrapper>

      <Box py={2} pl={2} mb={3}>
        <Typography gutterBottom variant="h4">
          Racoons Club
        </Typography>
        <Typography variant="subtitle2">{user.description}</Typography>

        <Typography sx={{ py: 2 }} variant="subtitle2" color="text.primary">
          MEME | Token | Gaming
        </Typography>
        <Box
          display={{ xs: 'block', md: 'flex' }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Button href={user.twitter} target='_blank'  size="small" variant="contained">
              Follow on Twitter
            </Button>
            <Button href={user.website} target='_blank'  size="small" sx={{ mx: 2 }} variant="outlined">
              View website
            </Button>
            <Button href={user.buy_link} target='_blank' size="small" variant="outlined">
              Buy Now
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

ProfileCover.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired
};

export default ProfileCover;

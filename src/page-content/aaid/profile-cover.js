import PropTypes from 'prop-types';
import { Box, Typography, Card, Tooltip, Avatar, CardMedia, Button, Chip,
  IconButton, styled, Divider
} from '@mui/material';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';

const { LargerVerifiedIconWrapper, AvatarWrapper, CardCover } = require('src/components/custom.js');
const { verifiedCheckIcon } = require('src/consts/icons.js');

export const ProfileCover = ({ info }) => {

  return (
    <>
      <Box display="flex" mb={3}>
        <Tooltip arrow placement="top" title="Go back">
          <IconButton href='/aaid/' color="primary" sx={{ p: 2, mr: 2 }}>
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>

        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            {info.token_name}
          </Typography>
          <Typography variant="subtitle2">
            {info.slogan}
          </Typography>
        </Box>
      </Box>

      <div align='center'>
        <CardCover>
          <CardMedia image={'https://raw.githubusercontent.com/TURTLdao/TURTL-images/main/dao-bg.svg'} />
        </CardCover>
      </div>

      <div align='center'>
        <AvatarWrapper>
          <Avatar variant="rounded"
            src={info.logo}
          />
        </AvatarWrapper>
        <LargerVerifiedIconWrapper>
          <Avatar variant="rounded"
            src={verifiedCheckIcon('dao')}
          />
        </LargerVerifiedIconWrapper>
      </div>

      <Box py={2} pl={2} mb={3}>
        <Typography gutterBottom variant="h4" align='center'>
          {info.token_name}
        </Typography>

        <Typography variant="subtitle2" align='center'>
          {info.desc}
        </Typography>
        
        <div align='center'>
          <Divider sx={{ maxWidth: '40%', mt: 1 }}/>
        </div>

        <div align='center'>
        { info.type.map((type) => (
          <Chip
            sx={{
              mr: 0.5, my: 2
            }}
            size="small"
            label={type}
            color="secondary"
          /> ))
        }
        </div>

        <Box
          display={{ xs: 'block', md: 'flex' }}
          alignItems="center"
          justifyContent="center"
        >
          <Box>
          {
            info.links.website ? 
              <Button href={info.links.website} target='_blank'  size="small" variant="outlined" sx={{ mx: 1 }}>
                View website
              </Button>
            :
            null
          }
          {
            info.links.twitter ? 
              <Button href={info.links.twitter} target='_blank'  size="small" variant="outlined" sx={{ mx: 1 }}>
                Follow Twitter
              </Button>
            :
            null
          }
          {
            info.links.discord ? 
              <Button href={info.links.discord} target='_blank'  size="small" variant="outlined" sx={{ mx: 1 }}>
                Join Discord
              </Button>
            :
            null
          }
          {
            info.links.buy_now ?
              <Button href={info.links.buy_now} target='_blank'  size="small" variant="outlined" sx={{ mx: 1 }}>
                Buy Now
              </Button>
            :
            null
          }
          </Box>
        </Box>
      </Box>
    </>
  );
};

ProfileCover.propTypes = {
  info: PropTypes.string.isRequired,
};

export default ProfileCover;

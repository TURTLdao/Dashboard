import PropTypes from 'prop-types';
import { Box, Typography, Card, Tooltip, Avatar, CardMedia, Button,
  IconButton, styled, Grid, Divider
} from '@mui/material';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import Link from 'src/components/Link';
import { convertUnixTime } from 'src/utils/time';

const { balanceImage, verifiedCheckIcon } = require('src/consts/icons.js');
const { ProfilerWrapper, AvatarWrapper, CardCover, StatCard, LargerVerifiedIconWrapper } = require('src/components/custom.js');

export const AddressCover = ({ address_data, known_addrs }) => {
  const is_a_match = Object.values(known_addrs).some((obj) => obj.addr === address_data.address);

  const matchedStr = Object.values(known_addrs)
    .filter((obj) => obj.addr === address_data.address)
    .map((obj) => obj.str);
  const additional_info = is_a_match ? matchedStr : '';

  const twitterStr = Object.values(known_addrs)
    .filter((obj) => obj.addr === address_data.address)
    .map((obj) => obj.links.twitter);
  const twitter_info = is_a_match ? twitterStr : '';

  const websiteStr = Object.values(known_addrs)
    .filter((obj) => obj.addr === address_data.address)
    .map((obj) => obj.links.website);
  const website_info = is_a_match ? websiteStr : '';
  
  const balance_img = balanceImage(address_data.poolpm_data.lovelaces)

  return (
    <>
      <Box display="flex" mb={3}>

        <Tooltip arrow placement="top" title="Go back">
            <Link href='/cardano/search/' >
          <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
            <ArrowBackTwoToneIcon />
          </IconButton>
            </Link>
        </Tooltip>

        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            {address_data.address.slice(0, 20)}...
          </Typography>
          
          <Typography variant="subtitle2">
            {additional_info}
          </Typography>
        </Box>
      </Box>

      <div align='center'>
        <CardCover>
        { is_a_match ?
          <CardMedia image={'https://raw.githubusercontent.com/TURTLdao/TURTL-images/main/dao-bg.svg'} />
          :
          <CardMedia image={'https://raw.githubusercontent.com/TURTLdao/TURTL-images/main/basic-bg.svg'} />
        }
        </CardCover>
      </div>

      <div align='center'>
        <AvatarWrapper>
          <Avatar variant="rounded"
            src={`https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=${address_data.address}?randomizeIds=true`}
          />
        </AvatarWrapper>
        { is_a_match ?
          <LargerVerifiedIconWrapper>
            <Avatar variant="rounded"
              src={verifiedCheckIcon('ada')}
            />
          </LargerVerifiedIconWrapper>
          :
          null
        }
        <ProfilerWrapper>
          <Tooltip placement='top' title={balance_img[1]}>
            <Avatar variant="rounded" src={balance_img[0]} />
          </Tooltip>
        </ProfilerWrapper>
      </div>

      { twitter_info || website_info ? 
        <div align='center' style={{ marginTop: 10}}>
        { twitter_info ?
          <Button href={twitter_info} target='_blank'  size="small" sx={{ ml: 1 }} variant="outlined">
            Twitter
          </Button>
          :
          null
        }
        { website_info ?
          <Button href={website_info} target='_blank'  size="small" sx={{ ml: 1 }} variant="outlined">
            Website
          </Button>
          :
          null
        }
        </div>
        :
        null
      }

      <Divider sx={{ my: 2 }}/>

      <Grid sx={{ mt: 2}}>
        <div align='center'>
          <StatCard>
            <CardMedia>
              <Box px={10} py={3} sx={{ position: 'relative' }}>
                <Typography
                  sx={{
                    position: 'absolute', top: '10%', left: '5%'
                  }}
                  variant='caption'
                > { /* .snapshot_stake */}
                  Current Stake
                </Typography>

                <Typography
                  sx={{
                    position: 'absolute', top: '50%', left: '5%'
                  }}
                  variant='body2'
                >
                  ₳ {(address_data.adastat_data.address_data.snapshot_stake / 1000000).toLocaleString(undefined, { minimumFractionDigits: 6, maximumFractionDigits: 6 }) }
                </Typography>
              </Box>
            </CardMedia>
          </StatCard>
          
          <StatCard>
            <CardMedia>
              <Box px={10} py={3} sx={{ position: 'relative' }}>
                <Typography
                  sx={{
                    position: 'absolute', top: '10%', left: '5%'
                  }}
                  variant='caption'
                >
                  Last Transaction
                </Typography>

                <Link
                  href='#'
                  sx={{
                    position: 'absolute', top: '50%', left: '5%'
                  }}
                >
                  {convertUnixTime(address_data.adastat_data.address_data.last_tx_time).time_ago}
                </Link>

                <Typography
                  variant='body2'
                >
                </Typography>
              </Box>
            </CardMedia>
          </StatCard>

          <StatCard>
            <CardMedia>
              <Box px={10} py={3} sx={{ position: 'relative' }}>
                <Typography
                  sx={{
                    position: 'absolute', top: '10%', left: '5%'
                  }}
                  variant='caption'
                >
                  First Transaction
                </Typography>

                <Link
                  href='#'
                  sx={{
                    position: 'absolute', top: '50%', left: '5%'
                  }}
                >
                  {convertUnixTime(address_data.adastat_data.address_data.first_tx_time).time_ago}
                </Link>

                <Typography
                  variant='body2'
                >
                </Typography>
              </Box>
            </CardMedia>
          </StatCard>
        </div>
      </Grid>

      <Grid sx={{ mt: 1}}>
        <div align='center'>
        </div>
      </Grid>
    </>
  );
};

AddressCover.propTypes = {
  // @ts-ignore
  address_data: PropTypes.object.isRequired,
  known_addrs: PropTypes.object.isRequired,
};

export default AddressCover;

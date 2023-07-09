import PropTypes from 'prop-types';
import { Box, Typography, Card, Tooltip, Avatar, CardMedia, Button,
  IconButton, styled, Grid, Divider
} from '@mui/material';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import Link from 'src/components/Link';
import { convertIPFSUrlToHttpUrl } from 'src/utils/image';
import { convertUnixTime } from 'src/utils/time';

const { balanceImage, verifiedCheckIcon } = require('src/consts/icons.js');
const { ProfilerWrapper, AvatarWrapper, CardCover, StatCard, LargerVerifiedIconWrapper } = require('src/components/custom.js');

export const PolicyCover = ({ policy, known_policies, policy_data }) => {
  const matchedPolicy = Object.values(known_policies).find((obj) => obj.policy === policy && obj.links);
  const matchedDaoPolicy = Object.values(known_policies).find((obj) => obj.policy === policy && obj.checktype === 'dao');

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
            {policy.slice(0, 15) + '...' + policy_data.asset_data.name}
          </Typography>
        </Box>
      </Box>

      <div align='center'>
        <CardCover>
        { policy_data.asset_data.is_current_a_match ?
          <CardMedia image={'https://raw.githubusercontent.com/TURTLdao/TURTL-images/main/dao-bg.svg'} />
          :
          <CardMedia image={'https://raw.githubusercontent.com/TURTLdao/TURTL-images/main/basic-bg.svg'} />
        }
        </CardCover>
      </div>

      <div align='center'>
        {
          policy_data.asset_data.image ? 
          <AvatarWrapper>
            <Avatar variant="rounded"
              src={convertIPFSUrlToHttpUrl(policy_data.asset_data.image)}
            />
          </AvatarWrapper>
          : null
        }
        { matchedPolicy ?
          <>
            <LargerVerifiedIconWrapper>
              <Avatar variant="rounded"
                src={verifiedCheckIcon(matchedPolicy.checktype)}
              />
            </LargerVerifiedIconWrapper>
          </>
          : null
        }
      </div>

      { matchedPolicy ? 
        <div align='center' style={{ marginTop: 10}}>
        { matchedPolicy.links.twitter ?
          <Button href={matchedPolicy.links.twitter} target='_blank'  size="small" sx={{ ml: 1 }} variant="outlined">
            Twitter
          </Button>
          :
          null
        }
        { matchedPolicy.links.website ?
          <Button href={matchedPolicy.links.website} target='_blank'  size="small" sx={{ ml: 1 }} variant="outlined">
            Website
          </Button>
          :
          null
        }
        { matchedPolicy.links.buy_link ?
          <Button href={matchedPolicy.links.buy_link} target='_blank'  size="small" sx={{ ml: 1 }} variant="outlined">
            Buy Now
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
                > {}
                  Total Holders
                </Typography>

                <Typography
                  sx={{
                    position: 'absolute', top: '50%', left: '5%'
                  }}
                  variant='body2'
                >
                  { policy_data.asset_data.holders }
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
                > { /* .snapshot_stake */}
                  Circulating Supply
                </Typography>

                <Typography
                  sx={{
                    position: 'absolute', top: '50%', left: '5%'
                  }}
                  variant='body2'
                >
                  { Number(policy_data.asset_data.supply).toLocaleString(undefined, {
                        minimumFractionDigits: policy_data.asset_data.decimals,
                        maximumFractionDigits: policy_data.asset_data.decimals
                      }
                    )
                    }
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

                <Link href={'/transaction/' + policy_data.asset_data.time_tx.last_hash}
                  sx={{
                    position: 'absolute', top: '50%', left: '5%'
                  }}
                >
                  { convertUnixTime(policy_data.asset_data.time_tx.last_tx).time_ago }
                </Link>
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

                <Link href={'/transaction/' + policy_data.asset_data.time_tx.first_hash}
                  sx={{
                    position: 'absolute', top: '50%', left: '5%'
                  }}
                >
                { convertUnixTime(policy_data.asset_data.time_tx.first_tx).time_ago }
                </Link>
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

PolicyCover.propTypes = {
  // @ts-ignore
  policy: PropTypes.string.isRequired,
  known_policies: PropTypes.object.isRequired,
  policy_data: PropTypes.object.isRequired,
};

export default PolicyCover;

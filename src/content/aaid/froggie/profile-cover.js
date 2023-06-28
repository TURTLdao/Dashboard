import PropTypes from 'prop-types';
import { Box, Typography, Card, Tooltip, Avatar,
  CardMedia, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import { KoiosProvider } from "@meshsdk/core";
import { useRewardAddress, useWallet, useWalletList, useWalletTx } from "@meshsdk/react";
import { useEffect, useState } from 'react';
import { Delegate } from 'src/components/buttons/stake-pool';

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

export async function do_delegation()
{
  try {
    const rewardAddresses = await wallet.getRewardAddresses();
    const poolId = 'pool1t0jheek3yftf0a9dgzgr2hc2wttwrcjyd5whdrek4ggcc5famre'

    const tx = new Transaction({ initiator: wallet });
    tx.delegateStake(rewardAddress, poolId);
    
    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);

    return txHash;
  } catch (error) {
    console.log('Failed to delegate to pool: ' + error.message);
  }
}

export const ProfileCover = ({ user }) => {
  const { connecting, connected } = useWallet()
  const blockchainProvider = new KoiosProvider("api");
  const wallets = useWalletList();
  const [hideMenuList, setHideMenuList] = useState(true);
  const poolId = 'pool1t0jheek3yftf0a9dgzgr2hc2wttwrcjyd5whdrek4ggcc5famre'


  function handlePoolDelegate() {

  }

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
            Froggie Koin
          </Typography>
          <Typography variant="subtitle2">
            Froggie is here for everyone. Froggie is the new wave.
          </Typography>
        </Box>
      </Box>

      <CardCover>
        <CardMedia image={'https://raw.githubusercontent.com/TURTLdao/TURTL-images/main/dao-bg.svg'} />
      </CardCover>

      <AvatarWrapper>
        <Avatar variant="rounded" alt={user.name} src={'/token-images/froggie.png'} />
      </AvatarWrapper>

      <Box py={2} pl={2} mb={3}>
        <Typography gutterBottom variant="h4">
          Froggie Koin
        </Typography>
        <Typography variant="subtitle2">{user.description}</Typography>

        <Typography sx={{ py: 2 }} variant="subtitle2" color="text.primary">
          MEME | Token
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
            <Button href={user.buy_link} target='_blank' size="small" sx={{ mr: 2 }} variant="outlined">
              Buy Now
            </Button>
            {
            /*  connected ?
              <Button
                variant='outlined'
                onClick={() => setHideMenuList(!hideMenuList)}
              >
                {
                connected ? (
                  <Delegate poolId={poolId} />
                )
                  : null
                }
              </Button>
              :
              null
            */
            }
          </Box>
        </Box>
      </Box>
    </>
  );
};

ProfileCover.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired,
};

export default ProfileCover;

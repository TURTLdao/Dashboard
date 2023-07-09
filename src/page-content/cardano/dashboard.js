import { useRef, useState } from 'react';
import {
  Avatar, Button, Grid, Box, FormControl, Typography, OutlinedInput,
  Table, TableBody, TableCell, TableHead, TableRow, TableContainer,
  Pagination, InputAdornment, styled, Card, Tooltip, IconButton, CardMedia
} from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import ShuffleIcon from '@mui/icons-material/Shuffle';

import Text from 'src/components/Text';
import Link from 'src/components/Link';

const { StatCard } = require('src/components/custom.js');

const { verifiedCheckIcon } = require('src/consts/icons.js');
const { knownAddresses } = require('src/consts/known/addrs.js');
const { TableIconWrapper, VerifiedIconWrapper } = require('src/components/custom.js');

function DashboardView({  }) {
  const known_addresses_count = Object.keys(knownAddresses).length;

  const [searchInput, setSearchInput] = useState('');
  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const [addrList, setAddrList] = useState(knownAddresses);

  const shuffleAddrObj = () => {
    const keys = Object.keys(addrList);
    const shuffledKeys = shuffleArray(keys);
    const shuffledAddrList = {};
  
    shuffledKeys.forEach((key, index) => {
      shuffledAddrList[index + 1] = addrList[key];
    });
  
    setAddrList(shuffledAddrList);
  };
  
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const statcard_list = {
    cardano_price: {
      value: 0,
      title: 'Cardano Price'
    },
    marketcap: {
      value: 0,
      title: 'Cardano Marketcap'
    },
    volume: {
      value: 0,
      title: 'Cardano Volume'
    },
    supply: {
      value: 0,
      title: 'Circulating supply'
    },
    holders: {
      value: 0,
      title: 'Cardano Holders'
    },
    stake_pools: {
      value: 0,
      title: 'Active Stake Pools'
    },
    total_stake: {
      value: 0,
      title: 'Total Staked $ADA'
    },
  }

  return (
    <>
      <Grid container spacing={1} >
        <div align='center'>
          { Object.entries(statcard_list).map(([key, value], index) => {

            return (
              <StatCard>
                <CardMedia>
                  <Box px={12} py={4} sx={{ position: 'relative' }}>
                    <Typography
                      sx={{ position: 'absolute', top: '10%', left: '5%' }}
                      variant='caption'
                    >
                      {value.title}
                    </Typography>
                    
                    <Typography
                      sx={{ position: 'absolute', top: '50%', left: '5%' }}
                      variant='body2'
                    >
                      {value.value}
                    </Typography>
                  </Box>
                </CardMedia>
              </StatCard>
            );})
          }
        </div>
      </Grid>
    </>
  );
}

export default DashboardView;
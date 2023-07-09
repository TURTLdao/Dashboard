import { useRef, useState } from 'react';
import {
  Avatar, Button, Grid, Box, FormControl, Typography, OutlinedInput,
  Table, TableBody, TableCell, TableHead, TableRow, TableContainer,
  Pagination, InputAdornment, styled, Card, Tooltip, IconButton
} from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import ShuffleIcon from '@mui/icons-material/Shuffle';

import Text from 'src/components/Text';
import Link from 'src/components/Link';

const { verifiedCheckIcon } = require('src/consts/icons.js');
const { knownAddresses } = require('src/consts/known/addrs.js');
const { TableIconWrapper, VerifiedIconWrapper } = require('src/components/custom.js');

function SearchAddressView({  }) {
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


  return (
    <>
    <FormControl variant="outlined" fullWidth>
      <OutlinedInput
        type="text"
        placeholder="Search Cardano Address here..."
        value={searchInput}
        onChange={handleInputChange}
        endAdornment={
          <InputAdornment position="end">
            <Button variant="contained" size="small" href={'/address/' + searchInput}>
              Search
            </Button>
          </InputAdornment>
        }
        startAdornment={
          <InputAdornment position="start">
            <SearchTwoToneIcon />
          </InputAdornment>
        }
      />
    </FormControl>
    <Box
      py={3}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{ my: 2, mx: 2}}
    >
      <Box>
        <Typography variant="subtitle2">
          Showing{' '}

          <Text color="black">
            <b>{known_addresses_count} Recognised Addresses</b>
          </Text>
        </Typography>
        <Typography variant='caption' sx={{ my: 2}}>
          These address are known throughout the platform.
        </Typography>
      </Box>

      <Tooltip title='Shuffle List' placement='top'>
        <IconButton onClick={shuffleAddrObj}>
          <ShuffleIcon/>
        </IconButton>
      </Tooltip>
    </Box>

      <Grid container spacing={1} >
      <TableContainer 
        sx={{ mx: 2}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center' sx={{ minWidth: 100}}>
                  PFP
                </TableCell>
                <TableCell align='center'>
                  Owner
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 600}}>
                  Address
                </TableCell>
                <TableCell align='center' sx={{ minWidth: 250}}>
                  Links
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
            {
            Object.entries(addrList).map(([key, value], index) => {

                return (
                  <TableRow
                    hover
                  >
                    <TableCell align='center'>
                      <TableIconWrapper>
                        <Avatar variant="rounded"
                          src={`https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=${value.addr}?randomizeIds=true`}
                        />
                      </TableIconWrapper>

                      <VerifiedIconWrapper>
                        <Avatar variant="rounded"
                          src={verifiedCheckIcon(value.checktype)}
                        />
                      </VerifiedIconWrapper>
                    </TableCell>

                    <TableCell align='center'>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        gutterBottom
                        noWrap
                      >
                        {value.name}
                      </Typography>
                    </TableCell>

                    <TableCell align='left'>
                      <Link href={'/address/' + value.addr}>
                        {`${value.addr.substring(0, 30)}...${value.addr.substring(value.addr.length - 30)}`}
                      </Link>
                    </TableCell>

                    <TableCell align='center'>
                      {
                      value.links.website ?
                        <Button variant='outlined' href={value.website} hrefPass size='small' sx={{ mx: 1 }}>
                          Website
                        </Button>
                        :
                        null
                      }

                      {
                      value.links.twitter ?
                        <Button variant='outlined' href={value.twitter} size='small' hrefPass sx={{ mx: 1 }}>
                          Twitter
                        </Button>
                        :
                        null
                      }
                    </TableCell>

                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
}

export default SearchAddressView;
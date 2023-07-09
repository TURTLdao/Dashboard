import { useRef, useState } from 'react';
import {
  Button, Grid, Box, FormControl, Typography, OutlinedInput,
  Table, TableBody, TableCell, TableHead, TableRow, TableContainer,
  Pagination, InputAdornment, styled, Avatar, Card, IconButton, Tooltip, Chip
} from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Text from 'src/components/Text';
import Link from 'src/components/Link';
import ShuffleIcon from '@mui/icons-material/Shuffle';

const { knownTokens } = require('src/consts/known/tokens.js');
const { TableIconWrapper, VerifiedIconWrapper } = require('src/components/custom.js');
const { verifiedCheckIcon } = require('src/consts/icons.js');

function SearchTokenView() {
  
  const known_addresses_count = Object.keys(knownTokens).length;

  const [searchInput, setSearchInput] = useState('');
  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const [policyList, setPolicyList] = useState(knownTokens);

  const shufflePolicyObj = () => {
    const keys = Object.keys(policyList);
    const shuffledKeys = shuffleArray(keys);
    const shuffledPolicyList = {};
  
    shuffledKeys.forEach((key, index) => {
      shuffledPolicyList[index + 1] = policyList[key];
    });
  
    setPolicyList(shuffledPolicyList);
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
        placeholder="Search Cardano Policy here..."
        value={searchInput}
        onChange={handleInputChange}
        endAdornment={
          <InputAdornment position="end">
            <Button variant="contained" size="small" href={'/policy/' + searchInput}>
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
              <b>{known_addresses_count} Recognised Policies</b>
            </Text>
          </Typography>
      </Box>
      <Tooltip title='Shuffle List' placement='top'>
        <IconButton onClick={shufflePolicyObj}>
          <ShuffleIcon/>
        </IconButton>
      </Tooltip>
    </Box>


      <Grid container spacing={1} >
      <TableContainer 
        sx={{ mx: 2}}>
          <Table 
          >
            <TableHead>
              <TableRow>
                <TableCell align='left' sx={{ minWidth: 100}} >
                  Logo
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 150}}>
                  Asset Name
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 400}}>
                  Policy
                </TableCell>
                <TableCell align='center' sx={{ minWidth: 300}}>
                  Links
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
            {
            Object.entries(policyList).map(([key, value], index) => {

                return (
                  <TableRow
                    hover
                  >
                    <TableCell align='left'>
                      <TableIconWrapper>
                        <Avatar variant="rounded"
                          src={value.logo}
                        />
                      </TableIconWrapper>
                      
                      <VerifiedIconWrapper>
                        <Avatar variant="rounded"
                          src={verifiedCheckIcon(value.checktype)}
                        />
                      </VerifiedIconWrapper>
                      
                    </TableCell>

                    <TableCell align='left'>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        gutterBottom
                        noWrap
                      >
                        {value.token_name}
                      </Typography>
                      {
                        value.ticker ? 
                        <Typography
                          variant="caption"
                          fontWeight="bold"
                          gutterBottom
                          noWrap
                          sx={{ mr: 1 }}
                        >
                          {value.ticker}
                        </Typography>
                        :
                        null
                      }
                      <Chip
                        size='small'
                        label={value.type}
                      />

                    </TableCell>

                    <TableCell align='left'>
                      <Link href={'/token/' + value.policy}>
                        {value.policy}
                      </Link>
                    </TableCell>

                    <TableCell align='center'>
                    { value.aaid ?
                      <Button variant='outlined' href={value.aaid} size='small' hrefPass sx={{ mx: 0.5 }}>
                        DAO
                      </Button>
                      :
                      null
                    }

                    { value.links.twitter ?
                      <Button variant='outlined' href={value.links.twitter} size='small' hrefPass sx={{ mx: 0.5 }}>
                        Twitter
                      </Button>
                      :
                      null
                    }

                    { value.links.website ?
                      <Button variant='outlined' href={value.links.website} hrefPass size='small' sx={{ mx: 0.5 }}>
                        Website
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

export default SearchTokenView;
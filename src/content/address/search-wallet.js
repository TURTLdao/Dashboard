import { useRef, useState } from 'react';
import {
  Button, Grid, Box, FormControl, Typography, OutlinedInput,
  Table, TableBody, TableCell, TableHead, TableRow, TableContainer,
  Pagination, InputAdornment, styled,
} from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Text from 'src/components/Text';

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
    padding-right: ${theme.spacing(0.7)}
`
);

function SearchWalletView() {
  
  const known_addresses = {
    turtledao: 'addr1qywhrwe3vufpf66n7w9ld42ths6j6j53swv9agpt3pd0u409hz67cj83lhuhgvvtu97jd3fyswqu80g0s3uuawen7kmqv4w2sg',
    froggie: 'addr1q99eal8y8nw65yxhnn2vj2dyrq7rgh8juq5ld2freccd47shluyj4ps4xddymym86xlfe2sndcymk76gv88uccaq0rrqkyuump',
    minswap: 'addr1zxn9efv2f6w82hagxqtn62ju4m293tqvw0uhmdl64ch8uw6j2c79gy9l76sdg0xwhd7r0c0kna0tycz4y5s6mlenh8pq6s3z70',
  }

  const known_addresses_count = Object.keys(known_addresses).length;

  const [searchInput, setSearchInput] = useState('');
  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
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
            <Button variant="contained" size="small" href={'/' + searchInput}>
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
              <b>{known_addresses_count} Known Addresses</b>
            </Text>
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3} >
      <TableContainer 
        sx={{ my: 2, mx: 2}}>
          <Table 
          >
            <TableHead>
              <TableRow>
                <TableCell align='left'>
                  Name
                </TableCell>
                <TableCell align='left'>
                  Address
                </TableCell>
                <TableCell align='center'>
                  Explore
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
            {
            Object.entries(known_addresses).map(([key, value], index) => {
              if (key === 'turtledao') {
                key = 'TurtleDAO';
              } else if (key === 'froggie') {
                key = 'Froggie Koin'
              } else if (key === 'minswap') {
                key = 'Minswap'
              }

                return (
                  <TableRow
                    hover
                  >
                    <TableCell align='left'>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {key}
                      </Typography>
                    </TableCell>

                    <TableCell align='left'>
                      <Typography
                        variant="subtitle2"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {value}
                      </Typography>
                      
                    </TableCell>

                    <TableCell align='center'>
                      <Button href={'/' + value} hrefPass>
                        Explore
                      </Button>
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

export default SearchWalletView;
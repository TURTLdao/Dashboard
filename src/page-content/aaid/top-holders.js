import { Card, CardHeader, Divider, useTheme,
  styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Tabs, Tab, Box, Typography, Tooltip, FormControl, MenuItem, Select, InputLabel
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Link from 'src/components/Link';

const { knownAddresses } = require('src/consts/known/addrs.js');
const { VerifiedIconWrapper } = require('src/components/custom.js');

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

function TopHolders({ holders_rows, supply, token_price, cardano_fiat_data }) {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const calculatePercentage = (quantity) => {
    return ((quantity / supply) * 100).toFixed(2); // Calculate percentage and round to 2 decimal places
  };

  const [selectedFiat, setSelectedFiat] = useState('USD');
  const fiat_options = [
    { id: 'USD', price: '$ USD' },
    { id: 'GBP', price: '£ GBP' },
    { id: 'EUR', price: '€ EUR' },
  ];



  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title="Top Holders"
        action={token_price ? (
          <div>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Fiat</InputLabel>
              <Select
                label="Fiat View"
                autoWidth
                value={selectedFiat}
                onChange={(event) => setSelectedFiat(event.target.value)}
                size='small'
              >
                {fiat_options.map((fiat_option) => (
                  <MenuItem key={fiat_option.id} value={fiat_option.id}>
                    {fiat_option.price}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        ) : null}
      />
      
      <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center' sx={{ minWidth: '100%' }}>Rank</TableCell>
              <Tooltip title='Percentage of Supply' placement='top'>
                <TableCell align='center' sx={{ minWidth: 100 }}>POS</TableCell>
              </Tooltip>
              <TableCell align='center' sx={{ minWidth: 120 }}>Quantity</TableCell>
              <TableCell align='center' sx={{ minWidth: 120 }}>ADA Value</TableCell>
              {
                token_price ? <TableCell align='center' sx={{ minWidth: 120 }}>Fiat Value</TableCell>
                : null
              }
              <TableCell align='left' sx={{ minWidth: 100 }}>Address</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
          { holders_rows.map((row, index) => {
            const is_a_match = Object.values(knownAddresses).some((addr) => addr.addr === row.address);
            const matchedStr = Object.entries(knownAddresses)
              .filter(([key, addr]) => addr.addr === row.address)
              .map(([key, obj]) => obj.name);
            const filteredAddresses = is_a_match ? matchedStr : `${row.address.slice(0, 20)}...${row.address.slice(-20)}`

            return (
            <TableRow key={row.account_hash}>
              <TableCell align='center'>{index + 1}</TableCell>
              <TableCell align='center'>{calculatePercentage(row.quantity)}%</TableCell>
              <TableCell align='center'>{Number(row.quantity).toLocaleString()}</TableCell>
              {
                token_price ? 
                <>
                <TableCell align='center'>₳ {Number(token_price * row.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                { selectedFiat === 'GBP' && (
                  <TableCell align='center'>
                    £{Number(token_price * row.quantity * cardano_fiat_data.gbp).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>)
                }
                { selectedFiat === 'EUR' && (
                  <TableCell align='center'>
                    €{Number(token_price * row.quantity * cardano_fiat_data.eur).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>)
                }
                { selectedFiat === 'USD' && (
                  <TableCell align='center'>
                    ${Number(token_price * row.quantity * cardano_fiat_data.usd).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>)
                }
                </>
                : null
              }
              <TableCell align='left'>
                <Link href={'/address/' + row.address}>
                  {filteredAddresses}
                </Link>
              </TableCell>
            </TableRow>
            );})
          }
          </TableBody>
        </Table>
    </TableContainer>
    </Card>
  );
}

TopHolders.propTypes = {
  holders_rows: PropTypes.array.isRequired,
  supply: PropTypes.number.isRequired,
  token_price: PropTypes.number,
  cardano_fiat_data: PropTypes.object.isRequired,
};

export default TopHolders;

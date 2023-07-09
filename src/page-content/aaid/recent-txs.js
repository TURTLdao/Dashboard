import { Card, CardHeader, Divider, useTheme,
  styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Tabs, Tab, Box, Typography, Tooltip, FormControl, MenuItem, Select, InputLabel
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Link from 'src/components/Link';
import { adastatPolicyTransactions } from 'src/api/address-data'
import { convertUnixTime } from 'src/utils/time';
const { DAO_SUPPORTED_ITEMS } = require('src/dao/dao-object.js');


function RecentTransactions({ transactions_rows, supply, token_price, cardano_fiat_data, decimals }) {
  const theme = useTheme();

  const calculatePercentage = (quantity) => {
    return ((quantity / supply) * 100).toFixed(2); // Calculate percentage and round to 2 decimal places
  };

  const [selectedFiat, setSelectedFiat] = useState('USD');
  const fiat_options = [
    { id: 'USD', price: '$ USD' },
    { id: 'GBP', price: '£ GBP' },
    { id: 'EUR', price: '€ EUR' },
  ];

  const policy = DAO_SUPPORTED_ITEMS.froggie_koin.policy;

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title="Recent Transactions"
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
              {
                fiat_options.map((fiat_option) => (
                  <MenuItem key={fiat_option.id} value={fiat_option.id}>
                    {fiat_option.price}
                  </MenuItem>
                ))
              }
              </Select>
            </FormControl>
          </div>
        ) : null}
      />
      
      <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center' sx={{ minWidth: 180 }}>Time</TableCell>
              <Tooltip title='Percentage of Supply' placement='top'>
                <TableCell align='center' sx={{ minWidth: 100 }}>POS</TableCell>
              </Tooltip>
              <TableCell align='center' sx={{ minWidth: 120 }}>Quantity</TableCell>
              {
                token_price ? 
                  <TableCell align='center' sx={{ minWidth: 120 }}>Fiat Value</TableCell>
                : null
              }
              <TableCell align='left' sx={{ minWidth: 150 }}>Transaction Hash</TableCell>
              <TableCell align='center' sx={{ minWidth: 100 }}>Epoch</TableCell>
              <TableCell align='center' sx={{ minWidth: 130 }}>Block Index</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
          { transactions_rows.map((transaction, index) => {
            const { quantity, tx_hash, block_no, epoch_no, time } = transaction;
            const convertedTime = convertUnixTime(time);
            const timeAgo = convertUnixTime(time).time_ago;
            const pos = calculatePercentage(quantity)
    
            return (
              <TableRow>
                <TableCell align='center'>
                  <Typography variant='body1'>{convertedTime.time_ago}</Typography>
                  <Typography variant='caption'>{convertedTime.local_time + ' - ' + convertedTime.date}</Typography>
                </TableCell>

                <TableCell align='center'>{pos}%</TableCell>
                <TableCell>{Number(quantity).toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</TableCell>
                {
                  token_price ? 
                  <>
                  { selectedFiat === 'GBP' && (
                    <TableCell align='center'>
                      £{Number(token_price * quantity * cardano_fiat_data.gbp).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>)
                  }
                  { selectedFiat === 'EUR' && (
                    <TableCell align='center'>
                      €{Number(token_price * quantity * cardano_fiat_data.eur).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>)
                  }
                  { selectedFiat === 'USD' && (
                    <TableCell align='center'>
                      ${Number(token_price * quantity * cardano_fiat_data.usd).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>)
                  }
                  </>
                  : null
                }
                <TableCell align='left'>{tx_hash}</TableCell>
                <TableCell align='center'>{epoch_no}</TableCell>
                <TableCell align='center'>{block_no}</TableCell>
              </TableRow>
            );
          })}
          </TableBody>

        </Table>
      </TableContainer>
    </Card>
  );
}

RecentTransactions.propTypes = {
  transactions_rows: PropTypes.array.isRequired,
  supply: PropTypes.number.isRequired,
  token_price: PropTypes.number,
  cardano_fiat_data: PropTypes.object.isRequired,
};

export default RecentTransactions;

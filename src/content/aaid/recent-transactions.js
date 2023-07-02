import { Card, CardHeader, Divider, useTheme,
  styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Tabs, Tab, Box, Typography, Tooltip, FormControl, MenuItem, Select, InputLabel
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

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

function RecentTransactionsTable({ rows, token_price, fiat }) {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        title="Recent $FROGGIE Transactions"
        action={
          <div>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Fiat</InputLabel>
                <Select
                  label="Fiat View"
                  autoWidth
                  value={selectedFiat}
                  onChange={(event) => setSelectedFiat(event.target.value)}
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
        }
      />
      <Box sx={{ width: '100%' }}>
        <TabPanel value={value} index={0}>
          <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell >Transaction Hash</TableCell>
                  <TableCell >Quantity</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Fiat Value</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
              {
          Object.entries(rows.recent_txs)
          .map(([key, value], index) => {
            console.log(value)
            return (
                  <TableRow key={key}>
                  <TableCell >{value.tx_hash}</TableCell>
                  <TableCell >{Number(value.quantity).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</TableCell>
                    {
                      selectedFiat === 'GBP' && (
                        <TableCell>
                          £{Number(token_price * value.quantity * fiat[1]).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </TableCell>
                      )
                    }
                    {
                      selectedFiat === 'EUR' && (
                        <TableCell>
                          €{Number(token_price * value.quantity * fiat[2]).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </TableCell>
                      )
                    }
                    {
                      selectedFiat === 'USD' && (
                        <TableCell>
                          ${Number(token_price * value.quantity * fiat[0]).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </TableCell>
                      )
                    }
                    
                  </TableRow>
                );})
              }
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        
        <TabPanel value={value} index={1}>
                    Item Two
        </TabPanel>
      </Box>

      
    </Card>
  );
}

RecentTransactionsTable.propTypes = {
  rows: PropTypes.object.isRequired,
  token_price: PropTypes.number.isRequired,
  fiat: PropTypes.object.isRequired,
};

export default RecentTransactionsTable;

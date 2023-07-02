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

function HoldersTable({ rows, supply, token_price, fiat }) {
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
        action={
          <div>
          <Tabs
            variant="scrollable" scrollButtons="auto"
            textColor="primary" indicatorColor="primary"
            value={value} onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Table View" {...a11yProps(0)} />
            <Tab label="Chart View" {...a11yProps(1)} />
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
          </Tabs>
          
          </div>
        }
      />
      <Box sx={{ width: '100%' }}>
        <TabPanel value={value} index={0}>
          <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell >Address</TableCell>
                  <TableCell >Quantity</TableCell>
                  <Tooltip title='Percentage of Supply' placement='top'>
                    <TableCell >POS</TableCell>
                  </Tooltip>
                  <TableCell >ADA Value</TableCell>
                  <TableCell >Fiat Value</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
              {
                rows.map(row => (
                  <TableRow key={row.account_hash}>
                    <TableCell><a href={'https://www.turtle-dao.com/' + row.address} target='_blank'>{`${row.address.slice(0, 20)}...${row.address.slice(-20)}`}</a></TableCell>
                    <TableCell>{Number(row.quantity).toLocaleString()}</TableCell>
                    <TableCell>{calculatePercentage(row.quantity)}%</TableCell>
                    <TableCell>₳ {Number(token_price * row.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                    {
                      selectedFiat === 'GBP' && (
                        <TableCell>
                          £{Number(token_price * row.quantity * fiat[1]).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </TableCell>
                      )
                    }
                    {
                      selectedFiat === 'EUR' && (
                        <TableCell>
                          €{Number(token_price * row.quantity * fiat[2]).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </TableCell>
                      )
                    }
                    {
                      selectedFiat === 'USD' && (
                        <TableCell>
                          ${Number(token_price * row.quantity * fiat[0]).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </TableCell>
                      )
                    }

                  </TableRow>
                ))
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

HoldersTable.propTypes = {
  rows: PropTypes.array.isRequired,
  supply: PropTypes.number.isRequired,
  token_price: PropTypes.number.isRequired,
  fiat: PropTypes.object.isRequired,
};

export default HoldersTable;

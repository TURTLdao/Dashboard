import { useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  Button
} from '@mui/material';

const applyFilters = (cryptoOrders, filters) => {
  let sortedCryptoOrders = [...cryptoOrders];

  if (filters.status === 'p') {
    sortedCryptoOrders.sort((a, b) => b.price - a.price);
  }

  return sortedCryptoOrders;
};

const calculate_tokens_to_ada = (tokenPrice) => {
    if (tokenPrice <= 0) {
      return 0; // Invalid tokenPrice
    }

    const out = 1 / tokenPrice;
    if (out < 1) {
      return out.toFixed(5);
    } else {
      return (1 / tokenPrice);
    }
  };

function calculatePrice(ada_usd, number) {
  const result = ada_usd * number;
  const formattedResult = result.toString().includes('e') ? 'too small to calculate accurately' : result.toFixed(5);
  return `$ ${formattedResult}`;
}

const TrendingTokensTable = ({ cryptoOrders }) => {
  const statusOptions = [
    {
      id: 'all',
      name: 'Volume'
    },
    {
      id: 'p',
      name: 'Price'
    },
  ];

  const [filters, setFilters] = useState({
    status: null
  });

  const handleStatusChange = (e) => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const theme = useTheme();

  const sortedCryptoOrders = applyFilters(cryptoOrders, filters);

  return (
    <Card>
      <CardHeader
        action={
          <div>
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Sort By"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
        }
      />
      <Divider />
      <TableContainer>
          <Table 
          >
            <TableHead>
              <TableRow>
                <TableCell align='left'>
                  Rank
                </TableCell>
                <TableCell align='center'>
                  Logo
                </TableCell>
                <TableCell align='center'>
                  Name
                </TableCell>
                <TableCell align='right'>
                  Price
                </TableCell>
                <TableCell align='right'>
                  Volume
                </TableCell>
                <TableCell align='right'>
                  Marketcap
                </TableCell>
                <TableCell align='right'>
                  <div >
                    <Tooltip title="Some tokens may not have decimals.">
                      <div >
                         ADA Compare
                       </div>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
            {
              sortedCryptoOrders.map((item, index) => {

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
                        {index + 1}
                      </Typography>
                    </TableCell>

                    <TableCell align='center'>
                      <img src={item.logo} width="30" height="30" />
                    </TableCell>

                    <TableCell align='center'>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        ${item.ticker}
                      </Typography>
                    </TableCell>

                    <TableCell align='right'>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        ₳ {Number(item.price).toFixed(5)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {'$ ' + Number(item.priceUSD).toFixed(10)}
                      </Typography>
                    </TableCell>

                    <TableCell align="right">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        ₳ {item.volume.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </Typography>
                    </TableCell>

                    <TableCell align="right">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        ₳ {item.marketCap.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </Typography>
                    </TableCell>

                    <TableCell align="right">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {calculate_tokens_to_ada(item.price).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ${item.ticker}
                      </Typography>
                    </TableCell>

                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
      </TableContainer>
    </Card>
  );
};

TrendingTokensTable.propTypes = {
  cryptoOrders: PropTypes.object.isRequired,
};

TrendingTokensTable.defaultProps = {
  cryptoOrders: {},
};

export default TrendingTokensTable;

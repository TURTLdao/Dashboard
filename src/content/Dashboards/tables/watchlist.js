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

function calculatePrice(ada_usd, number) {
  const result = ada_usd * number;
  const formattedResult = result.toString().includes('e') ? 'too small to calculate accurately' : result.toFixed(5);
  return `$ ${formattedResult}`;
}

const WatchlistTable = ({ cryptoOrders }) => {
  const statusOptions = [
    {
      id: 'all',
      name: 'Default'
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
        title="TurtleDAO Supported"
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Logo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Volume</TableCell>
              <TableCell align="right">Marketcap</TableCell>
              <TableCell align="right">ADA Compare</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedCryptoOrders.map((cryptoOrder, id) => {
              return (
                <TableRow hover key={id}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {id + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <img style={{ width: 50, height: 50 }} src={cryptoOrder.logo} alt={cryptoOrder.name} />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {cryptoOrder.ticker}
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
                      ₳ {cryptoOrder.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {'$ ' + Number(cryptoOrder.price_usd).toFixed(10)}
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
                      ₳ {cryptoOrder.volume}
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
                      ₳ {cryptoOrder.marketcap}
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
                      {cryptoOrder.ada_compare} {cryptoOrder.ticker}
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

WatchlistTable.propTypes = {
  cryptoOrders: PropTypes.array.isRequired,
};

WatchlistTable.defaultProps = {
  cryptoOrders: [],
};

export default WatchlistTable;

import { useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Chip,
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
  Button,
  Switch,
  FormControlLabel
} from '@mui/material';


const TokensTable = ({ poolpm_addr_data }) => {
  const calculatePercentage = (quantity, supply) => {
    return ((quantity / supply) * 100).toFixed(2); // Calculate percentage and round to 2 decimal places
  };

  const [filterEnabled, setFilterEnabled] = useState(true);

  return (
    <Card>
      <CardHeader
        title='Tokens List'
        action={
          <div>
            <FormControlLabel
              control={
                <Switch
                  checked={filterEnabled}
                  onChange={(event) => setFilterEnabled(event.target.checked)}
                />
              }
              label={filterEnabled ? "Regulated" : "All"}
            />
          </div>
        }
      />
      <Divider />
      <TableContainer sx={{ height: 400}}>
          <Table
          >
            <TableHead>
              <TableRow>
                <TableCell align='left'>
                  Name
                </TableCell>
                <TableCell align='center'>
                  Amount
                </TableCell>
                <Tooltip title='Percentage of Supply' placement='top'>
                  <TableCell align='center'>
                    POS
                  </TableCell>
                </Tooltip>
              </TableRow>
            </TableHead>

            <TableBody>
            {
              Object.entries(poolpm_addr_data.tokens)
              .filter(([key, value]) => {
                if (filterEnabled) {
                  return !(value.minted_quantity < 1000000) && (value.metadata?.ticker || value.metadata?.symbol);
                } else {
                  return !(value.minted_quantity < 1000000);
                }
              })
              .map(([key, value], index) => {

                return (
                  <TableRow
                    hover
                  >
                  <TableCell align='left'>
                    <Typography variant='body1'>
                      {value.metadata?.name}
                    </Typography>
                    <Typography variant='subtitle1'>
                      ${value.metadata?.ticker || value.metadata?.symbol}
                    </Typography>
                    
                  </TableCell>
                  <TableCell align='center'>
                    {Number(value.quantity).toLocaleString(undefined, {
                      minimumFractionDigits: value.quantity < 10 ? 6 : 0,
                      maximumFractionDigits: value.quantity < 10 ? 6 : 0
                    })}
                  </TableCell>
                  <TableCell align='center'>
                     {calculatePercentage(value.quantity, value.minted_quantity) + '%'}
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

TokensTable.propTypes = {
  poolpm_addr_data: PropTypes.array.isRequired,
};

TokensTable.defaultProps = {
  poolpm_addr_data: {},
};

export default TokensTable;

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
  Button
} from '@mui/material';

const applyFilters = (tx_rows, filters) => {
  if (!tx_rows || !tx_rows.tokens || !tx_rows.tokens.rows) {
    // Handle case when data or data.tokens or data.tokens.rows is undefined
    return [];
  }

  let sortedData = [...tx_rows.tokens.rows];

  // Apply filter for policy IDs if provided
  if (filters.policyId) {
    sortedData = sortedData.filter(row => row.policy === filters.policyId);
  }

  return sortedData;
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

const RecentTransactionsTable = ({ tx_rows }) => {

  function convertUnixTime(unixTime) {
    const date = new Date(unixTime * 1000); // Convert Unix time to milliseconds

    // Get the components of the date
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);

    // Create formatted date string (DD/MM/YYYY)
    const formattedDate = `${day}/${month}/${year}`;

    // Create local time string
    const localTime = `${hours}:${minutes}:${seconds}`;

    // Return the object with the desired properties
    return {
      date: formattedDate,
      local_time: localTime
    };
  }

  const [selectedPolicy, setSelectedPolicy] = useState('');

  // Get unique policy values
  const uniquePolicies = Object.entries(tx_rows).flatMap(([, value]) =>
  Object.values(value.tokens.rows).map((asset) => ({
    policy: asset.policy,
    assetName: asset.asset_name,
  }))
).reduce((unique, policy) => {
  if (!unique.some(p => p.policy === policy.policy)) {
    unique.push(policy);
  }
  return unique;
}, []);
  
  // Filter the data based on the selected policy
  const filteredData = selectedPolicy
    ? Object.entries(tx_rows).filter(([key, value]) =>
        Object.values(value.tokens.rows).some(
          (asset) => asset.policy === selectedPolicy
        )
      )
    : Object.entries(tx_rows);
  

  return (
    <Card>
      <CardHeader
        title='Recent Transactions'
        action={<>
          <Select
            value={selectedPolicy}
            label='Filter Transactions'
            onChange={(e) => setSelectedPolicy(e.target.value)}
            displayEmpty
            sx={{ minWidth: 200, marginBottom: 2 }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300,
                },
              },
            }}
          >
            <MenuItem value="" disabled>
              Select Asset
            </MenuItem>
            <MenuItem value="" key="clear" onClick={() => setSelectedPolicy('')}>
              All Assets
            </MenuItem>
            {uniquePolicies.map((policy) => (
              <MenuItem value={policy.policy} key={policy}>
                {policy.assetName}
              </MenuItem>
            ))}
          </Select>
        </>
        }
      />
      <Divider />
      <TableContainer sx={{ height: 400}}>
          <Table
          >
            <TableHead>
              <TableRow>
                <TableCell align='left'>
                  Time
                </TableCell>
                <TableCell align='center'>
                  Epoch
                </TableCell>
                <TableCell align='center'>
                  Amount
                </TableCell>
                <Tooltip title='Unique Assets Transacted' placement='top'>
                  <TableCell align='center'>
                    UAT
                  </TableCell>
                </Tooltip>
                <TableCell align='center'>
                  Assets Transacted
                </TableCell>
                <TableCell align='center'>
                  Transaction Hash
                </TableCell>
                <TableCell align='center'>
                  Block
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              
{selectedPolicy ? (
  filteredData.map(([key, value], index) => {
    const convertedTime = convertUnixTime(value.time);

    return (
      <TableRow hover key={index}>
        <TableCell align='left'>
          <Typography variant='body1'>{convertedTime.date}</Typography>
          <Typography variant='subtitle1'>{convertedTime.local_time}</Typography>
        </TableCell>
        <TableCell align='center'>{value.epoch_no}</TableCell>
        <TableCell align='center'>₳ {(value.amount / 1000000).toLocaleString(undefined, { minimumFractionDigits: 6, maximumFractionDigits: 6 })}</TableCell>
        <TableCell align='center'>{value.token}</TableCell>
        <TableCell align='center'>
        {Object.values(value.tokens.rows).map((asset, index) => (
          asset.policy === selectedPolicy && (
            <Tooltip title={'Policy ID: ' + asset.policy} key={index}>
              <Chip
                sx={{ mr: 0.5 }}
                size='small'
                label={Number(asset.quantity).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 10 }) + ' ' + uniquePolicies.find(policyObj => policyObj.policy === selectedPolicy)?.assetName}
                color='secondary'
              />
            </Tooltip>
          )
        ))}
        </TableCell>
        <TableCell align='center'>
          <Button href={'https://cardanoscan.io/transaction/' + value.tx_hash} target='_blank'>
            {`${value.tx_hash.substring(0, 10)}...${value.tx_hash.substring(value.tx_hash.length - 10)}`}
          </Button>
        </TableCell>
        <TableCell align='center'>
          <Button href={'https://cardanoscan.io/block/' + value.block_no} target='_blank'>
            {value.block_no}
          </Button>
        </TableCell>
      </TableRow>
    );
  })
) : (
  Object.entries(tx_rows).map(([key, value], index) => {
    const convertedTime = convertUnixTime(value.time);

    return (
      <TableRow hover key={index}>
        <TableCell align='left'>
          <Typography variant='body1'>{convertedTime.date}</Typography>
          <Typography variant='subtitle1'>{convertedTime.local_time}</Typography>
        </TableCell>
        <TableCell align='center'>{value.epoch_no}</TableCell>
        <TableCell align='center'>₳ {(value.amount / 1000000).toLocaleString(undefined, { minimumFractionDigits: 6, maximumFractionDigits: 6 })}</TableCell>
        <TableCell align='center'>{value.token}</TableCell>
        <TableCell align='center'>
          {Object.values(value.tokens.rows).map((asset, index) => (
            <Tooltip title={'Policy ID: ' + asset.policy} key={index}>
              <Chip
                sx={{ mr: 0.5 }}
                size='small'
                label={Number(asset.quantity).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 10 }) + ' ' + asset.asset_name}
                color='secondary'
              />
            </Tooltip>
          ))}
        </TableCell>
        <TableCell align='center'>
          <Button href={'https://cardanoscan.io/transaction/' + value.tx_hash} target='_blank'>
            {`${value.tx_hash.substring(0, 10)}...${value.tx_hash.substring(value.tx_hash.length - 10)}`}
          </Button>
        </TableCell>
        <TableCell align='center'>
          <Button href={'https://cardanoscan.io/block/' + value.block_no} target='_blank'>
            {value.block_no}
          </Button>
        </TableCell>
      </TableRow>
    );
  })
)}
            </TableBody>
          </Table>
      </TableContainer>
    </Card>
  );
};

RecentTransactionsTable.propTypes = {
  tx_rows: PropTypes.array.isRequired,
};

RecentTransactionsTable.defaultProps = {
  tx_rows: {},
};

export default RecentTransactionsTable;

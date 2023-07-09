import { useState } from 'react';

import {
  Tooltip, Divider, Card, Table, TableBody, TableCell, TableHead, Chip,
  TableRow, TableContainer, Select, MenuItem, CardHeader, Typography
} from '@mui/material';

import { convertUnixTime } from 'src/utils/time';
import Link from 'src/components/Link';

const RecentTransactionsTable = ({ address_data }) => {
  const [selectedPolicy, setSelectedPolicy] = useState('');
  const tx_rows = address_data.adastat_data.history;
  
  // Get unique policy values
  const uniquePolicies = Object.entries(tx_rows).flatMap(([, value]) =>
    Object.values(value.tokens.rows).map((asset) => ({
      policy: asset.policy,
      assetName: asset.name,
    })))
    .reduce((unique, policy) => {
    if (!unique.some(p => p.policy === policy.policy)) {
      unique.push(policy);
    }
    return unique;
  }, [])
  .sort((a, b) => a.assetName.localeCompare(b.assetName));

  // If asset with no name exists, change its name
  const assetWithNoName = uniquePolicies.find((p) => !p.assetName);
  if (assetWithNoName) {
    assetWithNoName.assetName = "Unknown Name";
  }

  // Filter the data based on the selected policy
  const filteredData = selectedPolicy
  ? Object.entries(tx_rows).filter(([key, value]) =>
      Object.values(value.tokens.rows).some((asset) => asset.policy === selectedPolicy)
    )
  : Object.entries(tx_rows);

  const handlePolicySelect = (policy) => {
    setSelectedPolicy(policy);
  };

  return (
    <Card >
      <CardHeader
        title='Recent Transactions'
        action={<>
          <Select
            value={selectedPolicy}
            onChange={(e) => setSelectedPolicy(e.target.value)}
            displayEmpty
            sx={{ minWidth: 300 }}
            size='small'
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300,
                },
              },
            }}
          >
            <MenuItem value="" key="clear" onClick={() => handlePolicySelect('')}>
              All Assets
            </MenuItem>
            { uniquePolicies.map((policy) => (
              <MenuItem value={policy.policy} onClick={() => handlePolicySelect(policy.policy)} key={policy}>
                {policy.assetName}
              </MenuItem>))
            }
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
                <TableCell align='left' sx={{ minWidth: 150 }}>
                  Time
                </TableCell>
                <TableCell align='center' sx={{ minWidth: 150 }}>
                  Amount
                </TableCell>
                <Tooltip title='Unique Assets Transacted' placement='top'>
                  <TableCell align='center'>
                    UAT
                  </TableCell>
                </Tooltip>
                <TableCell align='center' sx={{ minWidth: 300 }}>
                  Assets Transacted
                </TableCell>
                <TableCell align='left'>
                  Transaction Hash
                </TableCell>
                <TableCell align='center'>
                  Block
                </TableCell>
                <TableCell align='center'>
                  Epoch
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            { filteredData.map(([key, value], index) => {
              const convertedTime = convertUnixTime(value.time);

              return (
                <>
                <TableRow hover key={index}>
                  <TableCell align='left'>
                    <Typography variant='body1'>{convertedTime.time_ago}</Typography>
                    <Typography variant='subtitle1'>{convertedTime.local_time}</Typography>
                    <Typography variant='caption'>{convertedTime.date}</Typography>
                  </TableCell>
                  <TableCell align='center'>₳ {(value.amount / 1000000).toLocaleString(undefined, { minimumFractionDigits: 6, maximumFractionDigits: 6 })}</TableCell>
                  <TableCell align='center'>{value.token}</TableCell>
                  <TableCell align='center'>
                  { Object.values(value.tokens.rows).map((asset, index) => (
                    <Tooltip title={'Policy ID: ' + asset.policy} key={index}>
                      <Chip
                        sx={{ mr: 0.5 }}
                        size='small'
                        label={Number(asset.quantity).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 10 }) + ' ' + asset.name}
                        color='secondary'
                      />
                    </Tooltip>))
                  }
                  </TableCell>
                  <TableCell align='left'>
                    <Link href={'https://cardanoscan.io/transaction/' + value.tx_hash} target='_blank'>
                      {`${value.tx_hash.substring(0, 10)}...${value.tx_hash.substring(value.tx_hash.length - 10)}`}
                    </Link>
                  </TableCell>
                  <TableCell align='center'>
                    <Link href={'https://cardanoscan.io/block/' + value.block_no} target='_blank'>
                    {value.block_no}
                    </Link>
                  </TableCell>
                  <TableCell align='center'>{value.epoch_no}</TableCell>
                </TableRow>
                </>
  );
})}
            </TableBody>
          </Table>
      </TableContainer>
    </Card>
  );
};

export default RecentTransactionsTable;

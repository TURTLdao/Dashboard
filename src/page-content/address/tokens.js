import { useState } from 'react';
import {
  Tooltip, Divider, Card, Table, TableBody, TableCell,
  TableHead, TableRow, TableContainer, CardHeader, Switch,
  Typography,
} from '@mui/material';
import { calculatePercentage } from 'src/utils/balance';
import Link from 'src/components/Link';

const TokensTable = ({ address_data }) => {
  const [filterEnabled, setFilterEnabled] = useState(true);

  return (
    <Card>
      <CardHeader
        title='Tokens List'
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
              Object.entries(address_data.adastat_data.assets)
              .filter(([key, value]) => {
                return !(value.supply === "1");
              })
              .map(([key, value], index) => {

              return (
                <>
                <TableRow
                  hover
                >
                  <TableCell align='left'>
                    <Link href={'/policy/' + value.policy}>
                      {value.name}
                    </Link>
                    <Typography variant='subtitle1'>
                      ${value.asset_name}
                    </Typography>
                  </TableCell>

                  <TableCell align='center'>
                    {Number(value.quantity).toLocaleString(undefined, {
                      minimumFractionDigits: value.quantity < 10 ? 6 : 0,
                      maximumFractionDigits: value.quantity < 10 ? 6 : 0
                    })}
                  </TableCell>

                  <TableCell align='center'>
                     {calculatePercentage(value.quantity, value.supply) + '%'}
                  </TableCell>

                </TableRow>
                </>
              );})
            }
            </TableBody>
          </Table>
      </TableContainer>
    </Card>
  );
};

export default TokensTable;

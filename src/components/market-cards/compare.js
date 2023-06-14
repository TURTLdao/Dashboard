import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';

export const AdaCompareCard =  ({ tokenPrice, sx, ticker }) => {
  const [adaToTokens, setCount] = useState(0);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#4CAF50"
      }
    }
  });

  useEffect(() => {
    const u_compare = Number(calculate_tokens_to_ada());
    const formatter = new Intl.NumberFormat('en-US');
    const formatted_compare = formatter.format(u_compare);
    setCount(formatted_compare);
  }, []);

  const calculate_tokens_to_ada = () => {
    if (tokenPrice <= 0) {
      return 0; // Invalid tokenPrice
    }
  
    return Math.ceil(1 / tokenPrice);
  };

  const bg = 'https://raw.githubusercontent.com/TURTLdao/TURTL-images/main/dao-bg.svg';

  return (
    <ThemeProvider theme={theme}>
    <Card sx={{
      border: "2px solid #4CAF50",
      backgroundImage: `url(${bg})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="primary.main"
              variant="overline"
            >
              1 ADA Value
            </Typography>
            <Typography variant="h5"
              color="white">
              {adaToTokens} {ticker}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card></ThemeProvider>
  );
};

AdaCompareCard.prototypes = {
  sx: PropTypes.object,
  tokenPrice: PropTypes.string.isRequired,
  ticker: PropTypes.string.isRequired,
};

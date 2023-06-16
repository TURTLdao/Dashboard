import { useCallback, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import useGlobalState, { walletAddress } from 'src/utils/global-const';

export default function Page() {
  const router = useRouter();
  const auth = useAuth();

  const [userWalletAddress, setUserWalletAddress] = useGlobalState(walletAddress);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handleSkip = useCallback(
    () => {
      auth.skip();
      router.push('/launchpad');
    },
    [auth, router]
  );

  const handleConnectWallet = useCallback(
    () => {
      setUserWalletAddress(searchQuery);
      auth.skip(); // this is from what we forked, we'll look into this deeper one day - for now stay on track
      router.push('/launchpad');
    },
    [auth, router]
  );

  const theme = createTheme({
    palette: {
      primary: {
        main: "#4CAF50"
      }
    }
  });

  return (
    <>
    <ThemeProvider theme={theme}>
      <Head>
        <title>
          Login | Devias Kit
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: '#1d1d1d',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography
                color="white"
                variant="body2"
              >
                Haven&apos;t used Cardano yet?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                  style={{ color: 'primary.main' }}
                >
                  Eternl 
                </Link>
                  &nbsp;- The most trusted Cardano web wallet
              </Typography>
            </Stack>

      <OutlinedInput
        defaultValue=""
        fullWidth

        placeholder="Enter Wallet Address..."
        startAdornment={(
          <InputAdornment position="start">
            <SvgIcon fontSize="small" sx={{ color: '#4CAF50' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>

            </SvgIcon>
          </InputAdornment>
        )}
        value={searchQuery}
        onChange={handleSearchInputChange}
        sx={{ maxWidth: "100%", input: { color: 'white' }, border: '1px solid #4CAF50'}}
      />

              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
                style={{ backgroundColor: "#4CAF50", color: 'white' }}
                onClick={handleConnectWallet}
                disabled={!searchQuery}
              >
                Connect Wallet
              </Button>
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                onClick={handleSkip}
                style={{ color: '#d1d1d1' }}
              >
                Skip connecting wallet
              </Button>    
          </div>
        </Box>
      </Box>
      </ThemeProvider>
    </>
  );
}

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);


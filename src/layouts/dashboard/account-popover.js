import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import useGlobalState, { walletAddress } from 'src/utils/global-const';

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
  const auth = useAuth();
  const [ userWalletAddress ] = useGlobalState(walletAddress);

  const handleSignOut = useCallback(
    () => {
      onClose?.();
      auth.signOut();
      router.push('/auth/login');
    },
    [onClose, auth, router]
  );

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 400, background: 'radial-gradient(circle, rgba(42,97,44,1) 0%, rgba(45,45,45,1) 100%)', border: "2px solid #4CAF50" } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        {
        userWalletAddress && Object.keys(userWalletAddress).length > 0 ? 
          <Typography variant="overline" sx={{ color: '#4CAF50' }}>
            Connected Account
          </Typography> : null
        }

        {
        userWalletAddress && Object.keys(userWalletAddress).length > 0 ? 
          <Typography
            color="text.secondary"
            variant="body2"
            sx={{ color: 'white' }}
          >
            {userWalletAddress}
          </Typography> : null
        }
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem onClick={handleSignOut} 
          sx={{ color: 'white' }}>
          Sign In
        </MenuItem>
      </MenuList>
      </Box>
      <Divider />
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};

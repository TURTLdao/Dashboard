import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import ArrowTopRightOnSquareIcon from '@heroicons/react/24/solid/ArrowTopRightOnSquareIcon';
import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery
} from '@mui/material';
import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';
import { items, items2, items3 } from './config';
import { SideNavItem } from './side-nav-item';

import { createTheme, ThemeProvider } from '@mui/material/styles';

export const SideNav = (props) => {
  const { open, onClose } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const theme = createTheme({
    palette: {
      primary: {
        main: "#4CAF50"
      }
    }
  });

  const content = (
    <ThemeProvider theme={theme}>
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%'
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          backgroundColor: '#1d1d1d'
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: 'inline-flex',
              height: 50,
              width: 50
            }}
          >
            <Logo 
            />
            <Typography 
              color="neutral.100"
              variant="subtitle2"
              fontSize={24}
              mt={1}
              ml={1}
            >
              TurtleDAO
            </Typography>
          </Box>
        </Box>

        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            {items.map((item) => {
              const active = item.path ? (pathname === item.path) : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}

          </Stack>
        </Box>

        <Divider sx={{ borderColor: 'primary.main' }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            {items2.map((item2) => {
              const active = item2.path ? (pathname === item2.path) : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item2.disabled}
                  external={item2.external}
                  icon={item2.icon}
                  key={item2.title}
                  title={item2.title}
                />
              );
            })}

            <Divider sx={{ borderColor: 'primary.main' }} />

            {items3.map((item3) => {
              const active = item3.path ? (pathname === item3.path) : false;

              return (
                <NextLink href={item3.path} style={{ color: 'white'}}>
                <SideNavItem
                  active={active}
                  external={item3.external}
                  icon={item3.icon}
                  key={item3.title}
                  title={item3.title}
                /></NextLink>
              );
            })}
          </Stack>
        </Box>

        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
          <Typography
            color="primary.main"
            variant="subtitle2"
          >
            Want to learn more?
          </Typography>
          <Typography
            color="neutral.500"
            variant="body2"
          >
            Check out TurtleDAO's official website
          </Typography>
          <Box
            sx={{
              display: 'flex',
              mt: 2,
              mx: 'auto',
              width: '80px',
              '& img': {
                width: '100%'
              }
            }}
          >
            <img
              src="https://github.com/TURTLdao/TURTL-images/blob/main/TURTL-coin.png?raw=true"
            />
          </Box>
          <Button
            component="a"
            endIcon={(
              <SvgIcon fontSize="small">
                <ArrowTopRightOnSquareIcon />
              </SvgIcon>
            )}
            fullWidth
            href="https://turtledao.vercel.app/"
            sx={{ mt: 2, color: 'white' }}
            target="_blank"
            variant="contained"
          >
            Website
          </Button>
        </Box>
      </Box>
    </Scrollbar></ThemeProvider>
  );

  if (lgUp) {
    return (
      <ThemeProvider theme={theme}>
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: '#1d1d1d',
            color: 'common.white',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: '#1d1d1d',
          color: 'common.white',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
    </ThemeProvider>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};

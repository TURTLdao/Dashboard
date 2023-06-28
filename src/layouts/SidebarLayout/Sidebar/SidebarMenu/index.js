import { useContext } from 'react';
import { useRouter } from 'next/router';

import { Avatar, ListSubheader, alpha, Box, List, styled, Button, ListItem, Tooltip
} from '@mui/material';
import NextLink from 'next/link';
import { SidebarContext } from 'src/contexts/SidebarContext';
import PropTypes from 'prop-types';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import BlurCircularIcon from '@mui/icons-material/BlurCircular';
import CableIcon from '@mui/icons-material/Cable';
import WalletIcon from '@mui/icons-material/Wallet';

import { useEffect, useState } from 'react';
import { useWallet, useWalletList, useLovelace, useAssets } from '@meshsdk/react'


const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
                  'transform',
                  'opacity'
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

function SimpleDialog(props) {
  const { onClose, selectedValue, open, wallets } = props;
  const [selectedWallet, setSelectedWallet] = useState({})
  
  const { connect, disconnect, connected } = useWallet()
  

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

	const handleWalletSelection = (wallet) => {
		localStorage.setItem('selectedWallet', JSON.stringify(wallet))
		setSelectedWallet(wallet)
		connect(wallet.name)
	}

	useEffect(() => {
		const storedWallet = localStorage.getItem('selectedWallet')
    if (storedWallet && !selectedWallet) {
      setSelectedWallet(JSON.parse(storedWallet));
      connect(JSON.parse(storedWallet).name);
    }
	}, [selectedWallet])


  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Connect Wallet</DialogTitle>
      <List sx={{ pt: 0 }}>
        {wallets.map((wallet) => (
          <ListItem
            onClick={() => handleWalletSelection(wallet)}
            key={wallet.name}
            component="a"
          >
            <Button
              className={''}
              disableRipple
              startIcon={<Avatar src={wallet.icon} sx={{ bgcolor: '#1d1d1d', color: '#2d2d2d' }}/>}
            >
              {wallet.name}
            </Button> 
          </ListItem>
        ))}

        <ListItem >
          <Button
            className={''}
            disableRipple
            startIcon={<AddIcon/>}
            href='https://docs.cardano.org/new-to-cardano/types-of-wallets/'
            target='_blank'
          >
            Get Cardano Wallet
          </Button>
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  wallets: PropTypes.array.isRequired
};

function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext);
  const router = useRouter();
  const currentRoute = router.pathname;

  // utils
  const countUniqueItems = (data) => {
    const uniquePolicyIds = new Set();
    data.forEach((item) => {
      uniquePolicyIds.add(item.policyId);
    });
    return uniquePolicyIds.size;
  };

  const countItems = (data) => {
    const items = new Set();
    data.forEach((item) => {
      items.add(item);
    });
    return items.size;
  };

  // handle dapp
	const wallets = useWalletList()
  const { connect, disconnect, connected } = useWallet()
  const lovelace = useLovelace();
  const assets = useAssets();
  const unique_assets = assets ? countUniqueItems(assets) : null;
  const assets_count = assets ? countItems(assets) : null;

  // handle model
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(wallets[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  


  return (
    <>
      <MenuWrapper>
        <List component="div">
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <NextLink href="/overview" passHref>
                  <Button
                    className={currentRoute === '/overview' ? 'active' : ''}
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<HomeIcon />}
                  >
                    Overview
                  </Button>
                </NextLink>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>

        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              TurtleDAO
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <NextLink href="/aaid/" passHref>
                  <Button
                    className={
                      currentRoute === '/aaid/'
                        ? 'active'
                        : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<AccountTreeIcon />}
                  >
                    Supported Projects
                  </Button>
                </NextLink>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>

        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Around Cardano
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <NextLink href="/around-cardano/trending-tokens" passHref>
                  <Button
                    className={
                      currentRoute === '/around-cardano/trending-tokens'
                        ? 'active'
                        : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<TrendingUpIcon />}
                  >
                    Trending Tokens
                  </Button>
                </NextLink>
              </ListItem>
            </List>

            <List
              component="div"
              subheader={
                <ListSubheader component="div" disableSticky>
                  Wallet
                </ListSubheader>
              }
            >
            <SubMenuWrapper>
              <List component="div">
                { !connected ?
                <ListItem component="div">
                    <Button
                      className={
                        currentRoute === '/aaid/'
                          ? 'active'
                          : ''
                      }
                      disableRipple
                      onClick={handleClickOpen}
                      component="a"
                      startIcon={<CableIcon />}
                    >
                      Connect Wallet
                    </Button>
                    <SimpleDialog
                      selectedValue={selectedValue}
                      open={open}
                      onClose={handleClose}
                      wallets={wallets}
                    />
                </ListItem>
                :
                <div>
                  <ListItem component="div">
                    <NextLink href="/wallet" passHref>
                      <Button
                        className={currentRoute === '/wallet' ? 'active' : ''}
                        disableRipple
                        component="a"
                        onClick={closeSidebar}
                        startIcon={<WalletIcon />}
                      >
                        View Assets
                      </Button>
                    </NextLink>
                  </ListItem>
                  <ListItem component="div">
                    <Button
                      className={
                        currentRoute === '/aaid/'
                          ? 'active'
                          : ''
                      }
                      disableRipple
                      component="a"
                      startIcon={<AttachMoneyIcon />}
                    >
                      ₳ {parseInt(lovelace) / 1000000}
                    </Button>
                  </ListItem>
                  <ListItem component="div">
                    <Tooltip placement="top" title='Unique Policy IDs within your wallet'>
                    <Button
                      className={
                        currentRoute === '/aaid/'
                          ? 'active'
                          : ''
                      }
                      disableRipple
                      component="a"
                      startIcon={<BlurCircularIcon />}
                    >
                      Unique Assets: {unique_assets}
                    </Button>
                    </Tooltip>
                  </ListItem>
                  <ListItem component="div">
                    <Button
                      className={
                        currentRoute === '/aaid/'
                          ? 'active'
                          : ''
                      }
                      disableRipple
                      component="a"
                      startIcon={<BlurOnIcon />}
                    >
                      Total Assets: {assets_count}
                    </Button>
                  </ListItem>
                </div>
                }
              </List>
            </SubMenuWrapper>
          </List>

          </SubMenuWrapper>
        </List>
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;

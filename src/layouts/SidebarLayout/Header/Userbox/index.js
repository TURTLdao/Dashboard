import { useRef, useEffect, useState } from 'react';

import NextLink from 'next/link';
import PropTypes from 'prop-types';

import {
  Avatar, Box, Button, Divider, Hidden, List, ListItem, ListItemText,
  Popover, Tooltip, Typography, DialogTitle, Dialog, IconButton
} from '@mui/material';

import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import WalletIcon from '@mui/icons-material/Wallet';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import BlurCircularIcon from '@mui/icons-material/BlurCircular';
import AddIcon from '@mui/icons-material/Add';
import CableIcon from '@mui/icons-material/Cable';

import { useWallet, useWalletList, useLovelace, useAssets, useAddress } from '@meshsdk/react'

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

function SimpleDialog(props) {
  const { onClose, selectedValue, open, wallets } = props;
  const [selectedWallet, setSelectedWallet] = useState(selectedValue)
  
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

function HeaderUserbox() {
  
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Handle dApp
	const wallets = useWalletList()
  const { connected, disconnect } = useWallet();
  const lovelace = useLovelace();
  const assets = useAssets();
  const address = useAddress(0);

  const desiredPolicyId = "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a";
  const foundAsset = assets?.find(asset => asset.policyId === desiredPolicyId);
  const lovelaces = parseInt(lovelace) / 1000000;

  function calculateBalanceImage(lovelaces) {
    if (lovelaces > 100000) { // shark
      return [
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAB4ElEQVR4nO2Xz2oUQRDGm6AR400xBxVP8RUM6AuIPcmMYnKSgOKfR1g8zSk5issmh2G3v69nLsExzmzMGwSfQL1FD+JFiHhILmIOEzrsytjZxY0724GQD4phqqjqH0VNNSPEqSyRLCz7DeAngE8A1gC8UEpNh2E4JhwBFH3sG8klrfXV4wIoOvaL5Eqz2bx4XABFx7a11vOVA0RRdFYpdVlrfZPkUwCrJHf6gQBYDsPwTGUAooeiKJoA8ITkVh+Qd2manh8ZQFemOwBqnTk4BPFfneARALoCcIvk9x4QDScARnEcXyf50c5XSj0QLgBKEH91AsCPOI4viUHFAT65f+Tf7jETDWcARmZd28uq1WpdEa4A0jQdJ/nFylt0BmCktX5mzcLXgS4wDjGEZSVJcoHkbrmW2abOAIwAvLa6UBOOAZ5b9d44BVBKTVv1PjgFSJJk0qq37RSgXq+fs/eBU4BR1DuBkrm/6+VB0bWZ9ZmpA//a/Rtl/yhiMgt2DMB7y7kls+Cll/uf7UKVx7JgU8j27IKd4MruZsFDYS4ILwvWXR8uc7/953KaS+fGZe7XvSzYs1q05+V+48Cqjb0yZx4ayDtv713z2rOPZO7XzNO8l2MyCx4PG5MbstpfuWG1DwaFJE+q5orcAAAAAElFTkSuQmCC',
        'Shark',
      ];
    } else if (lovelaces > 10000) { // jellyfish
      return [
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAACEElEQVR4nO1WwWoUQRBtD1FBBRXFaG7q0S+RFVYPohf1M+LN5CCe1IUVM3b3e80uC7IE8g2CKAriNyR6ymmN60FBRko6obczs+nJzJLLPqjLVHW911U1NaNUIowxZ6y19wG8IfmZ5DbJP962AXzyvnsSq5pCv9+/DOA1yV8k80STWK21vn5o4k6ncwLAKoBxBeLYpDrPJFcl8izLLgB4V4N4wgB8ILmYRG6MuUFyqyTRJoAXAG5aa6/2er1TYs65a/LM+zbLzkruqeQkF4vIPfHDLMsWEqq3QPJRWR6t9aUy8pO+VLH6IcmzqiIGg8E5AOsFIt4XzgSA1QLyV3meH1OHhJwluVaQ92nRqzaOgt7WIQ9FxJUA8FtmaC/Iv+ch+TcpoWoIWuvzAL5HIrL/Ttla8ZJxzj1QDcMPZihg3O12TytZr9Htt1KmvSqGw+FxqWx00bvK7+9QwHM1I5B8GXGtKf9h2XtorW3NSgCAW1EbPqqD1uju4dZGO69iwa2n5+dcAI+4BSGcc0vRkPzY9ZURHOQnuRPmNMZcUWUA8DhS+KWuAABfo5zL+4idc0tCLjs6Cn7SgICJj5znWJ6oBIv7M5I/o7oCrLUXpZVT+8/9zr8k2ykEKX4Ad3zOJAEj59ztKgQpfi9iVCZgRwYOwEpY9iYFBD+7K8JF8mdRTCmaEFALrbmAjXkL2kc7hLPCP265D9K7IyxtAAAAAElFTkSuQmCC',
        'Jellyfish',
      ];
    } else if (lovelaces > 100) { // fish
      return [
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABv0lEQVR4nOXXMUvDQBgG4CBawUERBAd1FZz7A7p0qP0O7xyy+AOcFMeOcXSt4FAKl5Q6BbxPrLiIuKmD0FUQ3AQHEbRFEMXItUFK2ySXtE0EX7ipoe+Tr2ly0bQIIcgcIliTCHaTR7qdO8tNanGGSEDnEqwONVhIDoBtRGyTIP0AyBwQbCtZANLrqF9YSpc2J4YAaEQFOESwcziFWb/j8oKtANKaF0Cu6ABs/Yb3sqTn8xMyB0iLgPTLr7wTwDkvGoYxFgpA2pN4geO1rFs8BUgLRLDXoOJugGmaDuf80LbtVDgAthCfRLB9EOxRtbgfwF0X1Wp1OhwAvRcIdgdiXQ86qQ6AnMRtuVyeHwgASJ9BsJ3MZWY8cKRdABfxUKlUlkMDAOk7EWwva+szKsVeAHc9WZaVDgXIHa0vhikOAMhJNC3LWlUGaBHjBXARH5zzjcQALuKbc15IDOAijCQn0C4PAlCkS1qEKJfH/DfsLY/rRuRZHset2Lc8hoeRf7nMqB7HSuUyo9iQKJfLjGJLZprmrqYaEOxA9er+Bfe/QN+0OEKGvS0Pm7/5YiJYXbf11P95OQWkDUB6Jcc+yJn/AKk76VvYqaYRAAAAAElFTkSuQmCC',
        'Fish',
      ];
    } else if (lovelaces >= 0) { // prawn
      return [
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAC9ElEQVR4nMVWz2tTQRB+Un8UL0rRg7YqPfgHqAdFhNza2J10J5Vc7cleFI89iEgFUa9VEJP0zUTwoKHZ7Q/sQaXFUyuIP06eRKlUBGlFW0SLNLJpC8l2X/LyjPWDuTz2zffNzrez63khABqLNUPhEiicEQovpPKp7V4jAWEEVIp5JcZF6/8ToLEoFL5s2E5ABAGlKCTPe5uFeCHZJrScqNgFLae9zYTU8oDVhu8NSXws3bcNFHaAlpk1p88JLX+HaYP5P51O72TmYnmEIk7lU01CY59Q+DmiEedMnkwm01a3gMRoot04ObIBVz1ww+QioqOWgOqt6R7pPgJafopMrHAOFN5cP4a5XO5suQAiehtI3jXccwi0nK9G0FlI7jPtAS0/lpHOBuUkovvWDhQCzSa0nA5jLANQeNqIMORdhWTclXOt/z+tHeh1CoBC8qKrj0ECaiGfzzcR0ZRF/pWZdzurBy0/WOQPS8IiCEin07uIaMJ2PzP3O38QI91Ji3wRxmCPVwey2WyL7/vHmfk6M8/b5ET0nJmbnT+DwluVlcrb1ch8348x8zgRLTiqdMXs0NDQ/sCEwjrzQsvOoLVEdImIVkISlyqvSm4gFH6p5XoDIuqqg9gYrn9wcHCHVwugcCGkgApXW7FohgwRKXPUnG4PFKCDh0/5OkNiVXkyNEmNHZiJIsD3/VP18Pi+v5eI7pn2VArQ8o41z++6EhDRZJ0eeMLMpSlpjiARvXHeiAmFUFG5wiXzynFUAGEFWHGFmQcCr+TU6uVSMQlB4SPz3bEL1yKKWK76JhAKzzmu1mxsKrbVXsvMgoieEtG3iGIcI73obQGFkxuMqHBSDPcc9jYDYly0gpbvHLfiL6HwAWh5BsbgYHwiXnu4REViNNG+wQ//IKqK6MinWoRC3VhSuVz3uwK0RND44q+IFa6AwstCy4EoDxuv1JZC8oTQ8ioofCYUvhda/ghBvCC0fLx+s8a4txm0fB1JQKNgHjmgZc6IMx/+AGfIKpVQF4C5AAAAAElFTkSuQmCC',
        'Prawn',
      ];
    } else if (lovelaces > 10) { // turtle
      return [
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAADbUlEQVR4nNVXSWsUQRTu4AJG1KvLwQ33DQkqehHEYJyq6aoeHBJ3Dxo8SVwgLsGJGNSfYCRT1SGocUhXjSGJxoP4F3ILeslFI4aAWcREDSNvkprp1HSnewYT8MGDod7yffWq+tUbwyhB4qn4UizoEyToEJbkG5LkMawZCyVYkhSWNONWJGj7goAjSU7o4EqjjlU57wSwJG/8CCBJ3s07ASToV18Cgo7OK/jxVHwVFnTCjwDYwKek5FjQ+1iSai9bPBVfhiRpwoKO+ILnSYwgSR5CjFcuJOgVJEnd7EVJGmeCf+skIoLuQIL2BwIXHkc/xHqAT83clzrXzmftIEcCO9YBLMlwseB5JcOQI5tLkssKPKeOdQ0M1dOgGom0eR1LMuixs89Y0NvIsfZV9lYuB4XfSNA7WJIvHiQGsaANBeCCTkQcC02XxrFqCkh4l/Wp39lmd9mJy7GkzSHuSR5cCUqbp+YigSR5YISU7IX1zzOJ0qbpHSisuDcJ0uX2Y4wdYYz1MMZGQDnn3a2trYfdPljQ7qLAlWBBb2jgvyIdsfXKzjm/xDmf4pxn3MoY+2Pb9gXlRyTZALFa6a8aQYIFbdAIvFQ227b3MsYmdXCXTti2vUv5I0leaRW4G0gASdI7K8ixaly7b58DXOlz5R8V9LRWgbdGqZJIJBZzzkdDEPieSqUWGf9abNteFwI8q21tbWtKBkKSjLnLBo0G1ltaWtaGJcA5Xw0xZtpcUfRriQT95A6qEnRzqUeAOmJbtAv9MUwFPmhBZ0q9hBFBz2mX8H0YAo3ap/NC2Rhje4I+w2QyudNVzXaNQCLMERzUG1H0dXSji8RFaDpejYhzfj6XpyO2Se+qSNKKQAJYklsej0e3kTHKlA+0XWi/cN6gjLGuZDJ5KJckY5R5zY5I0tqg8t+c4xFpCmSf38QjnxxTMJQUDY7zx/EMPi0/4KqeqpVI0JY5n3QvEti77OPwr8dnIEmYaXM/AMIQCr/h8mZthf5D+iBbQAJJUq8F/Yg61jEzbW7zShpWYYRHjrU74lhVWJKfGol6/QjUYDqOBT2aq05HbDsStK8E8L6Tgm5VeWACUpUomIqVwHPpBldS0Vy7BAt6D1ppILAkY5AHYvQ8WRIwiJYquBOXI8c6iyRJY0kGpsua1QFYA5t6O/4b+QsmZevw9G8QqAAAAABJRU5ErkJggg==',
        'Turtle'
      ];
    } else { // whale
      return [
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABjklEQVR4nO2WzUoDMRDHgwcfwtaPg+KriEkzqWcR9CU81qpnUbxt2cleXTRZbdW7+BZ6tpWK2Hr0UElRKP3YbmpSQfzDsGRmd+e3yUyyhPxrhKgSbaZFx43BG7EVVUK7AqAazqwBeMJXmRKvDpK/rF0U82QSgYZ5piFmSrSskyvRMl8+cfJRAg1LQ+tDidb6+cYimYaoEs2BqVaiOZXk7IotjJp2s2TeAWjCiyntJvwDaDhMqfgD7wBMw20KwI13AKpEIwXg2Wty6O4L6f3vvO97VVACxu58CefEl5gS+xm23rJPgOsMJ1/NH4CG+tgZUKLhJTmt0lzWg4gnfM49QMJ59tMQCu4BNJQt/gH2nAMwDTULgKoPgCeLJag7B/i7klK+Syk731apVJaNHxFXev2eYm3jvO9zPkgpjxDxsf9FHmJ3JIqirSEPTMXCMNwkpVJpBhEvfwEgMbm7dRDH8SwinkgpP/puMuPTL3MZOzY5BwoyCIJ8GIbbiLhrrmbcG0PEnZ/GoijK+W4sK30CIjfiY/0M0YsAAAAASUVORK5CYII=',
        'Whale'
      ];
    }
  }

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

  const balance_image = calculateBalanceImage(lovelaces);
  const unique_assets = assets ? countUniqueItems(assets) : null;
  const assets_count = assets ? countItems(assets) : null;
  
  return (
    <>
    {
    connected ?
      <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar variant="rounded" src={`https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=${address}?randomizeIds=true`} />
        <Hidden mdDown>
          <UserBoxText>
          {
          assets && (foundAsset) ?
            <UserBoxLabel variant="h4">
              {foundAsset ? '$' + foundAsset.assetName : '$adahandle'}
            </UserBoxLabel>
            :
            null
          }
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>

      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar variant="rounded" src={`https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=${address}?randomizeIds=true`} />
          <Tooltip title={balance_image[1]} placement='bottom'>
            <Avatar sx={{ ml: 0.5, mr: 1, height: 20, width: 20 }} variant="rounded" src={balance_image[0]} />
          </Tooltip>
          
          <UserBoxText>
          {
          assets && (foundAsset) ?
            <UserBoxLabel variant="h4" sx={{ mt: 1, mr: 2 }}>
              {'$' + foundAsset.assetName}
            </UserBoxLabel>
            :
            null
          }
          </UserBoxText>
        </MenuUserBox>

        <Divider sx={{ mb: 0 }} />

        <List sx={{ p: 1 }} component="nav">
          <NextLink href="/management/profile" passHref>
            <ListItem button>
              <WalletIcon fontSize="small" />
              <ListItemText primary="My Wallet" />
            </ListItem>
          </NextLink>

          <NextLink href="" passHref>
            <ListItem button>
              <AccountBalanceWalletIcon fontSize="small" />
              <ListItemText primary={'₳ ' + lovelaces} />
            </ListItem>
          </NextLink>

          <NextLink href="" passHref>
            <Tooltip title='Unique Policy IDs' placement='left'>
            <ListItem button>
              <BlurCircularIcon fontSize="small" />
              <ListItemText primary={'Unique Assets: ' + unique_assets} />
            </ListItem>

            </Tooltip>
          </NextLink>

          <NextLink href="" passHref>
            <ListItem button>
              <BlurOnIcon fontSize="small" />
              <ListItemText primary={'Total Assets: ' + assets_count} />
            </ListItem>
          </NextLink>
        </List>
      </Popover>
      </>
      :
      <>
        <Hidden mdDown>
          <Button
            disableRipple
            onClick={handleClickOpen}
            component="a"
            startIcon={<CableIcon />}
          >
            Connect Wallet
          </Button>
        </Hidden>

        <SimpleDialog
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
          wallets={wallets}
        />
      </>
    }
    </>
  );
}

export default HeaderUserbox;

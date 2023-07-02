import { useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import { Divider, Grid, Card, Typography, useTheme, CardHeader,
  IconButton, Avatar, Dialog, DialogTitle, Modal, Button, DialogContent,
  Tab, Tabs, styled, Box
} from '@mui/material';

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
      padding: 0 ${theme.spacing(2)};
      position: relative;
      bottom: -1px;

      .MuiTabs-root {
        height: 44px;
        min-height: 44px;
      }

      .MuiTabs-scrollableX {
        overflow-x: auto !important;
      }

      .MuiTabs-indicator {
          min-height: 4px;
          height: 4px;
          box-shadow: none;
          bottom: -4px;
          background: none;
          border: 0;

          &:after {
            position: absolute;
            left: 50%;
            width: 28px;
            content: ' ';
            margin-left: -14px;
            background: ${theme.colors.primary.main};
            border-radius: inherit;
            height: 100%;
          }
      }

      .MuiTab-root {
          &.MuiButtonBase-root {
              height: 44px;
              min-height: 44px;
              background: ${theme.colors.alpha.white[50]};
              border: 1px solid ${theme.colors.alpha.black[10]};
              border-bottom: 0;
              position: relative;
              margin-right: ${theme.spacing(1)};
              font-size: ${theme.typography.pxToRem(14)};
              color: ${theme.colors.alpha.black[80]};
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;

              .MuiTouchRipple-root {
                opacity: .1;
              }

              &:after {
                position: absolute;
                left: 0;
                right: 0;
                width: 100%;
                bottom: 0;
                height: 1px;
                content: '';
                background: ${theme.colors.alpha.black[10]};
              }

              &:hover {
                color: ${theme.colors.alpha.black[100]};
              }
          }

          &.Mui-selected {
              color: ${theme.colors.alpha.black[100]};
              background: ${theme.colors.alpha.white[100]};
              border-bottom-color: ${theme.colors.alpha.white[100]};

              &:after {
                height: 0;
              }
          }
      }
  `
);

const AssetsView = ({ asset_rows }) => {
  const theme = useTheme();

  // Render ipfs image
  function convertIPFSUrlToHttpUrl(ipfsUrl) {
    const gatewayUrl = 'https://ipfs.io/ipfs/';
    const cid = ipfsUrl.split('ipfs://')[1];
    return gatewayUrl + cid;
  }

  // Modal controls
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleClickOpen = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Tab controls
  const [currentTab, setCurrentTab] = useState('safe');

  const tabs = [
    { value: 'safe',  label: 'Main' },
    { value: 'rug', label: 'Rug / Scam / Spam' },
  ];

  const handleTabsChange = (_event, value) => {
    setCurrentTab(value);
  };

  const blacklist = [
    '4e5071331e1b08e82a0e6e1006d47cdf8405d0641d8450624d7c4763',
    '',
  ]

  return (
    <Card sx={{ minHeight: 200 }}>
      <CardHeader
        title='cNFT List'
      />
      <Divider />
      <TabsContainerWrapper>
        <Tabs
          onChange={handleTabsChange}
          value={currentTab}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </TabsContainerWrapper>
      
      {
        currentTab === 'safe' && (
        <>
        <div style={{ maxHeight: 500, overflow: 'auto' }}>
          <Grid container spacing={2} >
          {
          Object.entries(asset_rows)
          .filter(([key, value]) => !blacklist.includes(value.policy) && value.quantity === 1)
          .map(([key, value], index) => {
            const imageUrl = value.metadata.image.startsWith('ipfs://')
              ? convertIPFSUrlToHttpUrl(value.metadata.image)
              : value.image;
            const nft_image = value.metadata.image.startsWith('ipfs://')

            return (
              <Grid item xs={12} sm={2} key={key}>
                <Card sx={{ mx: 2, my: 1}}>
                  <div align='center'>
                    <IconButton onClick={() => handleClickOpen(imageUrl)}>
                      <Avatar variant='rounded' src={imageUrl} sx={{ height: nft_image ? 100 : '100%', width: 100 }}>
                        <Typography>
                          No chain image
                        </Typography>
                      </Avatar>
                    </IconButton>
                  </div>

                  {
                  nft_image ?
                    <Typography align='center'>
                      {value.metadata.name}
                    </Typography>
                    :
                    <Typography align='center'>
                      {value.name}
                    </Typography>
                  }

                  </Card>
                </Grid>
            );})
          }
          </Grid>
        </div>
        </>)
      }

      {
        currentTab === 'rug' && (
        <>
          <Grid container spacing={2}>
          {
          Object.entries(asset_rows)
          .filter(([key, value]) => (blacklist.includes(value.policy) && value.quantity === 1))
          .map(([key, value], index) => {
            const imageUrl = value.metadata.image.startsWith('ipfs://')
              ? convertIPFSUrlToHttpUrl(value.metadata.image)
              : value.image;
            const nft_image = value.metadata.image.startsWith('ipfs://');

            return (
              <Grid item xs={12} sm={2} key={key}>
                <Card sx={{ mx: 2, my: 1}}>
                  <div align='center'>
                    <IconButton onClick={() => handleClickOpen(imageUrl)}>
                      <Avatar variant='rounded' src={imageUrl} sx={{ height: nft_image ? 100 : '100%', width: 100 }}>
                        <Typography>
                          No chain image
                        </Typography>
                      </Avatar>
                    </IconButton>
                  </div>

                  {
                  nft_image ?
                    <Typography align='center'>
                      {value.metadata.name}
                    </Typography>
                    :
                    <Typography align='center'>
                      {value.name}
                    </Typography>
                  }

                  </Card>
                </Grid>
            );})
          }
          </Grid>
        </>)
      }

      <Modal open={open} onClose={handleClose} sx={{ overflowY: 'auto', maxHeight: '100%' }}>
        <DialogContent >
          <div align='center'>
            <Button sx={{ mt: 2 }} onClick={handleClose} variant='contained'>
              Close
            </Button>
            <Avatar variant='rounded' src={selectedImage} sx={{ mt: 4, height: '50%', width: '50%' }}>
              <Typography>
                Token
              </Typography>
            </Avatar>
          </div>
        </DialogContent>
      </Modal>

    </Card>
  );
};

AssetsView.propTypes = {
  asset_rows: PropTypes.array.isRequired,
};

AssetsView.defaultProps = {
  asset_rows: [],
};

export default AssetsView;

import { useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import { Divider, Grid, Card, Typography, useTheme, CardHeader,
  IconButton, Avatar, Dialog, DialogTitle, Modal, Button, DialogContent,
  Tab, Tabs, styled, Box
} from '@mui/material';

const { VerifiedIconWrapper, NftIconWrapper } = require('src/components/custom.js');

const NftsView = ({ assets }) => {
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

  const blacklist = [
    '4e5071331e1b08e82a0e6e1006d47cdf8405d0641d8450624d7c4763',
    'a3e9d397a62992efd2bb54c954b59044948f11f4e14b28add5ebd847', // isnt blacklisted, just hidden due to no metadata ticker
  ]

  return (
    <>
      <CardHeader
        title='cNFT List'
      />
      <Divider sx={{ mb: 2 }}/>
      <>
        <div>
          <Grid container spacing={2} >
          { assets.filter((value) => (value.image.startsWith('ipfs://') && !blacklist.includes(value.policy) && value.ticker === ''))
            .map((value, index) => {
              const imageUrl = value.image.startsWith('ipfs://')
                ? convertIPFSUrlToHttpUrl(value.image)
                : value.image;
              const nft_image = value.image.startsWith('ipfs://');

              return (
                <Grid item xs={12} sm={6} key={index}>
                  <Card sx={{ mx: 2, my: 1, display: 'flex', alignItems: 'center' }}>
                    <NftIconWrapper style={{ flexShrink: 0, margin: 10 }}>
                      <Avatar variant='rounded' src={imageUrl} sx={{ height: '100%', width: '100%' }}>
                        <Typography>
                          No chain image
                        </Typography>
                      </Avatar>
                    </NftIconWrapper>

                    <div style={{ flexGrow: 1, marginLeft: '1rem'}}>
                      <Typography >
                        {value.name}
                      </Typography>
                      <Typography variant='caption'>
                        {value.asset_name}
                      </Typography>
                    </div>
                    
                    <div style={{ flexGrow: 1, marginLeft: '1rem', maxWidth: 200 }}>
                    <Button  variant='outlined' sx={{ mx: 0.5, my: 0.5, width: '75%' }} size='small' onClick={() => handleClickOpen(imageUrl)}>
                      View Image
                    </Button>
                    <Button  variant='outlined' sx={{ mx: 0.5, my: 0.5, width: '75%' }} size='small' target='_blank' href={'https://www.jpg.store/collection/' + value.policy}>
                      jpg.store
                    </Button>
                    </div>

                  </Card>
                </Grid>
            );})
          }
          </Grid>
        </div>
        </>

      <Modal open={open} onClose={handleClose} sx={{ overflowY: 'auto', maxHeight: '100%', maxWidth: '100%' }}>
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
    </>
  );
};

NftsView.propTypes = {
  assets: PropTypes.array.isRequired,
};

NftsView.defaultProps = {
  assets: [],
};

export default NftsView;

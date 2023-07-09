import { Avatar, Card, Typography, Grid, Divider, Button } from '@mui/material';

import PropTypes from 'prop-types';


const PoweredByTab = ({   }) => {

  const powered_by_items = [
    {
      name: 'Jpg.Store', link: 'https://www.jpg.store/', img: '/dao-images/jpgstore.png',
      desc: 'JPG Store is the largest Cardano NFT marketplace.',
    },
    {
      name: 'Cardanoscan', link: 'https://cardanoscan.io/', img: 'https://dash.cardanoscan.io/public/assets/meta/android-icon-192x192.png',
      desc: 'The Cardano (ADA) Explorer, explore blocks, transactions, metadata, certificates, pools and assets.',
    },
    {
      name: 'PoolPM', link: 'https://pool.pm/', img: 'https://smaug.pool.pm/pool.pm-color.svg',
      desc: 'Cardano blockchain realtime visualization made by SM₳UG pool.',
    },
    {
      name: 'AdaStat', link: 'https://adastat.net/', img: 'https://pbs.twimg.com/profile_images/1601853682680840197/0olJJGNf_400x400.jpg',
      desc: 'Cardano (ADA) Blockchain Explorer.',
    },
    {
      name: 'TapTools', link: 'https://www.taptools.io/', img: '/dao-images/tt.webp',
      desc: 'A subscription based Blockchain Tool.',
    },
  ]

  return (
    <Grid item xs={12} md={12}>
      <div align='left'>
        <Card>
        { powered_by_items.map((item) => (
          <div key={item.name} style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
            <Avatar size={'small'} variant='rounded' src={item.img} />

            <Grid sx={{ mx: 1, minWidth: 100 }}>
              <Typography variant='h5'>
                {item.name}
              </Typography>
            </Grid>

            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

            <Grid sx={{ mx: 1 }}>
              <Typography variant='body2'>
                {item.desc}
              </Typography>
            </Grid>

            <Grid sx={{ mx: 1 }}>
              <Button variant='contained' size='small' sx={{ width: 100 }} href={item.link} target='_blank'>
                Visit
              </Button>
            </Grid>
          </div>))
        }
      </Card>

      </div>
    </Grid>
  );
}


export default PoweredByTab;

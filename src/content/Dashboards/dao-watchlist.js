import { Card } from '@mui/material';
import { subDays } from 'date-fns';
import WatchlistTable from './tables/watchlist'
import PropTypes from 'prop-types';


const Watchlist = ({ data }) => {
  const cryptoOrders = [
    {
      id: 1,
      name: 'Turtle Token',
      ticker: '$TURTL',
      logo: '/token-images/turtl.png',
      price: 0,
      price_usd: 0,
      volume: 0,
      volume_usd: 0,
      marketcap: 0,
      marketcap_usd: 0,
      ada_compare: 0,
      twitter: '',
      discord: '',
      buy_link: '',
    },
    {
      id: 2,
      name: 'Froggie Koin',
      ticker: '$FROGGIE',
      logo: '/token-images/froggie.png',
      price: data.froggie_data.price,
      price_usd: (data.ada_fiat.usd * data.froggie_data.price),
      volume: data.froggie_data.daily_volume,
      volume_usd: (data.ada_fiat.usd * data.froggie_data.daily_volume),
      marketcap: data.froggie_data.fdm,
      marketcap_usd: (data.ada_fiat.usd * data.froggie_data.fdm),
      ada_compare: data.froggie_data.ada_compare,
      twitter: '',
      discord: '',
      buy_link: '',
    },
    {
      id: 3,
      name: 'AdaKonda Coin',
      ticker: '$KONDA',
      logo: '/token-images/konda.png',
      price: data.konda_data.price,
      price_usd: (data.ada_fiat.usd * data.konda_data.price),
      volume: data.konda_data.daily_volume,
      volume_usd: (data.ada_fiat.usd * data.konda_data.daily_volume),
      marketcap: data.konda_data.fdm,
      marketcap_usd: (data.ada_fiat.usd * data.konda_data.fdm),
      ada_compare: data.konda_data.ada_compare,
      twitter: '',
      discord: '',
      buy_link: '',
    },
    {
      id: 4,
      name: 'Catsky Token',
      ticker: '$CATSKY',
      logo: '/token-images/catsky.png',
      price: data.catsky_data.price,
      price_usd: (data.ada_fiat.usd * data.catsky_data.price),
      volume: data.catsky_data.daily_volume,
      volume_usd: (data.ada_fiat.usd * data.catsky_data.daily_volume),
      marketcap: data.catsky_data.fdm,
      marketcap_usd: (data.ada_fiat.usd * data.catsky_data.fdm),
      ada_compare: data.catsky_data.ada_compare,
      twitter: '',
      discord: '',
      buy_link: '',
    },
    {
      id: 5,
      name: 'Racoons Club',
      ticker: '$RCCN',
      logo: '/token-images/rccn.png',
      price: data.rccn_data.price,
      price_usd: (data.ada_fiat.usd * data.rccn_data.price),
      volume: data.rccn_data.daily_volume,
      volume_usd: (data.ada_fiat.usd * data.rccn_data.daily_volume),
      marketcap: data.rccn_data.fdm,
      marketcap_usd: (data.ada_fiat.usd * data.rccn_data.fdm),
      ada_compare: data.rccn_data.ada_compare,
      twitter: '',
      discord: '',
      buy_link: '',
    },
    {
      id: 5,
      name: 'Tortol',
      ticker: '$TORTOL',
      logo: 'https://www.taptools.io/_next/image?url=https%3A%2F%2Ftaptools-public.s3.amazonaws.com%2Ftoken-logos%2F52162581184a457fad70470161179c5766f00237d4b67e0f1df1b4e65452544c.png&w=64&q=75',
      price: data.tortol_data.price,
      price_usd: (data.ada_fiat.usd * data.tortol_data.price),
      volume: data.tortol_data.daily_volume,
      volume_usd: (data.ada_fiat.usd * data.tortol_data.daily_volume),
      marketcap: data.tortol_data.fdm,
      marketcap_usd: (data.ada_fiat.usd * data.tortol_data.fdm),
      ada_compare: data.tortol_data.ada_compare,
      twitter: '',
      discord: '',
      buy_link: '',
    },
  ];

  return (
    <Card>
      <WatchlistTable cryptoOrders={cryptoOrders} />
    </Card>
  );
}

WatchlistTable.propTypes = {
  data: PropTypes.object.isRequired
};

export default Watchlist;

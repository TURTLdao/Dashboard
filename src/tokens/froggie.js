function FroggieInformation(froggie_price, froggie_volume) {
  // String tools
  const formatter = new Intl.NumberFormat('en-US');

  // Basic
  const coin_name = 'Froggie Koin';
  const ticker = '$FROGGIE';
  const token_logo = '/token-images/froggie.png';

  // Raw Economics
  const raw_supply = 69000000000;
  const raw_price = froggie_price;
  const raw_volume = froggie_volume;
  const raw_marketcap = Number(raw_supply * raw_price).toFixed(0);

  // Formatted Economics
  const formatted_marketcap = formatter.format(raw_marketcap);
  const formatted_price = Number(raw_price).toFixed(8);
  const formatted_supply = formatter.format(raw_supply);
  const formatted_volume = formatter.format(raw_volume.toFixed(2));

  // Dashboard Information
  const marketcap_title = ticker + ' Marketcap';
  const price_title = ticker + ' Price';
  const volume_title = ticker + ' Daily Volume';

  // Token Events
  const future_events = {
    event_1: '$FROGGIE NFTs',
    event_1_link: 'https://twitter.com/_TurtleDAO/status/1662053306477232129?s=20',
    event_2: ''
  };
  const current_events = {
    event_1: '',
    event_1_link: '',
    event_2: ''
  };
  const past_events = {
    event_1: 'Croak Challenge',
    event_2: 'Froggie Poker'
  };

  const verfied_buy_information = {
    buy_link: 'https://app.minswap.org/swap?currencySymbolA=&tokenNameA=&currencySymbolB=79906b9c8d2fbddeba9658387a2a1187f3edd8f546e5dc49225710a1&tokenNameB=46524f47474945',
    ticker: ticker,
  };

  // Market Table Information
  const market_table_information = {
    coin_name: coin_name,
    coin_price: formatted_price,
    coin_mc: formatted_marketcap,
    ticker: ticker,
    coin_logo: '/token-images/froggie.png'
  } 
  
  const token_bio_information = {
    coin_name: coin_name,
    coin_motto: 'Froggie is here for everyone. Froggie is the new wave. Join us in the pond.',
    coin_paragraph_1: 'Froggies are life, Froggies are love and we want Froggies to stay.',
    coin_paragraph_2: '',
    coin_about_image: 'https://github.com/TURTLdao/TURTL-images/blob/main/1.png?raw=true',
    website_link: 'https://froggies.vercel.app/',
    ticker: ticker
  };

  const token_profile_information = {
    avatar: token_logo,
    name: coin_name,
    supply: formatted_supply,
    ticker: ticker,
    policy_id: '79906b9c8d2fbddeba9658387a2a1187f3edd8f546e5dc49225710a1',
    fingerprint: 'asset19c3e54qhtme5pptxsgpwu4ea60904drzlyxn0l',
    governance_wallets: ['$froggiepond', 'stake1uytl7zf2sc2nxkjdjdnar05u4gfkuzdm0dyxrn7vvws833sy9t6ur'],
    cardano_scan: 'https://cardanoscan.io/token/79906b9c8d2fbddeba9658387a2a1187f3edd8f546e5dc49225710a146524f47474945'
  };

  const data = {
    future_events,
    current_events,
    past_events,

    coin_name,
    ticker,
    token_logo,

    formatted_marketcap,
    formatted_price,
    formatted_supply,
    formatted_volume,

    marketcap_title,
    price_title,
    volume_title,

    market_table_information,
    verfied_buy_information,
    token_bio_information,
    token_profile_information
  };

  return data;
}

export default FroggieInformation;

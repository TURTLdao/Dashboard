function RccnInformation(rccn_price, rccn_volume) {
    // String tools
    const formatter = new Intl.NumberFormat('en-US');
  
    // Basic
    const coin_name = 'Racoons Club';
    const ticker = '$RCCN';
    const token_logo = '/token-images/rccn.png';
  
    // Raw Economics
    const raw_supply = 5000000000;
    const raw_price = rccn_price;
    const raw_volume = rccn_volume;
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
      event_1: '',
      event_1_link: '',
      event_2: ''
    };
    const current_events = {
      event_1: '',
      event_1_link: '',
      event_2: ''
    };
    const past_events = {
      event_1: '',
    };

    const verfied_buy_information = {
      buy_link: 'https://app.minswap.org/swap?currencySymbolA=&tokenNameA=&currencySymbolB=a3e9d397a62992efd2bb54c954b59044948f11f4e14b28add5ebd847&tokenNameB=5243434e',
      ticker: ticker,
    };

    // Market Table Information
    const market_table_information = {
      coin_name: coin_name,
      coin_price: formatted_price,
      coin_mc: formatted_marketcap,
      ticker: ticker,
      coin_logo: '/token-images/rccn.png'
    } 

    const token_bio_information = {
      coin_name: coin_name,
      coin_motto: 'The first 3D/VR Website in Cardano',
      coin_paragraph_1: 'Racoons Club are building an educational platform in multichain Cardano & Polygon',
      coin_paragraph_2: '',
      coin_about_image: 'https://pbs.twimg.com/profile_banners/1655815882415718401/1684121392/1500x500',
      website_link: 'https://racoonsclub.io/',
      ticker: ticker
    };
  
    const token_profile_information = {
      avatar: token_logo,
      name: coin_name,
      supply: formatted_supply,
      ticker: ticker,
      policy_id: '9b426921a21f54600711da0be1a12b026703a9bd8eb9848d08c9d921',
      fingerprint: 'asset18zpauqujk3cu9cypneh8t7l46wmrwa5klmslnm',
      governance_wallets: ['$catsky.catsky', 'stake1u9kqvuy7upxvegggjk42txxkzd4fvs0xa94a5c93y9nxp6c9cngv0'],
      cardano_scan: 'https://cardanoscan.io/token/9b426921a21f54600711da0be1a12b026703a9bd8eb9848d08c9d921434154534b59'
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
  
  export default RccnInformation;
  
function KondaInformation(konda_price, konda_volume) {
    // String tools
    const formatter = new Intl.NumberFormat('en-US');
  
    // Basic
    const coin_name = 'AdaKonda Coin';
    const ticker = '$KONDA';
    const token_logo = '/token-images/konda.png';
  
    // Raw Economics
    const raw_supply = 84322711100;
    const raw_price = konda_price;
    const raw_volume = konda_volume;
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
      event_1: '$KONDA Meme Contest',
    };

    const verfied_buy_information = {
      buy_link: 'https://app.minswap.org/swap?currencySymbolA=&tokenNameA=&currencySymbolB=501dd5d2fbab6af0a26b1421076ff3afc4d5a34d6b3f9694571116ea&tokenNameB=4b4f4e4441',
      ticker: ticker,
    };

    // Market Table Information
    const market_table_information = {
      coin_name: coin_name,
      coin_price: formatted_price,
      coin_mc: formatted_marketcap,
      ticker: ticker,
      coin_logo: '/token-images/konda.png'
    } 
  
    const token_bio_information = {
      coin_name: coin_name,
      coin_motto: 'The sh*t coin that cares!',
      coin_paragraph_1: 'Our mission is both simple and effective: we find an NFT or a token, munch on it and spit it back out to the community. This concept is called ”FEED the KONDA”.',
      coin_paragraph_2: '',
      coin_about_image: 'https://adakondacoin.com/wp-content/uploads/2023/05/Senza-nome.png',
      website_link: 'https://adakondacoin.com/',
      ticker: ticker
    };
  
    const token_profile_information = {
      avatar: token_logo,
      name: coin_name,
      supply: formatted_supply,
      ticker: ticker,
      policy_id: '501dd5d2fbab6af0a26b1421076ff3afc4d5a34d6b3f9694571116ea',
      fingerprint: 'asset195zkmk2c720ezqdnw8fl50un3tzn5u9fd5slm6',
      governance_wallets: ['$adakonda', 'stake1uxt3z77vx5708fys7kkdujh6ehxtcwqkxt7a9jtp4d3n7ggpv6nu3'],
      cardano_scan: 'https://cardanoscan.io/token/asset195zkmk2c720ezqdnw8fl50un3tzn5u9fd5slm6'
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
  
  export default KondaInformation;
  
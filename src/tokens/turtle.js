function TurtleInformation(turtle_price) {
    // String tools
    const formatter = new Intl.NumberFormat('en-US');
  
    // Basic
    const coin_name = 'Turtle Token';
    const ticker = '$TURTL';
    const token_logo = '/token-images/turtl.png';
  
    // Raw Economics
    const raw_supply = 300000000;
    const raw_price = turtle_price;
    const raw_marketcap = Number(raw_supply * raw_price).toFixed(0);
  
    // Formatted Economics
    const formatted_marketcap = formatter.format(raw_marketcap);
    const formatted_price = Number(raw_price).toFixed(8);
    const formatted_supply = formatter.format(raw_supply);
  
    // Dashboard Information
    const marketcap_title = ticker + ' Marketcap';
    const price_title = ticker + ' Price';
  
    // Token Events
    const future_events = {
      event_1: 'Token Sale',
      event_1_link: 'https://twitter.com/_TurtleDAO/',
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

    // Market Table Information
    const market_table_information = {
      coin_name: coin_name,
      coin_price: formatted_price,
      coin_mc: formatted_marketcap,
      ticker: ticker,
      coin_logo: '/token-images/turtl.png'
    } 

    const token_profile_information = {
      avatar: token_logo,
      name: coin_name,
      supply: formatted_supply,
      ticker: ticker,
      policy_id: '',
      fingerprint: '',
      governance_wallets: ['$turtledao', ''],
      cardano_scan: '',
      is_active: false,
    };
  
    const data = {
      future_events,
      current_events,
      past_events,
      formatter,
      coin_name,
      ticker,
      token_logo,
      raw_supply,
      raw_price,
      raw_marketcap,
      formatted_marketcap,
      formatted_price,
      formatted_supply,
      marketcap_title,
      price_title,
      market_table_information,
      token_profile_information
    };
  
    return data;
  }
  
  export default TurtleInformation;
  
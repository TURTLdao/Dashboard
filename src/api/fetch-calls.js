
const TT_API_BUILD_ID = 'eQ9ZcFEeAXhYpcTOcnQ7n';
const JPG_API_BUILD_ID = 'iO8nO5wAH2nojCllOm3xm'

export async function fetchCoinData(coinName)
{
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/' + coinName + '/tickers');
    const data = await response.json();
    
    const priceUsd = parseFloat(data.tickers[0].converted_last.usd);
    return priceUsd;
  } catch (error) {
    console.log('Failed to fetch CoinGecko data for: ' + coinName + ' - ' + error.message);
  }
}

// Example: ttID = 0be55d262b29f564998ff81efe21bdc0022621c12f15af08d0f2ddb1.1075ae9bcffa581ce9bc3a67d1cfdb1471ca8b62dd56ba0d065275682a7e8258 (this is $froggie)
export async function fetchTTdata(ttID)
{
  try
  {
    const response = await fetch('https://www.taptools.io/_next/data/' + TT_API_BUILD_ID + '/charts/token.json?pairID=' + ttID);
    const data = await response.json();

    const circulatingSupply = data.pageProps.pair.circulatingSupply;
    const dailyVolume = data.pageProps.pair.dailyVolume;
    const dilutedMarketCap = data.pageProps.pair.dilutedMarketCap;
    const holders = data.pageProps.pair.holders;
    const monthPercentChange = data.pageProps.pair.monthPercentChange;
    const weekPercentChange = data.pageProps.pair.weekPercentChange;
    const pricePercentChange = data.pageProps.pair.pricePercentChange;
    const nativePrice = data.pageProps.pair.nativePrice;
    const numTransactions = data.pageProps.pair.numTransactions;

    return {
      circulatingSupply, dailyVolume, dilutedMarketCap, holders,
      monthPercentChange, weekPercentChange, pricePercentChange, nativePrice,
      numTransactions
    }
  }
  catch (error)
  {
    console.log('Failed to fetch TT data for: ' + ttID + ' - ' + error.message);
  }
}

// Example: jpgID = racoonsclubmainseries.json?collection=racoonsclubmainseries
export async function fetchJpgStoreData(jpgID)
{
  try
  {
    const response = await fetch('https://www.jpg.store/_next/data/' + JPG_API_BUILD_ID + '/en/collection/' + jpgID);
    const data = await response.json();

    const policy_id = data.pageProps.collection.policy_id;
    const display_name = data.pageProps.collection.display_name;
    const description = data.pageProps.collection.description;
    const is_minting = data.pageProps.collection.is_minting;
    const is_verified = data.pageProps.collection.is_verified;
    const global_floor_lovelace = data.pageProps.collection.global_floor_lovelace;
    const global_volume_lovelace_all_time = data.pageProps.collection.global_volume_lovelace_all_time;
    const supply = data.pageProps.collection.supply;
    const royalties = data.pageProps.collection.royalties.pct;

    return {
      policy_id, display_name, description, is_minting, is_verified,
      global_floor_lovelace, global_volume_lovelace_all_time, supply,
      royalties
    }
  }
  catch (error)
  {
    console.log('Failed to fetch JPG data for: ' + jpgID + ' - ' + error.message);
  }
}

export async function blockfrost_CheckAddress(address)
{
  const apiKey = 'mainnetHeQmp2UUWJXYuE8TFt2KkmNlPPblhjyC';
  try
  {
    const response = await fetch('https://cardano-mainnet.blockfrost.io/api/v0/addresses/' + address, {
      headers: {
        'Content-Type': 'application/json',
        'project_id': apiKey
      }
    });

    const amounts = data.amount;
    const stake_address = data.stake_address;

    return {
      amounts, stake_address
    }
  }
  catch (error)
  {
    console.log('Failed to fetch blockfrost_CheckAddress data for: ' + address + ' - ' + error.message);
  }
}

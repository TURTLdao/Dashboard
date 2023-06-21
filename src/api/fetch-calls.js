const TT_API_BUILD_ID = 'Mbi-4MLjoJUmoX-CChCED';
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

//
export async function fetchTTtrendingData()
{
  try
  {
    const response = await fetch('https://www.taptools.io/_next/data/' + TT_API_BUILD_ID +'/index.json?Trending=&Tokens=');
    const data = await response.json();

    const trending = [];
    const uniqueNames = new Set();
    data.pageProps.top6TokenTrending.forEach(item => {
      if (!uniqueNames.has(item.name)) {
        trending.push(item);
        uniqueNames.add(item.name);
      }
    });
    data.pageProps.top25Tokens.forEach(item => {
      if (!uniqueNames.has(item.name)) {
        trending.push(item);
        uniqueNames.add(item.name);
      }
    });

    const results = [];
    for (let i = 0; i < trending.length; i++) {
      const item = trending[i];
      const logo = item.logo;
      const marketCap = item.marketCap;
      const marketCapUSD = item.marketCapUSD;
      let name = item.name;
      const pairID = item.pairID;
      const rank = item.rank;
      const tokenID = item.tokenID;
      const totalLiquidity = item.totalLiquidity;
      const volume = item.volume;
      const price = item.price;
      const priceUSD = item.priceUSD;
      let ticker = item.ticker;

      if (name === 'SNEK') {
        ticker = 'SNEK';
        name = 'Snek'
      } else if (name === '0014df1047454e53') {
        name = 'Genius Yield Token'
      } else if (name === 'AADA') {
        name = 'Aada DAO Token'
      } else if (name === 'INDY') {
        name = 'Indigo DAO Token'
      } else if (name === 'DjedMicroUSD') {
        name = 'Djed Micro USD'
      } else if (name === 'BANK') {
        name = 'Bankercoin'
      } else if (name === 'AGIX') {
        name = 'Singularity Net Token'
      }
      // carry this on...

      results.push({
        logo, marketCap, marketCapUSD, name, pairID,
        rank, tokenID, totalLiquidity, volume, price,
        priceUSD, ticker
      });
    }

    // Sort the results array by volume
    results.sort((a, b) => b.volume - a.volume);
    
    return results
  }
  catch (error)
  {
    console.log('Failed to fetch TT data for trendingTTdata: ' + error.message);
  }
}

// Example: jpgID = racoonsclubmainseries.json?collection=racoonsclubmainseries
export async function fetchJpgStoreProjectData(jpgID)
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

export async function fetchJpgStoreData(showNew) {
  try {
    let response;
    if (showNew) {
      response = await fetch('https://server.jpgstoreapis.com/search/collections?nameQuery=&verified=should-be-verified&sortBy=recently-added&pagination=%7B%7D&size=24');
    } else {
      response = await fetch('https://server.jpgstoreapis.com/search/collections?nameQuery=&verified=should-be-verified&sortBy=score&pagination=%7B%7D&size=24');
    }
    const data = await response.json();

    const collections = data.collections; // Access the "collections" array

    const results = [];
    for (let i = 0; i < collections.length; i++) {
      const collection = collections[i]; // Access the current collection object
      const policy_id = collection.policy_id;
      const display_name = collection.display_name;
      const description = collection.description;
      const hero_image = collection.hero_image || null;
      const global_floor = Number(collection.global_floor_lovelace / 1e6).toFixed(2);
      const url = collection.url;

      results.push({
        policy_id,
        display_name,
        description,
        hero_image,
        global_floor,
        url
      });
    }

    return results;
  } catch (error) {
    console.log('Failed to fetch JPG data:', error);
    throw error; // Rethrow the error to handle it elsewhere if necessary
  }
}

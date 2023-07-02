const TT_API_BUILD_ID = 'WCc76NmEarv-ltbguZijC';
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
        name = 'Snek';
      } else if (name === '0014df1047454e53') {
        name = 'Genius Yield Token';
      } else if (name === 'AADA') {
        name = 'Aada DAO Token';
      } else if (name === 'INDY') {
        name = 'Indigo DAO Token';
      } else if (name === 'DjedMicroUSD') {
        name = 'Djed Micro USD';
      } else if (name === 'BANK') {
        name = 'Bankercoin';
      } else if (name === 'AGIX') {
        name = 'Singularity Net Token';
      } else if (name === 'IAG') {
        name = 'Iagon';
      } else if (name === 'MIN') {
        name = 'Minswap';
      } else if (name === 'worldmobiletoken') {
        name = 'World Mobile Token';
      } else if (name === 'Cornucopias [via ChainPort.io]') {
        name = 'Cornucopias';
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

// 263eb3e3c980c15305f393dc7a2f6289ba12732b6636efe46d6e2c16
export async function fetchFloorPriceJpgStore(id)
{
  try
  {
    const response = await fetch('https://server.jpgstoreapis.com/collection/' + id + '/openCNFTStats');
    const data = await response.json();
    const floor_price = data.floor_price;
    const ath_sale = data.highest_sale.price;
    const holders = data.holders;
    const minted = data.minted;
    const logo = data.thumbnail;
    const marketcap = data.marketcap;

    return { floor_price, ath_sale, holders, minted, logo, marketcap }
  }
  catch (error)
  {
    console.log('Failed to fetch JPG data for: ' + id + ' - ' + error.message);
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

// Alternate way to fetch ADA price, CoinGecko can be overloaded sometimes
export async function fetchCardanoPrice()
{
  try
  {
    const response = await fetch('https://pool.pm/total.json');
    const data = await response.json();

    const ada_usd = data.ADAUSD;
    const ada_eur = data.ADAEUR;
    const ada_jpy = data.ADAJPY;
    const ada_gbp = data.ADAGBP;
    const ada_cad = data.ADACAD;
    const ada_aud = data.ADAAUD;
    const ada_brl = data.ADABRL;

    return { ada_usd, ada_eur, ada_jpy, ada_gbp, ada_cad, ada_aud, ada_brl };
  }
  catch (error)
  {
    console.log('Failed to Pool PM data: ' + error.message);
  }
}


export async function fetchWalletData(user_address)
{
  try
  {
    const response = await fetch('https://pool.pm/wallet/' + user_address);
    const data = await response.json();

    const tokensInfo = extractTokenInfo(data);

    return tokensInfo
  }
  catch (error)
  {
    console.log('Failed to fetch TT data for trendingTTdata: ' + error.message);
  }
}

function extractTokenInfo(response) {
  const tokensInfo = [];
  const tokens = response.tokens;

  for (const token of tokens) {
    const tokenInfo = {
      name: token.name,
      ticker: token.metadata.ticker,
      description: token.metadata.description,
      image: token.metadata.image,
      url: token.metadata.url || ''
    };
    tokensInfo.push(tokenInfo);
  }

  return tokensInfo;
}

export async function fetchAdaStatHolders(policyId) {

  try {
    const response = await fetch(`https://adastat.net/api/rest/v1/tokens/${policyId}.json?rows=holders&dir=desc&limit=24&currency=usd`);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchAdaStatTransactions(address) {

  try {
    const searchUrl = `https://adastat.net/api/rest/v1/search.json?query=${address}&currency=usd`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();
    const hash = searchData.accounts[0].hash;

    // Fetch the details using the hash
    const detailsUrl = `https://adastat.net/api/rest/v1/accounts/${hash}.json?rows=history&dir=desc&limit=24&currency=usd`;
    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();
    const history_rows = detailsData.rows;

    const detailsUrl2 = `https://adastat.net/api/rest/v1/accounts/${hash}.json?rows=tokens&dir=desc&limit=24&currency=usd`;
    const detailsResponse2 = await fetch(detailsUrl2);
    const detailsData2 = await detailsResponse2.json();
    const assets_rows = detailsData2.rows;

    return { history_rows, assets_rows }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchAdaStatToken(policy) {

  try {
    const searchUrl = `https://adastat.net/api/rest/v1/tokens/${policy}.json?rows=transactions&dir=desc&currency=usd`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();
    const token_metadata = searchData.data;
    const recent_txs = searchData.rows;

    return { token_metadata, recent_txs }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchPoolPmAddressData(address) {
  // Fetch the details using the hash
  const detailsUrl = `https://pool.pm/wallet/${address}`;
  const detailsResponse = await fetch(detailsUrl);
  const full = await detailsResponse.json();

  return full;
}

export async function fetchAddressDetails(address) {
  try {
    // first search for the address like this:
    // https://adastat.net/api/rest/v1/search.json?query=addr1qywhrwe3vufpf66n7w9ld42ths6j6j53swv9agpt3pd0u409hz67cj83lhuhgvvtu97jd3fyswqu80g0s3uuawen7kmqv4w2sg&currency=usd
    // then grab data = response.json(), hash = data.accounts.hash
    // with that hash, then search for the details with the hash:
    // https://adastat.net/accounts/e5b8b5ec48f1fdf974318be17d26c5248381c3bd0f8479cebb33f5b6
    // Search for the address
    const searchUrl = `https://adastat.net/api/rest/v1/search.json?query=${address}&currency=usd`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();
    const hash = searchData.accounts[0].hash;

    // Fetch the details using the hash
    const detailsUrl = `https://adastat.net/api/rest/v1/accounts/${hash}.json?rows=history&dir=desc&limit=24&currency=usd`;
    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();

    // Extract the desired data
    const {
      first_tx_time,
      first_tx_hash,
      last_tx_time,
      last_tx_hash,
      balance,
      reward_balance,
      total_reward_amount,
      active_stake,
      snapshot_stake,
      tx,
      token,
      catalyst_id,
      address: addressCount,
      registered_stake_key,
      stake_history,
      delegation_history,
      key_history,
      pool_hash,
      pool_bech32,
      pool_name,
      pool_ticker,
      active_pool_hash,
      active_pool_bech32,
      active_pool_name,
      active_pool_ticker,
      snapshot_pool_hash,
      snapshot_pool_bech32,
      snapshot_pool_name,
      snapshot_pool_ticker,
      first_reward_epoch,
      last_reward_epoch,
      total_member,
      total_leader,
      total_refund,
      total_treasury,
      total_reserves,
      total_refund_amount,
      pool_reward_address,
      pool_owner
    } = detailsData.data;

    /*
        "first_tx_hash": "428a0394c7a257a5acded66dd47d6cb0909c8c4c5955afd9f1d18ecae28928c1",
        "first_tx_time": 1683831236,
        "last_tx_hash": "c5cee2fbc79a0c8667e388344655299457f3fd55c9a1dde4ec6c2ec6b314310e",
        "last_tx_time": 1687988507,
        "hash": "e5b8b5ec48f1fdf974318be17d26c5248381c3bd0f8479cebb33f5b6",
        "bech32": "stake1u8jm3d0vfrclm7t5xx97zlfxc5jg8qwrh58cg7wwhveltdsfeajcd",
        "balance": "107030803",
        "reward_balance": "0",
        "total_reward_amount": "0",
        "active_stake": "84071842",
        "snapshot_stake": "107030803",
        "tx": 63,
        "token": 16,
        "catalyst_id": null,
        "address": 32,
        "registered_stake_key": true,
        "stake_history": true,
        "delegation_history": true,
        "key_history": true,
        "pool_hash": "5be57ce6d1225697f4ad4090355f0a72d6e1e2446d1d768f36aa118c",
        "pool_bech32": "pool1t0jheek3yftf0a9dgzgr2hc2wttwrcjyd5whdrek4ggcc5famre",
        "pool_name": "The Pond",
        "pool_ticker": "POND",
        "active_pool_hash": "b3f9883d3de29971c43e05fdb985281ffee737be0e5669094810ba6b",
        "active_pool_bech32": "pool1k0ucs0fau2vhr3p7qh7mnpfgrllwwda7petxjz2gzzaxkyp8f88",
        "active_pool_name": "Poly 0PCT Pool",
        "active_pool_ticker": "POLY",
        "snapshot_pool_hash": "5be57ce6d1225697f4ad4090355f0a72d6e1e2446d1d768f36aa118c",
        "snapshot_pool_bech32": "pool1t0jheek3yftf0a9dgzgr2hc2wttwrcjyd5whdrek4ggcc5famre",
        "snapshot_pool_name": "The Pond",
        "snapshot_pool_ticker": "POND",
        "first_reward_epoch": null,
        "last_reward_epoch": null,
        "total_member": 0,
        "total_leader": 0,
        "total_refund": 0,
        "total_treasury": 0,
        "total_reserves": 0,
        "total_refund_amount": null,
        "pool_reward_address": {
            "rows": []
        },
        "pool_owner": {
            "rows": []
        }
    */
    // Return the extracted data
    return {
      first_tx_time,
      first_tx_hash,
      last_tx_time,
      last_tx_hash,
      balance,
      reward_balance,
      total_reward_amount,
      active_stake,
      snapshot_stake,
      tx,
      token,
      catalyst_id,
      addressCount,
      registered_stake_key,
      stake_history,
      delegation_history,
      key_history,
      pool_hash,
      pool_bech32,
      pool_name,
      pool_ticker,
      active_pool_hash,
      active_pool_bech32,
      active_pool_name,
      active_pool_ticker,
      snapshot_pool_hash,
      snapshot_pool_bech32,
      snapshot_pool_name,
      snapshot_pool_ticker,
      first_reward_epoch,
      last_reward_epoch,
      total_member,
      total_leader,
      total_refund,
      total_treasury,
      total_reserves,
      total_refund_amount,
      pool_reward_address,
      pool_owner
    };

  } catch (error) {
    console.error(error);
  }
}

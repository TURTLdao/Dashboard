/*
  Copyright (c) 2023 - The TurtleDAO Platform
*/


const { TT_BUILD_ID } = require('src/consts/global.js');

export async function taptoolsNftMarketData(policyId)
{
  try
  {
    const response = await fetch('https://www.taptools.io/_next/data/' + TT_BUILD_ID + '/charts/nft.json?policyID=' + policyId);
    const resp = await response.json();
    const twofour_hour = ".24h"
    const threezero_day = ".30d"
    const seven_day = ".7d"

    const twentyfour_hour_change_percent = resp.pageProps.nft + twofour_hour;
    const thirty_day_change_percent = resp.pageProps.nft + threezero_day;
    const seven_day_change_percent = resp.pageProps.nft + seven_day;
    const avgAssetsPerHolder = resp.pageProps.nft.avgAssetsPerHolder;
    const avgPrice = resp.pageProps.nft.avgPrice;
    const avgSoldForPrice = resp.pageProps.nft.avgSoldForPrice;
    const createdAt = resp.pageProps.nft.createdAt;
    const dailyVolume = resp.pageProps.nft.dailyVolume;
    const floorPrice = resp.pageProps.nft.floorPrice;
    const logo = resp.pageProps.nft.logo;
    const marketCap = resp.pageProps.nft.marketCap;
    const maxFloor = resp.pageProps.nft.maxFloor;
    const maxSoldForPrice = resp.pageProps.nft.maxSoldForPrice;
    const minFloor = resp.pageProps.nft.minFloor;
    const name = resp.pageProps.nft.name;
    const numHolders = resp.pageProps.nft.numHolders;
    const numListings = resp.pageProps.nft.numListings;
    const numSales = resp.pageProps.nft.numSales;
    const totalSupply = resp.pageProps.nft.totalSupply;
    const totalVolume = resp.pageProps.nft.totalVolume;
    
    const data = { twentyfour_hour_change_percent, thirty_day_change_percent, avgAssetsPerHolder, avgPrice,
      avgSoldForPrice, dailyVolume, avgSoldForPrice, createdAt,
      floorPrice, logo, marketCap, maxFloor, maxSoldForPrice, minFloor, name, numHolders,
      numListings, numSales, totalSupply, totalVolume, seven_day_change_percent
    }

    return data
  }
  catch (error)
  {
    console.log('Failed to fetch TT NFT data for: ' + policyId + ' - ' + error.message);
  }
}

export async function taptoolsMarketData(ttID)
{ 
  try
  {
    const response = await fetch('https://www.taptools.io/_next/data/' + TT_BUILD_ID + '/charts/token.json?pairID=' + ttID);
    const data = await response.json();
    const pageProps = data.pageProps || {};
    const pair = pageProps.pair || {};
    const circulatingSupply = pair.circulatingSupply || null;
    const nativePrice = pair.nativePrice || 0;
    console.log(nativePrice)

    //const circulatingSupply = data.pageProps.pair.circulatingSupply || 0;
    const dailyVolume = data.pageProps.pair.dailyVolume || 0;
    const dilutedMarketCap = data.pageProps.pair.dilutedMarketCap || 0;
    const holders = data.pageProps.pair.holders || 0;
    const monthPercentChange = data.pageProps.pair.monthPercentChange || 0;
    const weekPercentChange = data.pageProps.pair.weekPercentChange || 0;
    const pricePercentChange = data.pageProps.pair.pricePercentChange || 0;
    //const nativePrice = data.pageProps.pair.nativePrice || 0;
    const numTransactions = data.pageProps.pair.numTransactions || 0;
    const tokenPolicy = data.pageProps.pair.tokenPolicy || 0;

    const market_data = { circulatingSupply, dailyVolume, dilutedMarketCap, holders,
      monthPercentChange, weekPercentChange, pricePercentChange, nativePrice,
      numTransactions, tokenPolicy
    }

    return market_data
  }
  catch (error)
  {
    console.log('Failed to fetch TT data for: ' + ttID + ' - ' + error.message);
  }
}

export async function cardanoPrice()
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

    const fiat = {
      usd: ada_usd, eur: ada_eur, jpy: ada_jpy,
      gbp: ada_gbp, cad: ada_cad, aud: ada_aud,
      brl: ada_brl
    }

    return fiat;
  }
  catch (error)
  {
    console.log('Failed to Pool PM data: ' + error.message);
  }
}

export async function trendingTokensData()
{
  try
  {
    const response = await fetch('https://www.taptools.io/_next/data/' + TT_BUILD_ID +'/index.json?Trending=&Tokens=');
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
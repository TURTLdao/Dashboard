export async function getLastPrice(baseId) {
  const response = await fetch('https://api-mainnet-prod.minswap.org/coinmarketcap/v2/pairs');
  const data = await response.json();

  const pair = data[baseId];

  if (pair && pair.last_price) {
    return pair.last_price;
  }

  return 0; // Return 0 if baseId or last_price is not found
}

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

export async function fetchTTdata(ttID)
{
  try
  {
    const response = await fetch('https://www.taptools.io/_next/data/Mnr9ZWE9UMN4us86xyAcT/charts/token.json?pairID=' + ttID);
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

export async function fetchMultiTTdata(ttIDs) {
  try {
    const requests = ttIDs.map(ttID =>
      fetch(
        `https://www.taptools.io/_next/data/Mnr9ZWE9UMN4us86xyAcT/charts/token.json?pairID=${ttID}`
      )
    );

    const responses = await Promise.all(requests);
    const data = await Promise.all(responses.map(response => response.json()));

    const ttData = data.map(d => ({
      circulatingSupply: d.pageProps.pair.circulatingSupply,
      dailyVolume: d.pageProps.pair.dailyVolume,
      dilutedMarketCap: d.pageProps.pair.dilutedMarketCap,
      holders: d.pageProps.pair.holders,
      monthPercentChange: d.pageProps.pair.monthPercentChange,
      weekPercentChange: d.pageProps.pair.weekPercentChange,
      pricePercentChange: d.pageProps.pair.pricePercentChange,
      nativePrice: d.pageProps.pair.nativePrice,
      numTransactions: d.pageProps.pair.numTransactions,
    }));

    return ttData;
  } catch (error) {
    console.log('Failed to fetch TT data: ' + error.message);
  }
}
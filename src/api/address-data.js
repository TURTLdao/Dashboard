/*
  Copyright (c) 2023 - The TurtleDAO Platform
*/

// Get buys/sells of an address, has to be stake address
// https://server.jpgstoreapis.com/user/{stake_address}/v2/transactions

export async function poolpmAddressData(address) {
  const detailsUrl = `https://pool.pm/wallet/${address}`;
  const detailsResponse = await fetch(detailsUrl);
  const full = await detailsResponse.json();
  const lovelaces = full.lovelaces;
  const reward_addr = full.addr;
  const tokens = full.tokens;

  const data = { lovelaces, reward_addr, tokens }

  return data;
}

export async function adastatAddressData(address) {
  try {
    const searchUrl = `https://adastat.net/api/rest/v1/search.json?query=${address}&currency=usd`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();
    const hash = searchData.accounts[0].hash;

    // Fetch the details using the hash
    const detailsUrl = `https://adastat.net/api/rest/v1/accounts/${hash}.json?rows=history&dir=desc&limit=24&currency=usd`;
    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();

    const {
      first_tx_time, first_tx_hash, last_tx_time, last_tx_hash,
      balance, reward_balance, total_reward_amount, active_stake, snapshot_stake,
      tx, token, catalyst_id, address: addressCount, registered_stake_key,
      stake_history, delegation_history, key_history, pool_hash,
      pool_bech32, pool_name, pool_ticker, active_pool_hash, active_pool_bech32,
      active_pool_name, active_pool_ticker, snapshot_pool_hash, snapshot_pool_bech32,
      snapshot_pool_name, snapshot_pool_ticker, first_reward_epoch, last_reward_epoch,
      total_member, total_leader, total_refund, total_treasury, total_reserves,
      total_refund_amount, pool_reward_address, pool_owner
    } = detailsData.data;

    const address_data = {
      first_tx_time, first_tx_hash, last_tx_time, last_tx_hash,
      balance, reward_balance, total_reward_amount, active_stake, snapshot_stake,
      tx, token, catalyst_id, addressCount, registered_stake_key,
      stake_history, delegation_history, key_history, pool_hash,
      pool_bech32, pool_name, pool_ticker, active_pool_hash, active_pool_bech32,
      active_pool_name, active_pool_ticker, snapshot_pool_hash, snapshot_pool_bech32,
      snapshot_pool_name, snapshot_pool_ticker, first_reward_epoch, last_reward_epoch,
      total_member, total_leader, total_refund, total_treasury, total_reserves,
      total_refund_amount, pool_reward_address, pool_owner
    };

    const history = detailsData.rows;

    const detailsUrl2 = `https://adastat.net/api/rest/v1/accounts/${hash}.json?rows=tokens&dir=desc&limit=24&currency=usd`;
    const detailsResponse2 = await fetch(detailsUrl2);
    const detailsData2 = await detailsResponse2.json();
    const assets = detailsData2.rows;

    const rows = { history, assets, address_data }

    return rows;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function adastatTokenData(policyId) {
  try {
    const transactionsResponse = await fetch(`https://adastat.net/api/rest/v1/tokens/${policyId}.json?rows=transactions&dir=desc&limit=24&currency=usd`);
    const transactionsData = await transactionsResponse.json();
    const transactions_row = transactionsData.rows || null;

    const holdersResponse = await fetch(`https://adastat.net/api/rest/v1/tokens/${policyId}.json?rows=holders&dir=desc&limit=24&currency=usd`);
    const holdersData = await holdersResponse.json();
    const holders_row = holdersData.rows || null;

    const data = holdersData.data || {};
    const last_tx = data.last_tx_time || 'null';
    const last_hash = data.last_tx_hash || 'null';
    const first_tx = data.first_tx_time || 'null';
    const first_hash = data.first_tx_hash || 'null';
    const holders = data.holder || 0;
    const tx_count = data.tx || 0;
    const supply = data.supply || 0;
    const decimals = data.decimals || 0;
    const description = data.description || 'null';
    const ticker = data.ticker || 'null';

    const metadata = data.metadata || {};
    const image = metadata.image || null;
    const name = metadata.name || 'null';

    const time_tx = { last_tx, last_hash, first_tx, first_hash };

    const fdata = {
      transactions_row,
      holders_row,
      time_tx,
      holders,
      tx_count,
      supply,
      decimals,
      description,
      image,
      name,
      ticker
    };

    return fdata;
  } catch (error) {
    console.error(error);
    return [];
  }
}


export async function adastatPolicyData(policyId) {
  try {
    //const dataResponse = await fetch(`https://adastat.net/api/rest/v1/tokens/${policyId}.json?currency=usd`);
    //const dataResData = await dataResponse.json();

    const transactionsResponse = await fetch(`https://adastat.net/api/rest/v1/policies/${policyId}.json?rows=transactions&sort=time&dir=desc&limit=24&currency=usd`);
    const transactionsData = await transactionsResponse.json();
    const transactions_row = transactionsData.rows || null;

    const holdersResponse = await fetch(`https://adastat.net/api/rest/v1/policies/${policyId}.json?rows=holders&dir=desc&limit=24&currency=usd`);
    const holdersData = await holdersResponse.json();
    const holders_row = holdersData.rows || null;

    const policyResponse = await fetch(`https://adastat.net/api/rest/v1/policies/${policyId}.json?currency=usd`);
    const policyData = await policyResponse.json();

    const data = policyData.data || {};
    const last_tx = data.last_tx_time || 0;
    const last_hash = data.last_tx_hash || 'null';
    const first_tx = data.first_tx_time || 0;
    const first_hash = data.first_tx_hash || 'null';
    const holders = data.holder || 0;
    const tx_count = data.tx || 0;
    const supply = data.token || 0;


    const fdata = {
      transactions_row, holders_row, holders, tx_count, supply,
      last_tx, last_hash, first_tx, first_hash
    }

    return fdata;
  } catch (error) {
    console.error(error);
    return [];
  }
}

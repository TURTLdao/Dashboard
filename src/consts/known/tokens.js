
const { DAO_SUPPORTED_ITEMS, ada } = require('src/dao/dao-object.js');

const ada_id = ada;

const knownTokens = {
  froggie: {
    token_name: DAO_SUPPORTED_ITEMS.froggie_koin.token_name,
    policy: DAO_SUPPORTED_ITEMS.froggie_koin.policy,
    ticker: DAO_SUPPORTED_ITEMS.froggie_koin.ticker,
    logo: DAO_SUPPORTED_ITEMS.froggie_koin.logo,
    aaid: '/aaid/froggie',
    checktype: 'dao',
    type: 'Token',
    links: {
      twitter: DAO_SUPPORTED_ITEMS.froggie_koin.links.twitter,
      website: DAO_SUPPORTED_ITEMS.froggie_koin.links.website,
      buy_link: DAO_SUPPORTED_ITEMS.froggie_koin.links.buy_now,
      tt_id: DAO_SUPPORTED_ITEMS.froggie_koin.taptools_id,
    }
  },
  catsky: {
    token_name: DAO_SUPPORTED_ITEMS.catsky_token.token_name,
    policy: DAO_SUPPORTED_ITEMS.catsky_token.policy,
    ticker: DAO_SUPPORTED_ITEMS.catsky_token.ticker,
    logo: DAO_SUPPORTED_ITEMS.catsky_token.logo,
    aaid: '/aaid/catsky',
    checktype: 'dao',
    type: 'Token',
    links: {
      twitter: DAO_SUPPORTED_ITEMS.catsky_token.links.twitter,
      website: DAO_SUPPORTED_ITEMS.catsky_token.links.website,
      buy_link: DAO_SUPPORTED_ITEMS.catsky_token.links.buy_now,
      tt_id: DAO_SUPPORTED_ITEMS.catsky_token.taptools_id,
    }
  },
  konda: {
    token_name: DAO_SUPPORTED_ITEMS.adakonda_coin.token_name,
    policy: DAO_SUPPORTED_ITEMS.adakonda_coin.policy,
    ticker: DAO_SUPPORTED_ITEMS.adakonda_coin.ticker,
    logo: DAO_SUPPORTED_ITEMS.adakonda_coin.logo,
    aaid: '/aaid/konda',
    checktype: 'dao',
    type: 'Token',
    links: {
      twitter: DAO_SUPPORTED_ITEMS.adakonda_coin.links.twitter,
      website: DAO_SUPPORTED_ITEMS.adakonda_coin.links.website,
      buy_link: DAO_SUPPORTED_ITEMS.adakonda_coin.links.buy_now,
      tt_id: DAO_SUPPORTED_ITEMS.adakonda_coin.taptools_id,
    }
  },
  rccn: {
    token_name: DAO_SUPPORTED_ITEMS.rccn_token.token_name,
    policy: DAO_SUPPORTED_ITEMS.rccn_token.policy,
    ticker: DAO_SUPPORTED_ITEMS.rccn_token.ticker,
    logo: DAO_SUPPORTED_ITEMS.rccn_token.logo,
    aaid: '/aaid/rccn',
    checktype: 'dao',
    type: 'Token',
    links: {
      twitter: DAO_SUPPORTED_ITEMS.rccn_token.links.twitter,
      website: DAO_SUPPORTED_ITEMS.rccn_token.links.website,
      buy_link: DAO_SUPPORTED_ITEMS.rccn_token.links.buy_now,
      tt_id: DAO_SUPPORTED_ITEMS.rccn_token.taptools_id,
    }
  },
  tortol: {
    token_name: DAO_SUPPORTED_ITEMS.tortol.token_name,
    policy: DAO_SUPPORTED_ITEMS.tortol.policy,
    ticker: DAO_SUPPORTED_ITEMS.tortol.ticker,
    logo: DAO_SUPPORTED_ITEMS.tortol.logo,
    aaid: '/aaid/tortol',
    checktype: 'dao',
    type: 'Token',
    links: {
      twitter: DAO_SUPPORTED_ITEMS.tortol.links.twitter,
      website: DAO_SUPPORTED_ITEMS.tortol.links.website,
      buy_link: DAO_SUPPORTED_ITEMS.tortol.links.buy_now,
      tt_id: DAO_SUPPORTED_ITEMS.tortol.taptools_id,
    }
  },
  venom_vnm: {
    token_name: 'Vemom',
    policy: '2d92af60ee429bce238d3fd9f2531b45457301d74dad1bcf3f9d1dca564e4d',
    ticker: '$VNM',
    logo: 'https://www.taptools.io/_next/image?url=https%3A%2F%2Ftaptools-public.s3.amazonaws.com%2Ftoken-logos%2F2d92af60ee429bce238d3fd9f2531b45457301d74dad1bcf3f9d1dca564e4d.png&w=64&q=75',
    checktype: 'ada',
    type: 'Token',
    links: {
      twitter: 'https://twitter.com/platypusCNFT',
      website: 'https://platypuscyberpunks.com/',
      buy_link: 'https://app.minswap.org/swap?currencySymbolA=&tokenNameA=&currencySymbolB=2d92af60ee429bce238d3fd9f2531b45457301d74dad1bcf3f9d1dca&tokenNameB=564e4d',
      tt_id: ada_id + 'b3eb4290867e373d78ef1f2b88edd08f74eb48a70b45f5c293ea9779f215a0c2',
    }
  }
};

module.exports = {
  knownTokens,
};

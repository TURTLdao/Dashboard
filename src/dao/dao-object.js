/*
  Copyright (c) 2023 - The TurtleDAO Platform
*/

const ada = '0be55d262b29f564998ff81efe21bdc0022621c12f15af08d0f2ddb1.';

// .policy needs to be policy + token id
// make sure only 3 are .starred = true
const DAO_SUPPORTED_ITEMS = {
  turtle_token: {
    starred: true,
    token_name: 'Turtle Token',
    ticker: '$TURTL',
    type: ['Audit', 'Utility', 'Token'],
    slogan: "You're lying to yourself if you say you don't like turtles \u{1F422}",
    desc: "Step into a future where transparency, accountability, and powerful free Cardano tools provided by TurtleDAO reign supreme, inspiring trust in verified projects and propelling you towards success with unyielding confidence.",
    aaid_link: '/aaid/turtledao',
    logo: '/dao-images/turtledao.png',
    supply: 0,
    policy: '',
    taptools_id: ada + '',
    gov_wallet: '',
    links: {
      twitter: '',
      discord: '',
      website: '',
      buy_now: '',
    },
    team: {
      founder: ['Donatello', 'https://cdn.discordapp.com/avatars/479276363262590976/de863fa3bbff2c2bb156f9ae27690925.webp?size=128', 'TurtleDAO'],
    }
  },
  froggie_koin: {
    starred: true,
    token_name: 'Froggie Koin',
    ticker: '$FROGGIE',
    type: ['Meme', 'Token', 'NFT'],
    slogan: 'Froggie is here for everyone. Froggie is the new wave \u{1F438}',
    desc: "Froggies are life, Froggies are love and we want Froggies to stay.",
    aaid_link: '/aaid/froggie',
    logo: 'https://github.com/TURTLdao/token-images/blob/main/froggie.png?raw=true',
    supply: 69000000000,
    policy: '79906b9c8d2fbddeba9658387a2a1187f3edd8f546e5dc49225710a1',
    policy_full: '79906b9c8d2fbddeba9658387a2a1187f3edd8f546e5dc49225710a146524f47474945',
    taptools_id: ada + '1075ae9bcffa581ce9bc3a67d1cfdb1471ca8b62dd56ba0d065275682a7e8258',
    gov_wallet: 'addr1q99eal8y8nw65yxhnn2vj2dyrq7rgh8juq5ld2freccd47shluyj4ps4xddymym86xlfe2sndcymk76gv88uccaq0rrqkyuump',
    links: {
      twitter: 'https://twitter.com/froggieo_',
      discord: 'https://discord.gg/6KwXqWwPgC',
      website: 'https://froggies.vercel.com',
      buy_now: 'https://app.minswap.org/swap?currencySymbolA=&tokenNameA=&currencySymbolB=79906b9c8d2fbddeba9658387a2a1187f3edd8f546e5dc49225710a1&tokenNameB=46524f47474945',
    },
    team: {
      0: [
        'Froggie',
        'https://pbs.twimg.com/profile_images/1662083806109609985/9uocCE19_400x400.jpg',
        'https://twitter.com/froggieo_',
        '$FROGGIE'
      ],
      1: [
        'Fishbowlian',
        'https://pbs.twimg.com/profile_images/1652823043440529409/pk0SN_QU_400x400.jpg',
        'https://twitter.com/_Fishbowlian',
        'Intern',
      ],
      2: [
        'Vent',
        'https://pbs.twimg.com/profile_images/1661334891856797696/0XHUl68A_400x400.jpg',
        'https://twitter.com/therealvent',
        'Intern',
      ],
      3: [
        'Shilliam',
        'https://pbs.twimg.com/profile_images/1661559342385053697/WViqcf5m_400x400.jpg',
        'https://twitter.com/DeFi_Naut',
        'Intern',
      ],
      4: [
        'Donatello',
        'https://cdn.discordapp.com/avatars/479276363262590976/de863fa3bbff2c2bb156f9ae27690925.webp?size=128',
        'https://twitter.com/_TurtleDAO',
        'TurtleDAO',
      ],
    }
  },
  catsky_token: {
    starred: true,
    token_name: 'Catsky Token',
    ticker: '$CATSKY',
    type: ['Meme', 'Token', 'NFT', 'AI'],
    slogan: 'Believers in Cardano \u{1F431}',
    desc: "Catsky Token is more than just a token; its a mission to make a" +
      " substantial impact in the crypto world. With continuous development," +
      " Catsky offers unique NFT airdrops to its holders, fostering a community " +
      " driven by creativity and innovation.",
    aaid_link: '/aaid/catsky',
    logo: '/dao-images/catsky.png',
    supply: 999999999997,
    policy: '9b426921a21f54600711da0be1a12b026703a9bd8eb9848d08c9d921',
    policy_full: '9b426921a21f54600711da0be1a12b026703a9bd8eb9848d08c9d921434154534b59',
    taptools_id: ada + '76ab3fb1e92b7a58ee94b712d1c1bff0e24146e8e508aa0008443e1db1f2244e',
    gov_wallet: '',
    links: {
      twitter: 'https://twitter.com/catskycrypto',
      discord: '',
      website: 'https://catsky.io/',
      buy_now: 'https://app.minswap.org/swap?currencySymbolA=&tokenNameA=&currencySymbolB=9b426921a21f54600711da0be1a12b026703a9bd8eb9848d08c9d921&tokenNameB=434154534b59',
    },
    team: {
      0: [
        'MacroMan',
        'https://pbs.twimg.com/profile_images/1676269585899876355/G2ImtMcK_400x400.jpg',
        'https://twitter.com/ThaMacroMan',
        '$CATSKY'
      ],
    }
  },
  adakonda_coin: {
    starred: false,
    token_name: 'AdaKonda Coin',
    ticker: '$KONDA',
    type: ['Meme', 'Token'],
    slogan: 'The sh*t coin that cares! \u{1F40D}',
    desc: "Our mission is both simple and effective: we find an NFT or a token, munch " +
      " on it and spit it back out to the community. This concept is called ”FEED the KONDA”.",
    aaid_link: '/aaid/konda',
    logo: '/dao-images/konda.png',
    supply: 84322711100,
    policy: '501dd5d2fbab6af0a26b1421076ff3afc4d5a34d6b3f9694571116ea',
    policy_full: '501dd5d2fbab6af0a26b1421076ff3afc4d5a34d6b3f9694571116ea4b4f4e4441',
    taptools_id: ada + 'd3c99ba691189e9be4e524ee1453d8aa4436d504432ec9be264f8a037f7b6840',
    gov_wallet: '',
    links: {
      twitter: 'https://twitter.com/AdaKondaCoin',
      discord: '',
      website: 'http://adakondacoin.com/',
      buy_now: 'https://app.minswap.org/swap?currencySymbolA=&tokenNameA=&currencySymbolB=501dd5d2fbab6af0a26b1421076ff3afc4d5a34d6b3f9694571116ea&tokenNameB=4b4f4e4441',
    },
    team: {
      0: [
        'ZannaKonda',
        'https://pbs.twimg.com/profile_images/1661128300201115648/vf5RJd_A_400x400.jpg',
        'https://twitter.com/ZannaKonda',
        '$KONDA'
      ],
      1: [
        'Adry',
        'https://pbs.twimg.com/profile_images/1454451425916952585/QMXBXTJh_400x400.jpg',
        'https://twitter.com/adryatik',
        '$KONDA'
      ],
    }
  },
  rccn_token: {
    starred: false,
    token_name: 'Racoons Club',
    ticker: '$RCCN',
    type: ['Meme', 'Token', 'NFT', 'Gaming'],
    slogan: 'The first 3D/VR Website in Cardano \u{1F99D}',
    desc: "Racoons Club are building an educational platform in multichain Cardano & Polygon",
    aaid_link: '/aaid/rccn',
    logo: '/dao-images/rccn.png',
    supply: 5000000000,
    policy: 'a3e9d397a62992efd2bb54c954b59044948f11f4e14b28add5ebd847',
    policy_full: 'a3e9d397a62992efd2bb54c954b59044948f11f4e14b28add5ebd8475243434e',
    taptools_id: ada + '778854dfbdabfd15860e20ade792f635cca51d27a45eae9083582889fc256938',
    gov_wallet: '',
    links: {
      twitter: 'https://twitter.com/racoonscoin',
      discord: '',
      website: 'https://racoonsclub.io/',
      buy_now: 'https://app.minswap.org/swap?currencySymbolA=&tokenNameA=&currencySymbolB=a3e9d397a62992efd2bb54c954b59044948f11f4e14b28add5ebd847&tokenNameB=5243434e',
    }
  },
  tortol: {
    starred: false,
    token_name: 'Tortol',
    ticker: '$TRTL',
    type: ['Meme', 'Token', 'NFT'],
    slogan: '',
    desc: "The Turtle Syndicate - an exciting new NFT project that brings the magic of the " +
      " Turtle verse to life in the world of Cardano. $TORTOL is the native asset for this NFT project.",
    aaid_link: '/aaid/tortol',
    logo: '/dao-images/tortol.png',
    supply: 356000000000,
    policy: '52162581184a457fad70470161179c5766f00237d4b67e0f1df1b4e6',
    policy_full: '52162581184a457fad70470161179c5766f00237d4b67e0f1df1b4e65452544c',
    taptools_id: ada + 'ccd6ccf11c5eab6a9964bc9a080a506342a4bb037209e100f0be238da7495a9c',
    gov_wallet: '',
    links: {
      twitter: 'https://twitter.com/TortolToken',
      discord: '',
      website: 'https://www.theturtlesyndicate.xyz/',
      buy_now: 'https://app.minswap.org/swap?currencySymbolA=&tokenNameA=&currencySymbolB=52162581184a457fad70470161179c5766f00237d4b67e0f1df1b4e6&tokenNameB=5452544c',
    },
    team: {
      0: [
        'Am_Panic TTS',
        'https://pbs.twimg.com/profile_images/1641148415332450310/iD0PbCgV_400x400.jpg',
        'https://twitter.com/am__panic',
        '$TORTOL'
      ],
    }
  }
};

module.exports = {
  DAO_SUPPORTED_ITEMS,
  ada,
};

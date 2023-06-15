
// formatted_prices is defined from launchpad.js
export function daoItems(formatted_prices)
{
  const items =
  [
    {
      title: 'Froggie Koin',
      ticker: '$FROGGIE',
      category: 'MEME',
      description: 'Froggie is here for everyone.',
      logo: '/token-images/froggie.png',
      page: '/tokens/froggie',
      ready: true,
      price: formatted_prices.froggie,
      buy_link: 'https://app.minswap.org/swap?currencySymbolA=&tokenNameA=&currencySymbolB=79906b9c8d2fbddeba9658387a2a1187f3edd8f546e5dc49225710a1&tokenNameB=46524f47474945'
    },
    {
      title: 'Turtle Token',
      ticker: '$TURTL',
      category: 'Utility',
      description: 'Inspiring trust in TurtleDAO verified projects.',
      page: '/tokens/turtle',
      price: formatted_prices.turtle,
      ready: true,
      logo: '/token-images/turtl.png',
      buy_link: ''
    },
    {
      title: 'AdaKonda Coin',
      ticker: '$KONDA',
      category: 'Meme',
      description: 'To infinity and beyonda!',
      page: '/tokens/konda',
      price: formatted_prices.konda,
      ready: true,
      logo: '/token-images/konda.png',
      buy_link: 'https://app.minswap.org/swap?currencySymbolA=&tokenNameA=&currencySymbolB=501dd5d2fbab6af0a26b1421076ff3afc4d5a34d6b3f9694571116ea&tokenNameB=4b4f4e4441'
    },
    {
      title: 'Catsky Token',
      ticker: '$CATSKY',
      category: 'Meme',
      description: 'Believers in Cardano',
      page: '/tokens/catsky',
      price: formatted_prices.catsky,
      ready: true,
      logo: '/token-images/catsky.png',
      buy_link: 'https://app.minswap.org/swap?currencySymbolA=&tokenNameA=&currencySymbolB=9b426921a21f54600711da0be1a12b026703a9bd8eb9848d08c9d921&tokenNameB=434154534b59'
    },
    {
      title: 'Racoon Club',
      ticker: '$RCCN',
      category: 'Meme + Game',
      description: 'The first 3D/VR Website in Cardano',
      page: '/tokens/rccn',
      price: formatted_prices.rccn,
      ready: true,
      logo: '/token-images/rccn.png',
      buy_link: 'https://app.minswap.org/swap?currencySymbolA=&tokenNameA=&currencySymbolB=a3e9d397a62992efd2bb54c954b59044948f11f4e14b28add5ebd847&tokenNameB=5243434e'
    },
  ]

  return items;
}

const belongs_to_str = 'This wallet belongs to ';

const knownAddresses = {
  turtledao: {
    name: 'TurtleDAO',
    addr: 'addr1qywhrwe3vufpf66n7w9ld42ths6j6j53swv9agpt3pd0u409hz67cj83lhuhgvvtu97jd3fyswqu80g0s3uuawen7kmqv4w2sg',
    links: {
      twitter: 'https://twitter.com/_turtledao',
      website: 'https://turtledao.vercel.app/',
    },
    str: belongs_to_str + 'The TurtleDAO Platform',
  },
  froggie: {
    name: '$FROGGIE Governance',
    addr: 'addr1qxd8t43gnpjz3r8p3at27xh4gjcv4dxjnn42hywgu3kmaqghluyj4ps4xddymym86xlfe2sndcymk76gv88uccaq0rrq52rrhy',
    links: {
      twitter: 'https://twitter.com/froggio_',
      website: 'https://froggies.vercel.app/',
    },
    str: belongs_to_str + 'The Master Froggie',
  },
  minswap: {
    name: 'Minswap Dex',
    addr: 'addr1zxn9efv2f6w82hagxqtn62ju4m293tqvw0uhmdl64ch8uw6j2c79gy9l76sdg0xwhd7r0c0kna0tycz4y5s6mlenh8pq6s3z70',
    links: {
      twitter: 'https://twitter.com/MinswapDEX',
      website: 'https://minswap.org/',
    },
    str: belongs_to_str + 'The Minswap Dex',
  }
}

module.exports = {
  knownAddresses,
};

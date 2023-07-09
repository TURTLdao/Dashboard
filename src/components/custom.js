
import { styled, Card
} from '@mui/material';

// Typically used with a cover for an address/policy or supported page
const AvatarWrapper = styled(Card)(
  ({ theme }) => `
    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(4)};
    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

// Typically used with a cover for an address/policy or supported page
const ProfilerWrapper = styled(Card)(
  ({ theme }) => `
    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(1)};
    .MuiAvatar-root {
      width: ${theme.spacing(3)};
      height: ${theme.spacing(3)};
    }
`
);

// Typically used with a cover for an address/policy or supported page
const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;
    justify-content: center;
    align-items: center;
    width: ${theme.spacing('75%')};
    .MuiCardMedia-root {
      height: ${theme.spacing(18)};
    }
`);

const TableIconWrapper = styled(Card)(
  ({ theme }) => `
    position: relative;
    overflow: visible;
    display: inline-block;
    .MuiAvatar-root {
      width: ${theme.spacing(5)};
      height: ${theme.spacing(5)};
    }
`
);

const NftIconWrapper = styled(Card)(
  ({ theme }) => `
    position: relative;
    display: inline-block;
    .MuiAvatar-root {
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
    }
`
);

// used in tables
const VerifiedIconWrapper = styled(Card)(
  ({ theme }) => `
    position: relative;
    overflow: visible;
    display: inline-block;
    margin-left: -${theme.spacing(1)};
    .MuiAvatar-root {
      width: ${theme.spacing(2)};
      height: ${theme.spacing(2)};
    }
`
);

// used in profiles
const LargerVerifiedIconWrapper = styled(Card)(
  ({ theme }) => `
    position: relative;
    overflow: visible;
    display: inline-block;
    margin-left: -${theme.spacing(1.5)};
    .MuiAvatar-root {
      width: ${theme.spacing(3)};
      height: ${theme.spacing(3)};
    }
`
);

const StatCard = styled(Card)(
  ({ theme }) => `
    position: relative;
    overflow: visible;
    display: inline-block;
    margin: ${theme.spacing(1)};
    .MuiAvatar-root {
      width: ${theme.spacing(13)};
      height: ${theme.spacing(13)};
    }
`
);

module.exports = {
  AvatarWrapper,
  ProfilerWrapper,
  CardCover,
  TableIconWrapper,
  VerifiedIconWrapper,
  LargerVerifiedIconWrapper,
  NftIconWrapper,
  StatCard
};

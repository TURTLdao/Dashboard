import { SvgIcon } from '@mui/material';

// https://mui.com/material-ui/material-icons/?query=
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DrawIcon from '@mui/icons-material/Draw';
import ArticleIcon from '@mui/icons-material/Article';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CategoryIcon from '@mui/icons-material/Category';

export const items = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: (
      <SvgIcon fontSize="small">
        <DashboardIcon />
      </SvgIcon>
    )
  },
  {
    title: 'AAID',
    path: '/launchpad',
    icon: (
      <SvgIcon fontSize="small">
        <RocketLaunchIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Discover NFTs',
    path: '/nft',
    icon: (
      <SvgIcon fontSize="small">
        <DrawIcon />
      </SvgIcon>
    )
  }
];

export const items2 = [
  {
    title: 'Watchlist',
    path: '/',
    disabled: true,
    icon: (
      <SvgIcon fontSize="small">
        <VisibilityIcon />
      </SvgIcon>
    )
  },
  {
    title: 'DEX',
    path: '/',
    disabled: true,
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingCartIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Earn',
    path: '/',
    disabled: true,
    icon: (
      <SvgIcon fontSize="small">
        <StackedLineChartIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Learning Centre',
    path: '/',
    disabled: true,
    icon: (
      <SvgIcon fontSize="small">
        <MenuBookIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Resources',
    path: '/',
    disabled: true,
    icon: (
      <SvgIcon fontSize="small">
        <CategoryIcon />
      </SvgIcon>
    )
  }
];

export const items3 = [
  {
    title: 'Docs',
    path: 'https://turtle-docs.vercel.app/',
    icon: (
      <SvgIcon fontSize="small">
        <ArticleIcon />
      </SvgIcon>
    )
  }
];

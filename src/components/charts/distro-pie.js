import PropTypes from 'prop-types';
import ComputerDesktopIcon from '@heroicons/react/24/solid/ComputerDesktopIcon';
import DeviceTabletIcon from '@heroicons/react/24/solid/DeviceTabletIcon';
import PhoneIcon from '@heroicons/react/24/solid/PhoneIcon';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  SvgIcon,
  Typography,
  useTheme
} from '@mui/material';
import { Chart } from 'src/components/chart';
import SavingsIcon from '@mui/icons-material/Savings';
import PaymentsIcon from '@mui/icons-material/Payments';
import { Scrollbar } from 'src/components/scrollbar';


import { createTheme, ThemeProvider } from '@mui/material/styles';

const useChartOptions = (labels) => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent'
    },
    colors: [
      "#4CAF50",
      "#1d1d1d",
      "#3d3d3d",
      "#5d5d5d",
      "#7d7d7d",
      "#9d9d9d"
    ],
    dataLabels: {
      enabled: false
    },
    labels,
    legend: {
      show: false
    },
    plotOptions: {
      pie: {
        expandOnClick: false
      }
    },
    states: {
      active: {
        filter: {
          type: 'none'
        }
      },
      hover: {
        filter: {
          type: 'none'
        }
      }
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    },
    tooltip: {
      fillSeriesColor: false
    }
  };
};

const iconMap = {
  Banked: (
    <SvgIcon>
      <SavingsIcon  />
    </SvgIcon>
  ),
  Unbanked: (
    <SvgIcon>
      <PaymentsIcon  />
    </SvgIcon>
  )
};

export const Pie = (props) => {
  const { chartSeries, labels, sx } = props;
  const chartOptions = useChartOptions(labels);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#4CAF50"
      }
    }
  });
  const bg = 'https://raw.githubusercontent.com/TURTLdao/TURTL-images/main/dao-bg.svg';

  return (
  <ThemeProvider theme={theme}>
    <Card sx={{
        border: "2px solid #4CAF50",
        backgroundImage: `url(${bg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    }}>
      
      <CardHeader sx={{ color: "primary.main" }} title="Token Distribution" />
      <Scrollbar
        sx={{
          height: 500,
            '& .simplebar-content': {
              height: '100%',
              width: '100%'
            },
            '& .simplebar-scrollbar:before': {
              background: 'neutral.400'
            }
        }}>

      <CardContent sx={{  }}>
        <Chart
          height={300}
          options={chartOptions}
          series={chartSeries}
          type="donut"
          width="100%"
        />
        <Stack
          alignItems="center"
          direction="column"
          justifyContent="center"
          spacing={2}
          sx={{ mt: 2 }}
        >
          {chartSeries.map((item, index) => {
            const label = labels[index];

            return (      
      
              <Box
                key={label}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: 300,
                }}
              ><Scrollbar
              sx={{
                height: '100%',
                  '& .simplebar-content': {
                    height: '100%',
                    width: '100%'
                  },
                  '& .simplebar-scrollbar:before': {
                    background: 'neutral.400'
                  }
              }}>
                {iconMap[label]}
                <Typography
                  sx={{ my: 1, fontWeight: 'bold' }}
                  variant="h6"
                  color="primary.main"
                  align='center'
                >
                  {label}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color={'white'}
                  align='center'
                >
                  {item}%
                </Typography>
              </Scrollbar>
              </Box>
            );
          })}
        </Stack>
      </CardContent></Scrollbar>
    </Card></ThemeProvider>
  );
};

Pie.propTypes = {
  chartSeries: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  sx: PropTypes.object
};

import { Card, Grid, useTheme } from '@mui/material';
import TradingViewWidget from 'src/components/Chart/tv-widget'

function TradingViewChart() {
  const theme = useTheme()
    
  return (
    <Card variant="outlined" sx={{mb: 4}} >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={0}
      >
        <Grid item xs={12}>
          <div style={{ maxHeight: 500}}>
            <TradingViewWidget/>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
}

export default TradingViewChart;

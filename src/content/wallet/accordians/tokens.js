
import PropTypes from 'prop-types';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Divider, Card,
  Button, useTheme, Tooltip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import PushPinIcon from '@mui/icons-material/PushPin';

export function TokenAccordian({ data, selectedFiat, assets  }) {
  const theme = useTheme();
  
  const supported_policies = [
    '787a6798527b21ad0e0f62c021b4ce036513a2d3342b5cb519d2ca19', // Platypus Cyberpunks
    '263eb3e3c980c15305f393dc7a2f6289ba12732b6636efe46d6e2c16', // The Turtle Syndicate
    '3929accff4dcfe4e0b2e24798e97d9a7d99d20f011c3b3668965d2da', // Racoons Club
    'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a', // $adahandle
    '', // nfts above, tokens below
    '79906b9c8d2fbddeba9658387a2a1187f3edd8f546e5dc49225710a1', // Froggie Koin  $FROGGIE
    '9b426921a21f54600711da0be1a12b026703a9bd8eb9848d08c9d921', // Catsky Token  $CATSKY
    'a3e9d397a62992efd2bb54c954b59044948f11f4e14b28add5ebd847', // Raccons Club  $RCCN
    '501dd5d2fbab6af0a26b1421076ff3afc4d5a34d6b3f9694571116ea', // AdaKonda Coin $KONDA
    '52162581184a457fad70470161179c5766f00237d4b67e0f1df1b4e6', // Tortol $TRTL
    '',
  ]
  
  function calculateTotalValue(fiatCurrency) {
    let totalValue = 0;
  
    assets.forEach((asset) => {
      const marketData = getMarketData(asset.assetName);
      if (marketData) {
        let price;
        if (fiatCurrency === 'ADA') {
          price = marketData.price * asset.quantity;
        } else if (fiatCurrency === 'GBP') {
          price = marketData.price * asset.quantity * data.fiat[1];
        } else if (fiatCurrency === 'EUR') {
          price = marketData.price * asset.quantity * data.fiat[2];
        } else {
          price = marketData.price * asset.quantity * data.fiat[0];
        }
        totalValue += price;
      }
    });
    return totalValue;
  }

  function getMarketData(assetName) {
    const marketData = {
      FROGGIE: data.froggie_data,
      CATSKY: data.catsky_data,
      KONDA: data.konda_data,
      RCCN: data.rccn_data,
      TRTL: data.tortol_data,
    };
    return marketData[assetName];
  }
  
  
  return (
    <>
    {/* Accordions for Token assets */}
    <Accordion>

    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="ttsturtle-panel-content"
      id="ttsturtle-panel-header"
    >
      <Typography align='center'>
        <Tooltip placement='top' title='Tokens are pinned to the top.'>
          <PushPinIcon fontSize="inherit" sx={{ marginRight: '0.5rem' }} />
        </Tooltip>
        Tokens
      </Typography>
    </AccordionSummary>

    <AccordionDetails>
      <Typography align='center' sx={{ my: 2 }} variant="h4">
        Cardano Value: ₳ {(calculateTotalValue('ADA')).toFixed(5)} {' / '}

        {selectedFiat === 'GBP' && (
          <b>Fiat Value: £ {calculateTotalValue('GBP').toFixed(2)}</b>
        )}
        {selectedFiat === 'EUR' && (
          <b>Fiat Value: € {calculateTotalValue('EUR').toFixed(2)}</b>
        )}
        {selectedFiat === 'USD' && (
          <b>Fiat Value: $ {calculateTotalValue('USD').toFixed(2)}</b>
        )}
      </Typography>
      <Divider/>

      <Grid container spacing={2}>
      {
      assets
      .filter(asset => supported_policies.includes(asset.policyId))
      .sort((a, b) => {
        if (a.assetName === 'FROGGIE') return -1; // Move 'FROGGIE' to the front
        if (b.assetName === 'FROGGIE') return 1; // Move 'FROGGIE' to the front
        return 0;
      })
      .map((asset, i) => {
        const match = !asset.assetName.match(/(\D+)(\d+$)/);
        if (match && supported_policies.includes(asset.policyId)) {

          const market_data = {
            FROGGIE: {
              price: data.froggie_data.price,
              website: data.froggie_data.website,
              buy_link: data.froggie_data.buy_link,
              aaid: data.froggie_data.aaid,
            },
            CATSKY: {
              price: data.catsky_data.price,
              website: data.catsky_data.website,
              buy_link: data.catsky_data.buy_link,
              aaid: data.catsky_data.aaid,
            },
            KONDA: {
              price: data.konda_data.price,
              website: data.konda_data.website,
              buy_link: data.konda_data.buy_link,
              aaid: data.konda_data.aaid,
            },
            RCCN: {
              price: data.rccn_data.price,
              website: data.rccn_data.website,
              buy_link: data.rccn_data.buy_link,
              aaid: data.rccn_data.aaid,
            },
            TRTL: {
              price: data.tortol_data.price,
              website: data.tortol_data.website,
              buy_link: data.tortol_data.buy_link,
              aaid: data.tortol_data.aaid,
            },
          };

          if (!market_data.hasOwnProperty(asset.assetName)) {
            return null;
          }

          const marketData = market_data[asset.assetName];

          return (
            <Grid item xs={12} sm={6} key={i}>
            <Card sx={{ minHeight: 120, my: 2 }} variant="outlined">
              <Typography align="center" variant="h4" sx={{ mt: 2, color: 'rgb(76, 175, 80)' }}>
                ${asset.assetName}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography align='center' sx={{ mx: 2 }}>
                <b>Hodling</b>
                
              </Typography>
              <Typography sx={{ mx: 2 }}>
                <b>${asset.assetName + ': '}</b> {Number(asset.quantity).toLocaleString()}
              </Typography>

              <Divider sx={{ my: 2 }} />
              
              {
                marketData ? (
                  <>
                    <Typography align='center' variant="h4" sx={{ mx: 2 }}>
                      Asset Value
                    </Typography>

                    <Typography sx={{ mx: 2 }}>
                      <b>ADA: </b>₳ {(marketData.price * asset.quantity).toFixed(5)}
                    </Typography>
                    
                    {
                      selectedFiat === 'GBP' && (
                        <Typography sx={{ mx: 2 }}>
                          <b>GBP: </b>£{(marketData.price * asset.quantity * data.fiat[1]).toFixed(2)}
                        </Typography>
                      )
                    }
                    {
                      selectedFiat === 'EUR' && (
                        <Typography sx={{ mx: 2 }}>
                          <b>EUR: </b>€{(marketData.price * asset.quantity * data.fiat[2]).toFixed(2)}
                        </Typography>
                      )
                    }
                    {
                      selectedFiat === 'USD' && (
                        <Typography sx={{ mx: 2 }}>
                          <b>USD: </b>${(marketData.price * asset.quantity * data.fiat[0]).toFixed(2)}
                        </Typography>
                      )
                    }

                    <Divider sx={{ my: 2 }} />

                    <div align='center' style={{ marginBottom: 10 }}>
                      {
                        marketData.website ? (
                          <Button variant="outline" href={marketData.website} target="_blank">
                            Website
                          </Button>
                        ) : null
                      }

                      {
                        marketData.buy_link ? (
                          <Button variant="outline" href={marketData.buy_link} target="_blank">
                            Buy Now
                          </Button>
                        ) : null
                      }
                    </div>

                    <div align='center'>
                      {
                        marketData.aaid ? (
                          <Button
                            sx={{ mb: 2, width: '80%' }}
                            variant="outlined"
                            href={marketData.aaid}
                            passHref
                            endIcon={<CheckIcon />}
                          >
                            DAO Supported
                          </Button>
                        ) : null
                      }
                    </div>
                  </>
                ) : null
              }
            </Card>
            </Grid>
          );
        }

        return null;
      })}

      <Divider sx={{ my: 2 }} />
      </Grid>
    </AccordionDetails>
  </Accordion>
    </>
  );
}

TokenAccordian.propTypes = {
  // @ts-ignore
  data: PropTypes.object.isRequired,
  selectedFiat: PropTypes.string.isRequired,
  assets: PropTypes.array.isRequired,
};

import { useRef, useState } from 'react';
import { Button, Card, Grid, Box, FormControl, Typography, InputLabel, Select,
  Divider, useTheme, CardHeader, MenuItem
} from '@mui/material';

import PropTypes from 'prop-types';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';

import { useAssets, useWallet } from '@meshsdk/react';

function AssetView({ data }) {
  const theme = useTheme();
  const { connected } = useWallet();
  const assets = useAssets();

  const platy_policy = '787a6798527b21ad0e0f62c021b4ce036513a2d3342b5cb519d2ca19';

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
  
  const [selectedFiat, setSelectedFiat] = useState('USD');

  const fiat_options = [
    { id: 'USD', price: '$ USD' },
    { id: 'GBP', price: '£ GBP' },
    { id: 'EUR', price: '€ EUR' },
  ];

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
  

  console.log(data)

  return (
    <>
      <Grid container spacing={3}
        py={3}
      >
        {
          !connected ? 
          <Grid container spacing={3}
            py={3}
          >
          <Grid item xs={12} md={12}>
            <Card
              variant="outlined"
              sx={{
                p: 3,
                background: `${theme.colors.alpha.black[5]}`
              }}
            >
            <Typography variant='h2' align='center'>
              Please Connect Wallet...
            </Typography>
            </Card>
          </Grid>
          </Grid>
          : null
        }

        {
          connected ? 
          <Grid container spacing={3}
            py={3}
          >
            { /* Left Card*/ }
            <Grid item xs={12} md={6}>
              <Card
                variant="outlined"
                sx={{
                  p: 3,
                  background: `${theme.colors.alpha.black[5]}`
                }}
              >
              <CardHeader
                action={
                  <div>
                    <Box width={150}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Sort By</InputLabel>
                          <Select
                            label="Fiat View"
                            autoWidth
                            value={selectedFiat}
                            onChange={(event) => setSelectedFiat(event.target.value)}
                          >
                            {
                              fiat_options.map((fiat_option) => (
                                <MenuItem key={fiat_option.id} value={fiat_option.id}>
                                  {fiat_option.price}
                                </MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                    </Box>
                  </div>
                }
                title="Supported"
              />

              {
                assets && (
                <>
                  {/* Accordions for Token assets */}
                  <Accordion>

                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="ttsturtle-panel-content"
                    id="ttsturtle-panel-header"
                  >
                    <Typography align='center'>
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
                            <Typography align="center" variant="h4" sx={{ mt: 2 }}>
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
                                  <Typography align='center'  variant="h4" sx={{ mx: 2 }}>
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

                  {/* Accordions for TTSTurtle assets */}
                  {assets.filter(asset => asset.assetName.includes('TTSTurtle')).length > 0 && (
                  <Accordion>

                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="ttsturtle-panel-content"
                    id="ttsturtle-panel-header"
                  >
                    <Typography align='center'>
                      Platypus Cyberpunks (x{assets.filter(asset => asset.policyId.includes('787a6798527b21ad0e0f62c021b4ce036513a2d3342b5cb519d2ca19')).length})
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <ul>
                      <Typography variant='h4' align='center'>
                        Owned Assets
                      </Typography>

                      {assets.map((asset, i) => {
                        if (asset.policyId.includes(platy_policy)) {
                          let formattedAssetName = 'Platypus Cyberpunks #' + asset.assetName.slice(-4);

                          return (
                            <div>
                              <Typography variant='body2' align='center'>
                                {formattedAssetName}
                              </Typography>
                            </div>
                          );
                        } else {
                          return null;
                        }
                      })}

                      <Divider sx={{ my: 2 }} />

                      <Typography variant='h4' align='center'>
                        Floor Price
                      </Typography>
                      
                      <Typography variant='body2' align='center'>
                        ₳ {data.platypus_data.floor_price} {' / '}
                        {
                          selectedFiat === 'GBP' && (
                            <>£ {Number(data.platypus_data.gbp_price).toFixed(2)}</>
                          )
                        }
                        {
                          selectedFiat === 'EUR' && (
                            <>€ {Number(data.platypus_data.eur_price).toFixed(2)}</>
                          )
                        }
                        {
                          selectedFiat === 'USD' && (
                            <>$ {Number(data.platypus_data.usd_price).toFixed(2)}</>
                          )
                        }
                      </Typography>
                      
                      <Typography variant='h4' align='center' sx={{ mt: 2}}>
                        Wallet Value
                      </Typography>
                      
                      <Typography variant='body2' align='center'>
                        ₳ {data.platypus_data.floor_price * assets.filter(asset => asset.policyId.includes(platy_policy)).length} {' / '}
                        {
                          selectedFiat === 'GBP' && (
                            <>£ {Number(data.platypus_data.gbp_price * assets.filter(asset => asset.policyId.includes(platy_policy)).length).toFixed(2)} {' / '}</>
                          )
                        }
                        {
                          selectedFiat === 'EUR' && (
                            <>€ {Number(data.platypus_data.eur_price * assets.filter(asset => asset.policyId.includes(platy_policy)).length).toFixed(2)} {' / '}</>
                          )
                        }
                        {
                          selectedFiat === 'USD' && (
                            <>$ {Number(data.platypus_data.usd_price * assets.filter(asset => asset.policyId.includes(platy_policy)).length).toFixed(2)}</>
                          )
                        }
                      </Typography>

                      {}

                      <Divider sx={{ my: 2 }} />

                      <div align='center'>
                        <img
                          src={data.platypus_data.logo}
                          style={{margin: 4, width: 100, height: 100}}
                        />
                      </div>
                      
                      <div align='center' style={{marginBottom: 10}}>
                        <Button variant='outline' href='https://platypuscyberpunks.com/' target='_blank'>
                          Website
                        </Button>

                        <Button variant='outline' href='https://www.jpg.store/collection/platypus?tab=items' target='_blank'>
                          Buy Now
                        </Button>

                        <Button variant='outline' href='https://saturnnft.io/mint/3f364710-1941-4e08-8339-f71c4dd60cef' target='_blank'>
                          Mint
                        </Button>
                      </div>

                    </ul>
                  </AccordionDetails>
                </Accordion>
                )}

                  {/* Accordions for adahandle assets */}
                  {assets.filter(asset => asset.policyId.includes('f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a')).length > 0 && (
                  <Accordion>

                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="ttsturtle-panel-content"
                    id="ttsturtle-panel-header"
                  >
                    <Typography align='center'>
                      $adahandle (x{assets.filter(asset => asset.policyId.includes('f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a')).length})
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <ul>
                      <Typography variant='h4' align='center'>
                        Owned Assets
                      </Typography>

                      {assets.map((asset, i) => {
                        if (asset.policyId.includes('f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a')) {
                          return (
                            <div>
                              <Typography variant='body2' align='center'>
                                {asset.assetName}
                              </Typography>
                            </div>
                          );
                        } else {
                          return null;
                        }
                      })}

                      <Divider sx={{ my: 2 }} />

                      <Typography variant='h4' align='center'>
                        Floor Price
                      </Typography>
                      
                      <Typography variant='body2' align='center'>
                        ₳ {data.adahandle_data.floor_price} {' / '}
                        {
                          selectedFiat === 'GBP' && (
                            <>£ {Number(data.adahandle_data.gbp_price).toFixed(2)}</>
                          )
                        }
                        {
                          selectedFiat === 'EUR' && (
                            <>€ {Number(data.adahandle_data.eur_price).toFixed(2)}</>
                          )
                        }
                        {
                          selectedFiat === 'USD' && (
                            <>$ {Number(data.adahandle_data.usd_price).toFixed(2)}</>
                          )
                        }
                      </Typography>
                      
                      <Typography variant='h4' align='center' sx={{ mt: 2}}>
                        Wallet Value
                      </Typography>
                      
                      <Typography variant='body2' align='center'>
                        ₳ {data.adahandle_data.floor_price * assets.filter(asset => asset.policyId.includes(platy_policy)).length} {' / '}
                        {
                          selectedFiat === 'GBP' && (
                            <>£ {Number(data.adahandle_data.gbp_price * assets.filter(asset => asset.policyId.includes(platy_policy)).length).toFixed(2)} {' / '}</>
                          )
                        }
                        {
                          selectedFiat === 'EUR' && (
                            <>€ {Number(data.adahandle_data.eur_price * assets.filter(asset => asset.policyId.includes(platy_policy)).length).toFixed(2)} {' / '}</>
                          )
                        }
                        {
                          selectedFiat === 'USD' && (
                            <>$ {Number(data.adahandle_data.usd_price * assets.filter(asset => asset.policyId.includes(platy_policy)).length).toFixed(2)}</>
                          )
                        }
                      </Typography>

                      {}
                      <Divider sx={{ my: 2 }} />

                      <div align='center'>
                        <img
                          src={data.adahandle_data.logo}
                          style={{margin: 4, width: 100, height: 100}}
                        />
                      </div>

                    </ul>
                  </AccordionDetails>
                </Accordion>
                )}

                  {/* Accordions for TTSTurtle assets */}
                  {assets.filter(asset => asset.assetName.includes('TTSTurtle')).length > 0 && (
                  <Accordion>

                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="ttsturtle-panel-content"
                    id="ttsturtle-panel-header"
                  >
                    <Typography align='center'>
                      The Turtle Syndicate (x{assets.filter(asset => asset.assetName.includes('TTSTurtle')).length})
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <ul>
                      <Typography variant='h4' align='center'>
                        Owned Assets
                      </Typography>

                      {assets.map((asset, i) => {
                        if (asset.assetName.includes('TTSTurtle')) {
                          let formattedAssetName = 'The Turtle Syndicate #' + asset.assetName.slice(10);

                          return (
                            <div>
                              <Typography variant='body2' align='center'>
                                {formattedAssetName}
                              </Typography>
                            </div>
                          );
                        } else {
                          return null;
                        }
                      })}

                      <Divider sx={{ my: 2 }} />

                      <Typography variant='h4' align='center'>
                        Floor Price
                      </Typography>
                      
                      <Typography variant='body2' align='center'>
                        ₳ {data.ttsturtle_data.floor_price} {' / '}
                        {
                          selectedFiat === 'GBP' && (
                            <>£ {Number(data.ttsturtle_data.gbp_price).toFixed(2)}</>
                          )
                        }
                        {
                          selectedFiat === 'EUR' && (
                            <>€ {Number(data.ttsturtle_data.eur_price).toFixed(2)}</>
                          )
                        }
                        {
                          selectedFiat === 'USD' && (
                            <>$ {Number(data.ttsturtle_data.usd_price).toFixed(2)}</>
                          )
                        }
                      </Typography>
                      
                      <Typography variant='h4' align='center' sx={{ mt: 2}}>
                        Wallet Value
                      </Typography>
                      
                      <Typography variant='body2' align='center'>
                        ₳ {data.ttsturtle_data.floor_price * assets.filter(asset => asset.policyId.includes(platy_policy)).length} {' / '}
                        {
                          selectedFiat === 'GBP' && (
                            <>£ {Number(data.ttsturtle_data.gbp_price * assets.filter(asset => asset.policyId.includes(platy_policy)).length).toFixed(2)} {' / '}</>
                          )
                        }
                        {
                          selectedFiat === 'EUR' && (
                            <>€ {Number(data.ttsturtle_data.eur_price * assets.filter(asset => asset.policyId.includes(platy_policy)).length).toFixed(2)} {' / '}</>
                          )
                        }
                        {
                          selectedFiat === 'USD' && (
                            <>$ {Number(data.ttsturtle_data.usd_price * assets.filter(asset => asset.policyId.includes(platy_policy)).length).toFixed(2)}</>
                          )
                        }
                      </Typography>

                      {}
                      <Divider sx={{ my: 2 }} />

                      <div align='center'>
                        <img
                          src={data.ttsturtle_data.logo}
                          style={{margin: 4, width: 100, height: 100}}
                        />
                      </div>

                    </ul>
                  </AccordionDetails>
                </Accordion>
                )}


                {/* Accordions for RacoonsNew assets */}
                {assets.filter(asset => asset.assetName.includes('RacoonsNew')).length > 0 && (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="other-assets-panel-content"
                    id="other-assets-panel-header"
                  >
                    <Typography>
                      Racoons Club Main Series (x{assets.filter(asset => asset.assetName.includes('RacoonsNew')).length})
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <ul>
                      <Typography variant='h4' align='center'>
                        Owned Assets
                      </Typography>

                      {assets.map((asset, i) => {
                        
                        if (asset.assetName.includes('RacoonsNew')) {
                          let formattedAssetName = 'Racoons Club Main Series #' + asset.assetName.slice(10);

                          return (
                            <div>
                              <Typography variant='body2' align='center'>
                                {formattedAssetName}
                              </Typography>
                            </div>
                          );
                        } else {
                          return null;
                        }
                      })}

                      <Divider sx={{ my: 2 }} />

                      <Typography variant='h4' align='center'>
                        Floor Price
                      </Typography>
                      
                      <Typography variant='body2' align='center'>
                        ₳ {data.racoonsclub_data.floor_price} {' / '}
                        {
                          selectedFiat === 'GBP' && (
                            <>£ {Number(data.racoonsclub_data.gbp_price).toFixed(2)}</>
                          )
                        }
                        {
                          selectedFiat === 'EUR' && (
                            <>€ {Number(data.racoonsclub_data.eur_price).toFixed(2)}</>
                          )
                        }
                        {
                          selectedFiat === 'USD' && (
                            <>$ {Number(data.racoonsclub_data.usd_price).toFixed(2)}</>
                          )
                        }
                      </Typography>
                      
                      <Typography variant='h4' align='center' sx={{ mt: 2}}>
                        Wallet Value
                      </Typography>
                      
                      <Typography variant='body2' align='center'>
                        ₳ {data.racoonsclub_data.floor_price * assets.filter(asset => asset.policyId.includes(platy_policy)).length} {' / '}
                        {
                          selectedFiat === 'GBP' && (
                            <>£ {Number(data.racoonsclub_data.gbp_price * assets.filter(asset => asset.policyId.includes(platy_policy)).length).toFixed(2)} {' / '}</>
                          )
                        }
                        {
                          selectedFiat === 'EUR' && (
                            <>€ {Number(data.racoonsclub_data.eur_price * assets.filter(asset => asset.policyId.includes(platy_policy)).length).toFixed(2)} {' / '}</>
                          )
                        }
                        {
                          selectedFiat === 'USD' && (
                            <>$ {Number(data.racoonsclub_data.usd_price * assets.filter(asset => asset.policyId.includes(platy_policy)).length).toFixed(2)}</>
                          )
                        }
                      </Typography>

                      {}

                      <Divider sx={{ my: 2 }} />

                      <div align='center'>
                        <img
                          src={data.racoonsclub_data.logo}
                          style={{margin: 4, width: 100, height: 100}}
                        />
                      </div>

                    </ul>
                  </AccordionDetails>
                </Accordion>
                )}

              </>
            )
          }
          </Card>
        </Grid>
        
        { /* Right Card*/ }
        <Grid item xs={12} md={6}>
          <Card
                variant="outlined"
                sx={{
                  p: 3,
                  background: `${theme.colors.alpha.black[5]}`
                }}
              >
                <CardHeader title='Unsupported Yet'/>
              {
                
                assets && (
                <>
                {/* Accordions for Other assets */}
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="other-assets-panel-content"
                    id="other-assets-panel-header"
                  >
                    <Typography>
                      Other Assets
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul>
                      {assets.map((asset, i) => {
                        if (!supported_policies.includes(asset.policyId)) {
                          return (
                            <li key={i}>
                              <Typography variant='h4'>{asset.assetName}</Typography>
                              <Typography>(x{asset.quantity})</Typography>
                            </li>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </ul>
                  </AccordionDetails>
                </Accordion>
              </>
            )
          }
          </Card>

        </Grid>
      </Grid>
      : null
        }

      </Grid>
    </>
  );
}

AssetView.propTypes = {
  // @ts-ignore
  data: PropTypes.object.isRequired,
};

export default AssetView;

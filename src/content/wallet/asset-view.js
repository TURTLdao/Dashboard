import { useRef, useState } from 'react';
import { Button, Card, Grid, ListItemIcon, FormControl, CardActions, Typography,
  Divider, OutlinedInput, Chip, InputAdornment, styled, useTheme, Avatar, CardHeader
} from '@mui/material';
import Link from 'src/components/Link';
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
    '',
  ]

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
              <CardHeader title='Supported'/>
              {
                assets && (
                <>
                  {/* Accordions for TTSTurtle assets */}
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
                    <ul>
                      {assets
                      .filter(asset => supported_policies.includes(asset.policyId))
                      .sort((a, b) => {
                        if (a.assetName === 'FROGGIE') return -1; // Move 'FROGGIE' to the front
                        if (b.assetName === 'FROGGIE') return 1; // Move 'FROGGIE' to the front
                        return 0;
                      })
                      .map((asset, i) => {
                        if (supported_policies.includes(asset.policyId)) {
                          const match = !asset.assetName.match(/(\D+)(\d+$)/);
                          if (match) {
                            let market_data = { price: 0, website: '', buy_link: '', aaid: '', }

                            if (asset.assetName === 'FROGGIE') {
                              market_data.price = data.froggie_data.price
                              market_data.website = data.froggie_data.website
                              market_data.buy_link = data.froggie_data.buy_link
                              market_data.aaid = data.froggie_data.aaid
                            }

                            if (asset.assetName === 'CATSKY') {
                              market_data.price = data.catsky_data.price
                              market_data.website = data.catsky_data.website
                              market_data.buy_link = data.catsky_data.buy_link
                              market_data.aaid = data.catsky_data.aaid
                            }

                            if (asset.assetName === 'KONDA') {
                              market_data.price = data.konda_data.price
                              market_data.website = data.konda_data.website
                              market_data.buy_link = data.konda_data.buy_link
                              market_data.aaid = data.konda_data.aaid
                            }

                            if (asset.assetName === 'RCCN') {
                              market_data.price = data.rccn_data.price
                              market_data.website = data.rccn_data.website
                              market_data.buy_link = data.rccn_data.buy_link
                              market_data.aaid = data.rccn_data.aaid
                            }

                            return (
                              <div align='center'>
                              <Card sx={{ minHeight: 120, maxWidth: '75%', my: 2}} 
                                variant="outlined"
                              >
                                <Typography align='center' variant='h4' sx={{mt: 2}}>
                                  ${asset.assetName}
                                </Typography>

                                <Divider sx={{ my: 2 }}/>
                              
                                <Typography sx={{mx: 2}}>
                                  <b>Wallet Amount: </b>{Number(asset.quantity).toLocaleString()}
                                </Typography>

                                <Divider sx={{ my: 2 }}/>
                              
                                {
                                  market_data ? 
                                  <>
                                    <Typography variant='h4' sx={{mx: 2}}>
                                      Asset Value
                                    </Typography>
                                    <Typography sx={{mx: 2}}>
                                    <b>ADA: </b>₳ {Number(market_data.price * asset.quantity).toFixed(5)}
                                    </Typography>
                                    <Typography sx={{mx: 2}}>
                                    <b>GBP: </b>£{(market_data.price * asset.quantity * data.fiat[1]).toFixed(2)}
                                    </Typography>
                                    <Typography sx={{mx: 2}}>
                                    <b>EUR: </b>€{(market_data.price * asset.quantity * data.fiat[2]).toFixed(2)}
                                    </Typography>
                                    <Typography sx={{mx: 2, mb: 2}}>
                                    <b>USD: </b>${(market_data.price * asset.quantity * data.fiat[0]).toFixed(2)}
                                    </Typography>

                                    <Divider sx={{ my: 2 }}/>

                                    <div style={{marginBottom: 10}}>
                                    {
                                      market_data.website ?
                                      <Button variant='outline' href={market_data.website} target='_blank'>
                                        Website
                                      </Button> : null
                                    }
                                    {
                                      market_data.buy_link ?
                                      <Button variant='outline' href={market_data.buy_link} target='_blank'>
                                        Buy Now
                                      </Button> : null
                                    }
                                    </div>
                                    {
                                      market_data.aaid ?
                                      <Button sx={{ mb: 2 }} variant='outlined' href={market_data.aaid} passHref
                                        endIcon={<CheckIcon />}
                                      >
                                        DAO Supported
                                      </Button> : null
                                    }


                                  </>
                                  : null
                                }
                              </Card>
                              </div>
                            );
                          }
                        }
                      return null;
                    })}

                    <Divider sx={{ my: 2 }} />


                    </ul>
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
                        £ {Number(data.platypus_data.gbp_price).toFixed(2)} {' / '}
                        € {Number(data.platypus_data.eur_price).toFixed(2)} {' / '}
                        $ {Number(data.platypus_data.usd_price).toFixed(2)}
                      </Typography>

                      <Typography variant='h4' align='center' sx={{ mt: 2}}>
                        Wallet Value
                      </Typography>

                      <Typography variant='body2' align='center'>
                        ₳ {data.platypus_data.floor_price * assets.filter(asset => asset.policyId.includes(platy_policy)).length} {' / '}
                        £ {Number(data.platypus_data.gbp_price * assets.filter(asset => asset.policyId.includes(platy_policy)).length).toFixed(2)} {' / '}
                        € {Number(data.platypus_data.eur_price * assets.filter(asset => asset.policyId.includes(platy_policy)).length).toFixed(2)} {' / '}
                        $ {Number(data.platypus_data.usd_price * assets.filter(asset => asset.policyId.includes(platy_policy)).length).toFixed(2)}
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
                        £ {Number(data.adahandle_data.gbp_price).toFixed(2)} {' / '}
                        € {Number(data.adahandle_data.eur_price).toFixed(2)} {' / '}
                        $ {Number(data.adahandle_data.usd_price).toFixed(2)}
                      </Typography>

                      <Typography variant='h4' align='center' sx={{ mt: 2}}>
                        Wallet Value
                      </Typography>

                      <Typography variant='body2' align='center'>
                        ₳ {data.adahandle_data.floor_price * assets.filter(asset => asset.policyId.includes('f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a')).length} {' / '}
                        £ {Number(data.adahandle_data.gbp_price * assets.filter(asset => asset.policyId.includes('f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a')).length).toFixed(2)} {' / '}
                        € {Number(data.adahandle_data.eur_price * assets.filter(asset => asset.policyId.includes('f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a')).length).toFixed(2)} {' / '}
                        $ {Number(data.adahandle_data.usd_price * assets.filter(asset => asset.policyId.includes('f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a')).length).toFixed(2)}
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
                        £ {Number(data.ttsturtle_data.gbp_price).toFixed(2)} {' / '}
                        € {Number(data.ttsturtle_data.eur_price).toFixed(2)} {' / '}
                        $ {Number(data.ttsturtle_data.usd_price).toFixed(2)}
                      </Typography>

                      <Typography variant='h4' align='center' sx={{ mt: 2}}>
                        Wallet Value
                      </Typography>

                      <Typography variant='body2' align='center'>
                        ₳ {data.ttsturtle_data.floor_price * assets.filter(asset => asset.assetName.includes('TTSTurtle')).length} {' / '}
                        £ {Number(data.ttsturtle_data.gbp_price * assets.filter(asset => asset.assetName.includes('TTSTurtle')).length).toFixed(2)} {' / '}
                        € {Number(data.ttsturtle_data.eur_price * assets.filter(asset => asset.assetName.includes('TTSTurtle')).length).toFixed(2)} {' / '}
                        $ {Number(data.ttsturtle_data.usd_price * assets.filter(asset => asset.assetName.includes('TTSTurtle')).length).toFixed(2)}
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
                        £ {Number(data.racoonsclub_data.gbp_price).toFixed(2)} {' / '}
                        € {Number(data.racoonsclub_data.eur_price).toFixed(2)} {' / '}
                        $ {Number(data.racoonsclub_data.usd_price).toFixed(2)}
                      </Typography>

                      <Typography variant='h4' align='center' sx={{ mt: 2}}>
                        Wallet Value
                      </Typography>

                      <Typography variant='body2' align='center'>
                        ₳ {data.racoonsclub_data.floor_price * assets.filter(asset => asset.assetName.includes('RacoonsNew')).length} {' / '}
                        £ {Number(data.racoonsclub_data.gbp_price * assets.filter(asset => asset.assetName.includes('RacoonsNew')).length).toFixed(2)} {' / '}
                        € {Number(data.racoonsclub_data.eur_price * assets.filter(asset => asset.assetName.includes('RacoonsNew')).length).toFixed(2)} {' / '}
                        $ {Number(data.racoonsclub_data.usd_price * assets.filter(asset => asset.assetName.includes('RacoonsNew')).length).toFixed(2)}
                      </Typography>

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

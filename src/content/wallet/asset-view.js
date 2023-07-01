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
import { TokenAccordian } from './accordians/tokens';
import { PlatypusAccordian } from './accordians/nfts/platypus';
import { AdahandleAccordian } from './accordians/nfts/adahandle';
import { TtsturtleAccordian } from './accordians/nfts/ttsturtle';
import { RccnAccordian } from './accordians/nfts/rccn';
import { CatNipAccordian } from './accordians/nfts/catnip';

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
    '3b0b923ec2cb5541ffb46b5a4c659c6edee0af60b32ec6061d9ea1eb', // Syndicate Shell Pass
    'b77791d20054db4fa9726a58854b8c02550277c8683286ec5a353b89', // CatNip
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
                          <InputLabel>Fiat</InputLabel>
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
                  assets && (<>
                    {/* Accordions for Token assets */}
                    <TokenAccordian data={data} selectedFiat={selectedFiat} assets={assets}/>

                    {/* Accordions for Platypus Cyberpunks assets */
                      assets.filter(asset => asset.policyId.includes('787a6798527b21ad0e0f62c021b4ce036513a2d3342b5cb519d2ca19')).length > 0 && (
                        <PlatypusAccordian data={data} selectedFiat={selectedFiat} assets={assets}/>
                      )
                    }

                    {/* Accordions for $adahandle assets */
                      assets.filter(asset => asset.policyId.includes('f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a')).length > 0 && (
                        <AdahandleAccordian data={data} selectedFiat={selectedFiat} assets={assets}/>
                      )
                    }

                    {/* Accordions for TTSTurtle assets */
                      assets.filter(asset => asset.policyId.includes('263eb3e3c980c15305f393dc7a2f6289ba12732b6636efe46d6e2c16')).length > 0 && (
                        <TtsturtleAccordian data={data} selectedFiat={selectedFiat} assets={assets}/>
                      )
                    }

                    {/* Accordions for Racoons Club assets */
                      assets.filter(asset => asset.policyId.includes('3929accff4dcfe4e0b2e24798e97d9a7d99d20f011c3b3668965d2da')).length > 0 && (
                        <RccnAccordian data={data} selectedFiat={selectedFiat} assets={assets}/>
                      )
                    }

                    {/* Accordions for Racoons Club assets */
                      assets.filter(asset => asset.policyId.includes('3929accff4dcfe4e0b2e24798e97d9a7d99d20f011c3b3668965d2da')).length > 0 && (
                        <CatNipAccordian data={data} selectedFiat={selectedFiat} assets={assets}/>
                      )
                    }
                  </>)
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
                  assets && (<>
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
                        {
                          assets.map((asset, i) => {
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
                          })
                        }
                        </ul>
                      </AccordionDetails>
                    </Accordion>
                  </>)
                }
              </Card>
            </Grid>
          </Grid>
          :
          null
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

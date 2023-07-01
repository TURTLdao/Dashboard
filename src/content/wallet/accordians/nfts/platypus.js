
import PropTypes from 'prop-types';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Divider, Card,
  Button, useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function PlatypusAccordian({ data, selectedFiat, assets }) {
  const platy_policy = '787a6798527b21ad0e0f62c021b4ce036513a2d3342b5cb519d2ca19';

  return (
    <>
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
            let formattedAssetName = 'Platypus Cyberpunks #' + asset.assetName.match(/\d+$/)[0];

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
        <Divider sx={{ my: 2 }} />

      </ul>
    </AccordionDetails>
  </Accordion>
    </>
  );
}

PlatypusAccordian.propTypes = {
  // @ts-ignore
  data: PropTypes.object.isRequired,
  selectedFiat: PropTypes.string.isRequired,
  assets: PropTypes.array.isRequired,
};
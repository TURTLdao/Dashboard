
import PropTypes from 'prop-types';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Divider, Card,
  Button, useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function CatNipAccordian({ data, selectedFiat, assets }) {
  const catnip_policy = 'b77791d20054db4fa9726a58854b8c02550277c8683286ec5a353b89';

  return (
    <>
    <Accordion>

    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="ttsturtle-panel-content"
      id="ttsturtle-panel-header"
    >
      <Typography align='center'>
        CatNips (x{assets.filter(asset => asset.policyId.includes(catnip_policy)).length})
      </Typography>
    </AccordionSummary>

    <AccordionDetails>
      <ul>
        <Typography variant='h4' align='center'>
          Owned Assets
        </Typography>

        {assets.map((asset, i) => {
          if (asset.policyId.includes(catnip_policy)) {
            let formattedAssetName = 'CatNip #' + asset.assetName.match(/\d+$/)[0];

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
          ₳ {data.catnip_data.floor_price} {' / '}
          {
            selectedFiat === 'GBP' && (
              <>£ {Number(data.catnip_data.gbp_price).toFixed(2)}</>
            )
          }
          {
            selectedFiat === 'EUR' && (
              <>€ {Number(data.catnip_data.eur_price).toFixed(2)}</>
            )
          }
          {
            selectedFiat === 'USD' && (
              <>$ {Number(data.catnip_data.usd_price).toFixed(2)}</>
            )
          }
        </Typography>
        
        <Typography variant='h4' align='center' sx={{ mt: 2}}>
          Wallet Value
        </Typography>
        
        <Typography variant='body2' align='center'>
          ₳ {data.catnip_data.floor_price * assets.filter(asset => asset.policyId.includes(catnip_policy)).length} {' / '}
          {
            selectedFiat === 'GBP' && (
              <>£ {Number(data.catnip_data.gbp_price * assets.filter(asset => asset.policyId.includes(catnip_policy)).length).toFixed(2)}</>
            )
          }
          {
            selectedFiat === 'EUR' && (
              <>€ {Number(data.catnip_data.eur_price * assets.filter(asset => asset.policyId.includes(catnip_policy)).length).toFixed(2)}</>
            )
          }
          {
            selectedFiat === 'USD' && (
              <>$ {Number(data.catnip_data.usd_price * assets.filter(asset => asset.policyId.includes(catnip_policy)).length).toFixed(2)}</>
            )
          }
        </Typography>

        {}

        <Divider sx={{ my: 2 }} />

        <div align='center'>
          <img
            src={data.catnip_data.logo}
            style={{margin: 4, width: 100, height: 100}}
          />
        </div>
        
        <div align='center' style={{marginBottom: 10}}>
          <Button variant='outline' href='https://catsky.io' target='_blank'>
            Website
          </Button>

          <Button variant='outline' href='https://www.jpg.store/collection/catnips?tab=items' target='_blank'>
            Buy Now
          </Button>

          <Button variant='outline' href='https://catsky.io/catnip-mint/' target='_blank'>
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

CatNipAccordian.propTypes = {
  // @ts-ignore
  data: PropTypes.object.isRequired,
  selectedFiat: PropTypes.string.isRequired,
  assets: PropTypes.array.isRequired,
};
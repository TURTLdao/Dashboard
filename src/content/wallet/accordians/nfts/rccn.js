
import PropTypes from 'prop-types';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Divider, Card,
  Button, useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function RccnAccordian({ data, selectedFiat, assets }) {
  const rccn_policy = '3929accff4dcfe4e0b2e24798e97d9a7d99d20f011c3b3668965d2da';

  return (
    <>
    <Accordion>

    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="ttsturtle-panel-content"
      id="ttsturtle-panel-header"
    >
      <Typography align='center'>
        Racoons Club (x{assets.filter(asset => asset.policyId.includes(rccn_policy)).length})
      </Typography>
    </AccordionSummary>

    <AccordionDetails>
      <ul>
        <Typography variant='h4' align='center'>
          Owned Assets
        </Typography>

        {assets.map((asset, i) => {
          if (asset.policyId.includes(rccn_policy)) {
            let formattedAssetName = 'Racoon #' + asset.assetName.match(/\d+$/)[0];

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
          ₳ {data.racoonsclub_data.floor_price * assets.filter(asset => asset.policyId.includes(rccn_policy)).length} {' / '}
          {
            selectedFiat === 'GBP' && (
              <>£ {Number(data.racoonsclub_data.gbp_price * assets.filter(asset => asset.policyId.includes(rccn_policy)).length).toFixed(2)} {' / '}</>
            )
          }
          {
            selectedFiat === 'EUR' && (
              <>€ {Number(data.racoonsclub_data.eur_price * assets.filter(asset => asset.policyId.includes(rccn_policy)).length).toFixed(2)} {' / '}</>
            )
          }
          {
            selectedFiat === 'USD' && (
              <>$ {Number(data.racoonsclub_data.usd_price * assets.filter(asset => asset.policyId.includes(rccn_policy)).length).toFixed(2)}</>
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
        
        <div align='center' style={{marginBottom: 10}}>
          <Button variant='outline' href='https://racoonsclub.io/' target='_blank'>
            Website
          </Button>

          <Button variant='outline' href='https://www.jpg.store/collection/racoonsclubmainseries?tab=items' target='_blank'>
            Buy Now
          </Button>

        </div>
        <Divider sx={{ my: 2 }} />

      </ul>
    </AccordionDetails>
  </Accordion>
    </>
  );
}

RccnAccordian.propTypes = {
  // @ts-ignore
  data: PropTypes.object.isRequired,
  selectedFiat: PropTypes.string.isRequired,
  assets: PropTypes.array.isRequired,
};

import PropTypes from 'prop-types';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Divider, Card,
  Button, useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function AdahandleAccordian({ data, selectedFiat, assets }) {
  const adahandle_policy = 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a';

  return (
    <>
    <Accordion>

    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="ttsturtle-panel-content"
      id="ttsturtle-panel-header"
    >
      <Typography align='center'>
        $adahandle (x{assets.filter(asset => asset.policyId.includes(adahandle_policy)).length})
      </Typography>
    </AccordionSummary>

    <AccordionDetails>
      <ul>
        <Typography variant='h4' align='center'>
          Owned Assets
        </Typography>

        {assets.map((asset, i) => {
          if (asset.policyId.includes(adahandle_policy)) {
            return (
              <div>
                <Typography variant='body2' align='center'>
                  ${asset.assetName}
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
          ₳ {data.adahandle_data.floor_price * assets.filter(asset => asset.policyId.includes(adahandle_policy)).length} {' / '}
          {
            selectedFiat === 'GBP' && (
              <>£ {Number(data.adahandle_data.gbp_price * assets.filter(asset => asset.policyId.includes(adahandle_policy)).length).toFixed(2)} {' / '}</>
            )
          }
          {
            selectedFiat === 'EUR' && (
              <>€ {Number(data.adahandle_data.eur_price * assets.filter(asset => asset.policyId.includes(adahandle_policy)).length).toFixed(2)} {' / '}</>
            )
          }
          {
            selectedFiat === 'USD' && (
              <>$ {Number(data.adahandle_data.usd_price * assets.filter(asset => asset.policyId.includes(adahandle_policy)).length).toFixed(2)}</>
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
        
        <div align='center' style={{marginBottom: 10}}>
          <Button variant='outline' href='https://adahandle.com/' target='_blank'>
            Website
          </Button>

          <Button variant='outline' href='https://www.jpg.store/collection/adahandle?tab=items' target='_blank'>
            Buy Now
          </Button>

          <Button variant='outline' href='https://adahandle.com/mint' target='_blank'>
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

AdahandleAccordian.propTypes = {
  // @ts-ignore
  data: PropTypes.object.isRequired,
  selectedFiat: PropTypes.string.isRequired,
  assets: PropTypes.array.isRequired,
};
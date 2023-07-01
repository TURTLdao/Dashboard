
import PropTypes from 'prop-types';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Divider, Card,
  Button, useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function TtsturtleAccordian({ data, selectedFiat, assets }) {
  const ttsturtle_policy = '263eb3e3c980c15305f393dc7a2f6289ba12732b6636efe46d6e2c16';

  return (
    <>
    <Accordion>

    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="ttsturtle-panel-content"
      id="ttsturtle-panel-header"
    >
      <Typography align='center'>
        The Turtle Syndicate (x{assets.filter(asset => asset.policyId.includes(ttsturtle_policy)).length})
      </Typography>
    </AccordionSummary>

    <AccordionDetails>
      <ul>
        <Typography variant='h4' align='center'>
          Owned Assets
        </Typography>

        {assets.map((asset, i) => {
          if (asset.policyId.includes(ttsturtle_policy)) {
            let formattedAssetName = 'Turtle #' + asset.assetName.match(/\d+$/)[0];

            return (
              <div>
                <Typography variant='body2' align='center'>
                  {formattedAssetName}
                </Typography>
              </div>
            );
          } else if (asset.policyId.includes('3b0b923ec2cb5541ffb46b5a4c659c6edee0af60b32ec6061d9ea1eb')) {
            let formattedAssetName = 'Syndicate Shell Pass #' + asset.assetName.match(/\d+$/)[0];

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
          Turtle: ₳ {data.ttsturtle_data.floor_price} {' / '}
          {
            selectedFiat === 'GBP' && (
              <>
                £ {Number(data.ttsturtle_data.gbp_price).toFixed(2)}
              </>
            )
          }
          {
            selectedFiat === 'EUR' && (
              <>
                € {Number(data.ttsturtle_data.eur_price).toFixed(2)}
              </>
            )
          }
          {
            selectedFiat === 'USD' && (
              <>
                $ {Number(data.ttsturtle_data.usd_price).toFixed(2)}=
              </>
            )
          }
        </Typography>
        
        <Typography variant='body2' align='center'>
          Syndicate Shell Pass: ₳ {data.sspass_data.floor_price} {' / '}
          {
            selectedFiat === 'GBP' && (
              <>
                £ {Number(data.sspass_data.gbp_price).toFixed(2)}
              </>
            )
          }
          {
            selectedFiat === 'EUR' && (
              <>
                € {Number(data.sspass_data.eur_price).toFixed(2)}
              </>
            )
          }
          {
            selectedFiat === 'USD' && (
              <>
                $ {Number(data.sspass_data.usd_price).toFixed(2)}
              </>
            )
          }
        </Typography>
        
        <Typography variant='h4' align='center' sx={{ mt: 2}}>
          Wallet Value
        </Typography>
        
        <Typography variant='body2' align='center'>
          ₳ {data.ttsturtle_data.floor_price * assets.filter(asset => asset.policyId.includes(ttsturtle_policy)).length + data.sspass_data.floor_price * assets.filter(asset => asset.policyId.includes('3b0b923ec2cb5541ffb46b5a4c659c6edee0af60b32ec6061d9ea1eb')).length} {' / '}
          {
            selectedFiat === 'GBP' && (
              <>£ {Number(data.ttsturtle_data.floor_price * assets.filter(asset => asset.policyId.includes(ttsturtle_policy)).length + data.sspass_data.floor_price * assets.filter(asset => asset.policyId.includes('3b0b923ec2cb5541ffb46b5a4c659c6edee0af60b32ec6061d9ea1eb')).length).toFixed(2)}</>
            )
          }
          {
            selectedFiat === 'EUR' && (
              <>€ {Number(data.ttsturtle_data.floor_price * assets.filter(asset => asset.policyId.includes(ttsturtle_policy)).length + data.sspass_data.floor_price * assets.filter(asset => asset.policyId.includes('3b0b923ec2cb5541ffb46b5a4c659c6edee0af60b32ec6061d9ea1eb')).length).toFixed(2)}</>
            )
          }
          {
            selectedFiat === 'USD' && (
              <>$ {Number(data.ttsturtle_data.floor_price * assets.filter(asset => asset.policyId.includes(ttsturtle_policy)).length + data.sspass_data.floor_price * assets.filter(asset => asset.policyId.includes('3b0b923ec2cb5541ffb46b5a4c659c6edee0af60b32ec6061d9ea1eb')).length).toFixed(2)}</>
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
        
        <div align='center' style={{marginBottom: 10}}>
          <Button variant='outline' href='https://www.theturtlesyndicate.xyz/' target='_blank'>
            Website
          </Button>

          <Button variant='outline' href='https://www.jpg.store/collection/theturtlesyndicate?tab=items' target='_blank'>
            Buy Now
          </Button>

          <Button variant='outline' href='https://www.theturtlesyndicate.xyz/turtlemint' target='_blank'>
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

TtsturtleAccordian.propTypes = {
  // @ts-ignore
  data: PropTypes.object.isRequired,
  selectedFiat: PropTypes.string.isRequired,
  assets: PropTypes.array.isRequired,
};
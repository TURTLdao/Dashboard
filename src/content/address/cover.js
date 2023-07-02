import PropTypes from 'prop-types';
import { Box, Typography, Card, Tooltip, Avatar, CardMedia, Button,
  IconButton, styled, Grid
} from '@mui/material';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';

const AvatarWrapper = styled(Card)(
  ({ theme }) => `
    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    .MuiAvatar-root {
      width: ${theme.spacing(22)};
      height: ${theme.spacing(22)};
    }
`
);


const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;
    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`);


export const AddressCover = ({ data, known_addresses, custom_strings, links, poolpm_addr_data  }) => {
  
  const is_a_match = Object.values(known_addresses).includes(data.address);
  const custom_string_key = Object.keys(known_addresses).find((key) => known_addresses[key] === data.address);

  const additional_info = is_a_match ? custom_strings[custom_string_key] : '';
  const links_info = is_a_match ? links[custom_string_key] : null;

  const calculatePercentage = (quantity, supply) => {
    return ((quantity / supply) * 100).toFixed(2); // Calculate percentage and round to 2 decimal places
  };

  return (
    <>
      <Box display="flex" mb={3}>

        <Tooltip arrow placement="top" title="Go back">
          <IconButton href='/search-wallet/' color="primary" sx={{ p: 2, mr: 2 }}>
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>

        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            {data.address.slice(0, 30)}...
          </Typography>
          
          <Typography variant="subtitle2">
            {additional_info}
          </Typography>
        </Box>
      </Box>

      <CardCover>
        { is_a_match ?
          <CardMedia image={'https://raw.githubusercontent.com/TURTLdao/TURTL-images/main/dao-bg.svg'} />
          :
          <CardMedia image={'https://raw.githubusercontent.com/TURTLdao/TURTL-images/main/basic-bg.svg'} />
        }
      </CardCover>

      <div align='center'>
        <AvatarWrapper>
          <Avatar variant="rounded"
            src={`https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=${data.address}?randomizeIds=true`}
          />
        </AvatarWrapper>
      </div>

      {
        links_info ? 
        <div align='center' style={{ marginTop: 10}}>
          
          <Button href={links_info && links_info[0]} target='_blank' sx={{ mr: 1 }}  size="small" variant="contained">
                Twitter
              </Button>
              <Button href={links_info && links_info[1]} target='_blank'  size="small" sx={{ ml: 1 }} variant="outlined">
                Website
              </Button>
        </div>
        :
        null
      }

    </>
  );
};

AddressCover.propTypes = {
  // @ts-ignore
  data: PropTypes.object.isRequired,
  known_addresses: PropTypes.object.isRequired,
  custom_strings: PropTypes.object.isRequired,
  links: PropTypes.array.isRequired,
  poolpm_addr_data : PropTypes.object.isRequired
};

export default AddressCover;

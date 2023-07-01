import PropTypes from 'prop-types';
import { Box, Typography, Card, Tooltip, Avatar, CardMedia, Button,
  IconButton, styled
} from '@mui/material';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';

const AvatarWrapper = styled(Card)(
  ({ theme }) => `
    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};
    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
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


export const AddressCover = ({ data, known_addresses, custom_strings, links }) => {
  
  const is_a_match = Object.values(known_addresses).includes(data.address);
  const custom_string_key = Object.keys(known_addresses).find((key) => known_addresses[key] === data.address);

  const additional_info = is_a_match ? custom_strings[custom_string_key] : '';
  const links_info = is_a_match ? links[custom_string_key] : null;

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
        {
        is_a_match ?
          <CardMedia image={'https://raw.githubusercontent.com/TURTLdao/TURTL-images/main/dao-bg.svg'} />
          :
          <CardMedia image={'https://raw.githubusercontent.com/TURTLdao/TURTL-images/main/basic-bg.svg'} />
        }
        
      </CardCover>

      <AvatarWrapper>
        <Avatar variant="rounded"
          src={`https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=${data.address}?randomizeIds=true`}
        />
      </AvatarWrapper>

      {
        links_info ? 
        <Box py={2} pl={2} mb={3}>
          <Box
            display={{ xs: 'block', md: 'flex' }}
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Button href={links_info && links_info[0]} target='_blank'  size="small" variant="contained">
                Twitter
              </Button>
              <Button href={links_info && links_info[1]} target='_blank'  size="small" sx={{ mx: 2 }} variant="outlined">
                Website
              </Button>
            </Box>
          </Box>
        </Box>
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
  links: PropTypes.array.isRequired
};

export default AddressCover;

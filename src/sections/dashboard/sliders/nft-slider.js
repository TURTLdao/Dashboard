import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader,
  IconButton, Divider, Stack, SvgIcon, Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Slider from "react-slick";
import { NftItems } from 'src/sections/nft/nft-items';
import { NftView } from 'src/sections/nft/nft-view';

export const NftSlider = ({  }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#4CAF50"
      }
    }
  });
  const dao_items = NftItems();
  const [filteredCompanies, setFilteredCompanies] = useState(dao_items);

  
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{
        background: 'radial-gradient(circle, rgba(42,97,44,1) 0%, rgba(45,45,45,1) 100%)',
        border: "2px solid #4CAF50"
      }}>
      <CardHeader
        sx={{ color: 'primary.main' }}
        title={"Newly Listed NFTs" }
        action={(
          <div>
          </div>
        )}
      />
        <CardContent>
          <Box
            sx={{ 
            }}
          >
          <link
        rel="stylesheet"
        type="text/css"
        charset="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
        <div style={{ margin: 20}}>
          <Slider autoplay={true} speed={5000}
            autoplaySpeed={5000} cssEase={"linear"}
          >
            {filteredCompanies.map((dao_items) => (
              <div key={dao_items.id}>
                <NftView nftItems={dao_items} />
              </div>
            ))}
          </Slider>
          </div>
          </Box>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

NftSlider.prototypes = {
  sx: PropTypes.object,
};

import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import { Avatar, Box, Button, Card, CardHeader, CardContent, Divider, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Swiper, SwiperSlide } from "swiper/react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";

//import Arrow from "../assets/Arrow.svg";
import { Pagination, Navigation, Autoplay, EffectCards } from "swiper";
import { TokenView } from "../sliders/token-view";
import { daoItems } from "src/tokens/dao-supported";
import { NftJPGView } from "src/sections/nft/nft-view-jpg";

const Container = styled.div`.square {
  width: 25vh;
  height: 25vh;
}

@media (max-width: 64em) {
  .square {
    width: 30vh;
    height: 30vh;
  }
}

@media (max-width: 48em) {
  .square {
    width: 40vh;
    height: 40vh;
  }
}

@media (max-width: 30em) {
  .square {
    width: 60vh;
    height: 60vh;
  }
}
  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    background-color: ${(props) => props.theme.carouselColor};

    display: flex;
    justify-content: center;
    align-items: center;

    img {
      display: block;
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }

  .swiper-button-next {
    color: ${(props) => props.theme.text};
    right: 0;
    width: 4rem;
    top: 60%;

    background-position: center;
    background-size: cover;

    &:after {
      display: none;
    }

    @media (max-width: 64em) {
      width: 3rem;
    }

    @media (max-width: 30em) {
      width: 2rem;
    }
  }

  .swiper-button-prev {
    color: ${(props) => props.theme.text};
    width: 4rem;
    left: 0;
    top: 60%;
    transform: rotate(180deg);
    
    background-position: center;
    background-size: cover;

    &:after {
      display: none;
    }

    @media (max-width: 64em) {
      width: 3rem;
    }

    @media (max-width: 30em) {
      width: 2rem;
    }
  }
`;

export const NewlyListedNftsCarousel = ({ jpgstore_newly_added_data }) => {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#4CAF50"
      }
    }
  });

  const nftItem = jpgstore_newly_added_data;

  const bg = 'https://raw.githubusercontent.com/TURTLdao/TURTL-images/main/basic-bg.svg';
  
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{
        border: "2px solid #4CAF50",
        backgroundImage: `url(${bg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
        <CardHeader
          sx={{ color: 'primary.main' }}
          title={"Newly Listed, Verified JPG.store NFTs"}
        />

    <Container style={{ margin: 10}}>
      <Swiper
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
        }}
        scrollbar={{
          draggable: true,
        }}
        modules={[EffectCards, Pagination, Navigation, Autoplay]}
        navigation={true}
        effect={"cards"}
        grabCursor={true}
        className="mySwiper"
      >
      {Object.values(nftItem).map((item) => (
          <SwiperSlide>
          <Card sx={{
            border: "2px solid #4CAF50",
            backgroundImage: `url(${bg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: 400,
            width: '80%',
            marginLeft: 2,
            marginRight: 2
          }}>
          <CardHeader
            sx={{ color: 'primary.main' }}
            title={''}
          />
    
            <CardContent>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                  <div align='center' >
                  <Avatar
                    src={item.hero_image}
                    sx={{
                      height: 100,
                      mb: 2,
                      width: 100
                    }}
                  />
                  <Typography
                    color={'white'}
                    variant="body2"
                    align='center'
                  >
                    <i>{item.description}</i>
                  </Typography>
    
                  <Typography
                    color={'primary.main'}
                    variant="sub"
                    align='center'
                  >
                    ₳ {item.global_floor}
                  </Typography>
    
    
                  </div>
                  <Button href={'https://jpg.store/collection' + item.url} variant='contained' sx={{ margin: 1, color: 'white', width: '75%' }}>
                    Buy Now
                  </Button>
                  
    
                  </Box>
        
              </CardContent>
          </Card>
          </SwiperSlide>
      ))}
      </Swiper>
    </Container>
    </Card></ThemeProvider>
  );
};

NewlyListedNftsCarousel.prototypes = {
  sx: PropTypes.object,
};

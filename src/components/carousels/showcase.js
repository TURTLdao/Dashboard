import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import { Box, Card, CardHeader, CardContent, Divider, Unstable_Grid2 as Grid } from '@mui/material';
import { Swiper, SwiperSlide } from "swiper/react";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";

//import Arrow from "../assets/Arrow.svg";
import { Pagination, Navigation, Autoplay, EffectCards } from "swiper";

const Container = styled.div`
  width: 25vw;
  height: 50vh;

  @media (max-width: 64em) {
    height: 30vh;
    width: 30vw;
  }

  @media (max-width: 48em) {
    height: 40vh;
    width: 40vw;
  }

  @media (max-width: 30em) {
    height: 60vh;
    width: 60vw;
  }

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    background-color: ${(props) => props.theme.carouselColor};
    border-radius: 20px;

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

export const ShowcaseCarousel = ({ imagesArray }) => {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#4CAF50"
      }
    }
  });
  const bg = 'https://raw.githubusercontent.com/TURTLdao/TURTL-images/main/dao-bg.svg';
  
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{
          border: "2px solid #4CAF50",
          backgroundImage: `url(${bg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
      }}>
    <Container style={{ margin: 10}}>
      <Swiper
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
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
        {imagesArray.map((img, index) => (
          <SwiperSlide>
            <img src={img} style={{ height: "100%", width: "100%"}}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
    </Card></ThemeProvider>
  );
};

ShowcaseCarousel.prototypes = {
    sx: PropTypes.object,
    imagesArray: PropTypes.string.isRequired,
  };
  
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { ArrowLeft, ArrowRight } from "phosphor-react";
import React, { useRef } from "react";
import Slider from "react-slick"; // Import react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Card1 from "../../assets/card1.jpg";
import Card2 from "../../assets/card2.jpg";
import Card3 from "../../assets/card3.jpg";
import Card4 from "../../assets/card4.jpg";
import Card5 from "../../assets/card5.png";
import Card6 from "../../assets/card6.jpg";
import { Link } from 'react-router-dom';

const cards = [
  {
    image: Card1,
    title: "Azalan Restaurant Promo",
    description: "Enjoy 10% off with your BPI Credit, Debit or Prepaid Card",
    link: "https://www.google.com/",
  },
  {
    image: Card2,
    title: "KuBu Restaurant + Bar Promo",
    description: "Enjoy 10% off with your BPI Credit, Debit or Prepaid Card",
    link: "https://www.google.com/",
  },
  {
    image: Card3,
    title: "Coron Soleil Garden Resort",
    description:
      "Enjoy 50% off on select rooms with your BPI Credit, Debit or Prepaid Card",
    link: "https://www.google.com/",
  },
  {
    image: Card4,
    title: "Italia Resturant Promo",
    description:
      "Enjoy a free desert when you use your BPI Credt,Debit or Prepaid Card",
    link: "https://www.google.com/",
  },
  {
    image: Card5,
    title: "YOOX Promo",
    description:
      "Enjoy 15% off with your BPI Mastercard, Credit, Debit or Prepaid Card",
    link: "https://www.google.com/",
  },
  {
    image: Card6,
    title: "Cafe K at Hotel Kimberly Promo",
    description: "Enjoy 15% off with your BPI Credit, Debit or Prepaid Card",
    link: "https://www.google.com/",
  },
];

const CardInfo = () => {
  const sliderRef = useRef(null);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 cards at a time
    slidesToScroll: 1, // Scroll 1 card at a time
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // Show 1 card at a time on small screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // Show 2 cards at a time on medium screens
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      {/* <Container maxWidth={"lg"} sx={{ marginTop: 5, paddingTop: 5 }}>
        <Box width={"100%"}>
          <Stack
            sx={{
              width: 90,
              height: 7,
              backgroundColor: "#b11116",
              marginBottom: 2,
            }}
          />
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            sx={{ marginBottom: 4 }}
          >
            <Typography
              sx={{ fontSize: "1.9rem", fontWeight: 600, color: "#1a1a1a" }}
            >
              Check out our holiday offers and promos
            </Typography>
            <Stack direction={"row"} spacing={1}>
              <Box
                sx={{
                  backgroundColor: "#5d5d5d",
                  borderRadius: "4px",
                  height: 48,
                  width: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#c00",
                  },
                }}
                onClick={() => sliderRef.current.slickPrev()}
              >
                <ArrowLeft size={32} color="#fff" />
              </Box>
              <Box
                sx={{
                  backgroundColor: "#1a1a1a",
                  borderRadius: "4px",
                  height: 48,
                  width: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#c00",
                  },
                }}
                onClick={() => sliderRef.current.slickNext()}
              >
                <ArrowRight size={32} color="#fff" />
              </Box>
            </Stack>
          </Stack>

          <Stack mt={4}>
            <Slider ref={sliderRef} {...settings}>
              {cards.map((card, index) => (
                <div key={index}>
                  <Card
                    sx={{
                      maxWidth: 392,
                      margin: "0 10px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      sx={{ height: 220 }}
                      image={card.image}
                      title={card.title}
                    />
                    <CardContent sx={{ padding: "32px 24px", flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        component="div"
                        sx={{
                          fontSize: "25px",
                          color: "#1a1a1a",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {card.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontSize: "16px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis", // Ellipsis for overflow text
                          maxHeight: "40px", // Set max height for uniformity
                        }}
                      >
                        {card.description}
                      </Typography>
                      <a
                        style={{
                          color: "#1a1a1a",
                          fontSize: "16px",
                          fontWeight: 600,
                        }}
                        href={card.link}
                      >
                        View Details
                      </a>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </Slider>
          </Stack>

          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ marginTop: 5 }}
          >
            <Button
              component={Link}
              to='/maintain'
              sx={{
                // backgroundColor: "#b11116",
                color: "#b11116",
                fontWeight: 600,
                fontSize: 16,
                padding: "10px 20px",
                borderRadius: "4px",
                border: "2px solid #b11116",
                "&:hover": {
                  backgroundColor: "#b11116",
                  color: "#ffffff",
                },
              }}
              endIcon={<ArrowRight style={{ marginLeft: 5 }} size={25} />}
            >
              EXPLORE PROMOSTIONS
            </Button>
          </Stack>
        </Box>
      </Container> */}

<Container maxWidth={"lg"} sx={{ marginTop: 5, paddingTop: 5 }}>
        <Box width={"100%"}>
          {/* Header */}
          <Stack
            sx={{
              width: 90,
              height: 7,
              backgroundColor: "#b11116",
              marginBottom: 2,
            }}
          />
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            sx={{ marginBottom: 4 }}
          >
            <Typography
              sx={{ fontSize: "clamp(1.2rem, 2vw, 1.9rem)", fontWeight: 600, color: "#1a1a1a" }}
            >
              Check out our holiday offers and promos
            </Typography>
            <Stack direction={"row"} spacing={1}>
              <Box
                sx={{
                  backgroundColor: "#5d5d5d",
                  borderRadius: "4px",
                  height: "clamp(30px, 2vw, 150px)",
                  width: "clamp(30px, 2vw, 150px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#c00",
                  },
                }}
                onClick={() => sliderRef.current.slickPrev()}
              >
                <ArrowLeft sx={{fontSize:"clamp(30px, 2vw, 150px)"}} color="#fff" />
              </Box>
              <Box
                sx={{
                  backgroundColor: "#1a1a1a",
                  borderRadius: "4px",
                  height: "clamp(30px, 2vw, 150px)",
                  width: "clamp(30px, 2vw, 150px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#c00",
                  },
                }}
                onClick={() => sliderRef.current.slickNext()}
              >
                <ArrowRight sx={{fontSize:"clamp(30px, 2vw, 150px)"}} color="#fff" />
              </Box>
            </Stack>
          </Stack>
          {/* Cards */}
          <Stack mt={4}>
            <Slider ref={sliderRef} {...settings}>
              {cards.map((card, index) => (
                <div key={index}>
                  <Card
                    sx={{
                      maxWidth: 392,
                      margin: "0 10px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      sx={{ height: 220 }}
                      image={card.image}
                      title={card.title}
                    />
                    <CardContent sx={{ padding: "32px 24px", flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        component="div"
                        sx={{
                          fontSize: "clamp(16px, 2vw, 25px)",
                          color: "#1a1a1a",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {card.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontSize: "16px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis", // Ellipsis for overflow text
                          maxHeight: "40px", // Set max height for uniformity
                        }}
                      >
                        {card.description}
                      </Typography>
                      <a
                        style={{
                          color: "#1a1a1a",
                          fontSize: "16px",
                          fontWeight: 600,
                        }}
                        href={card.link}
                      >
                        View Details
                      </a>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </Slider>
          </Stack>

          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ marginTop: 5 }}
          >
            <Button
              component={Link}
              to='/maintain'
              sx={{
                // backgroundColor: "#b11116",
                color: "#b11116",
                fontWeight: 600,
                fontSize: "clamp(12px, 2vw, 32px)",
                padding: "10px 20px",
                borderRadius: "4px",
                border: "2px solid #b11116",
                "&:hover": {
                  backgroundColor: "#b11116",
                  color: "#ffffff",
                },
              }}
              endIcon={<ArrowRight style={{ marginLeft: 5 }} size={25} />}
            >
              EXPLORE PROMOSTIONS
            </Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default CardInfo;

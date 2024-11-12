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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Blog1 from "../../assets/blog1.jpg";
import Blog2 from "../../assets/blog2.jpg";
import Blog3 from "../../assets/blog3.jpg";
import Blog4 from "../../assets/blog4.png";
import Blog5 from "../../assets/blog5.jpg";
import Blog6 from "../../assets/blog6.jpg";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const blogsData = [
  {
    title: "Treats of the Week",
    description:
      "If you are looking for discounts on dining, shopping, entertainment, travel, and more",
    image: Blog1,
  },
  {
    title: "How SWIFT Code helps make remittances fast and secure",
    description:
      "Understand how to use BPI's SWIFT Code for seamless transactions when sending money to the",
    image: Blog2,
  },
  {
    title: "5 Things About Mobile Check Deposite You Should Know",
    description: "Deposit your checks with ease using your mobile app",
    image: Blog3,
  },
  {
    title: "5 ECO-Friendly Tips When Traveling",
    description:
      "Here's how you can enjoy traveling but also help Mother Earth at the same time",
    image: Blog4,
  },
  {
    title: "3 Things You Should Know Before Going Solar",
    description:
      "Here are factors to consider in installing a solar power system at home",
    image: Blog5,
  },
  {
    title: "How to Access Your Funds When Traveling Abroad",
    description:
      "It pays to be familiar with foreign exchange rates when you are on an overseas trip",
    image: Blog6,
  },
];

const InsightBlogs = () => {
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

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };
  return (
    <>
      {/* <Box sx={{ width: "100%", backgroundColor: "#f5f5f5", marginTop: 5 }}>
        <Container maxWidth={"lg"} sx={{ paddingTop: 5 }}>
          <Box width={"100%"} sx={{ paddingTop: 5 }}>
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
                Insignt and blogs
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


            <Stack mt={4} pb={5}>
              <Slider ref={sliderRef} {...settings}>
                {blogsData.map((card, index) => (
                  <div key={index}>
                    <Card
                      sx={{
                        maxWidth: 392,
                        margin: "0 10px",
                        display: "flex",
                        flexDirection: "column",
                        minHeight: "415px",
                      }}
                    >
                      <CardMedia
                        sx={{ height: 180 }}
                        image={card.image}
                        title={card.title}
                      />
                      <CardContent sx={{ padding: "32px 24px", flexGrow: 1 }}>
                        <Typography
                          gutterBottom
                          component="div"
                          sx={{
                            fontSize: "25px",
                            color: "#000",
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 3, // Show up to 3 lines
                            WebkitBoxOrient: "vertical",
                            lineHeight: "25px",
                            fontWeight: 700,
                          }}
                        >
                          {card.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            fontSize: "16px",
                            // overflow: "hidden",
                            // whiteSpace: "nowrap",
                            // textOverflow: "ellipsis",
                          }}
                        >
                          {truncateText(card.description, 89)}
                        </Typography>
                        <a
                          style={{
                            color: "#000",
                            fontSize: "16px",
                            fontWeight: 700,
                            textDecoration: "underline",
                          }}
                          href={card.link}
                        >
                          Read insight blog
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
              sx={{ marginTop: 5, paddingBottom: 6 }}
            >
              <Button
              component={Link}
              to='/maintain'
                sx={{
                  // backgroundColor: "#b11116",
                  color: "#b11116",
                  fontWeight: 600,
                  fontSize: 16,
                  padding: "10px 50px",
                  borderRadius: "4px",
                  border: "2px solid #b11116",
                  "&:hover": {
                    backgroundColor: "#b11116",
                    color: "#ffffff",
                  },
                }}
                endIcon={<ArrowRight style={{ marginLeft: 5 }} size={25} />}
              >
                READ MORE
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box> */}

<Box sx={{ width: "100%", backgroundColor: "#f5f5f5", marginTop: 5 }}>
        <Container maxWidth={"lg"} sx={{ paddingTop: 5 }}>
          <Box width={"100%"} sx={{ paddingTop: 5 }}>
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
                Insignt and blogs
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

            {/* B;ogs */}
            <Stack mt={4} pb={5}>
              <Slider ref={sliderRef} {...settings}>
                {blogsData.map((card, index) => (
                  <div key={index}>
                    <Card
                      sx={{
                        maxWidth: 392,
                        margin: "0 10px",
                        display: "flex",
                        flexDirection: "column",
                        minHeight: "415px",
                      }}
                    >
                      <CardMedia
                        sx={{ height: 180 }}
                        image={card.image}
                        title={card.title}
                      />
                      <CardContent sx={{ padding: "32px 24px", flexGrow: 1 }}>
                        <Typography
                          gutterBottom
                          component="div"
                          sx={{
                            fontSize: "clamp(16px, 2vw, 25px)",
                            color: "#000",
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 3, // Show up to 3 lines
                            WebkitBoxOrient: "vertical",
                            lineHeight: "25px",
                            fontWeight: 700,
                          }}
                        >
                          {card.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            fontSize: "16px",
                            // overflow: "hidden",
                            // whiteSpace: "nowrap",
                            // textOverflow: "ellipsis",
                          }}
                        >
                          {truncateText(card.description, 89)}
                        </Typography>
                        <a
                          style={{
                            color: "#000",
                            fontSize: "16px",
                            fontWeight: 700,
                            textDecoration: "underline",
                          }}
                          href={card.link}
                        >
                          Read insight blog
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
              sx={{ marginTop: 5, paddingBottom: 6 }}
            >
              <Button
              component={Link}
              to='/maintain'
                sx={{
                  // backgroundColor: "#b11116",
                  color: "#b11116",
                  fontWeight: 600,
                  fontSize: 16,
                  padding: "10px 50px",
                  borderRadius: "4px",
                  border: "2px solid #b11116",
                  "&:hover": {
                    backgroundColor: "#b11116",
                    color: "#ffffff",
                  },
                }}
                endIcon={<ArrowRight style={{ marginLeft: 5 }} size={25} />}
              >
                READ MORE
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default InsightBlogs;
